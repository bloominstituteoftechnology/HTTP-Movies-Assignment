import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    stars: '',
    metascore: ''
}

const AddMovie = ({ movieList, setMovieList}) => {
    const { push } = useHistory();
    const { id } = useParams();
    const [ movie, setMovie ] = useState(initialMovie);

    const changeHandler = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios  
            .post(`http://localhost:5000/api/movies`, movie)
            .then(res => {
                setMovieList([...movieList, res.data]);
                setMovie({
                    title: '',
                    director: '',
                    stars: '',
                    metascore: ''
                })
                push(`/movies/${res.data.id}`)
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Movie title'
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={movie.director}
                />
                <input
                    type='text'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='Stars'
                    value={movie.stars}
                />
                <input
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='Metascore'
                    value={movie.metascore}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default AddMovie;
