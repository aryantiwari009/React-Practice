import { createContext, useState } from "react";

export const MovieContext = createContext();

function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <MovieContext.Provider value={{ movies, setMovies, query, setQuery, loading, setLoading, error, setError }}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider