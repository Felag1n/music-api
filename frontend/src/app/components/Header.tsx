import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProp {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProp> = ({ children }) => {
  return (
    <section className="text-center relative text-white bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700">
      <nav className="relative z-10">
        <div className="flex items-center flex-nowrap">
          
          <Link href="/" className="smky-btn3 relative hover:text-[#000000] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#8d498a] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-600 inline-block mr-4 text-2xl font-bold whitespace-nowrap">
            Felagin
          </Link>
          <div className="flex w-full justify-end">
            <ul className="flex flex-row">
              {['Lorem', 'Sit', 'Amet', 'Lorem', 'Ipsum', 'Dolar'].map((text, index) => (
                <li key={index} className="mx-2 py-2">
                  <Link href="/" className="smky-btn3 relative hover:text-[#000000] py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-[#73467c] after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-gray-600">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className="relative mt-16">
        <div className="table w-full h-full">
          <div className="table-cell align-middle">
            <h1 className="text-6xl">{children}</h1>
            <p className="text-lg font-light flex justify-center my-4"></p>
            <p className="flex justify-center mt-12">
              <Image src="next.svg" alt="Next.js Logo" className="max-w-full" width={600} height={400} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;

