import React, { useState } from "react";
import "./MovieList.css";

const TMDB_API_KEY = "d5897c19f091e8576f1d10a58424efc5";

const MovieList = ({ title, movies }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  // Fetch the trailer for a movie from TMDB
  const fetchTrailer = async (movieId) => {
    setLoadingTrailer(true);
    setTrailerKey(null);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await res.json();
      // Find the first YouTube trailer
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerKey(null);
      }
    } catch (e) {
      setTrailerKey(null);
    }
    setLoadingTrailer(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTrailerKey(null);
  };

  if (!movies) return null;

  return (
    <div className="movie-section">
      <h2 className="section-title">{title}</h2>
      <div className="movie-list">
        {movies.map((movie, idx) => (
          <div className="movie-card" key={movie.id}>
            <span className="movie-rank">{idx + 1}</span>
            <div className="movie-poster-container">
              <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-poster-overlay">
                <button
                  className="play-trailer-btn"
                  onClick={() => fetchTrailer(movie.id)}
                >
                  ▶ Play Trailer
                </button>
              </div>
            </div>
            <div className="movie-title">{movie.title}</div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="trailer-modal-bg" onClick={closeModal}>
          <div className="trailer-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeModal}>✖</button>
            {loadingTrailer ? (
              <div className="trailer-loading">Loading...</div>
            ) : trailerKey ? (
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="trailer-not-found">Trailer not found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList; 