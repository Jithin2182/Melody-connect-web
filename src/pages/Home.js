import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const API_URL = process.env.REACT_APP_BACKEND_URL || "";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/songs`)
      .then((response) => setSongs(response.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const containerBg = useColorModeValue("white", "gray.700");
  const songItemBg = useColorModeValue("gray.100", "gray.600");
  const hoverBg = useColorModeValue("gray.200", "gray.500");

  return (
    <Box
      mx="auto"
      mt={10}
      borderRadius="md"
      boxShadow="0px 4px 10px rgba(232, 3, 3, 0.88)"
      bg={containerBg}
    >
      <Heading as="h1" size="xl" textAlign="center" mb={6} color="gray.700">
        Available Songs
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
        {songs.map((song) => (
          <Box
            key={song._id}
            p={4}
            bg={songItemBg}
            borderRadius="md"
            boxShadow="md"
            transition="all 0.2s"
            _hover={{ bg: hoverBg, transform: "scale(1.02)" }}
          >
            <ChakraLink
              as={RouterLink}
              to={`/songs/${song._id}`}
              fontWeight="bold"
              fontSize="lg"
              color="blue.500"
              _hover={{ color: "blue.700", textDecoration: "none" }}
              display="block"
            >
              {song.title} - {song.artist}
            </ChakraLink>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
