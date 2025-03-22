import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Box } from "@chakra-ui/react";

import SongDetails from "./components/SongDetail";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDegGqTx32bRa8bsUzrWDyf45Zd5OJMw1c",
  authDomain: "chargehub-be195.firebaseapp.com",
  projectId: "chargehub-be195",
  storageBucket: "chargehub-be195.firebasestorage.app",
  messagingSenderId: "804966755394",
  appId: "1:804966755394:web:430656ce4b1267d46e51db",
  measurementId: "G-C9R0S99T3Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("none");
  const [displayOption, setDisplayOption] = useState("lyrics");
  const [selectedInstrument, setSelectedInstrument] = useState("guitar");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Box
        fontFamily="Arial, sans-serif"
        bg="gray.900"
        minH="100vh"
        p={5}
      >
        <Navbar
          user={user}
          onSelectSong={setSelectedSong}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          displayOption={displayOption}
          setDisplayOption={setDisplayOption}
          selectedInstrument={selectedInstrument}
          setSelectedInstrument={setSelectedInstrument}
        />

        <Box
          maxW="1000px"
          mx="auto"
          mt={5}
          bg="white"
          borderRadius="md"
          boxShadow="md"
        >
          <Routes>
            {user ? (
              <>
                <Route
                  path="/"
                  element={
                    <SongDetails
                      song={selectedSong}
                      selectedLanguage={selectedLanguage}
                      displayOption={displayOption}
                      selectedInstrument={selectedInstrument}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            )}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
