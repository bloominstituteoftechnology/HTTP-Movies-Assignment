import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export const MovieForm = ({updateMovie}) => {
    const [movie, setMovie] = useState({})
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/movies/${id}`)
                const starsString = data.stars.join(",")
                setMovie({ ...data, stars: starsString })
            } catch (e) {
                console.log(e.response)
            }
        }
        fetchMovie()
    }, [])

    const handleOnChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmitUpdate = async event => {
        event.preventDefault()
        const starsArray = movie.stars.split(",")
        try {
            const { data } = await axios.put(`http://localhost:5000/api/movies/${id}`, { ...movie, stars: starsArray })
            updateMovie(data)// setmovies to new array
            history.push("/")// redirect to 
        } catch(e) {
            console.log('putError', e.response)
        }
    }

    return (
        <div><form onSubmit={handleSubmitUpdate}>
            <input value={movie.title || ""} name="title" onChange={handleOnChange} />
            <input value={movie.director || ""} name="director" onChange={handleOnChange} />
            <input value={movie.metascore || ""} name="metascore" onChange={handleOnChange} />
            <input value={movie.stars || ""} name="stars" onChange={handleOnChange} />
            <input type="submit" value="update"/>
        </form></div>
    )
}