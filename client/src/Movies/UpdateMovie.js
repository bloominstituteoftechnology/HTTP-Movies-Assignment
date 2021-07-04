import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}
export default function UpdateMovie (props){
    const [updatedData, setUpdatedData] = useState(initialState)
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setUpdatedData(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log('There was an error:', err)
            })
    }, [id])

    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "price") {
          value = parseInt(value, 10);
        }
    
        setUpdatedData({
          ...updatedData,
          [ev.target.name]: value
        });
      };
    
    const submitHandler = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, updatedData)
        .then(res => {
            props.setMovieList(res.data);
            push(`/`)
        })
        .catch(err => console.log(err));
    }

    return (
        <form onSubmit={submitHandler}>
            <h1>Update Movie</h1>
            <label htmlFor='title'>
                <input 
                type='text'
                id='title'
                name='title'
                value={updatedData.title}
                onChange={changeHandler}
                placeholder='Title' />
            </label>
            <label htmlFor='director'>
                <input 
                type='text'
                id='director'
                name='director'
                value={updatedData.director}
                onChange={changeHandler}
                placeholder='Director' />
            </label>
            <label htmlFor='metascore'>
                <input 
                type='text'
                id='metascore'
                name='metascore'
                value={updatedData.metascore}
                onChange={changeHandler}
                placeholder='Metascore' />
            </label>
            <button>Update Movie</button>
        </form>
    )
}