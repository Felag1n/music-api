"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface UserContextProps {
  avatar: string;
  username: string;
  favoriteGenres: string[];
  recentTracks: string[];
  setAvatar: (avatar: string) => void;
  setUsername: (username: string) => void;
  setFavoriteGenres: (genres: string[]) => void;
  setRecentTracks: (tracks: string[]) => void;
  fetchUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatar, setAvatar] = useState<string>("/user-avatar.png");
  const [username, setUsername] = useState<string>("MusicLover");
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(["Rock", "Pop", "Jazz"]);
  const [recentTracks, setRecentTracks] = useState<string[]>([
    "Bohemian Rhapsody - Queen",
    "Shape of You - Ed Sheeran",
    "Blinding Lights - The Weeknd",
  ]);

  // Fetch user data from a server
  const fetchUserData = useCallback(async () => {
    try {
      // Пример запроса к серверу
      const response = await fetch("/api/user"); // Замените на ваш реальный API endpoint
      const data = await response.json();

      setAvatar(data.avatar || "/user-avatar.png");
      setUsername(data.username || "MusicLover");
      setFavoriteGenres(data.favoriteGenres || []);
      setRecentTracks(data.recentTracks || []);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        avatar,
        username,
        favoriteGenres,
        recentTracks,
        setAvatar,
        setUsername,
        setFavoriteGenres,
        setRecentTracks,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
