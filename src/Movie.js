import React from 'react';

const Movie = ({ movie }) => {
  return (
    <div className="movie-item card mb-4">
      <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">{movie.Year}</p>
      </div>
    </div>
  );
};

export default Movie;
