import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateForm = props => {
    const [movie, setMovie] = useState(null);
    const params = useParams();

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        console.log(params.id)
        fetchMovie(params.id);
    }, [params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
      }

      const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });


    };

    const handleSubmit = e => {
        e.preventDefault();
        props.updateMovie(movie);

    }

    return (
        <div className="save-wrapper">
            <div className="movie-card">
            <div className="update-form"><form onSubmit={handleSubmit}>
                        <label htmlFor="title">
                            <input
                                type="text"
                                name="title"
                                placeholder="title"
                                value={movie.title}
                                onChange={handleChange}
                            /></label>
                        <label htmlFor="director">
                            <input
                                type="text"
                                name="director"
                                placeholder="director"
                                value={movie.director}
                                onChange={handleChange}
                            /></label>
                        <label htmlFor="metascore">
                            <input
                                type="text"
                                name="metascore"
                                placeholder="metascore"
                                value={movie.metascore}
                                onChange={handleChange}
                            /></label>
                        <button>Update Movie</button>
                    </form></div>
        </div>

        </div>
    );
};

export default UpdateForm;