import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export const AddMovieForm = ({ addToSavedList }) => {
    const [movie, setMovie] = useState({})

    const history = useHistory()

    const handleAddMovie = async movie => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/movies', { ...movie, stars: movie.stars.split(",") })
            console.log('handleAddMovieData', data)
            history.push("/")
        } catch (e) {
            console.log('addError', e)
        }
    }

    const handleOnSubmit = event => {
        event.preventDefault()
        console.log('movieSubmitted', movie)
        handleAddMovie(movie)
    }

    const handleOnChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="title">Title:</label>
                <input id="title" value={movie.title || ""} name="title" onChange={handleOnChange} />
                <br />
                <label htmlFor="director">Director:</label>
                <input id="director" value={movie.director || ""} name="director" onChange={handleOnChange} />
                <br />
                <label htmlFor="metascore">Metascore:</label>
                <input id="metascore" value={movie.metascore || ""} name="metascore" onChange={handleOnChange} />
                <br />
                <label htmlFor="stars">Stars:</label>
                <textarea id="stars" value={movie.stars || ""} name="stars" onChange={handleOnChange} />
                <br />
                <input type="submit" value="add" />
            </form>
        </div>
    )
}