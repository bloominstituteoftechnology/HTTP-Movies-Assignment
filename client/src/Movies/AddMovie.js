import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'; 
import axios from 'axios';

const initialState = {
    id: Date.now(), 
    title: "", 
    director: "", 
    metascore: "",
    stars: []
}; 

const AddMovie = (props) => {
    const [newMovie, setNewMovie] = useState(initialState); 
    const history = useHistory(); 

    const handleChange = (e) => {
        setNewMovie({
            ...newMovie, 
            [e.target.name]: e.target.value
        });
    };

    // const addMovie = (movie) => {
    //     axios
    //     .post('http://localhost:5000/api/movies', movie)
    //     .then((res) => {
    //         history.push("/"); 
    //     })
            
    // };

    const onSubmit = (e) => {
        e.preventDefault(); 
        axios
        .post('http://localhost:5000/api/movies', newMovie)
        .then((res) => {
            history.push("/"); 
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", width: "40vw", margin: "0 auto"}}>
                <label htmlFor="title">Movie Title:</label>
                <input 
                type="text"
                name="title"
                value={newMovie.title}
                onChange={handleChange}
                />
                <label htmlFor="director">Director:</label>
                <input 
                type="text"
                name="director"
                value={newMovie.director}
                onChange={handleChange}
                />
                <label htmlFor="metascore">Metascore:</label>
                <input 
                type="text"
                name="metascore"
                value={newMovie.metascore}
                onChange={handleChange}
                />
                <label htmlFor="stars">Stars:</label>
                <input 
                type="text"
                name="stars"
                value={newMovie.stars}
                onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddMovie; 
