import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
};
const CreateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const history = useHistory();

    const changeHandler = (e) => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore'){
            value = value.split(',');
        }
        if (e.target.name === 'stars'){
            value = value.split(',');
        }
        setMovie({
            ...movie, 
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies/`, movie)
        .then((res)=> {
            props.setRefresh(true);
            history.push(`/movie/${res.data}[res.data.length - 1].id`);
        })
        .catch((err)=> console.log(err));
    };

    return (
        <>
        <h2>Update Movie</h2>
        <form onSubmit = {handleSubmit}>
         <label>Title:&nbsp;</label>
         <input
         type = 'text'
         name = 'title'
         onChange = {changeHandler}
         value = {movie.title}
         />
         <label>Director:&nbsp;</label>
         <input
            type = "text"
            name = 'director'
            onChange = {changeHandler}
            value = {movie.director}
         />
         <label>Metascore:&nbsp;</label>
         <input
            type = 'number'
            name = 'metascore'
            onChange = {changeHandler}
            value = {movie.metascore}
         />
         <label>Actors:&nbsp;</label>
         <input 
            type = 'text'
            name = "stars"
            onChange = {changeHandler}
            value = {movie.stars}
         />
         <button>Update</button>
        </form>
        </>
    );
};


export default CreateMovie;