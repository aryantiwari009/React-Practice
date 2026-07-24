import { useState,useContext } from "react";
import { Link } from "react-router-dom";
import { MovieContext } from "./MovieContext";

function SearchPage() {
  const {
    movies,
    setMovies,
    query,
    setQuery,
    loading,
    setLoading,
    error,
    setError,
  } = useContext(MovieContext);

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
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-red-600/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-450px w-450px rounded-full bg-indigo-600/20 blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20">
        <div className="text-center">
          <h1 className="mt-8 text-6xl md:text-7xl font-black leading-tight">
            Discover
            <span className="block bg-linear-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
              Amazing Movies
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Explore thousands of movies instantly using the OMDb database.
            Search your favourite films, discover classics, and dive into
            detailed information.
          </p>
        </div>

        {/* Search */}

        <div className="mx-auto mt-14 flex max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(query);
                setQuery("");
              }
            }}
            placeholder="Search movies..."
            className="flex-1 bg-transparent px-7 py-5 text-lg outline-none placeholder:text-slate-500"
          />

          <button
            onClick={() => {
              handleSearch(query);
              setQuery("");
            }}
            className="rounded-r-2xl bg-linear-to-r from-red-600 to-red-500 px-10 font-semibold transition hover:scale-105"
          >
            Search
          </button>
        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-10 flex justify-center">
            <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/10 px-8 py-4 backdrop-blur-xl">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
              Searching movies...
            </div>
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-10 flex justify-center">
            <div className="rounded-xl border border-red-500 bg-red-500/10 px-8 py-5 text-red-400">
              {error}
            </div>
          </div>
        )}

        {/* Results */}

        {/* Movie Grid */}
        {movies.length > 0 && (
          <div className="mt-20">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Search Results</h2>

              <span className="rounded-full bg-white/10 px-5 py-2 text-slate-300">
                {movies.length} Movies
              </span>
            </div>

            <div className="grid auto-rows-fr gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movies.map((movie) => (
                <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-3 hover:border-red-500 hover:shadow-[0_20px_60px_rgba(239,68,68,0.25)]">
                    {/* Image */}
                    <div className="relative aspect-2/3 overflow-hidden">
                      <img
                        src={
                          movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://placehold.co/500x750/111827/ffffff?text=No+Image"
                        }
                        alt={movie.Title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>

                      {/* IMDb Badge */}
                      <div className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black shadow-lg">
                        IMDb
                      </div>

                      {/* Hover Button */}
                      <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                        ▶
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h2 className="line-clamp-2 min-h-64px text-xl font-bold leading-8">
                          {movie.Title}
                        </h2>

                        <p className="mt-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-slate-300">
                          📅 {movie.Year}
                        </p>
                      </div>

                      <button className="mt-6 w-full rounded-xl bg-linear-to-r from-red-600 to-red-500 py-3 font-semibold transition-all duration-300 hover:from-red-500 hover:to-red-400 hover:shadow-lg">
                        View Details →
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty */}

        {!loading && movies.length === 0 && !error && (
          <div className="mt-32 text-center">
            <div className="text-8xl">🎬</div>

            <h2 className="mt-6 text-4xl font-bold">Search Any Movie</h2>

            <p className="mt-4 text-slate-400">
              Enter a movie name above and discover thousands of titles.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default SearchPage;
