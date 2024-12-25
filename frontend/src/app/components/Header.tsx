"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { useUser } from "./UserContext";

const Header: React.FC = () => {
  const { avatar } = useUser();

  return (
    <header className="bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 text-white shadow-md py-4 px-8">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-wide text-white hover:text-gray-200 transition-colors">
           MusicApp
        </Link>

        {/* Navigation and User Section */}
        <div className="flex items-center gap-8">
         
          {/* Avatar (conditionally rendered) */}
          {avatar && (
            <Link href="/Profile">
              <Image
                src={avatar}
                alt="ㅤ"
                width={44}
                height={44}
                className="rounded-full border-2 border-white shadow-md hover:shadow-lg transition-shadow"
              />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;





