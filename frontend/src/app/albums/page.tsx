import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const albumId = Number(useParams<{ id: string }>().id);

  const [songs, setSongs] = useState<Song[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await axios.get<AlbumResponseData>(`http://localhost:1337/api/albums/${albumId}?populate=*`);
        const albumData = albumResponse.data.data.attributes;

        setAlbum({
          id: albumResponse.data.data.id,
          name: albumData.Name,
        });

        const songPromises = albumData.songs.data.map(async (rawSong) => {
          const songResponse = await axios.get<SongResponseData>(`http://localhost:1337/api/songs/${rawSong.id}?populate=*`);
          const song = songResponse.data.data;
          const songAttributes = song.attributes;

          return {
            id: rawSong.id,
            name: songAttributes.Name,
            coverUrl: `http://localhost:1337` + albumData.Cover.data.attributes.url,
            songUrl: `http://localhost:1337` + songAttributes.SongUrl,
          };
        });

        const resolvedSongs = await Promise.all(songPromises);
        setSongs(resolvedSongs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [albumId]);

  const setSongAtStore = (songUrl: string) => {
    console.log("Playing song:", songUrl);
  };

  return (
    <>
      {album !== null && (
        <div>
          <h1 className="text-4xl font-bold text-purple-800">{album.name}</h1>
          <div>
            <div className="flex flex-wrap gap-4">
              {songs.map((song) => (
                <Link to={`/song/${song.id}`} key={song.id} className="w-40">
                  <div className="relative">
                    <img className="w-full h-40 object-cover rounded-lg shadow-md" src={song.coverUrl} alt={song.name} />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                
                    </div>
                  </div>
                  <div className="mt-2 text-center text-white">{song.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumPage;

