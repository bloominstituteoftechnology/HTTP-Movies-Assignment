import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovieInfo = {
    title: '',
    director: '',
    metascore: '',
    actors: ''
};

const UpdateForm = props => {
    const { push } = useHistory();
    const [updateMovie, setUpdateMovie] = useState(initialMovieInfo);
    const { id } = useParams();

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;

        setUpdateMovie({
            ...updateMovie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, updateMovie)
        .then((res) => {
            props.setUpdateMovie(res.data)
            push(`/movielist/${id}`)
        })
        .catch(err => {
            console.log(err)
        });
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='new title'
                    value={updateMovie.title}
                />
                <div className='baseline' />

                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='new director'
                    value={updateMovie.director}
                />
                <div className='baseline' />

                <input
                    type='text'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='new metascore'
                    value={updateMovie.metascore}
                />
                <div className='baseline' />

                <input
                    type='text'
                    name='actors'
                    onChange={changeHandler}
                    placeholder='new actors'
                    value={updateMovie.actors}
                />
                <div className='baseline' />



            </form>
        </div>
    )
}

export default UpdateForm
