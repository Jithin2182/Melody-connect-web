import React, { useState, useEffect } from "react";
import Sanscript from "@sanskrit-coders/sanscript";
import styled from "styled-components";

// Styled Components
const SongContainer = styled.div`
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

// Side-by-side container for lyrics & transliteration
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  flex: 1;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Subtitle = styled.h4`
  color: #555;
  margin-bottom: 10px;
  text-align: center;
`;

const LyricsText = styled.pre`
  white-space: pre-wrap;
  font-size: 1.1em;
  background: #eef1f5;
  padding: 10px;
  border-radius: 5px;
  font-family: "Courier New", monospace;
  min-height: 200px;
`;

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
`;

const SongDetails = ({ song, selectedLanguage, displayOption, selectedInstrument }) => {
  const [transliteratedLyrics, setTransliteratedLyrics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to bold chords
  const boldChords = (text) => {
    if (!text) return "";
    return text.replace(/(\b[A-G](?:#|b)?(?:maj|min|m|dim|aug)?\d*\b)/g, "<strong>$1</strong>");
  };

  // Process lyrics and chords
  const processedLyrics = boldChords(song?.lyrics || "");
  const processedChords = boldChords(song?.chords?.[selectedInstrument] || "");

  // Handle transliteration automatically when selectedLanguage changes
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
      setError("Transliteration failed. Please ensure the lyrics are in ITRANS format.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedLanguage, song?.lyrics]);

  return (
    <SongContainer>
      <Title>{song?.title} - {song?.artist}</Title>

      {/* Side-by-Side Layout for Lyrics & Transliteration */}
      <ContentWrapper>
        {/* Lyrics or Chords Section */}
        <Section>
          <Subtitle>{displayOption === "lyrics" ? "Lyrics" : "Lyrics with Chords"}</Subtitle>
          <LyricsText
            dangerouslySetInnerHTML={{
              __html: displayOption === "lyrics" ? processedLyrics : processedChords,
            }}
          />
        </Section>

        {/* Transliteration Section */}
        <Section>
          <Subtitle>Transliterated Lyrics</Subtitle>
          {selectedLanguage === "none" ? (
            <p>Select a language to see transliterated lyrics.</p>
          ) : isLoading ? (
            <p>Transliterating...</p>
          ) : error ? (
            <ErrorText>{error}</ErrorText>
          ) : (
            <LyricsText>{transliteratedLyrics}</LyricsText>
          )}
        </Section>
      </ContentWrapper>
    </SongContainer>
  );
};

export default SongDetails;
