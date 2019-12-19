import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = (props) => {

    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: ''
    })

    useEffect(() => {
        const movieToEdit = props.movies.find(
          i => `${i.id}` === props.match.params.id
        );
        if (movieToEdit) {
          setMovie(movieToEdit);
        }
      }, [props.movies, props.match.params.id]);

    const handleChanges = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleStars = e => {
        setMovie({
            ...movie,
            stars: e.target.value.split(',')
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(response => {
            props.history.push('/')
        })
        .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input value={movie.title} name='title' type='text' onChange={handleChanges} />
            <label htmlFor='director'>Director: </label>
            <input value={movie.director} name='director' type='text' onChange={handleChanges} />
            <label htmlFor='metascore'>Metascore: </label>
            <input value={movie.metascore} name='metascore' type='text' onChange={handleChanges} />
            <label htmlFor='stars'>Stars: </label>
            <input value={movie.stars} name='stars' type='text' onChange={handleStars} />
            <button>Update Movie</button>
        </form>
    )
}

export default UpdateMovie;