import axios from "axios";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const initialMovie = {
	id: Date.now(),
	title: "",
	director: "",
	metascore: "",
	stars: [],
};

export default function UpdateMovie(props) {
	const [movie, setMovie] = useState(initialMovie);
    console.log(props)
	const { id,params } = useParams();
	const { push } = useHistory();
 
	const handleChange = (e) => {
		e.persist();
		setMovie({
			...movie,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http:localhost:5000/api/movies/${params.id}`, movie)
			.then((res) => {
                console.log(res)
				props.setMovieList(res.data);
				console.log(res.data);
				setMovie({ ...movie });
				push("/movies");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<h2>Update Movie</h2>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="title"
					onChange={handleChange}
					placeholder="title"
					value={movie.title}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="director"
					onChange={handleChange}
					placeholder="Director"
					value={movie.director}
				/>
				<div className="baseline" />

				<input
					type="number"
					name="metascore"
					onChange={handleChange}
					placeholder="metascore"
					value={movie.metascore}
				/>
				<div className="baseline" />

				<div className="baseline" />

				<input
					type="string"
					name="stars"
					onChange={handleChange}
					placeholder="stars"
					value={movie.stars}
				/>
				<div className="baseline" />
			</form>
		</div>
	);
}
