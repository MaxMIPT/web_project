import { useParams, useNavigate } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";
import MovieForm from "./MovieForm";

export default function EditMoviePage({ movies, onUpdateMovie }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id.toString() === id);

  if (!movie) return <Box>Фильм не найден</Box>;

  const handleSave = (updatedData) => {
    let updatedMovie = { ...updatedData };

    if (updatedData.imageFile) {
      updatedMovie.image = URL.createObjectURL(updatedData.imageFile);
    } else {
      updatedMovie.image = movie.image;
    }

    onUpdateMovie(movie.id, updatedMovie);
    navigate("/");
  };

  return (
    <Box>
      <Heading mb={4}>Редактировать фильм</Heading>
      <MovieForm
        initialData={movie}
        onSave={handleSave}
        submitLabel="Сохранить"
      />
    </Box>
  );
}
