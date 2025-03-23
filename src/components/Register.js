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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");

  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Failed to register. Please check your details.");
    }
  };

  const bg = useColorModeValue("blue.50", "gray.800");
  const cardBg = useColorModeValue("whiteAlpha.900", "whiteAlpha.100");

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient="radial( pink.50 30% , blue.600)"
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
          Create Account 🎵
        </Heading>

        <FormControl mb={4}>
          <FormLabel color="blue.900">UserName</FormLabel>
          <Input
            type="userName"
            placeholder="Enter your Username"
            bg="white"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel color="blue.900">Mobile</FormLabel>
          <Input
            type="mobile"
            placeholder="+91 xxxxx xxxx"
            bg="white"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
          />
        </FormControl>

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
            placeholder="Create a password"
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
          onClick={handleSignUp}
          mb={4}
        >
          Sign Up
        </Button>

        <Text fontSize="sm" textAlign="center">
          Already have an account?{" "}
          <ChakraLink as={Link} to="/login" color="blue.700" fontWeight="bold">
            Log in here
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default Register;
