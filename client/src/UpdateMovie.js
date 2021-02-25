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

	const { id } = useParams();
	const { push } = useHistory();
    console.log(props)
	const handleChange = (e) => {
		setMovie({
			...movie,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${id}`, movie)
			.then((res) => {
				props.setMovieList(res.data);
                console.log(res.data)
				
				setMovie({ ...movie });
			    window.location.href = "/movies"
			})
			.catch((err) => {
				console.log(err);
			});
	};


	return (
		<div>
			<h2>Update Movie</h2>
			<form>
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
					type="array"
					name="stars"
					onChange={handleChange}
					placeholder="stars"
					value={movie.stars}
				/>
				<div className="baseline" />
			</form>
			<button onClick={onSubmit}>Submit</button>
		</div>
	);
}
