import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Link, Container, Button } from "@chakra-ui/react";

export default function Header({ onOpenCreate }) {
  return (
    <Box bg="white" px={4} py={2} position="sticky" top="0" zIndex="1000">
      <Container maxW="container.lg" px={4} py={2}>
        <Flex align="center">
          <Link
            as={RouterLink}
            to="/"
            fontWeight="normal"
            fontSize="sm"
            _active={{ color: "blue.600" }}
            _focus={{ boxShadow: "none", color: "blue.600" }}
            _hover={{ textDecoration: "none", color: "blue.600" }}
            mr={4}
          >
            Все фильмы
          </Link>
          <Link
            as={RouterLink}
            to="/favorites"
            fontWeight="normal"
            fontSize="sm"
            _active={{ color: "blue.600" }}
            _focus={{ boxShadow: "none", color: "blue.600" }}
            _hover={{ textDecoration: "none", color: "blue.600" }}
            mr={4}
          >
            Избранное
          </Link>
          <Button
            as={RouterLink}
            to="/create"
            variant="ghost"
            color="black"
            fontWeight="normal"
            fontSize="sm"
            _active={{ color: "blue.600" }}
            _focus={{ boxShadow: "none", color: "blue.600" }}
            _hover={{ textDecoration: "none", color: "blue.600" }}
            px={0}
          >
            Добавить фильм
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}
