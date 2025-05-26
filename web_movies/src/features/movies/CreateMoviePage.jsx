import { useNavigate } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
import MovieForm from "./MovieForm";

export default function CreateMoviePage({ onAddMovie }) {
  const navigate = useNavigate();

  const handleAdd = (movieData) => {
    onAddMovie(movieData);
    navigate("/");
  };

  return (
    <Box>
      <Heading mb={4}>Добавить фильм</Heading>
      <MovieForm onSave={handleAdd} submitLabel="Добавить фильм" />
    </Box>
  );
}
