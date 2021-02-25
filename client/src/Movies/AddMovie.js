import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

//perhaps update the two forms to use one and have interchangeable methods?

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: [],
}


const AddMovie = (props) => {
    const { push } = useHistory();
    const [ movie, setMovie ] = useState(initialState)

    const changeHandler = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`http://localhost:5000/api/movies`, movie)
             .then(res => {
                 console.log(res.data)
                 props.getMovieList()
                 setMovie(initalState)
                 push(`/`)
             })
    }

    return (
        <div>
            <h1>Add a Movie</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Title'
                    value={movie.title}
                />
                <input 
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={movie.director}
                />
                <input 
                    type='text'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='MetaScore'
                    value={movie.metascore}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;