import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
    const [movie, setMovie] = useState({
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars: []
    });

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then( response => {
                setMovie(response.data);
            })
    }, [props.match.params.id])

    const handleChange = event => {
        setMovie({ ...movie, [event.target.name]: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(response => {
                props.history.push(`/movies/${movie.id}`);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter Title"
                    value={movie.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="director"
                    name="director"
                    placeholder="Enter Director"
                    value={movie.director}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="metascore"
                    name="metascore"
                    placeholder="Enter Metascore"
                    value={movie.tmetascore}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="stars"
                    name="stars"
                    placeholder="Enter Stars"
                    value={movie.stars}
                    onChange={handleChange}
                />
                <button type="submit">Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;