import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [] 
}

const UpdateMovieForm = props =>{
const [item, setItem] =useState(initialItem)
const { id } = useParams();

useEffect(() => {
    console.log(props.movieList)
    const movieToUpdate = props.movieList.find(items => `${items.id}` === id)
    console.log(movieToUpdate)
    if (movieToUpdate) {
        setItem(movieToUpdate)
    }
}, [props.movieList, id])

const handleChange = ev => {
    let value =ev.target.value;
    if (ev.taraget.name === 'metascore') {
        value = parseInt(value)
    } else if (ev.target.name ==='stars') {
        value = value.split (',')
        console.log(value)
    }
    setItem({
        ...item,
        [ev.target.name]: value
    })
}
const handleSubmit =e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, item)
    .then(res => {
        console.log(res.data)
        props.setMovieList([res.data]);
        props.hisotry.push(`/movies/${id}`)
    })
   .catch(err => console.log('error!!', err))
}

return (
    <div className='update-movie'>
    <h2>Update Movie</h2>

    <form onSubmit={handleSubmit}>
        <input
            type='text'
            name='title'
            placeholder='Title..'
            onChange={handleChange}
            value={item.title}
            />
        <div className='split'/>

        <input
            type='text'
            name='director'
            placeholder='Director..'
            onChange={handleChange}
            value={item.director}
            />
        <div className='split'/>

        <input
            type='number'
            name='metascore'
            placeholder='Metascore Rating..'
            onChange={handleChange}
            value={item.metascore}
            />
        <div className='split'/>

        <input
            type='text'
            name='stars'
            placeholder='Stars..'
            onChange={handleChange}
            value={item.stars}
            />
        <div className='split'/>

        <button>Update Movie</button>
            
    </form>
    </div>
)
}

export default UpdateMovieForm;