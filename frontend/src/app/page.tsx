"use client"; 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';


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
              src=""
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
          src=""
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <h1 className="text-3xl font-bold mb-8">Музыка</h1>
      <h2 className="text-2xl font-semibold mb-6">Обзор</h2>
      <h3 className="text-xl font-semibold mb-4">Интересные теги</h3>
      <div className="grid mb-8">
        <a href="" className="grid-box">
          <Image src="" alt="Rap" />
        </a>
        <a href="" className="grid-box">
          <Image src="" alt="Punk" />
        </a>
        <a href="" className="grid-box">
          <Image src="" alt="Rock" />
        </a>
        <a href="" className="grid-box">
          <Image src="" alt="Jazz" />
        </a>
        <a href="" className="grid-box">
          <Image src="" alt="Hip-hop" />
        </a>
        <a href="" className="grid-box">
          <Image src="" alt="R&B" />
        </a>
        <a href="" className="grid-box">
          <Image src="" alt="Alternative" />
        </a>
        <a href="" className="grid-box">
          <Image src="" alt="Electronic" />
        </a>
        <a href="" className="grid-box">
          <Image src="" alt="Pop" />
        </a>
        <a href="" className="grid-box">
          <Image src="" alt="80's" />
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-8">Авторы</h1>
      <div className="flex-container mb-8">
        {authors.slice(0, 7).map((author) => (
          <div className="flex-box" key={author.id}>
            <Image className="flex-box__image" src="" alt={author.description} width={200} height={200} />
            <div className="flex-box__modal">
              <p>{author.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold mb-8">Последниие релизы</h1>
      <div className="group grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {albums.map((album) => (
          <a href="" key={album.id}>
            <div className="box album">
              <Image className="image" src="" alt={`Обложка ${album.name}`} width={200} height={200} />
              <p>{album.name}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}

