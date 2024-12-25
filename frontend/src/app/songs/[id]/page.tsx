"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import ReactH5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlayerStore } from "../../store/playerStore";
import { IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Song {
  songUrl: string;
  name: string;
  textSong: string | null;
  cover: string;
}

const SongPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const setSongAtStore = usePlayerStore((state) => state.setSong);

  const [song, setSong] = useState<Song | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/songs/${id}?populate=*`);
        const data = response.data.data;

        if (!data) {
          setNotFound(true);
          return;
        }

        const songData: Song = {
          songUrl: "http://localhost:1337" + data.attributes.Song.data.attributes.url,
          name: data.attributes.Name,
          textSong: data.attributes.TextSong || null,
          cover: "http://localhost:1337" + data.attributes.Cover.data[0].attributes.url,
        };

        setSong(songData);
      } catch (error) {
        console.error("Error fetching song data:", error);
        setNotFound(true);
      }
    };

    fetchSong();
  }, [id]);

  if (notFound) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-red-700 text-white">
        <h1 className="text-4xl font-bold">Песня не найдена</h1>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cyan-900">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-cyan-900 to-blue-900 p-6 text-white">
      <h1 className="text-4xl font-extrabold mb-6 text-purple-400">{song.name}</h1>

      <div className="mb-6">
        <img
          src={song.cover}
          alt={song.name}
          className="w-40 h-40 rounded-xl shadow-lg object-cover border-4 border-purple-500"
        />
      </div>

      <div className="w-full max-w-lg">
        <ReactH5AudioPlayer
          src={song.songUrl}
          autoPlay={false}
          onPlay={() => setSongAtStore(song.songUrl)}
          showJumpControls={false}
          customAdditionalControls={[]}
          layout="horizontal-reverse"
          className="rounded-lg shadow-md bg-purple-700 text-white"
        />
      </div>

      <IconButton
        aria-label="Like song"
        icon={liked ? <FaHeart /> : <FaRegHeart />}
        onClick={() => setLiked(!liked)}
        colorScheme={liked ? "red" : "gray"}
        size="lg"
        mt={4}
      />

      {song.textSong && (
        <div className="mt-8 w-full max-w-3xl bg-purple-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Текст песни</h2>
          <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">{song.textSong}</p>
        </div>
      )}
    </div>
  );
};

export default SongPage;
