import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import MainPage from "../pages/MainPage";
import FavoritesPage from "../features/favorites/FavoritesPage";
import MoviePage from "../features/movies/MoviePage";
import sampleMovies from "../features/movies/sampleMovies";

export default function App() {
  const [favorites, setFavorites] = useState([]);

  const handleAddFavorite = (movie) => {
    if (!favorites.find((m) => m.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter((m) => m.id !== id));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              movies={sampleMovies}
              onAddFavorite={handleAddFavorite}
              favorites={favorites}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              onRemoveFavorite={handleRemoveFavorite}
            />
          }
        />
        <Route
          path="/movies/:id"
          element={
            <MoviePage
              movies={sampleMovies}
              onAddFavorite={handleAddFavorite}
              favorites={favorites}
            />
          }
        />
      </Routes>
    </Router>
  );
}
