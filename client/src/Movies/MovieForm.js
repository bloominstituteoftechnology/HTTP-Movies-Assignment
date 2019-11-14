import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieForm = props => {
	console.log("UpdateForm Props", props)

const initialMovie = {
	id: "",
	title: "",
	director: "",
	metascore: "",
	stars: []
}

const [movie, setMovie] = useState(initialMovie)
	console.log(movie);

useEffect(() => {

const id = props.match.params.id;
const movieToEdit = props.movies.find(movie => `${movie.id}` === id)
if(movieToEdit) {
	setMovie(movieToEdit)
};
}, [props.movies, props.match.params])

const handleChanges = e => {
	e.persist();
	let value = e.target.value;
	setMovie({
		...movie,
		[e.target.name]: value
	})
}

const deleteMovie = e => {
	e.preventDefault();
	axios
		.delete(`http://localhost:5000/api/movies/${movie.id}`)
		.then(res => {
			console.log("DELETE", res)
			props.history.push('/')
		})
		.catch(err => console.log(err))
}

const handleSubmit = e => {
	e.preventDefault();
	axios
		.put(`http://localhost:5000/api/movies/${movie.id}`,  movie)
		.then(res => {
			console.log("PUT", res)
			props.setMovies([...props.movies, res.data])
			props.history.push("/")
		})
		.catch(err => {
			console.log("NO", err)
		})
	}


    return (
        <div>
            <p>Edit Movie</p>
            <form onSubmit={handleSubmit}>
                <input
                    required
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={handleChanges}
                    value={movie.title}
                />
                 <input
                    required
                    type="text"
                    name="director"
                    placeholder="director"
                    onChange={handleChanges}
                    value={movie.director}
                />
                 <input
                    required
                    type="number"
                    name="metascore"
                    placeholder="metascore"
                    onChange={handleChanges}
                    value={movie.metascore}
                />
                <button type="submit" onClick={deleteMovie}>delete</button>
            </form>
        </div>
    )
}

export default MovieForm;