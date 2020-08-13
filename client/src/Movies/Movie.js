import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';
import { Button } from 'reactstrap';

function Movie({ addToSavedList, movieList, setMovieList }) {
	const [movie, setMovie] = useState(null);
	const params = useParams();
	const { push } = useHistory();

	const fetchMovie = (id) => {
		axios
			.get(`http://localhost:5000/api/movies/${id}`)
			.then((res) => setMovie(res.data))
			.catch((err) => console.log(err.response));
	};

	const saveMovie = () => {
		addToSavedList(movie);
	};

	const handleEdit = (e) => {
		e.preventDefault();
		push(`/update-movie/${params.id}`, movie);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		axios
			.delete(`http://localhost:5000/api/movies/${params.id}`)
			.then((res) => {
				console.log(res);
				const newMovies = movieList.filter((film) => film.id !== res.data);
				setMovieList(newMovies);
				push('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchMovie(params.id);
	}, [params.id]);

	if (!movie) {
		return <div>Loading movie information...</div>;
	}

	return (
		<div className="save-wrapper">
			<MovieCard movie={movie} />

			<div className="save-button" onClick={saveMovie}>
				Save
			</div>
			<Button onClick={handleEdit} style={{ width: '7%' , margin: '2%', background: 'lightseagreen', color:'whitesmoke', fontSize: '20px', fontWeight:'bolder' }} >Edit</Button>
      <Button onClick={handleDelete} style={{width: '7%' , margin: '2%', background: 'lightseagreen', color:'whitesmoke', fontSize: '20px', fontWeight:'bolder' }} >Delete</Button>
		</div>
	);
}

export default Movie;
