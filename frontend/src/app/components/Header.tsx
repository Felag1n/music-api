"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';

interface HeaderProps {
  children: React.ReactNode;
  onBack: () => void;
  onForward: () => void;
}

const Header: React.FC<HeaderProps> = ({ children, onBack, onForward }) => {
  return (
    <header className="relative bg-gray-900 text-white shadow-lg py-4 px-6">
      <nav className="flex justify-between items-center">
        {/* Логотип и навигация */}
        <Link href="/" className="text-2xl font-bold text-purple-400 hover:text-purple-500 transition-colors">
          MusicApp
        </Link>

        <ul className="hidden md:flex items-center space-x-8">
          
        </ul>

        {/* Управление пользователем */}
        <div className="flex items-center gap-4">
          <button className="relative">
            <IoMdNotificationsOutline size={28} className="hover:text-purple-400 transition" />
            <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <Link href="/Profile" className="flex items-center gap-2 hover:text-purple-400 transition">
            <BiUser size={28} />
            <span className="hidden md:block">Profile</span>
          </Link>
          <Link href="/Profile">
            <Image
              src="/profile-pic.jpg" // Замените на изображение пользователя
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        </div>
      </nav>

      {/* Основной контент заголовка */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center space-x-4">
          
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">{children}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;



