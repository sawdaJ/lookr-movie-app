import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from '../components/MovieList';
import MovieListHeading from '../components/MovieListHeading';
import SearchBox from '../components/SearchBox';
import AddFavourites from '../components/AddFavourites';
import RemoveFavourites from '../components/RemoveFavourites';
import { FiSun, FiMoon } from 'react-icons/fi';
import lightLogo from '../assets/light-logo.png';
import darkLogo from '../assets/dark-logo.png';
import '../App.css'


const MoviePage = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModeChange = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };


	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a6aae4cd`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
    <div className='app'> 
    <div className='navbar'>
      <div className='logo'>
        <img className="logo" src={isDarkMode ? darkLogo : lightLogo} alt="Logo" />
      </div>
      <div className="right-section">
        <div className="mode-switch" onClick={handleModeChange}>
          {isDarkMode ? <FiSun /> : <FiMoon />}
        </div>
        <div className='search-bar'>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>
      </div>
    </div>
    <div className='movie-list'>
      <MovieList
        movies={movies}
        handleFavouritesClick={addFavouriteMovie}
        favouriteComponent={AddFavourites}
      />
    </div>
          <div className='heading'>
      <MovieListHeading heading='Favourites' />
    </div>
          <div className='movie-list'>
      <MovieList
        movies={favourites}
        handleFavouritesClick={removeFavouriteMovie}
        favouriteComponent={RemoveFavourites}
      />
    </div>


  </div>
	);
};

export default MoviePage;
