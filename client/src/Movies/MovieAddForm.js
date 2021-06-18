import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const MovieAddForm = (props) => {
    const { push } = useHistory()
    const [movie, setMovie] = useState(initialState)
    const { setMovieList } = props

    const handleChange = (e) => {
        e.persist()
        if (e.target.name === 'metascore') {
            e.target.value = parseInt(e.target.value, 10)
        }
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const arr = movie.stars.split(', ')
        const movieAdd = {
            ...movie,
            stars: arr
        }
        axios
            .post('http://localhost:5000/api/movies', movieAdd)
            .then((res) => {
                setMovieList(res.data)
                push('/')
            })
            .catch((err) => console.error(err.message))
    }

    return (
        <div>
            <h3>Add A Movie</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="title"
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="director"
                    value={movie.director}
                />
                <input
                    type="number"
                    name="metascore"
                    onChange={handleChange}
                    value={movie.metascore}
                    pattern="0+\.[0-9]*[1-9][0-9]*$"
                />
                <input
                    type="text"
                    name="stars"
                    onChange={handleChange}
                    placeholder="stars"
                    value={movie.stars}
                />
                <button >Add Movie</button>
            </form>
        </div>
    )
}

export default MovieAddForm