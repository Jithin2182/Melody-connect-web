import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  // const bg = useColorModeValue("blue.10", "gray.800");
  const cardBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="radial( yellow.50 30% , blue.600)"
      px={4}
    >
      <Box
        bg={cardBg}
        p={8}
        rounded="xl"
        boxShadow="2xl"
        w={{ base: "100%", sm: "400px" }}
        backdropFilter="blur(10px)"
      >
        <Heading textAlign="center" mb={6} color="blue.800">
          Welcome Back 👋
        </Heading>

        <FormControl mb={4}>
          <FormLabel color="blue.900">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            bg="white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          />
        </FormControl>

        <FormControl mb={6}>
          <FormLabel color="blue.900">Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            bg="white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          />
        </FormControl>

        {error && (
          <Text color="red.500" textAlign="center" mb={4}>
            {error}
          </Text>
        )}

        <Button
          colorScheme="blue"
          w="100%"
          size="lg"
          onClick={handleSignIn}
          mb={4}
        >
          Sign In
        </Button>

        <Text fontSize="sm" textAlign="center">
          New here?{" "}
          <ChakraLink as={Link} to="/register" color="blue.700" fontWeight="bold">
            Create an account
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
