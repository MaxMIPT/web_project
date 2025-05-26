import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  Stack,
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export default function MoviePage({
  movies,
  onAddFavorite,
  onUpdateMovie,
  onRemoveFavorite,
  onRemoveMovie,
  favorites,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id.toString() === id);
  const { isOpen, onOpen } = useDisclosure();

  if (!movie) return <Box>Фильм не найден</Box>;

  const isFavorite = favorites.find((m) => m.id === movie.id);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSave = (updatedData) => {
    onUpdateMovie(movie.id, updatedData);
  };

  const handleDelete = () => {
    if (confirm(`Удалить фильм "${movie.title}"?`)) {
      onRemoveMovie(movie.id);
      navigate("/");
    }
  };

  return (
    <Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={6}
        align="flex-start"
      >
        <Image
          src={movie.image}
          alt={movie.title}
          borderRadius="md"
          maxW={{ base: "100%", md: "300px" }}
          objectFit="cover"
        />

        <Box flex="1" position="relative" w="100%">
          <IconButton
            icon={<StarIcon />}
            color={isFavorite ? "yellow.400" : "gray.400"}
            variant="ghost"
            fontSize="1.5rem"
            aria-label="Добавить в избранное"
            position="absolute"
            top={0}
            right={0}
            _hover={{ color: isFavorite ? "yellow.500" : "gray.600" }}
            onClick={() => {
              if (isFavorite) {
                onRemoveFavorite(movie.id);
              } else {
                onAddFavorite(movie);
              }
            }}
          />

          <Stack spacing={3} pr={8}>
            <Heading as="h2" size="lg">
              {movie.title}
            </Heading>
            <Text fontSize="md" color="gray.600">
              {movie.genre} • {movie.duration || "—"} мин.
            </Text>
            <Text>{movie.description || "Описание фильма отсутствует."}</Text>
          </Stack>

          <Flex
            justify="flex-end"
            mt={6}
            gap={3}
            direction={isMobile ? "column" : "row"}
          >
            <Button
              variant="ghost"
              colorScheme="blue"
              _hover={{ bg: "blue.50" }}
              onClick={() => navigate(`/movies/${movie.id}/edit`)}
            >
              Редактировать
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              _hover={{ bg: "blue.50" }}
              onClick={handleDelete}
            >
              Удалить
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
