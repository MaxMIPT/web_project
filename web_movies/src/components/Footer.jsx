import { Box, Container, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      position="fixed"
      bottom="0"
      left="0"
      width="100%"
      height="60px"
      bg="black"
      color="white"
      display="flex"
      alignItems="center"
      px="16px"
      fontWeight="normal"
      fontSize="sm"
      zIndex="20"
    >
      <Container maxW="container.lg">
        <Box>Фильмограф</Box>
      </Container>
    </Box>
  );
}
