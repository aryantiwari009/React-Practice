import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSearch(query) {
    setLoading(true);
    setError(null);
    try {
      let res = await fetch(
        `http://www.omdbapi.com/?apikey=c6d331f5&s=${query}`,
      );
      let data = await res.json();
      if (data.Response === "False") {
        setError("Movie not found.");
        setMovies([]);
      } else {
        setMovies(data.Search);
      }
    } catch (error) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
            🎬 Movie Explorer
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Search and discover your favorite movies instantly.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="flex w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-full overflow-hidden shadow-2xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(query) && setQuery("")}
              type="text"
              placeholder="Search for a movie..."
              className="flex-1 bg-transparent px-6 py-4 text-lg outline-none placeholder:text-slate-400"
            />

            <button
              onClick={() => {
                handleSearch(query);
                setQuery("");
              }}
              className="px-8 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all duration-300 font-semibold"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-lg">
              <div className="w-5 h-5 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg">Searching Movies...</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex justify-center mb-8">
            <div className="bg-red-500/15 border border-red-500 text-red-400 px-6 py-4 rounded-xl">
              {error}
            </div>
          </div>
        )}

        {/* Movie Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:scale-105 hover:border-red-500 transition-all duration-300 shadow-xl"
            >
              <div className="overflow-hidden">
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://placehold.co/400x600/1e293b/ffffff?text=No+Image"
                  }
                  alt={movie.Title}
                  className="w-full h-380px object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-4">
                <h2 className="font-bold text-lg line-clamp-2">
                  {movie.Title}
                </h2>

                <p className="text-slate-400 mt-2">📅 {movie.Year}</p>

                <button className="mt-4 w-full py-2 rounded-lg bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && movies.length === 0 && !error && (
          <div className="text-center mt-24">
            <div className="text-8xl mb-4">🍿</div>
            <h2 className="text-3xl font-bold">
              Find Your Next Favorite Movie
            </h2>
            <p className="text-slate-400 mt-3">
              Search from thousands of movies using the OMDb API.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
