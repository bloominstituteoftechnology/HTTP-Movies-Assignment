import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: [],
    id:""
};

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    console.log("props:", props)
    useEffect(() => {
        setMovie({
            ...movie,
            id: props.match.params.id
        })
    }, [props.movies, props.match.params.id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "stars") {
            value = ev.target.value.split(",");
        }

        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(movie);
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.history.push("/");
                console.log("put!!")
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Movie Title"
                    value={movie.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movie.director}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="0"
                    value={movie.metascore}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Stars"
                    value={movie.stars}
                />
                <div className="baseline" />

                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;