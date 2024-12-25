"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Box, Input, Button, VStack, HStack, Text, Heading, Image} from "@chakra-ui/react";
import { Tag } from "@/components/ui/tag";
import { List, ListItem } from "@chakra-ui/react";

interface SearchWithFiltersProps {
  setIsSearchOpen: (isOpen: boolean) => void;
  setFilteredSongs: (songs: Song[]) => void;
}

interface Song {
  id: number;
  songUrl: string;
  name: string;
  textSong: string | null;
  cover: string;
}

const SearchWithFilters: React.FC<SearchWithFiltersProps> = ({ setIsSearchOpen, setFilteredSongs }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const genres = ["Rock", "Pop", "Hip-Hop", "Jazz", "Classical"];
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Song[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get("http://localhost:1337/api/songs", {
        params: { search: query },
      });

      const suggestionData = response.data.data.map((data: any) => ({
        id: data.id,
        songUrl: `http://localhost:1337${data.attributes.Song.data.attributes.url}`,
        name: data.attributes.Name,
        textSong: data.attributes.TextSong || null,
        cover: `http://localhost:1337${data.attributes.Cover.data[0].attributes.url}`,
      }));

      setSuggestions(suggestionData);
    } catch (error) {
      console.error("Ошибка при получении предложений:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/songs", {
        params: {
          genres: selectedGenres.join(","),
          search: searchText,
        },
      });

      const filteredSongs = response.data.data.map((data: any) => ({
        id: data.id,
        songUrl: `http://localhost:1337${data.attributes.Song.data.attributes.url}`,
        name: data.attributes.Name,
        textSong: data.attributes.TextSong || null,
        cover: `http://localhost:1337${data.attributes.Cover.data[0].attributes.url}`,
      }));

      setFilteredSongs(filteredSongs);
      setIsSearchOpen(false);
    } catch (error) {
      console.error("Ошибка при фильтрации:", error);
    }
  };

  const handleReset = () => {
    setSelectedGenres([]);
    setSearchText("");
    setSuggestions([]);
    setFilteredSongs([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsSearchOpen]);

  return (
    <Box position="fixed" top="0" left="0" right="0" bottom="0" bg="blackAlpha.600" display="flex" alignItems="center" justifyContent="center" zIndex="overlay">
      <Box ref={modalRef} bg="gray.800" color="white" p={6} rounded="md" boxShadow="lg" maxW="lg" w="full">
        <Heading as="h2" size="lg" mb={4} textAlign="center">
          Фильтр поиска песен
        </Heading>
        <Input
          placeholder="Введите название трека"
          mb={4}
          bg="gray.700"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            fetchSuggestions(e.target.value);
          }}
        />
        {suggestions.length > 0 && (
          <List
            spacing={3}
            bg="gray.700"
            rounded="md"
            mb={4}
            maxH="150px"
            overflowY="auto"
            listStyleType="none"
          >
            {suggestions.map((song) => (
              <ListItem
                key={song.id}
                p={2}
                cursor="pointer"
                onClick={() => {
                  setSearchText(song.name);
                  setSuggestions([]);
                }}
                _hover={{ bg: "gray.600" }}
                _marker={{ color: "purple.500" }}
              >
                <HStack>
                  <Image src={song.cover} alt={song.name} boxSize="30px" mr={2} />
                  <Text>{song.name}</Text>
                </HStack>
              </ListItem>
            ))}
          </List>
        )}
        <VStack align="stretch" mb={6}>
          <Box>
            <Text fontSize="lg" mb={2}>Жанры</Text>
            <HStack wrap="wrap">
              {genres.map((genre) => (
                <Tag
                  key={genre}
                  bg={selectedGenres.includes(genre) ? "purple.500" : "gray.700"}
                  onClick={() => toggleGenre(genre)}
                  cursor="pointer"
                >
                  {genre}
                </Tag>
              ))}
            </HStack>
          </Box>
        </VStack>
        <HStack justify="space-between">
          <Button onClick={handleReset} colorScheme="red">Сбросить</Button>
          <Button onClick={handleSearch} colorScheme="blue">Искать</Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default SearchWithFilters;


