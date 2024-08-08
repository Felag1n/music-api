"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'; 

interface Author {
  id: number;
  description: string;
  image: string;
}

interface Album {
  id: number;
  name: string;
  coverURL: string;
}

export default function Home() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/authors?populate=*&pagination[pageSize]=100000000')
      .then((response) => {
        const _authors = response.data.data.map((author: any) => ({
          id: author.id,
          description: author.attributes.Description,
          image: "http://localhost:1337" + author.attributes.Image.data.attributes.url,
        }));
        setAuthors(shuffleArray(_authors));
      });

    axios
      .get('http://localhost:1337/api/albums?populate=*')
      .then((response) => {
        const _albums = response.data.data.map((album: any) => ({
          id: album.id,
          name: album.attributes.Name,
          coverURL: 'http://localhost:1337' + album.attributes.Cover.data.attributes.url,
        }));
        setAlbums(_albums);
      });
  }, []);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleMouseEnter = (description: string) => {
    setModalContent(description);
    setModalVisible(true);
  };

  const handleMouseLeave = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/next.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/your-logo.png"  
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <h1 className="text-6xl font-bold mb-8">Музыка</h1>
      <h2 className="text-2xl font-semibold mb-6">Обзор</h2>
      <h3 className="text-xl font-semibold mb-4">Интересные теги</h3>
      <div className="grid mb-8">
        <Link href="/genre/rap" className="grid-box">
          <Image src="" alt="Rap"/>
        </Link>
        <Link href="/genre/punk" className="grid-box">
          <Image src="" alt="Punk"  />
        </Link>
        <Link href="/genre/rock" className="grid-box">
          <Image src="" alt="Rock" />
        </Link>
        <Link href="/genre/jazz" className="grid-box">
          <Image src="" alt="Jazz"  />
        </Link>
        <Link href="/genre/hiphop" className="grid-box">
          <Image src="" alt="Hip-hop"  />
        </Link>
        <Link href="/genre/pop" className="grid-box">
          <Image src="" alt="Pop"  />
        </Link>
        <Link href="/genre/r&b" className="grid-box">
          <Image src="" alt="Hip-hop"  />
        </Link>
        <Link href="/genre/alternative" className="grid-box">
          <Image src="" alt="Hip-hop" />
        </Link>
        <Link href="/genre/80's" className="grid-box">
          <Image src="" alt="80's"  />
        </Link>
        <Link href="/genre/electronic" className="grid-box">
          <Image src="" alt="electronic"   />
        </Link>
        
      </div>

      <h1 className="text-center text-purple-500">Авторы</h1>
      <div className="flex justify-center flex-wrap mb-8 gap-4">
        {authors.slice(0, 7).map((author) => (
          <div
            className="flex flex-col items-center relative"
            key={author.id}
            onMouseEnter={() => handleMouseEnter(author.description)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className="rounded-full"
              src={author.image}
              alt={author.description}
              width={200}
              height={200}
            />
            <div className="mt-2 text-center">
              <p>{author.description}</p>
            </div>
            {modalVisible && modalContent === author.description && (
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-black p-4 rounded">
                  <p className="text-purple-500">{modalContent}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <h1 className="text-center text-white">Последниие релизы</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {albums.map((album) => (
          <Link href={`/albums/${album.id}`} key={album.id} className="flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded overflow-hidden shadow-lg">
              <img className="w-full h-full object-cover" src={album.coverURL} alt={`Обложка ${album.name}`} />
            </div>
            <p className="mt-2 text-center">{album.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
