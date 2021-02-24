import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
	director: "",
	id: "",
	metascore: "",
	stars: [],
	title: "",
};

export default function UpdateMovie(props) {
	console.log("update", props);
	const [movie, setMovie] = useState(initialMovie);
	const history = useHistory();

	useEffect(() => {
		const movieToUpdate = props.movies.find((movie) => {
			return `${movie.id}` === props.match.params.id;
		});
		if (movieToUpdate) {
			setMovie(movieToUpdate);
		}
	}, [props.movies, props.match.params.id]);

	const changeHandler = (e) => {
		if (e.target.name === "stars") {
			setMovie({
				...movie,
				[e.target.name]: e.target.value.split(","),
			});
		} else {
			setMovie({
				...movie,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
			.then((res) => console.log(res.data), history.push(`/`))
			.finally(() => window.location.reload());
	};

	return (
		<div className="save-wrapper">
			<h2>Update Movie</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					onChange={changeHandler}
					placeholder="title"
					value={movie.title}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="director"
					value={movie.director}
				/>
				<div className="baseline" />

				<input
					type="number"
					name="metascore"
					onChange={changeHandler}
					placeholder="Metascore"
					value={movie.metascore}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="stars"
					onChange={changeHandler}
					placeholder="Stars"
					value={movie.stars}
				/>

				<button className="edit-button">Update</button>
			</form>
		</div>
	);
};
