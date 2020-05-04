import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
	componentDidMount() {
		axios
			.get("http://localhost:5000/api/movies")
			.then(res => this.props.setMovies(res.data))
			.catch(err => console.log(err.response));
	}

	render() {
		return (
			<div className="movie-list">
				{this.props.movies.map(movie => (
					<MovieDetails
						key={movie.id}
						movie={movie}
						onEditMovie={this.props.onEditMovie(movie.id)}
						onDeleteMovie={this.props.onDeleteMovie(movie.id)}
					/>
				))}
			</div>
		);
	}
}

function MovieDetails({ movie, onEditMovie, onDeleteMovie }) {
	return (
		<>
			<Link to={`/movies/${movie.id}`}>
				<MovieCard movie={movie} />
			</Link>
			<button onClick={onEditMovie}>Edit</button>
			<button onClick={onDeleteMovie}>Delete</button>
		</>
	);
}