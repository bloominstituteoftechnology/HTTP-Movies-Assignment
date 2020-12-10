import React, {useState} from 'react'
import axios from "axios"
import { useParams } from 'react-router-dom'


function AddMovie(props) {

    const initialState = {
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars: ""
    }


    const [movie, setMovie] = useState(initialState)

const handleSubmit = e => {
    e.preventDefault();
    const obj = {
        id: Date.now(),
        title: movie.title,
        director: movie.director,
        metascore: movie.metascore,
        stars: movie.star

    }
    const url = `http://localhost:5000/api/movies`;
    axios.post(url, obj)
      .then((res) => {
        console.log(res)
      })    
      .catch(err => console.error(err));
  };


    const handleChange = e => {
        e.preventDefault()
        setMovie({
            ...movie,   
            [e.target.name]: e.target.value
        })
    }




    return (
        <div>
        <form onSubmit={handleSubmit}>
        <label>title</label>
        <input
        type="text"
        name="title"
        onChange={handleChange}
        value={movie.title}
        />
        <label>director</label>
        <input
        type="text"
        name="director"
        onChange={handleChange}
        value={movie.director}
        />
        <label>metascore</label>
        <input
        type="number"
        name="metascore"
        onChange={handleChange}
        value={movie.metascore}
        />
        <label>stars</label>
        <input
        type="text"
        name="stars"
        onChange={handleChange}
        value={movie.stars}
        />
        <button>Add Movie</button>
    </form>
    </div>
    )
}

export default AddMovie

// Add a route at the path /add-movie
// Create a component with a form to add a new movie
// Each created movie should have the following format (notice the array of strings - this will test your JS skills, so work through it methodically)
// The form should make a POST request to the server when submitted
// When the call comes back successfully, reset your form state and route the user to /movies
// Movie object format: