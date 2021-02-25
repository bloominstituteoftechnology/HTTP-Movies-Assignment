import React, { useState } from 'react'
import Axios from "axios"
import axios from 'axios'
const initialState ={
    
    id: 5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
      

}
export default function AddMovie(props) {
    const [addMovie , setAddMovie] = useState(initialState)

    const handleChange =(e) => {
        e.persist();
        setAddMovie({
            ...addMovie,
            [e.target.name] : e.target.value
        })

    }
    const onSubmit= (e) =>{
        e.preventDefault()
    axios
        .post("http://localhost:5000/api/movies/",addMovie)
        .then((res)=>{
            console.log(res)
            props.setMovieList(res.data)
            setAddMovie({...addMovie})
        })
        .catch((err) =>{
            console.log(err)
        })
    }



    return (
         <div>
        <form>
          <label>
            <input
              type="text"
              name="title"
              value={addMovie.title}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              name="director"
              id="director"
              value={addMovie.director}
              onChange={handleChange}
            />
          </label>
  
          <label htmlFor="metascore">
            <input
              type="text"
              name="metascore"
              id="metascore"
              value={addMovie.metascore}
              onChange={handleChange}
            />
          </label>
  
          <label htmlFor="stars">
            <input
              type="text"
              id="stars"
              name="stars"
              value={addMovie.stars}
              onChange={handleChange}
            />
          </label>
        </form>
        <button onSubmit={onSubmit}>Update Movie</button>
      </div>
    )
}
