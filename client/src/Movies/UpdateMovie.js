import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import e from 'express';

const someMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const UpdateMovie = (props) => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(someMovie);
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(``)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    const handleChanges = (event) => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === 'title') {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [event.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(``, movie)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <h1>Welcome to the Update Movie Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChanges}
                    placeholder="title"
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChanges}
                    placeholder="director"
                    value={movie.director}
                />
                <input
                    type="text"
                    name="metascore"
                    onChange={handleChanges}
                    placeholder="title"
                    value={movie.metascore}
                />
                <input
                    type="string"
                    name="stars"
                    onChange={handleChanges}
                    placeholder="stars"
                    value={movie.stars}
                />
                <button>Update This Movie</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
