import { Link } from "react-router-dom";

export default function MainPage({ movies, onAddFavorite, favorites }) {
  return (
    <div>
      <h1>Главная страница</h1>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <img
              src={movie.image}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <h3>{movie.title}</h3>
            <p>
              {movie.genre} • {movie.duration} мин.
            </p>
            <Link to={`/movies/${movie.id}`}>
              <button>Подробнее</button>
            </Link>
            <button
              onClick={() => onAddFavorite(movie)}
              disabled={favorites.find((m) => m.id === movie.id)}
            >
              ☆
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
