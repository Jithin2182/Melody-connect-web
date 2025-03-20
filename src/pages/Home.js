import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const HomeContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const SongList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SongItem = styled.li`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background 0.3s;

  &:hover {
    background: #e2e6ea;
    transform: scale(1.02);
  }
`;

const SongLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-size: 1.1em;
  font-weight: bold;
  display: block;

  &:hover {
    color: #0056b3;
  }
`;

const Home = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
    // .get("http://localhost:5000/api/songs")
      .get("https://melody-connect-server.vercel.app/api/songs") // Fetch songs from backend
      .then((response) => setSongs(response.data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  return (
    <HomeContainer>
      <Title>Available Songs</Title>
      <SongList>
        {songs.map((song) => (
          <SongItem key={song._id}>
            <SongLink to={`/songs/${song._id}`}>
              {song.title} - {song.artist}
            </SongLink>
          </SongItem>
        ))}
      </SongList>
    </HomeContainer>
  );
};

export default Home;
