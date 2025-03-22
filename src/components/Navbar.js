import React, { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import {
  Box,
  Flex,
  Input,
  Select,
  Button,
  Text,
  VStack,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = ({
  onSelectSong,
  selectedLanguage,
  setSelectedLanguage,
  displayOption,
  setDisplayOption,
  selectedInstrument,
  setSelectedInstrument,
  user,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const API_URL = process.env.REACT_APP_BACKEND_URL || "";

  const handleSearch = debounce(async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(`/api/songs?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error searching songs", error);
    }
  }, 300);

  const isLoginOrRegisterPage =
    location.pathname === "/login" || location.pathname === "/register";

  const bgGradient = useColorModeValue(
    "linear(to-r, blue.400, blue.700)",
    "linear(to-r, red.500, red.900)"
  );

  return (
    <Box
      as="nav"
      bgGradient={bgGradient}
      color="white"
      px={6}
      py={4}
      boxShadow="md"
      borderRadius="md"
      m={2}
    >
      <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
        <Text fontSize="xl" fontWeight="bold">
          Melody-Connect
        </Text>

        {!isLoginOrRegisterPage && (
          <>
            <Box position="relative" w="250px">
              <Input
                placeholder="Search for a song..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
                borderRadius="full"
                bg="white"
                color="black"
              />
              {results.length > 0 && (
                <Box
                  position="absolute"
                  top="40px"
                  left="0"
                  w="100%"
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  maxH="200px"
                  overflowY="auto"
                  zIndex="dropdown"
                >
                  {results.map((song) => (
                    <Box
                      key={song._id}
                      px={3}
                      py={2}
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => {
                        onSelectSong(song);
                        setQuery(song.title);
                        setResults([]);
                      }}
                    >
                      <Text fontWeight="bold" color={"black"} >{song.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        by {song.artist}
                      </Text>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            <Flex gap={2}>
              <Select
                value={displayOption}
                onChange={(e) => setDisplayOption(e.target.value)}
                borderRadius="md"
                bg="white"
                color="black"
              >
                <option value="lyrics">Lyrics</option>
                <option value="chords">Chords</option>
              </Select>

              <Select
                value={selectedInstrument}
                onChange={(e) => setSelectedInstrument(e.target.value)}
                borderRadius="md"
                bg="white"
                color="black"
              >
                <option value="guitar">Guitar</option>
                <option value="piano">Piano</option>
                <option value="ukulele">Ukulele</option>
              </Select>

              <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                borderRadius="md"
                bg="white"
                color="black"
              >
                <option value="none">None</option>
                <option value="devanagari">Hindi/Sanskrit</option>
                <option value="bengali">Bengali</option>
                <option value="tamil">Tamil</option>
                <option value="telugu">Telugu</option>
                <option value="gujarati">Gujarati</option>
                <option value="kannada">Kannada</option>
                <option value="malayalam">Malayalam</option>
                <option value="gurmukhi">Punjabi</option>
              </Select>
            </Flex>

            <Flex align="center" gap={3}>
              {user ? (
                <Flex align="center" gap={2}>
                  <Text>Hi, {user.email}!</Text>
                  <Button
                    onClick={handleLogout}
                    size="sm"
                    colorScheme="red"
                    variant="solid"
                    borderRadius="md"
                  >
                    Logout
                  </Button>
                </Flex>
              ) : (
                <Flex gap={2}>
                  <ChakraLink as={Link} to="/login">
                    <Button size="sm" bg="white" color="red.700" borderRadius="md">
                      Login
                    </Button>
                  </ChakraLink>
                  <ChakraLink as={Link} to="/register">
                    <Button size="sm" bg="white" color="red.700" borderRadius="md">
                      Register
                    </Button>
                  </ChakraLink>
                </Flex>
              )}
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
