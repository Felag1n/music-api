"use client";

import React, { useState } from "react";
import Image from "next/image";

const UserProfilePage: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>("/user-avatar.png");
  const [username, setUsername] = useState<string>("@johndoe");
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);

  const [tags, setTags] = useState<string[]>(["Music"]);
  const [newTag, setNewTag] = useState<string>("");

  const user = {
    name: "John Doe",
    bio: "Music lover. Dreamer. Avid playlist curator.",
    playlists: [
      { name: "My Top Hits", tracks: 25 },
      { name: "Relaxing Beats", tracks: 15 },
    ],
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleUsernameSave = () => {
    setIsEditingUsername(false);
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              className="rounded-full"
              src={avatar}
              alt={user.name}
              width={120}
              height={120}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Choose a new avatar"
            />
          </div>
          <h1 className="text-3xl font-bold mt-4">{user.name}</h1>

          {/* Никнейм с возможностью редактирования */}
          {isEditingUsername ? (
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-700 text-white rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={handleUsernameSave}
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 mt-2">
              <p className="text-purple-400">{username}</p>
              <button
                onClick={() => setIsEditingUsername(true)}
                className="text-gray-400 hover:text-gray-300 transition"
              >
                Edit
              </button>
            </div>
          )}

          <p className="text-gray-400 text-center mt-2">{user.bio}</p>

          {/* Секция тегов */}
          <div className="mt-4 w-full text-center">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">Tags</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-600 text-white px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-400 hover:text-red-300 ml-2"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Добавление нового тега */}
            <div className="flex items-center justify-center mt-4">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="bg-gray-700 text-white p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={handleAddTag}
                className="bg-purple-500 text-white px-4 py-2 rounded-r-lg hover:bg-purple-400 transition"
              >
                Add
              </button>
            </div>
          </div>
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





