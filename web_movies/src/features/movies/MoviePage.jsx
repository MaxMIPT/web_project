import { useParams } from "react-router-dom";

export default function MoviePage({ movies, onAddFavorite, favorites }) {
  const { id } = useParams();
  const movie = movies.find((m) => m.id.toString() === id);
  if (!movie) return <div>Фильм не найден</div>;

  const isFavorite = favorites.find((m) => m.id === movie.id);

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.image} alt={movie.title} style={{ width: "300px" }} />
      <p>Жанр: {movie.genre}</p>
      <p>Продолжительность: {movie.duration} минут</p>
      <p>Описание фильма будет здесь.</p>
      <button onClick={() => onAddFavorite(movie)} disabled={isFavorite}>
        Добавить в избранное
      </button>
    </div>
  );
}
