"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  LinkBox,
  LinkOverlay,
  Stack,
  Badge,
} from "@chakra-ui/react";

interface Song {
  id: number;
  name: string;
  coverUrl: string;
  songUrl: string;
}

interface Album {
  id: number;
  name: string;
  coverUrl: string;
}

interface AlbumResponseData {
  data: {
    id: number;
    attributes: {
      Name: string;
      Cover: {
        data: {
          attributes: {
            url: string;
          };
        };
      };
      songs: {
        data: Array<{
          id: number;
        }>;
      };
    };
  };
}

interface SongResponseData {
  data: {
    id: number;
    attributes: {
      Name: string;
      SongUrl: string;
    };
  };
}

const AlbumPage: React.FC = () => {
  const { id } = useParams();
  const albumId = Number(id);

  const [songs, setSongs] = useState<Song[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!albumId) return;

    const fetchData = async () => {
      try {
        const albumResponse = await axios.get<AlbumResponseData>(
          `http://localhost:1337/api/albums/${albumId}?populate=*`
        );
        const albumData = albumResponse.data.data.attributes;

        setAlbum({
          id: albumResponse.data.data.id,
          name: albumData.Name,
          coverUrl: `http://localhost:1337${albumData.Cover.data.attributes.url}`,
        });

        const songPromises = albumData.songs.data.map(async (rawSong) => {
          const songResponse = await axios.get<SongResponseData>(
            `http://localhost:1337/api/songs/${rawSong.id}?populate=*`
          );
          const song = songResponse.data.data;
          const songAttributes = song.attributes;
          return {
            id: song.id,
            name: songAttributes.Name,
            coverUrl: `http://localhost:1337${albumData.Cover.data.attributes.url}`,
            songUrl: `http://localhost:1337${songAttributes.SongUrl}`,
          };
        });

        const resolvedSongs = await Promise.all(songPromises);
        setSongs(resolvedSongs);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Ошибка загрузки данных альбома");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  return (
    <Box p={8} minH="100vh" bgGradient="linear(to-br, teal.900, blue.800)">
      {isLoading ? (
        <Center h="100vh">
          <Text color="white" fontSize="lg" fontWeight="semibold">
            Загрузка...
          </Text>
        </Center>
      ) : error ? (
        <Center h="100vh">
          <Text color="red.500" fontSize="lg" fontWeight="semibold">
            {error}
          </Text>
        </Center>
      ) : album !== null ? (
        <Box>
          <Flex direction="column" align="center" mb={16}>
            <Image
              src={album.coverUrl}
              alt={album.name}
              borderRadius="2xl"
              boxShadow="dark-lg"
              w={{ base: 64, md: 80 }}
              h={{ base: 64, md: 80 }}
              objectFit="cover"
            />
            <Heading as="h1" size="3xl" color="white" mt={8} textAlign="center">
              {album.name}
            </Heading>
            <Text color="white" fontSize="lg" mt={4}>
              В альбоме: {songs.length}
            </Text>
          </Flex>

          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 4 }}
            gap={12} // Увеличение отступов между карточками
          >
            {songs.map((song) => (
              <LinkBox
                as="article"
                key={song.id}
                bgGradient="linear(to-b, gray.700, gray.900)"
                borderRadius="xl"
                overflow="hidden"
                boxShadow="lg"
                transition="transform 0.5s, box-shadow 0.5s"
                _hover={{ transform: "scale(1.08)", boxShadow: "2xl" }}
              >
                <Image
                  src={song.coverUrl}
                  alt={song.name}
                  w="full"
                  h={{ base: 60, md: 72 }}
                  objectFit="cover"
                  borderTopRadius="xl"
                />
                <Box p={6} position="relative">
                  <Stack align="center" >
                    <Badge colorScheme="purple" px={4} py={1} borderRadius="md">
                      Слушать
                    </Badge>
                    <LinkOverlay
                      href={`/songs/${song.id}`}
                      fontSize="lg"
                      fontWeight="semibold"
                      color="white"
                     
                      textAlign="center"
                    >
                      {song.name}
                    </LinkOverlay>
                  </Stack>
                </Box>
              </LinkBox>
            ))}
          </SimpleGrid>
        </Box>
      ) : (
        <Center>
          <Text color="white" fontSize="xl">
            Альбом не найден
          </Text>
        </Center>
      )}
    </Box>
  );
};

export default AlbumPage;
