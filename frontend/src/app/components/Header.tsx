"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';

interface HeaderProps {
  children: React.ReactNode;
  onBack: () => void;
  onForward: () => void;
}

const Header: React.FC<HeaderProps> = ({ children, onBack, onForward }) => {
  return (
    <header className="relative bg-gradient-to-tr from-purple-500 via-black to-gray-700 text-white">
      <nav className="relative z-10 flex items-center justify-between py-4 px-6">
        {/* Логотип или заголовок */}
        <Link
          href="/"
          className="relative text-2xl font-bold whitespace-nowrap hover:text-purple-300 transition-colors"
        >
          Your New Text
        </Link>

        {/* Меню навигации */}
        <ul className="hidden md:flex space-x-4">
          {['Lorem', 'Sit', 'Amet', 'Lorem', 'Ipsum', 'Dolar'].map((text, index) => (
            <li key={index}>
              <Link
                href="/"
                className="relative hover:text-purple-300 py-2 px-4 transition-all"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>

 
      </nav>

      {/* Основной контент заголовка */}
      <div className="relative flex flex-col items-center mt-8">
        <h1 className="text-6xl font-bold text-center">{children}</h1>
        <div className="mt-8">
          <Image
            src="/gen.gif"
            alt="Your GIF"
            width={200}
            height={150}
            className="rounded shadow-lg"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;



