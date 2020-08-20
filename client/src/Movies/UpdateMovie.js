import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const initialMovie = {
    id: Date.now(), 
    title: "", 
    director: "", 
    metascore: "",
    stars: []
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie); 
    const { id } = useParams(); 

useEffect(() => {
    axios
        .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                setMovie(res.data)
            })
            .catch((err) => console.log(err))
}, [id])

const onChange = (e) => {
    e.persist(); 
    setMovie({
        ...movie, 
        [e.target.name]: e.target.value
    })
}

const handleSubmit = (e) => {
    e.preventDefault(); 
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
}

    return (
        <div>
            <h2>Edit {movie.title} </h2>
            <form>
                <label htmlFor="title">
                    Movie Title: 
                </label>
                <input
                type="text"
                name="title"
                value={movie.title}
                onChange={onChange}                
                /> 
                <label htmlFor="director">
                    Director:
                </label>
                <input 
                type="text"
                name="director"
                value={movie.director}
                onChange={onChange}
                />
                <label htmlFor="metascore">
                    Metascore: 
                </label>
                <input 
                type="text"
                name="metascore"
                value={movie.metascore}
                onChange={onChange}
                />
                <button onClick={handleSubmit} type="submit">Submit</button>

            </form>
            
        </div>
    )
}

export default UpdateMovie; 