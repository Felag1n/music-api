"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Header: React.FC = () => {
  return (
    <header className="relative bg-gray-900 text-white shadow-lg py-4 px-6">
      <nav className="flex justify-between items-center">
        {/* Логотип и навигация */}
        <Link href="/" className="text-2xl font-bold text-purple-400 hover:text-purple-500 transition-colors">
          MusicApp
        </Link>

        <ul className="hidden md:flex items-center space-x-8">
          {/* Здесь можно добавить дополнительные пункты меню */}
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
    </header>
  );
};

export default Header;




