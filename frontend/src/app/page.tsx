"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion'; 

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
    // Запрос для авторов
    axios
      .get('http://localhost:1337/api/authors?populate=*&pagination[pageSize]=100000000')
      .then((response) => {
        const _authors = response.data.data.map((author: any) => ({
          id: author.id,
          description: author.attributes.Description,
          image: "http://localhost:1337" + author.attributes.Image.data.attributes.url,
        }));
        setAuthors(shuffleArray(_authors)); // Перемешиваем массив
      })
      .catch(error => console.error("Ошибка при загрузке авторов:", error));

    // Запрос для альбомов
    axios
      .get('http://localhost:1337/api/albums?populate=*')
      .then((response) => {
        const _albums = response.data.data.map((album: any) => ({
          id: album.id,
          name: album.attributes.Name,
          coverURL: 'http://localhost:1337' + album.attributes.Cover.data.attributes.url,
        }));
        setAlbums(_albums);
      })
      .catch(error => console.error("Ошибка при загрузке альбомов:", error));
  }, []);

  // Функция перемешивания массива
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Показать модальное окно с описанием
  const handleMouseEnter = (description: string) => {
    setModalContent(description);
    setModalVisible(true);
  };

  // Скрыть модальное окно
  const handleMouseLeave = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24">
      <div className="relative flex place-items-center w-full justify-center my-12">
        <Image
          className="dark:invert"
          src="/your-logo.png"
          alt="Your Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <h1 className="text-6xl font-bold mb-8 text-center">Музыка</h1>
      <h2 className="text-2xl font-semibold mb-6 text-center">Обзор</h2>

      <section className="mb-12">
        <h3 className="text-xl font-semibold mb-4 text-center">Интересные авторы</h3>
        <motion.div
          className="flex justify-center flex-wrap mb-8 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {authors.slice(0, 7).map((author) => (
            <motion.div
              className="flex flex-col items-center relative"
              key={author.id}
              onMouseEnter={() => handleMouseEnter(author.description)}
              onMouseLeave={handleMouseLeave}
              whileHover={{ scale: 1.1 }} // Анимация при наведении
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * author.id }}
            >
              <Image
                className="rounded-full"
                src={author.image}
                alt={author.description}
                width={200}
                height={200}
              />
              <p className="mt-2 text-center text-gray-700">{author.description}</p>
              {modalVisible && modalContent === author.description && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
                  <div className="bg-white p-4 rounded shadow-md">
                    <p className="text-black">{modalContent}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 text-center">Последние релизы</h3>
        <motion.div
          className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {albums.map((album) => (
            <Link href={`/albums/${album.id}`} key={album.id} className="flex flex-col items-center">
              <motion.div
                className="w-40 h-40 bg-gray-200 rounded overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }} // Увеличение обложки при наведении
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * album.id }}
              >
                <Image
                  className="object-cover"
                  src={album.coverURL}
                  alt={`Обложка ${album.name}`}
                  width={160}
                  height={160}
                />
              </motion.div>
              <p className="mt-2 text-center text-gray-700">{album.name}</p>
            </Link>
          ))}
        </motion.div>
      </section>
    </main>
  );
}


