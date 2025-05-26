import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Heading,
  List,
  ListItem,
  Image,
  Text,
  Button,
  Flex,
  Link,
  HStack,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";

export default function FavoritesPage({ favorites, onRemoveFavorite }) {
  return (
    <Box>
      <Heading as="h1" mb={6} fontSize="2xl" fontWeight="medium">
        Избранное
      </Heading>
      <List spacing={5}>
        {favorites.map((movie) => (
          <ListItem key={movie.id}>
            <Flex align="center">
              <Image
                src={movie.image}
                alt={movie.title}
                boxSize="70px"
                borderRadius="full"
                objectFit="cover"
              />
              <Box ml={6}>
                <Link
                  as={RouterLink}
                  to={`/movies/${movie.id}`}
                  fontWeight="medium"
                  fontSize="lg"
                >
                  {movie.title}
                </Link>
                <HStack spacing={1} fontSize="md" color="gray.600" mt={1}>
                  <TimeIcon />
                  <Text>{movie.duration} мин.</Text>
                </HStack>
              </Box>
              <Button
                onClick={() => onRemoveFavorite(movie.id)}
                ml="auto"
                variant="ghost"
                color="gray.500"
                _hover={{ color: "red.500", bg: "transparent" }}
                fontWeight="normal"
              >
                Удалить
              </Button>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
