import React, { Component } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from './Movies/MovieForm';
import axios from "axios";

let API_URL ="http://localhost:5000/api/movies"

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			moviesArray: [],
			savedList: [],
			loading: true
		};
	}

	addToSavedList = movie => {
		console.log(this.state.savedList);
		const savedList = this.state.savedList;
		savedList.push(movie);
		this.setState({ savedList });
	};

	addMovie = data => {
		axios
			.post(`${API_URL}`, data)
			.then(response => this.setState({ moviesArray: response.data }))
	}

	render() {
		return (
			<div>
				<SavedList list={this.state.savedList} />
				<MovieForm onSubmit={ this.addMovie } />
				<Route exact path="/" component={MovieList} />
				<Route
					path="/movies/:id"
					render={props => {
						return (
							<Movie
								{...props}
								addToSavedList={this.addToSavedList}
							/>
						);
					}}
				/>
			</div>
		);
	}
}
