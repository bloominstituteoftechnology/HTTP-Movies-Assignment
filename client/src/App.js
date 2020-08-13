import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import AddMovie from './Movies/AddMovie';
import axios from 'axios';
import UpdateMovie from './Movies/UpdateMovie';

const App = () => {
	const [savedList, setSavedList] = useState([]);
	const [movieList, setMovieList] = useState([]);

	const getMovieList = () => {
		axios
			.get('http://localhost:5000/api/movies')
			.then((res) => setMovieList(res.data))
			.catch((err) => console.log(err.response));
	};

	const addToSavedList = (movie) => {
		setSavedList([...savedList, movie]);
	};

	useEffect(() => {
		getMovieList();
	}, []);

	return (
		<>
			<SavedList list={savedList} />

			<Route exact path="/">
				<MovieList movies={movieList} />
			</Route>

			<Route path="/movies/:id">
				<Movie
					addToSavedList={addToSavedList}
					movieList={movieList}
					setMovieList={setMovieList}
				/>
			</Route>

			<Route
				path="/update-movie/:id"
				render={(props) => (
					<UpdateMovie
						{...props}
						movieList={movieList}
						setMovieList={setMovieList}
					/>
				)}
			/>

			<Route path="/add-movie">
				<AddMovie movieList={movieList} setMovieList={setMovieList} />
			</Route>
		</>
	);
};

export default App;
