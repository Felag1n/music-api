"use client";

import React from "react";
import Image from "next/image";

const UserProfilePage: React.FC = () => {
  const user = {
    name: "John Doe",
    username: "@johndoe",
    bio: "Music lover. Dreamer. Avid playlist curator.",
    avatar: "/user-avatar.png", // Путь к изображению пользователя (замените на свое изображение)
    playlists: [
      { name: "My Top Hits", tracks: 25 },
      { name: "Relaxing Beats", tracks: 15 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full"
            src={user.avatar}
            alt={user.name}
            width={120}
            height={120}
          />
          <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
          <p className="text-purple-400">{user.username}</p>
          <p className="text-gray-400 text-center mt-2">{user.bio}</p>
        </div>

        {/* Плейлисты пользователя */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Playlists</h2>
          {user.playlists.length === 0 ? (
            <p className="text-gray-400">No playlists yet.</p>
          ) : (
            <ul className="space-y-4">
              {user.playlists.map((playlist, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition"
                >
                  <div>
                    <p className="text-lg">{playlist.name}</p>
                    <p className="text-gray-400">{playlist.tracks} tracks</p>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300">
                    View
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;


