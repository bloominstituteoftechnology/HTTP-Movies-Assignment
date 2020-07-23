import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const initalMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const MovieForm = ({ movieList, setMovieList }) => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initalMovie);
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setMovie(location.state)
        } else {
            axios
                .get(`http://localhost:5000/api/movies/${id}`)
                .then(res => {
                    setMovie(res.data)
                })
                .catch(err => console.log(err))
        }

    }, []);


    const onInputChange = e => {
        e.persist();
        const name = e.target.name;
        let value = e.target.value;

        if (name === 'stars') {
            value = value.split(',');
        }

        setMovie({
            ...movie,
            [name]: value
        });
    };

    const onSubmit = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => { 
                setMovieList([...movieList, res.data]);
                push('/');
            })
            .catch(err => console.log(err))
    };

    return (
        <form className='form'>
            <h1>Edit Movie</h1>

            <label>Title: 
                <input
                    value={movie.title}
                    onChange={onInputChange}
                    name='title'
                    type='text'
                >
                </input>
            </label>
            <label>Director: 
                <input
                    value={movie.director}
                    onChange={onInputChange}
                    name='director'
                    type='text'
                >
                </input>
            </label>
            <label>Metascore: 
                <input
                    value={movie.metascore}
                    onChange={onInputChange}
                    name='metascore'
                    type='number'
                >
                </input>
            </label>
            <label>Stars: 
                <input
                    value={movie.stars}
                    onChange={onInputChange}
                    name='stars'
                    type='text'
                >
                </input>
            </label>
            <button onClick={onSubmit}>SUBMIT</button>
        </form>
    );
};

export default MovieForm;