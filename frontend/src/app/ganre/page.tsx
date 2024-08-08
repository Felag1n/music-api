import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import axios from 'axios';


interface Song {
  id: number;
  name: string;
  cover: string;
}

interface GenreProps {
  songs: Song[];
  description: string;
  notFound: boolean;
}

const Genre: React.FC<GenreProps> = ({ songs, description, notFound }) => {
  if (notFound) {
    return <div>Page Not Found</div>;
  }

  return (
    <>
      <div className="text-container genre-content">
        {description}
      </div>
      <div className="group-genre">
        {songs.map((song) => (
          <Link href={`/song/${song.id}`} key={song.id}>
            <div className="box genre">
              <img className="image" src={song.cover} alt={song.name} />
            </div>
            <div className="song-name">{song.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Genre;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!; 
  const genreId = +{id};

  try {
    const genreResponse = await axios.get(`http://localhost:1337/api/genres/${genreId}?populate=*`);
    if (!genreResponse.data.data) {
      return {
        props: {
          notFound: true,
        },
      };
    }

    const genreData = genreResponse.data.data.attributes;
    const description = genreData.description;

    const songPromises = genreData.songs.data.map(async (rawSong: { id: number }) => {
      const songResponse = await axios.get(`http://localhost:1337/api/songs/${rawSong.id}?populate=*`);
      const song = songResponse.data.data;
      const songAttributes = song.attributes;

      return {
        id: rawSong.id,
        name: songAttributes.Name,
        cover: `http://localhost:1337${songAttributes.Cover.data[0].attributes.url}`,
      };
    });

    const resolvedSongs = await Promise.all(songPromises);

    return {
      props: {
        songs: resolvedSongs,
        description,
        notFound: false,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        notFound: true,
      },
    };
  }
};

