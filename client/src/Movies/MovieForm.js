import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export const MovieForm = ({ updateMovie }) => {
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
        } catch (e) {
            console.log('putError', e.response)
        }
    }

    return (
        <div>
            <form className="update-form" onSubmit={handleSubmitUpdate}>
                <label htmlFor="title">Title:</label>
                <input id="title" value={movie.title || ""} name="title" onChange={handleOnChange} />

                <label htmlFor="director">Director:</label>
                <input id="director" value={movie.director || ""} name="director" onChange={handleOnChange} />

                <label htmlFor="metascore">Metascore:</label>
                <input id="metascore" value={movie.metascore || ""} name="metascore" onChange={handleOnChange} />

                <label htmlFor="stars">Stars:</label>
                <textarea id="stars" value={movie.stars || ""} name="stars" onChange={handleOnChange} />

                <input type="submit" value="update" />
            </form>
        </div>
    )
}