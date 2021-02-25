import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: [],
}

const UpdateMovie = (props) => {
    const {push} = useHistory()
    const {id} = useParams()
    const [movie, setMovie] = useState(initialState)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
             .then(res => {
                 setMovie(res.data)
             })
             .catch(err => {console.log(err)})
    }, [])

    const changeHandler = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
             .then(res => {
                 props.setMovieList(props.movieList.map(movieItem => {
                     if(movieItem.id === res.data.id) {
                         return res.data
                     } else {
                         return movieItem
                     }
                 }))
                 setMovie(initialState)
                 push(`/movies/${movie.id}`)
             })
             .catch(err => 
                {console.log(err.response)
                })
    }

    return(
        <div>
            <h3>Update Movie</h3>
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
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='MetaScore'
                    value={movie.metascore}
                />
                <button>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie