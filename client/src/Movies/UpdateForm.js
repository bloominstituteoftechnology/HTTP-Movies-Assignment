import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const UpdateForm = props => {
    const { push } = useHistory();
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: []
    });
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res.data);
                setMovie(res.data)
            })
            .catch(err => console.log(err));
    }, [id]);

    const changeHandler = e => {
        e.persist();

        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleActor = index => e => {
        setMovie({
            ...movie,
            stars: movie.stars.map((actor, actorIndex) => {
                return actorIndex === index ? e.target.value : actor;
            })
        })
    };

    const handleMetascore = e => {
        setMovie({
            ...movie,
            metascore: parseInt(e.target.value)
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res.data);
                props.setMovie(res.data);
                push('/');
            })
            .catch(err => console.log(err))
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={movie.title}
                />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={movie.director}
                />
                 <input
                    type="number"
                    name="metascore"
                    onChange={handleMetascore}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                {movie.stars.map((star, index) => {
                    return (
                        <input key={index}
                                type="text"
                                value={star}
                                placeholder="Actor"
                                onChange={handleActor(index)}
                        />
                    )
                })}

                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm;