import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Checkbox,
  CheckboxGroup,
  IconButton,
  Stack,
  Flex,
  LinkBox,
  LinkOverlay,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { StarIcon, TimeIcon } from "@chakra-ui/icons";

export default function MainPage({
  movies,
  onAddFavorite,
  onRemoveFavorite,
  favorites,
}) {
  const allGenres = Array.from(new Set(movies.map((m) => m.genre)));
  const [selectedGenres, setSelectedGenres] = useState(allGenres);

  const genreColors = {
    Боевик: { text: "orange.500", bg: "orange.100" },
    Триллер: { text: "green.500", bg: "green.100" },
    Комедия: { text: "blue.500", bg: "blue.100" },
    Драма: { text: "gray.800", bg: "gray.200" },
  };

  const filteredMovies =
    selectedGenres.length === 0
      ? []
      : movies.filter((movie) => selectedGenres.includes(movie.genre));

  return (
    <Box>
      <Flex
        justify="space-between"
        align="center"
        mb={4}
        flexWrap="wrap"
        gap={4}
        position="sticky"
        top="60px"
        bg="white"
        zIndex="10"
        padding="8px 16px"
        boxShadow="sm"
      >
        <Heading as="h1">Фильмы</Heading>
        <CheckboxGroup
          colorScheme="teal"
          value={selectedGenres}
          onChange={setSelectedGenres}
        >
          <HStack spacing={4}>
            {allGenres.map((genre) => (
              <Checkbox
                key={genre}
                value={genre}
                sx={{
                  ".chakra-checkbox__control": {
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    borderWidth: "2px",
                    borderColor: genreColors[genre]?.text || "gray.500",
                  },
                  ".chakra-checkbox__control[data-checked]": {
                    bg: genreColors[genre]?.text || "gray.500",
                    borderColor: genreColors[genre]?.text || "gray.500",
                  },
                  ".chakra-checkbox__icon": {
                    color: "white",
                    fontSize: "16px",
                  },
                }}
              >
                <Text ml={2}>{genre}</Text>
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>
      </Flex>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {filteredMovies.map((movie) => {
          const isFavorite = favorites.find((m) => m.id === movie.id);
          return (
            <LinkBox
              as="article"
              key={movie.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              _hover={{ boxShadow: "md", cursor: "pointer" }}
            >
              <Image
                src={movie.image}
                alt={movie.title}
                borderRadius="md"
                mb={3}
              />
              <Stack spacing={2}>
                <Heading as="h3" size="md">
                  <LinkOverlay as={RouterLink} to={`/movies/${movie.id}`}>
                    {movie.title}
                  </LinkOverlay>
                </Heading>

                <HStack align="center">
                  <Box
                    px={3}
                    py={1}
                    fontSize="sm"
                    borderRadius="full"
                    color={genreColors[movie.genre]?.text || "gray.600"}
                    bg={genreColors[movie.genre]?.bg || "gray.100"}
                  >
                    {movie.genre}
                  </Box>
                  <Spacer />
                  <HStack spacing={1} fontSize="sm" color="gray.600">
                    <TimeIcon />
                    <Text>{movie.duration} мин.</Text>
                  </HStack>
                  <Spacer />
                  <IconButton
                    icon={<StarIcon />}
                    aria-label="Добавить или удалить из избранного"
                    variant="ghost"
                    color={isFavorite ? "yellow.400" : "gray.400"}
                    _hover={{ color: isFavorite ? "yellow.500" : "gray.600" }}
                    fontSize="1.2rem"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFavorite) {
                        onRemoveFavorite(movie.id);
                      } else {
                        onAddFavorite(movie);
                      }
                    }}
                  />
                </HStack>
              </Stack>
            </LinkBox>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
