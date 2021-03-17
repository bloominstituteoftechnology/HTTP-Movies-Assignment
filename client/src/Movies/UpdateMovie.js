import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}
const UpdateMovie = (props) => {
    
    const [movie, setMovie] = useState(initialState);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err))
    },[id])

    const handleChange = (e) => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => props.updateMovieList(res.data))
            .catch(err => console.log(err));
        push('/');
    }

    return(
        <form onSubmit={handleSubmit}>

            <input
                type='text'
                name='title'
                value={movie.title}
                onChange={handleChange}
                placeholder='name'
            />

            <input
                type='text'
                name='director'
                value={movie.director}
                onChange={handleChange}
                placeholder='director'
            />

            <input
                type='text'
                name='metascore'
                value={movie.metascore}
                onChange={handleChange}
                placeholder='metascore'
            />

            <input
                type='text'
                name='stars'
                value={movie.stars}
                onChange={handleChange}
                placeholder='stars'
            />

            <button>Update</button>

        </form>
    )
}

export default UpdateMovie;