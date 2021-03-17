import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const AddMovie = (props) => {
    const [movie, setMovie] = useState(initialState);
    const { push } = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies', movie)
            .then(res => props.setMovieList(res.data))
            .catch(err => console.log(err));
        push('/');
    };

    const handleChange = (e) => {
        e.persist();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    };

    return(
        <div>
            <h2>Add New Movie</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="title"
                    value={movie.title}
                />

                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="director"
                    value={movie.director}
                />

                <input
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="metascore"
                    value={movie.metascore}
                />

                {/* <input
                    type="text"
                    name="stars"
                    onChange={handleChange}
                    placeholder="stars"
                    value={movie.stars}
                /> */}

                <button>Add</button>
            </form>
        </div>
    )
}

export default AddMovie;