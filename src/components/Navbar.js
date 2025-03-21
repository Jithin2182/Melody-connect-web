import React, { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { getAuth, signOut } from "firebase/auth";

// Styled Components
const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background: linear-gradient(135deg, #ff4d4d, #b30000);
  color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  margin: 10px;
`;

const WebsiteName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 20px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 250px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const SearchResults = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const ResultItem = styled.div`
  padding: 8px;
  cursor: pointer;
  color: black;
  &:hover {
    background: #f1f1f1;
  }
`;

const Dropdowns = styled.div`
  display: flex;
  gap: 10px;
`;

const Dropdown = styled.select`
  padding: 6px;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
`;

const AuthLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthButton = styled(Link)`
  padding: 8px 15px;
  background: white;
  color: #b30000;
  text-decoration: none;
  border-radius: 10px;
  font-weight: bold;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #f1f1f1;
    transform: scale(1.05);
  }
`;

const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoutButton = styled.button`
  padding: 6px 10px;
  border: none;
  background: #ff4d4d;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  border-radius: 10px;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #b30000;
    transform: scale(1.05);
  }
`;

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

  const API_URL = process.env.REACT_APP_BACKEND_URL || '';
  // console.log(API_URL)


  const handleSearch = debounce(async (query) => {
    if (!query) {
      setResults([]);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/songs?q=${query}`);
      setResults(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error searching songs", error);
    }
  }, 300);

  const isLoginOrRegisterPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <NavbarContainer>
      <WebsiteName>MyMusicApp</WebsiteName>

      {!isLoginOrRegisterPage && (
        <>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search for a song..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            {results.length > 0 && (
              <SearchResults>
                {results.map((song) => (
                  <ResultItem
                    key={song._id}
                    onClick={() => {
                      onSelectSong(song);
                      setQuery(song.title);
                      setResults([]);
                    }}
                  >
                    <strong>{song.title}</strong> by {song.artist}
                  </ResultItem>
                ))}
              </SearchResults>
            )}
          </SearchBar>

          <Dropdowns>
            <Dropdown
              value={displayOption}
              onChange={(e) => setDisplayOption(e.target.value)}
            >
              <option value="lyrics">Lyrics</option>
              <option value="chords">Chords</option>
            </Dropdown>

            <Dropdown
              value={selectedInstrument}
              onChange={(e) => setSelectedInstrument(e.target.value)}
            >
              <option value="guitar">Guitar</option>
              <option value="piano">Piano</option>
              <option value="ukulele">Ukulele</option>
            </Dropdown>

            <Dropdown
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
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
            </Dropdown>
          </Dropdowns>

          <AuthLinks>
            {user ? (
              <UserGreeting>
                Hi, {user.email}!
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </UserGreeting>
            ) : (
              <>
                <AuthButton to="/login">Login</AuthButton>
                <AuthButton to="/register">Register</AuthButton>
              </>
            )}
          </AuthLinks>
        </>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
