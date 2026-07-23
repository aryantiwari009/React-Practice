import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([null]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function fetchDetail(id) {
      try {
        let response = await fetch(
          `http://www.omdbapi.com/?apikey=c6d331f5&i=${id}`,
        );

        let data = await response.json();

        if (data.Response === "False") setError("Something Went Wrong.");
        else setMovie(data);
      } catch (e) {
        setError("Something Went Wrong.");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail(id);
  }, []);

  return (
  <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white">
    {/* Background Glow */}
    <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-red-600/20 blur-[120px]" />
    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-24">
          <div className="flex items-center gap-4 rounded-full bg-white/10 px-8 py-4 backdrop-blur-xl">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
            <span className="text-lg">Loading movie...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex justify-center mt-20">
          <div className="rounded-xl border border-red-500 bg-red-500/20 px-8 py-5 text-red-400">
            {error}
          </div>
        </div>
      )}

      {!loading && !error && movie && (
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Poster */}
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://placehold.co/500x750/1e293b/ffffff?text=No+Image"
                }
                alt={movie.Title}
                className="w-380px object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Movie Details */}
          <div>

            <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold">
              ⭐ IMDb {movie.imdbRating}
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight">
              {movie.Title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-lg bg-white/10 px-4 py-2">
                📅 {movie.Year}
              </span>

              <span className="rounded-lg bg-white/10 px-4 py-2">
                🎬 {movie.Runtime}
              </span>

              <span className="rounded-lg bg-white/10 px-4 py-2">
                🎭 {movie.Genre}
              </span>

            </div>

            <p className="mt-8 text-lg leading-8 text-slate-300">
              {movie.Plot}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
                <h3 className="text-sm uppercase tracking-wider text-slate-400">
                  Director
                </h3>
                <p className="mt-2 text-lg font-semibold">
                  {movie.Director}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
                <h3 className="text-sm uppercase tracking-wider text-slate-400">
                  Writer
                </h3>
                <p className="mt-2 text-lg font-semibold">
                  {movie.Writer}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
                <h3 className="text-sm uppercase tracking-wider text-slate-400">
                  Actors
                </h3>
                <p className="mt-2 text-lg font-semibold">
                  {movie.Actors}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg">
                <h3 className="text-sm uppercase tracking-wider text-slate-400">
                  Language
                </h3>
                <p className="mt-2 text-lg font-semibold">
                  {movie.Language}
                </p>
              </div>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-5">

              <div className="rounded-xl bg-linear-to-r from-red-600 to-red-500 p-5 text-center shadow-xl">
                <p className="text-sm uppercase text-red-100">
                  IMDb Votes
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {movie.imdbVotes}
                </h2>
              </div>

              <div className="rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 p-5 text-center shadow-xl">
                <p className="text-sm uppercase text-blue-100">
                  Awards
                </p>

                <h2 className="mt-2 text-lg font-bold">
                  {movie.Awards}
                </h2>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  </div>
);
};

export default MoviePage;
