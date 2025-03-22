"use client";
import React, { useEffect } from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import Lottie from "lottie-web";
import File from "./../assets/song.json";

export default function Banner() {
  let animate = React.createRef();

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: animate.current,
      animationData: File,
    });
    anim.setSpeed(2);
  }, []);
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 0 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "3xl", lg: "5xl" }}
          >
            <Text as={"span"} position={"relative"}>
              Let's connect with this
            </Text>
            <br />
            <Text as={"span"} color={"blue.400"}>
              Melody!
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            🎶 Melody-Connect is your personal music companion — search, sing,
            and strum with lyrics, chords, and transliteration support in your
            favorite languages, all in one place, absolutely free!
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"blue"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
            >
              🎶 Feel the Melody ✨
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box ref={animate} />
        </Flex>
      </Stack>
    </Container>
  );
}
