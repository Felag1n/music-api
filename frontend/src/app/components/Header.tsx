"use client"; 

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { useRouter } from 'next/router';

interface HeaderProp {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProp> = ({ children }) => {
  // const router = useRouter();

  return (
    <header className="text-center relative text-white bg-gradient-to-tr from-purple-500 via-black to-gray-700">
      <nav className="relative z-10">
        <div className="flex items-center flex-nowrap">
          <Link href="/" passHref>
            <a className="smky-btn3 relative hover:text-[#000000] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#8d498a] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-600 inline-block mr-4 text-2xl font-bold whitespace-nowrap">
              Your New Text
            </a>
          </Link>
          <div className="flex w-full justify-end">
            <ul className="flex flex-row">
              {['Lorem', 'Sit', 'Amet', 'Lorem', 'Ipsum', 'Dolar'].map((text, index) => (
                <li key={index} className="mx-2 py-2">
                  <Link href="/" passHref>
                    <a className="smky-btn3 relative hover:text-[#000000] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#73467c] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-600">
                      {text}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="fixed bottom-0 left-0 flex h-48 w-auto items-end justify-center space-x-2 bg-gradient-to-t from-white via-white dark:from-black dark:via-black">
              <button
                // onClick={() => router.back()}
                className="rounded-full bg-purple-500 flex items-center justify-center hover:opacity-75 transition"
              >
                <RxCaretLeft className="text-white" size={35} />
              </button>
              <button
                // onClick={() => router.forward()}
                className="rounded-full bg-purple-500 flex items-center justify-center hover:opacity-75 transition"
              >
                <RxCaretRight className="text-white" size={35} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="relative mt-16">
        <div className="table w-full h-full">
          <div className="table-cell align-middle">
            <h1 className="text-6xl">{children}</h1>
            <p className="text-lg font-light flex justify-center my-4"></p>
            <p className="flex justify-center mt-12">
              <Image src="/gen.gif" alt="Your GIF" className="flex flex-row" width={200} height={150} />
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


