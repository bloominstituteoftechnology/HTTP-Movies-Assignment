import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const someMovie = {
    id: Math.random(),
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
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                console.log(props);
                console.log(res);
                setMovie(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);
    const handleChanges = (event) => {
        event.preventDefault();
        let value = event.target.value;

        setMovie({
            ...movie,
            [event.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then((res) => {
                push(`/`);
                setMovie(res.data);
                window.location.reload();
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
                <input type="hidden" name="id" />
                {console.log('props in Update: ', props)}
                Title:
                <input
                    type="text"
                    name="title"
                    onChange={handleChanges}
                    placeholder="title"
                    value={movie.title}
                />
                <br />
                Director:
                <input
                    type="text"
                    name="director"
                    onChange={handleChanges}
                    placeholder="director"
                    value={movie.director}
                />
                <br />
                Metascore:
                <input
                    type="text"
                    name="metascore"
                    onChange={handleChanges}
                    placeholder="title"
                    value={movie.metascore}
                />
                <br />
                Stars:
                <input
                    type="text"
                    name="stars"
                    onChange={handleChanges}
                    placeholder="stars"
                    value={movie.stars}
                />
                <br />
                <button>Update This Movie</button>
            </form>
        </div>
    );
};

export default UpdateMovie;
