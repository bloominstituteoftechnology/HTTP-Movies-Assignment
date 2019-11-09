import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateMovie(props) {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metaScore: 0,
        stars: []
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(result => {
                setMovie(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [props.match.params.id])

    const handleStars = (event) => {
        console.log(event.target.value)
        setMovie({
            ...movie,
            stars: [event.target.value.split(",")]
        })
    }

    const handleChange = (event) => {
        console.log(event.target.value, "<-- handleChange")
        setMovie({
            ...movie,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = event => {
        event.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(result => {
                console.log(result.data, "<-- Data Submitted in Put Request")
                props.history.push(`/movies/${movie.id}`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='movie-card'>
            <form onSubmit={handleSubmit} className='edit-form'>
                <h1>Update Movie</h1>
                <label>Title</label>
                <h3>{movie.title}</h3>
                <input 
                    type='text'
                    name='title'
                    placeholder='New Title'
                    value={movie.title}
                    onChange={handleChange}
                />

                <label>Director</label>
                <h3>{movie.director}</h3>
                <input 
                    type='text'
                    name='director'
                    placeholder='New Title'
                    value={movie.director}
                    onChange={handleChange}
                />

                <label>Metascore</label>
                <h3>{movie.metascore}</h3>
                <input 
                    type='text'
                    name='metascore'
                    placeholder='New Metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                />

                <label>Stars</label>
                <h3>{movie.stars}</h3>
                <input 
                    type='text'
                    name='stars'
                    placeholder='New Stars'
                    value={movie.stars}
                    onChange={handleStars}
                />

                <button className='save-button'>Save Changes</button>
            </form>
        </div>
    )
}