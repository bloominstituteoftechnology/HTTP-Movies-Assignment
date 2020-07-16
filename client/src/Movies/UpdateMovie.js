import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const UpdateMovieForm = (props) => {

    const [formState, setFormState] = {
        id: Date.now(),
        title: "",
        director: "",
        metascore: "",
        stars: ""
    }
    
    const { push } = useHistory();
    const { id } = useParams();
    const [movie, setMovie] = useState(formState);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res);
            })
            .catch(err => console.log(err));
    }, [id]);

    const onChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value})
    
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    
    }

    const handleSubmit = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000//api/movies/${id}`, movie)
            .then(res => {
                props.setMovie(res);
                push(`/movies/${id}`)
            })
    }


    return (
        <div>
      <h2>Update Movie List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={onChange}
          placeholder="title"
          value={formState.title}
        />
        <input
          type="text"
          name="director"
          onChange={onChange}
          placeholder="director"
          value={formState.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={onChange}
          placeholder="metascore"
          value={formState.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={onChange}
          placeholder="stars"
          value={formState.stars}
        />

        </form>
        </div>
    )
}

export default UpdateMovieForm;