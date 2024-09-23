import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


interface Song {
  id: number;
  name: string;
  coverUrl: string;
  songUrl: string;
}

interface Album {
  id: number;
  name: string;
}

interface AlbumResponseData {
  data: {
    id: number;
    attributes: {
      Name: string;
      Cover: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
      songs: {
        data: Array<{
          id: number;
        }>;
      };
    };
  };
}

interface SongResponseData {
  data: {
    id: number;
    attributes: {
      Name: string;
      SongUrl: string;
    };
  };
}

const AlbumPage: React.FC = () => {
  // Используем useRouter для получения параметра id
  const router = useRouter();
  const { id } = router.query; // Достаем id из query-параметров

  const albumId = Number(id);

  const [songs, setSongs] = useState<Song[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!albumId) return; // Если id еще не загружен, ничего не делаем

    const fetchData = async () => {
      try {
        // Запрашиваем данные об альбоме и песнях
        const albumResponse = await axios.get<AlbumResponseData>(
          `http://localhost:1337/api/albums/${albumId}?populate=*`
        );
        const albumData = albumResponse.data.data.attributes;

        setAlbum({
          id: albumResponse.data.data.id,
          name: albumData.Name,
        });

        // Запрашиваем данные для каждой песни
        const songPromises = albumData.songs.data.map(async (rawSong) => {
          const songResponse = await axios.get<SongResponseData>(
            `http://localhost:1337/api/songs/${rawSong.id}?populate=*`
          );
          const song = songResponse.data.data;
          const songAttributes = song.attributes;

          return {
            id: song.id,
            name: songAttributes.Name,
            coverUrl: `http://localhost:1337${albumData.Cover.data.attributes.url}`,
            songUrl: `http://localhost:1337${songAttributes.SongUrl}`,
          };
        });

        // Ожидаем завершения всех запросов
        const resolvedSongs = await Promise.all(songPromises);
        setSongs(resolvedSongs);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Ошибка загрузки данных альбома');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  const setSongAtStore = (songUrl: string) => {
    // Здесь вы можете добавить код для воспроизведения песни через zustand или другой стор
    console.log('Playing song:', songUrl);
  };

  // Рендеринг: отображение загрузки, ошибки или контента
  return (
    <div className="p-4">
      {isLoading ? (
        <div className="text-center text-white">Загрузка...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : album !== null ? (
        <div>
          <h1 className="text-4xl font-bold text-purple-800 mb-6">{album.name}</h1>
          <div className="flex flex-wrap gap-4">
            {songs.map((song) => (
              <div key={song.id} className="w-40">
                <div className="relative">
                  <img
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                    src={song.coverUrl}
                    alt={song.name}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setSongAtStore(song.songUrl)}
                      className="text-white bg-purple-700 hover:bg-purple-800 px-3 py-1 rounded"
                    >
                      Play
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-center text-white">{song.name}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-white">Альбом не найден</div>
      )}
    </div>
  );
};

export default AlbumPage;

