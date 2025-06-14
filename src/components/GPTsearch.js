import React, { useState, useRef } from 'react'
import Header from './Header'
import { GoogleGenAI } from "@google/genai";

const TMDB_API_KEY = "d5897c19f091e8576f1d10a58424efc5";

const GPTsearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const searchtext = useRef(null);

  const fetchTMDBMovie = async (title) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.results && data.results.length > 0 ? data.results[0] : null;
  };

  const fetchTrailer = async (movieId) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const trailer = data.results?.find(video => video.type === "Trailer" && video.site === "YouTube");
    return trailer ? trailer.key : null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMovies([]);
    setSelectedTrailer(null);

    try {
      const ai = new GoogleGenAI({ apiKey: "AIzaSyB830_p5SOgC7lWlQPaqNiBGnGL6Uir1Tw" });
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "act as a movie recommendation system and give me a movie name based on the following query: " + searchtext.current.value + ".only gives me names of 5 movie, comma seperated like the example 'movie1, movie2, movie3, movie4, movie5', ",
      });

      const movieTitles = response.text.split(',').map(title => title.trim());
      
      // Fetch TMDB data for each movie
      const moviePromises = movieTitles.map(title => fetchTMDBMovie(title));
      const movieResults = await Promise.all(moviePromises);
      
      // Filter out null results and add trailer keys
      const validMovies = movieResults.filter(movie => movie !== null);
      setMovies(validMovies);
    } catch (err) {
      setError("Failed to fetch movie recommendations. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayTrailer = async (movieId) => {
    try {
      const trailerKey = await fetchTrailer(movieId);
      if (trailerKey) {
        setSelectedTrailer(trailerKey);
      } else {
        setError("No trailer found for this movie.");
      }
    } catch (err) {
      setError("Failed to fetch trailer. Please try again.");
    }
  };

  const closeTrailer = () => {
    setSelectedTrailer(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">AI Movie Recommendations</h1>
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                ref={searchtext}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe what kind of movie you're looking for..."
                className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{movie.overview}</p>
                  <button
                    onClick={() => handlePlayTrailer(movie.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedTrailer && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
              <div className="relative w-full max-w-4xl">
                <button
                  onClick={closeTrailer}
                  className="absolute -top-10 right-0 text-white text-2xl hover:text-red-500"
                >
                  ✕
                </button>
                <iframe
                  width="100%"
                  height="500"
                  src={`https://www.youtube.com/embed/${selectedTrailer}?autoplay=1`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GPTsearch;