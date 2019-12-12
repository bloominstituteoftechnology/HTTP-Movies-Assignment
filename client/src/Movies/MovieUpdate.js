import React from 'react'
import Movie from './Movie'
import {axiosWithAuth} from "../utils/axiosWithAuth"

export const MovieUpdate = (props) => {
    const [updatedMovie, setUpdatedMovie] = useState({ props.movie })

    const handleChange = (e) => {
        setUpdatedMovie({ ...updatedMovie, [e.target.name]: e.target.value })
    }
    handleSubmit = e => {
        e.preventDefault()
        setUpdatedMovie(...updatedMovie, { title: "", director: "", metascore: "", stars: "" })
        axiosWithAuth().put(`/update-movie/${movie.id}`, updatedMovie)
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }
    return (

        <>
            <form onSubmit={handleSubmit}>
                <Label>Update Movie</Label>
                <input
                    name="title"
                    type="text"
                    onChange={handleChange}
                    placeholder="title"
                    value={movie.title}
                />
                <input
                    name="director"
                    type="text"
                    onChange={handleChange}
                    placeholder="director"
                    value={movie.director}
                />
                <input
                    name="metascore"
                    type="number"
                    onChange={handleChange}
                    placeholder="metascore"
                    value={movie.metascore}
                />
                <input
                    name="stars"
                    type="text"
                    onChange={handleChange}
                    placeholder="stars"
                    value={movie.stars}
                />
            </form>
        </>
    )
}