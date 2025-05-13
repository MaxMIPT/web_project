import { Link } from "react-router-dom";

export default function FavoritesPage({ favorites, onRemoveFavorite }) {
  return (
    <div>
      <h1>Избранное</h1>
      <ul>
        {favorites.map((movie) => (
          <li key={movie.id} style={{ marginBottom: "10px" }}>
            <img
              src={movie.image}
              alt={movie.title}
              style={{ width: "50px", verticalAlign: "middle" }}
            />
            <Link to={`/movies/${movie.id}`} style={{ marginLeft: "10px" }}>
              {movie.title}
            </Link>
            <span style={{ marginLeft: "10px" }}>{movie.duration} мин.</span>
            <button
              onClick={() => onRemoveFavorite(movie.id)}
              style={{ marginLeft: "10px" }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
