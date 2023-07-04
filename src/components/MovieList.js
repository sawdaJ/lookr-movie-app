import React from 'react';

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <div className="movie-list">
      {props.movies.map((movie, index) => (
        <div className="movie-card" key={index}>
          <img src={movie.Poster} alt="movie" className="movie-card-image" />
          <div
            onClick={() => props.handleFavouritesClick(movie)}
            className="movie-card-actions"
          >
            <FavouriteComponent />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;

