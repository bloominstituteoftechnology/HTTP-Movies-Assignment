import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieForm = ({ match, movies, setMovies, moviesForm, setMoviesForm, onMovieFormChange, onSubmitMovie }) => {
	const fetchMovies = () => {
		axios
			.get("http://localhost:5000/api/movies")
			.then(res => {
				setMovies(res.data);
				let movie = res.data.find(mov => mov.id === Number(match.params.id));
				movie.stars = movie.stars.join(',');
				setMoviesForm(movie);
			})
			.catch(err => console.log(err.response));
	};
	if (movies < 1 && match.params.id !== 'add') {
		fetchMovies();
		return 'Loading...';
	}
	return (
		<form className="movie-form" onSubmit={onSubmitMovie}>
			<label htmlFor="title">Title</label>
			<input
				id="title"
				name="title"
				type="text"
				value={moviesForm.title}
				onChange={onMovieFormChange}
			/>
			<label htmlFor="director">Director</label>
			<input
				id="director"
				name="director"
				type="text"
				value={moviesForm.director}
				onChange={onMovieFormChange}
			/>
			<label htmlFor="metascore">Metascore</label>
			<input
				id="metascore"
				name="metascore"
				type="number"
				value={moviesForm.metascore}
				onChange={onMovieFormChange}
			/>
			<label htmlFor="stars">Stars</label>
			<input
				id="stars"
				name="stars"
				type="text"
				value={moviesForm.stars}
				onChange={onMovieFormChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default MovieForm;