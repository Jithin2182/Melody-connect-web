import React, { useState, useEffect } from "react";
import Sanscript from "@sanskrit-coders/sanscript";
import {
  Box,
  Heading,
  Flex,
  Text,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";

const SongDetails = ({
  song,
  selectedLanguage,
  displayOption,
  selectedInstrument,
}) => {
  const [transliteratedLyrics, setTransliteratedLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const bgColor = useColorModeValue("gray.700", "gray.700");
  const sectionBg = useColorModeValue("blue.600", "gray.600");
  const lyricsBg = useColorModeValue("gray.900", "gray.500");

  return (
    <Box p={6} borderRadius="md" bg={bgColor}>
      <Heading as="h2" size="lg" color={"gray.100"} textAlign="center" mb={6}>
        {song?.title} - {song?.artist}
      </Heading>

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={6}
        justify="space-between"
      >
        {/* Left: Lyrics/Chords Section */}
        <Box flex="1" bg={sectionBg} p={4} borderRadius="md" boxShadow="sm">
          <Heading as="h4" size="md" textAlign="center" mb={4} color="gray.200">
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
