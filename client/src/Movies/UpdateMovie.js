import React, { useState } from 'react';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
}
const UpdateMovie = () => {
    const [movie, setMovie] = useState(initialState);

    const handleChange = (e) => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
                type='text'
                name='title'
                value={movie.title}
                onChange={handleChange}

            />
        </form>
    )
}

export default UpdateMovie;