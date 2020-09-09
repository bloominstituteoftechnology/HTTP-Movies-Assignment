import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios'
import {Link} from 'react-router-dom'

const initalState = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const MovieForm = () =>{
    const { push } = useHistory();
    const{ id } = useParams();
    const [movie, setMovie ] = useState(initalState)

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => 
        {setMovie(res.data);
        console.log("put working", res
        )} )
        .catch((err) => {console.log("put error", err)})
    },[id])


    const handleChange = event =>{
        setMovie({...movie,[event.target.name]: event.target.value})
    }

    const handleSubmit = event =>{
        event.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then((res) => {
            setMovie(res.data)
            push(`/`)
            console.log('Movie push submit Working//Axios put',res)
        })
    }

    return (
        <div>
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
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="metascore"
                    value={movie.metascore}
                 />
                 <input 
                    type="submit"
                 />
            </form>
        </div>
    )
}

export default MovieForm