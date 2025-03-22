import { Box } from "@chakra-ui/react";
import React from "react";
import SongDetails from "../components/SongDetail";
import Banner from "../components/Banner";

const Home = ({
  song,
  onSelectSong,
  selectedLanguage,
  setSelectedLanguage,
  displayOption,
  setDisplayOption,
  selectedInstrument,
  setSelectedInstrument,
}) => {
  return (
    <Box>
      <Banner />
      <Box
        maxW="1000px"
        mx="auto"
        mt={5}
        bg="white"
        borderRadius="md"
        boxShadow="md"
      >
        <SongDetails
          song={song}
          onSelectSong={onSelectSong}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          displayOption={displayOption}
          setDisplayOption={setDisplayOption}
          selectedInstrument={selectedInstrument}
          setSelectedInstrument={setSelectedInstrument}
        />
      </Box>
    </Box>
  );
};

export default Home;
