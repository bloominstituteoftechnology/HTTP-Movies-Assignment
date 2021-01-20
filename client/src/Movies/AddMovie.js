import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function UpdateMovie() {
	const [item, setItem] = useState({
		id: '',
		title: '',
		director: '',
		metascore: '',
		stars: []
	});

	const { push } = useHistory();

	const handleChange = e => {
		setItem({
			...item,
			[e.target.name]: e.target.value
		});
	};

	const addMovie = e => {
		e.preventDefault();
		const formatter = {
			...item,
			id: Date.now(),
			stars: item.stars.split(', ')
		};
		axios
			.post('http://localhost:5000/api/movies', formatter)
			.then(res => {
				console.log(res);
				push('/');
			})
			.catch(err => console.log(err));
	};

	return (
		<div className="update__form__container">
			<form onSubmit={addMovie}>
				<label htmlFor="title">Title</label>
				<input id="title" name="title" value={item.title} onChange={handleChange} />
				<label htmlFor="director">Director</label>
				<input id="director" name="director" value={item.director} onChange={handleChange} />
				<label htmlFor="metascore">Metascore</label>
				<input id="metascore" name="metascore" value={item.metascore} onChange={handleChange} />
				<label htmlFor="stars">Stars</label>
				<input id="stars" name="stars" value={item.stars} onChange={handleChange} />
				<button className="update-button" type="submit">
					Add
				</button>
			</form>
		</div>
	);
}

export default UpdateMovie;
