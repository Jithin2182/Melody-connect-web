import React from "react";
import {
  Box,
  Flex,
  Button,
  Text,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = ({ user }) => {
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

  const isLoginOrRegisterPage =
    location.pathname === "/login" || location.pathname === "/register";

  const bgGradient = useColorModeValue(
    "linear(to-r, blue.400, blue.700)",
    "linear(to-r, red.500, red.900)"
  );

  return (
    <Box
      as="nav"
      bgGradient={bgGradient}
      color="white"
      px={6}
      py={4}
      boxShadow="md"
      borderRadius="md"
      m={2}
    >
      <Flex align="center" justify="space-between" wrap="wrap">
        <Text fontSize="xl" fontWeight="bold">
          Melody-Connect
        </Text>

        {!isLoginOrRegisterPage && (
          <Flex align="center" gap={3}>
            {user ? (
              <Flex align="center" gap={2}>
                <Text>Hi, {user.email}!</Text>
                <Button
                  onClick={handleLogout}
                  size="sm"
                  colorScheme="red"
                  variant="solid"
                  borderRadius="md"
                >
                  Logout
                </Button>
              </Flex>
            ) : (
              <Flex gap={2}>
                <ChakraLink as={Link} to="/login">
                  <Button size="sm" bg="white" color="red.700" borderRadius="md">
                    Login
                  </Button>
                </ChakraLink>
                <ChakraLink as={Link} to="/register">
                  <Button size="sm" bg="white" color="red.700" borderRadius="md">
                    Register
                  </Button>
                </ChakraLink>
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};


export default Navbar;
