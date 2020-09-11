import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res)=>{
            setMovie(res.data);
        })
        .catch((err)=> {
            console.log(err);
        })
    },[id]);
    
    const changeHandler = (e) => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore'){
            value = parseInt(value, 10);
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
        console.log(movie);
        axios
        .put(`http://localhost:5000/api/movie/${id}`, movie)
        .then((res)=>{
            props.setRefresh(true);
            history.push(`/movies/${id}`);
        })
        .catch((err) => console.log(err));
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
}

export default UpdateMovie;