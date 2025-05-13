import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <Link to="/">Все фильмы</Link>
      <Link to="/favorites">Избранное</Link>
      <button onClick={() => alert("Добавить фильм — пока не реализовано")}>
        Добавить фильм
      </button>
    </nav>
  );
}
