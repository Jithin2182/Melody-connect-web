import React, { useState, useEffect, useCallback, useRef } from "react";
import Sanscript from "@sanskrit-coders/sanscript";
import axios from "axios";
import { debounce } from "lodash";
import Lottie from "lottie-web";
import musicNotes from "../assets/musicNotes.json";
import {
  Box,
  Heading,
  Flex,
  Text,
  Spinner,
  Input,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

const SongDetails = ({
  song,
  onSelectSong,
  selectedLanguage,
  setSelectedLanguage,
  displayOption,
  setDisplayOption,
  selectedInstrument,
  setSelectedInstrument,
}) => {
  const [transliteratedLyrics, setTransliteratedLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const lyricsAnimRef = useRef(null);
  const chordsAnimRef = useRef(null);

  const handleSearch = useCallback(
    debounce(async (query) => {
      if (!query) return setResults([]);
      try {
        const response = await axios.get(`https://melody-connect-server-snwz.onrender.com/api/songs?q=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error("Error searching songs", error);
      }
    }, 300),
    []
  );

  const boldChords = (text) => {
    if (!text) return "";
    return text.replace(
      /(\b[A-G](?:#|b)?(?:maj|min|m|dim|aug)?\d*\b)/g,
      "<strong>$1</strong>"
    );
  };

  const processedLyrics = boldChords(song?.lyrics || "");
  const processedChords = boldChords(song?.chords?.[selectedInstrument] || "");

  useEffect(() => {
    if (selectedLanguage === "none" || !song?.lyrics) {
      setTransliteratedLyrics("");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const itransText = Sanscript.t(song.lyrics, "itrans", "itrans");
      const result = Sanscript.t(itransText, "itrans", selectedLanguage);
      setTransliteratedLyrics(result);
    } catch (error) {
      console.error("Transliteration error:", error);
      setError(
        "Transliteration failed. Please ensure the lyrics are in ITRANS format."
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedLanguage, song?.lyrics]);

  useEffect(() => {
    const container = displayOption === "lyrics" ? lyricsAnimRef.current : chordsAnimRef.current;
    const animationData = displayOption === "lyrics" ? musicNotes : musicNotes;

    if (!container) return;

    const anim = Lottie.loadAnimation({
      container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData,
    });

    anim.setSpeed(1.5);

    return () => anim.destroy();
  }, [displayOption]);

  const sectionBg = useColorModeValue("blue.400", "gray.600");
  const lyricsBg = useColorModeValue("gray.900", "gray.500");

  return (
    <Box p={6} borderRadius="md">
      {/* 🔍 Filters & Search Row */}
      <Flex
        mb={6}
        wrap="wrap"
        gap={3}
        align="center"
        justify="center"
        direction={{ base: "column", md: "row" }}
      >
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
                  <Text fontWeight="bold" color={"black"}>
                    {song.title}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    by {song.artist}
                  </Text>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Select
          value={displayOption}
          onChange={(e) => setDisplayOption(e.target.value)}
          borderRadius="md"
          bg="white"
          color="black"
          w="150px"
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
          w="150px"
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
          w="200px"
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

      <Heading as="h2" size="lg" color={"gray.800"} textAlign="center" mb={6}>
        {song?.title} - {song?.artist}
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={6}
        justify="space-between"
      >
        {/* Left: Lyrics or Chords Section with Animation */}
        <Box position="relative" flex="1" bg={sectionBg} p={4} borderRadius="md" boxShadow="sm">
          <Box
            ref={displayOption === "lyrics" ? lyricsAnimRef : chordsAnimRef}
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={1}
            opacity={0.3}
            pointerEvents="none"
          />
          <Heading
            as="h4"
            size="md"
            textAlign="center"
            mb={4}
            color="gray.200"
            position="relative"
            zIndex={2}
          >
            {displayOption === "lyrics" ? "Lyrics" : "Lyrics with Chords"}
          </Heading>
          <Box
            bg={lyricsBg}
            p={3}
            color={"white"}
            borderRadius="md"
            minH="200px"
            fontFamily="'Courier New', monospace"
            whiteSpace="pre-wrap"
            dangerouslySetInnerHTML={{
              __html:
                displayOption === "lyrics" ? processedLyrics : processedChords,
            }}
            position="relative"
            zIndex={2}
          />
        </Box>

        {/* Right: Transliteration */}
        <Box flex="1" bg={sectionBg} p={4} borderRadius="md" boxShadow="sm">
          <Heading as="h4" size="md" textAlign="center" mb={4} color="gray.700">
            Transliterated Lyrics
          </Heading>
          {selectedLanguage === "none" ? (
            <Text textAlign="center">
              Select a language to see transliterated lyrics.
            </Text>
          ) : isLoading ? (
            <Flex justify="center">
              <Spinner color="red.500" />
            </Flex>
          ) : error ? (
            <Text color="red.500" fontWeight="bold" textAlign="center">
              {error}
            </Text>
          ) : (
            <Box
              bg={lyricsBg}
              p={3}
              color={"white"}
              borderRadius="md"
              minH="200px"
              fontFamily="'Courier New', monospace"
              whiteSpace="pre-wrap"
            >
              {transliteratedLyrics}
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default SongDetails;
