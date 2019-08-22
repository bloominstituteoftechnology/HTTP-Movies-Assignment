import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const MovieForm = (props) => {
    const [movieToUpdate, setMovieToUpdate] = useState(initialMovie)

    useEffect(() => {
        setMovieToUpdate(props.location.state)
    }, [props.location.state])

    const changeHandler = event => {
        event.persist()
        let value = event.target.value

        if (event.target.name === 'stars') {
            value = value.split(',') //.map(star => star.trim())
        }

        setMovieToUpdate({ ...movieToUpdate, [event.target.name]: value })
    }

    const handleSubmit = event => {
        event.preventDefault()

        axios
            .put(`http://localhost:5000/api/movies/${movieToUpdate.id}`, movieToUpdate)
            .then(res => props.history.push('/'))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <legend>Update Movie</legend>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Title'
                    value={movieToUpdate.title}
                />

                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={movieToUpdate.director}
                />

                <input
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='Metascore'
                    value={movieToUpdate.metascore}
                />

                <input
                    type='text'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='Stars'
                    value={movieToUpdate.stars.toString()}
                />

                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default MovieForm