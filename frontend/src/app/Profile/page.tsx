"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Button,
  Text,
  Image as ChakraImage,
  Input,
  HStack,
  Heading,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { Tag } from "@/components/ui/tag";
import { useUser } from "../components/UserContext";
import { FaPlay } from "react-icons/fa";

const UserProfilePage: React.FC = () => {
  const { user, avatar, setAvatar, fetchUserData } = useUser();
  const [username, setUsername] = useState<string>("");
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [recentTracks, setRecentTracks] = useState<string[]>([]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await fetchUserData();
        if (userData) {
          setUsername(userData.username || "");
          setFavoriteGenres(userData.favoriteGenres || []);
          setRecentTracks(userData.recentTracks || []);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    loadUserData();
  }, [fetchUserData]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newAvatar = URL.createObjectURL(file);
      setAvatar(newAvatar);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <VStack
      bg="linear-gradient(180deg, #1E1E2E 0%, #151521 100%)"
      color="white"
      minH="100vh"
      py={8}
      px={6}
      alignItems="center"
    >
      <Box
        bg="gray.800"
        p={10}
        rounded="xl"
        shadow="dark-lg"
        maxW="lg"
        w="full"
      >
        {/* Header */}
        <Flex justify="space-between" align="center" mb={8}>
          <Heading size="lg" color="teal.400">Your Profile</Heading>
          <Button colorScheme="teal" variant="solid" size="md" leftIcon={<FaPlay />}>Play All</Button>
        </Flex>

        {/* Avatar Section */}
        <VStack align="center">
          <Box position="relative" boxSize="140px">
            <ChakraImage
              src={avatar || "/default-avatar.png"}
              alt="User Avatar"
              boxSize="full"
              borderRadius="full"
              shadow="lg"
              border="4px solid teal"
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              position="absolute"
              inset={0}
              opacity={0}
              cursor="pointer"
              title="Change your avatar"
            />
          </Box>
          <Input
            value={username}
            onChange={handleUsernameChange}
            variant="filled"
            placeholder="Enter your username"
            fontSize="xl"
            fontWeight="bold"
            textAlign="center"
            colorScheme="teal"
            bg="gray.700"
            focusBorderColor="teal.400"
          />
        </VStack>

        {/* Favorite Genres Section */}
        <Box w="full" mt={8}>
          <Heading size="md" mb={4} color="teal.300">Favorite Genres</Heading>
          <SimpleGrid columns={[2, 3]} >
            {favoriteGenres.length > 0 ? (
              favoriteGenres.map((genre) => (
                <Tag key={genre} colorScheme="cyan" size="lg" textAlign="center">{genre}</Tag>
              ))
            ) : (
              <Text fontSize="sm" color="gray.400">No favorite genres added yet.</Text>
            )}
          </SimpleGrid>
        </Box>

        {/* Recently Played Section */}
        <Box w="full" mt={8}>
          <Heading size="md" mb={4} color="teal.300">Recently Played</Heading>
          <VStack align="stretch">
            {recentTracks.length > 0 ? (
              recentTracks.map((track, index) => (
                <Box
                  key={index}
                  bg="gray.700"
                  p={4}
                  rounded="md"
                  shadow="md"
                  _hover={{ bg: "teal.600" }}
                >
                  <Text fontSize="lg" color="white">{track}</Text>
                </Box>
              ))
            ) : (
              <Text fontSize="sm" color="gray.400">No recently played tracks available.</Text>
            )}
          </VStack>
        </Box>
      </Box>
    </VStack>
  );
};

export default UserProfilePage;



