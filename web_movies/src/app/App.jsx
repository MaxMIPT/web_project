import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../layouts/Layout";
import MainPage from "../pages/MainPage";
import FavoritesPage from "../features/favorites/FavoritesPage";
import MoviePage from "../features/movies/MoviePage";
import sampleMovies from "../features/movies/sampleMovies";
import CreateMoviePage from "../features/movies/CreateMoviePage";
import EditMoviePage from "../features/movies/EditMoviePage";

export default function App() {
  const [movies, setMovies] = useState(sampleMovies);
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (movie) => {
    if (!favorites.find((m) => m.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((m) => m.id !== id));
  };

  const handleUpdateMovie = (id, updatedData) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, ...updatedData } : movie
      )
    );
  };

  const handleCreateMovie = (newMovieData) => {
    const newId = Math.max(0, ...movies.map((m) => m.id)) + 1;

    const newMovie = {
      id: newId,
      title: newMovieData.title,
      genre: newMovieData.genre,
      description: newMovieData.description || "",
      duration: newMovieData.duration || 0,
      image: "",
    };

    if (newMovieData.imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newMovie.image = reader.result;
        setMovies((prev) => [...prev, newMovie]);
      };
      reader.readAsDataURL(newMovieData.imageFile);
    } else {
      setMovies((prev) => [...prev, newMovie]);
    }
  };

  const handleRemoveMovie = (id) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <MainPage
                  movies={movies}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  favorites={favorites}
                />
              }
            />
            <Route
              path="favorites"
              element={
                <FavoritesPage
                  favorites={favorites}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              }
            />
            <Route
              path="create"
              element={
                <CreateMoviePage
                  movies={movies}
                  onAddMovie={handleCreateMovie}
                />
              }
            />
            <Route
              path="movies/:id"
              element={
                <MoviePage
                  movies={movies}
                  favorites={favorites}
                  onAddFavorite={handleAddFavorite}
                  onRemoveFavorite={handleRemoveFavorite}
                  onUpdateMovie={handleUpdateMovie}
                  onRemoveMovie={handleRemoveMovie}
                />
              }
            />
            <Route
              path="movies/:id/edit"
              element={
                <EditMoviePage
                  movies={movies}
                  onUpdateMovie={handleUpdateMovie}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
