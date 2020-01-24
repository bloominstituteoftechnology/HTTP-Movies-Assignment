import React, { useState } from "react"

import axios from "axios"

const AddMovie = (props) => {

    const [appState, setAppState] = useState(props.items)
    console.log("appState",appState)

    const [newMovie, setNewMovie] = useState({
        id: "",
        title: "",
        director: "",
        metascore: Number(""),
        stars: []
    });

    const handleChange = e => {
        setNewMovie({
            ...newMovie,
            [e.target.name]: e.target.value

        })
        console.log(newMovie)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        

        const movieUpdate = {
            id: Date.now(),
           title: newMovie.title,
           director: newMovie.director,
           metascore: Number(newMovie.metascore),
           stars: [newMovie.stars]
        }

       
      console.log("updated movie", movieUpdate)
        handleNewMovie(movieUpdate);
    }

    const handleNewMovie = (movie) => {
        axios.post("http://localhost:5000/api/movies", movie)
            .then(res => {
                setAppState([...appState, movie])
                props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: <input type="text" value={newMovie.title} name="title" onChange={handleChange} />
                </label>
                <label>
                    Director: <input type="text" value={newMovie.director} name="director" onChange={handleChange} />
                </label>
                <label>
                   Metascore: <input type="number" value={newMovie.metascore} name="metascore" onChange={handleChange} />
                </label>
                <label>
                    Stars: <input type="text" value={newMovie.stars} name="stars" onChange={handleChange} />
                </label>
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;