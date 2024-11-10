import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, movies: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const initialState = {
    movies: [],
    loading: true,
    error: '',
    searchTerm: '',
  };

  const [state, dispatch] = useReducer(movieReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });

    axios
      .get('http://www.omdbapi.com/?s=latest&type=movie&apikey=7896beaa')
      .then((response) => {
        if (response.data.Response === 'True') {
          dispatch({ type: 'FETCH_SUCCESS', payload: response.data.Search });
        } else {
          dispatch({ type: 'FETCH_ERROR', payload: '' });
        }
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch movies' });
      });
  }, []); 

  const handleSearch = (event) => {
    const query = event.target.value;
    dispatch({ type: 'SET_SEARCH_TERM', payload: query });

    if (query !== '') {
      dispatch({ type: 'SET_LOADING' });

      axios
        .get(`http://www.omdbapi.com/?s=${query}&type=movie&apikey=7896beaa`)
        .then((response) => {
          if (response.data.Response === 'True') {
            dispatch({ type: 'FETCH_SUCCESS', payload: response.data.Search });
          } else {
            dispatch({ type: 'FETCH_ERROR', payload: '' });
          }
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch movies' });
        });
    } else {
      dispatch({ type: 'SET_LOADING' });

      axios
        .get('http://www.omdbapi.com/?s=latest&type=movie&apikey=7896beaa')
        .then((response) => {
          if (response.data.Response === 'True') {
            dispatch({ type: 'FETCH_SUCCESS', payload: response.data.Search });
          }
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch movies' });
        });
    }
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Movie App</a>
        <div className="d-flex justify-content-between w-100">
          <ul className="navbar-nav ms-auto">
          </ul>
          <form className="d-flex">
          <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search for a movie"
                  aria-label="Search"
                  value={state.searchTerm}
                  onChange={handleSearch}
                />
          </form>
        </div>
      </div>
      </nav>
      
      <h3 className="my-4">Show your favorit Movies</h3>

      {state.loading && <p>Loading...</p>}

      {state.error && <p>{state.error}</p>}

      <div className="row">
        {state.movies.length > 0 ? (
          state.movies.map((movie) => (
            <div key={movie.imdbID} className="col-md-3 mb-4">
              <div className="card movie-card" style={{ height: '100%' }}>
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                  className="card-img-top movie-img"
                  alt={movie.Title}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">Year: {movie.Year}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No movies to display</p>
        )}
      </div>
    </div>
  );
};

export default App;
