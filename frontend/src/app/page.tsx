"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Text,
  Heading,
  Grid,
  Center,
  VStack,
  Button,
} from "@chakra-ui/react";
import { motion, HTMLMotionProps } from "framer-motion";
import Modal from "react-modal";

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

interface Genre {
  id: number;
  name: string;
  coverURL: string;
}

type MotionBoxProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

const MotionDiv: React.FC<MotionBoxProps> = motion.div;

export default function Home() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authorsResponse = await axios.get(
          "http://localhost:1337/api/authors?populate=*&pagination[pageSize]=100000000"
        );
        const _authors = authorsResponse.data.data.map((author: any) => ({
          id: author.id,
          description: author.attributes.Description,
          image: `http://localhost:1337${author.attributes.Image.data.attributes.url}`,
        }));
        setAuthors(shuffleArray(_authors));

        const albumsResponse = await axios.get(
          "http://localhost:1337/api/albums?populate=*"
        );
        const _albums = albumsResponse.data.data.map((album: any) => ({
          id: album.id,
          name: album.attributes.Name,
          coverURL: `http://localhost:1337${album.attributes.Cover.data.attributes.url}`,
        }));
        setAlbums(_albums);

        const genreResponse = await axios.get(
          "http://localhost:1337/api/genres?populate=*"
        );
        const _genres = genreResponse.data.data.map((genre: any) => ({
          id: genre.id,
          name: genre.attributes.Name,
          coverURL: `http://localhost:1337${genre.attributes.Cover.data.attributes.url}`,
        }));
        console.log(_genres)
        setGenres(_genres);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const shuffleArray = <T extends any[]>(array: T): T => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray as T;
  };

  const handleMouseEnter = (description: string) => {
    setModalContent(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const AuthorCard: React.FC<{ author: Author }> = ({ author }) => (
    <MotionDiv
      whileHover={{ scale: 1.05 }}
      style={{ cursor: "pointer" }}
      onClick={() => handleMouseEnter(author.description)}
    >
      <Box
        width="150px"
        height="150px"
        borderRadius="full"
        overflow="hidden"
        boxShadow="lg"
        bg="gray.800"
      >
        <Image
          src={author.image}
          alt={author.description}
          width={150}
          height={150}
          style={{ objectFit: "cover" }}
        />
      </Box>
    </MotionDiv>
  );

  const AlbumCard: React.FC<{ album: Album }> = ({ album }) => (
    <Link href={`/albums/${album.id}`} passHref>
      <MotionDiv whileHover={{ scale: 1.05 }}>
        <Box
          width="120px"
          height="120px"
          borderRadius="md"
          overflow="hidden"
          boxShadow="md"
          bg="gray.700"
        >
          <Image
            src={album.coverURL}
            alt={`Cover ${album.name}`}
            width={120}
            height={120}
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Text mt={2} textAlign="center" fontWeight="medium" color="gray.300">
          {album.name}
        </Text>
      </MotionDiv>
    </Link>
  );

  const GenreCard: React.FC<{ genre: Genre }> = ({ genre }) => (
    <MotionDiv whileHover={{ scale: 1.05 }} key={genre.id}>
      <Box
        width="150px"
        height="150px"
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
        bg="gray.700"
      >
        <Image
          src={genre.coverURL}
          alt={`Cover ${genre.name}`}
          width={150}
          height={150}
          style={{ objectFit: "cover" }}
        />
      </Box>
      <Text mt={2} textAlign="center" fontWeight="medium" color="gray.300">
        {genre.name}
      </Text>
    </MotionDiv>
  );

  return (
    <Box minH="100vh" bgGradient="linear(to-b, purple.700, indigo.900)" color="white" p={6}>
      <Center mb={12}>
        <Image src="/your-logo.png" alt="Your Logo" width={180} height={37} priority />
      </Center>

      <VStack mb={10}>
        <Heading as="h1" size="2xl" textAlign="center">
          Музыка
        </Heading>
        <Text fontSize="xl" textAlign="center" opacity={0.8}>
          Обзор
        </Text>
      </VStack>

      <Box mb={12}>
        <Heading as="h3" size="lg" textAlign="center" mb={6}>
          Интересные авторы
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={6} justifyItems="center">
          {authors.slice(0, 7).map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </Grid>
      </Box>

      <Box mb={12}>
        <Heading as="h3" size="lg" textAlign="center" mb={6}>
          Последние релизы
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(120px, 1fr))" gap={6} justifyItems="center">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </Grid>
      </Box>

      <Box>
        <Heading as="h3" size="lg" textAlign="center" mb={6}>
          Жанры
        </Heading>
        <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={6} justifyItems="center">
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </Grid>
      </Box>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#2D3748",
            color: "white",
            width: "80%",
            maxWidth: "500px",
          },
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        }}
      >
        <Box>
          <Heading size="md" mb={4}>
            Описание Автора
          </Heading>
          <Text>{modalContent}</Text>
          <Button mt={4} onClick={closeModal}>
            Закрыть
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
