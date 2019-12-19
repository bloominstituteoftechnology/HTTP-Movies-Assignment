import React, { useState } from "react";
import axios from "axios";

const AddMovie = (props) => {

    const [newMovie, setNewMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: ''
    })

    const handleChanges = e => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value
        })
    }

    const handleStars = e => {
        if (e.target.value.includes(',')) {
            setNewMovie({
                ...newMovie,
                [e.target.name]: e.target.value.split(',')
            })
        }
        else {
            setNewMovie({
                ...newMovie,
                [e.target.name]: e.target.value.split(' ')
            })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies', newMovie)
        .then(response => {
            alert('Movie added!');
            props.history.push('/');
        })
        .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Title: </label>
            <input value={newMovie.title} name='title' type='text' onChange={handleChanges} />
            <label htmlFor='director'>Director: </label>
            <input value={newMovie.director} name='director' type='text' onChange={handleChanges} />
            <label htmlFor='metascore'>Metascore: </label>
            <input value={newMovie.metascore} name='metascore' type='text' onChange={handleChanges} />
            <label htmlFor='stars'>Stars: </label>
            <input value={newMovie.stars} name='stars' type='text' onChange={handleStars} />
            <button>Update Movie</button>
        </form>
    )
}

export default AddMovie;