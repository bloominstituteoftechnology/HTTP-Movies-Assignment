import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateMovie from "./UpdateMovie";
import AddMovie from "./Movies/AddMovie";

const App = () => {
	const [savedList, setSavedList] = useState([]);
	const [movieList, setMovieList] = useState([]);

	const getMovieList = () => {
		axios
			.get("http://localhost:5000/api/movies")
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
		<div>
			<SavedList list={savedList} />

			<Route exact path="/">
				<MovieList movies={movieList} />
			</Route>

			<Route exact path="/movies/:id">
				<Movie addToSavedList={addToSavedList} />
			</Route>
			<Route
				exact
				path="/update-movie/:id"
				render={(props) => {
					return (
						<UpdateMovie {...props} setMovieList={setMovieList} />
					);
				}}
			/>
			<Route
				exact
				path="/add-movie "
				render={(props) => {
					return <AddMovie {...props} setMovieList={setMovieList} />;
				}}
			/>
		</div>
	);
};

export default App;
