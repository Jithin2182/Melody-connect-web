import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
`;

const Card = styled.div`
  width: 400px;
  background: var(--card-background);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2), 0px 6px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transform: perspective(1000px) rotateX(5deg);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: perspective(1000px) rotateX(10deg);
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.3), 0px 10px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  color: var(--text-color);
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px inset rgba(255, 255, 255, 0.6); /* Inset border effect */
  border-radius: 8px;
  font-size: 1rem;
  background: var(--card-background);
  color: var(--text-color);
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: red; /* Highlight effect */
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: red;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: darkred;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;


const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-top: 15px;
  color: var(--link-color);
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home after signup
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Register</Title>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignUp}>Sign up</Button>
        {error && <ErrorText>{error}</ErrorText>}
        <StyledLink to="/login">Already a user? Login here</StyledLink>
      </Card>
    </Container>
  );
};

export default Register;
