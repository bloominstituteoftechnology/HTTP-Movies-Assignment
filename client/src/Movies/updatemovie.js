import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialState= {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateMovie = props => {
    const [update, setUpdate] = useState(initialState);

    useEffect(()=> {
        axios.get( `http://localhost:5000/api/movies/${props.match.params.id}`)
        .then (response => setUpdate(response.data))

        .catch(error => console.log(error));
    }, [props.match.params.id]);

    const changeHandler = e => {
        setUpdate({ ...update, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        axios.put(`http://localhost:5000/api/movies/${update.id}`, update)
        .then (response => {
            props.history.push(`/movies/${update.id}`);
        })
        .catch(err=> console.log(err));
    };

    return(
        <div>
            <form onSubmit = {handleSubmit}>
            <input 
                type='text'
                name = 'title'
                onChange = {changeHandler}
                placeholder = 'Title'
                value = {update.title}
            />

            <input 
                type='text'
                name = 'director'
                onChange = {changeHandler}
                placeholder = 'Director'
                value = {update.director}
            />

            <input 
                type='text'
                name = 'metascore'
                onChange = {changeHandler}
                placeholder = 'Metascore'
                value = {update.metascore}
            />

            <input 
                type='text'
                name = 'Stars'
                onChange = {changeHandler}
                placeholder = 'Stars'
                value = {update.stars}
            />

            <button> Update </button>
            </form>
        </div>
    );
};
export default UpdateMovie;