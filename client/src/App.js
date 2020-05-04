import React, { useState } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from "./Movies/MovieForm";

const moviesFormInitialState = {
	id: null,
	title: "",
	director: "",
	metascore: "",
	stars: ""
};

const App = (props) => {
	const [savedList, setSavedList] = useState([]);
	const [movies, setMovies] = useState([]);
	const [moviesForm, setMoviesForm] = useState(moviesFormInitialState);

	const addToSavedList = movie => {
		setSavedList([...savedList, movie]);
	};

	const onEditMovie = id => e => {
		setMoviesForm({
			...moviesForm,
			...movies.find(movie => movie.id === id)
		})
		props.history.push(`/update-movie/${id}`);
	}

	const onDeleteMovie = id => e => {
		axios
			.delete(`http://localhost:5000/api/movies/${id}`)
			.then(res => {
				setMovies(movies.filter(movie => movie.id !== id))
			})
			.catch(err => console.log(err.response));
	}

	const onMovieFormChange = e => {
		e.preventDefault();
		const input = {[e.target.name]: e.target.value};
		setMoviesForm({
			...moviesForm,
			...input
		})
	}

	const onSubmitMovie = e => {
		e.preventDefault();
		console.log("SUBMITIN", moviesForm)
		if (moviesForm.id !== null) {
			let stars = Array.isArray(moviesForm.stars) ? [ ...moviesForm.stars ] : [ ...moviesForm.stars.split(',') ];
			debugger;
			axios
				.put(`http://localhost:5000/api/movies/${moviesForm.id}`, { ...moviesForm, stars })
				.then(res => {
					setMoviesForm(moviesFormInitialState);
					props.history.push('/');
				})
				.catch(err => console.log(err.response));
		} else {
			// stretch
			const newMovie = {
				title: moviesForm.title,
				director: moviesForm.director,
				metascore: moviesForm.metascore,
				stars: [ ...moviesForm.stars.split(',') ]
			}
			axios
				.post(`http://localhost:5000/api/movies`, newMovie)
				.then(res => {
					debugger;
					setMoviesForm(moviesFormInitialState);
					setMovies(res.data)
					props.history.push('/');
				})
				.catch(err => console.log(err.response));
			props.history.push('/');
		}
	}

	return (
		<>
			<SavedList list={savedList} />
			<Route exact path="/" render={props => <MovieList
				{...props}
				setMovies={setMovies}
				movies={movies}
				onEditMovie={onEditMovie}
				onDeleteMovie={onDeleteMovie}
			/>}
			/>
			<Route
				path="/movies/:id"
				render={props => <Movie {...props} addToSavedList={addToSavedList} />}
			/>
			<Route
				path="/update-movie/:id"
				render={props => <MovieForm
					{...props}
					movies={movies.length}
					moviesForm={moviesForm}
					setMovies={setMovies}
					setMoviesForm={setMoviesForm}
					onMovieFormChange={onMovieFormChange}
					onSubmitMovie={onSubmitMovie}
				/>}
			/>
			<Route
				path="/add-movie"
				render={props => <MovieForm
					{...props}
					moviesForm={moviesForm}
					onMovieFormChange={onMovieFormChange}
					onSubmitMovie={onSubmitMovie}
				/>}
			/>
		</>
	);
};

export default withRouter(App);