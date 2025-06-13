import React from 'react'
import Header from './Header'
import useNowPlaying from '../hooks/useNowPlaying'
import usePopularMovies from '../hooks/usePopularMovies'
import useTopRatedMovies from '../hooks/useTopRatedMovies'   
import useUpcomingMovies from '../hooks/useUpcomingMovies'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const Browse = () => {
  // Fetch data and store in redux
  useNowPlaying();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies);
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);
  const upcomingMovies = useSelector((state) => state.movies.upcomingMovies);

  // Pick the first now playing movie for the hero section
  const heroMovie = nowPlayingMovies && nowPlayingMovies.length > 0 ? nowPlayingMovies[0] : null;

  return (
    <div className="browse-bg">
      <Header/>
      {heroMovie && (
        <div className="hero-section">
          <video
            className="hero-video-bg"
            src={`https://www.w3schools.com/html/mov_bbb.mp4`}
            autoPlay
            loop
            muted
            poster={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1 className="hero-title">{heroMovie.title}</h1>
            <p className="hero-overview">{heroMovie.overview}</p>
            <div className="hero-buttons">
              <button className="hero-btn hero-btn-play">▶ Play</button>
              <button className="hero-btn hero-btn-list">+ My List</button>
            </div>
          </div>
        </div>
      )}
      <div className="movie-lists-container">
        <MovieList title="Trending Now" movies={popularMovies} />
        <MovieList title="Top Rated" movies={topRatedMovies} />
        <MovieList title="Upcoming" movies={upcomingMovies} />
      </div>
    </div>
  )
}

export default Browse