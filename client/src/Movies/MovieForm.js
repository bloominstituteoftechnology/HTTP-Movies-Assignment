import React, { useState } from 'react';
import axios from 'axios';

const initialItem = {
    id: Number,
    title: '',
    director: '',
    metascore: Number,
    stars: '',
}

// const newMovie = req.body;

const MovieForm = ({getMovieList}) => {
    const [movie, setMovie] = useState(initialItem);

    const movieHandler = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        axios
        .post("http://localhost:5000/api/movies", {
            ...movie,
            setMovie
        })
        .then(res => {
            console.log(res)
            getMovieList()
        })
        .catch(err => console.log(err))
        setMovie(initialItem)
    }

    const updateList = {
        // id: id++,
        title: movie.title,
        director: movie.director,
        metascore: movie.metascore,
        stars: movie.stars
    }

    return(
        <div>
            <h2>Add New Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='title'
                    onChange={movieHandler}
                    value={movie.title}
                />
                <input 
                    type='text'
                    name='director'
                    placeholder='Director'
                    onChange={movieHandler}
                    value={movie.director}
                />
                <input 
                    type='number'
                    name='metascore'
                    placeholder='Metascore'
                    onChange={movieHandler}
                    value={movie.metascore}
                />
                <input 
                    type='text'
                    name='stars'
                    placeholder='Stars'
                    onChange={movieHandler}
                    value={movie.stars}
                />
                <button div="add-movie">Add New Movie</button>
            </form>
        </div>
    )
};

export default MovieForm;