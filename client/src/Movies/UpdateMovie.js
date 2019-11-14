import React, {useState, useEffect } from 'react';
import axios from 'axios';


const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}


const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie)

    useEffect(() => {
        const movieToUpdate = movies.find(movie => `${movie.id}` === id);
    },[])

    const handleChange = e => {
        e.persist();
        setMovie({...movie, [e.target.name]: [e.target.value]})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
          .put('')
          .then(res => { 
              console.log(res)
              props.history.push(`/movies/${movie.id}`)
              setMovie(initialMovie);
          })
          .catch(err => console.log(err))
    }

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='title'
                    value={movie.title}
                    onChange={handleChange} 
                />
                <input
                    type='text'
                    name='director'
                    placeholder='director'
                    value={movie.director}
                    onChange={handleChange}  
                />
                <input
                    type='text'
                    name='metascore'
                    placeholder='metascore'
                    value={movie.metascore}
                    onChange={handleChange} 
                />
                <input
                    type='text'
                    name='stars'
                    placeholder='stars'
                    value={movie.stars}
                    onChange={handleChange} 
                />
                <button>Update</button>
            </form>
        </div>
    )
}


export default UpdateMovie;