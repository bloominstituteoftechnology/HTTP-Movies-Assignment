import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title:'',
    director:'',
    metascore:'',
    stars: []
  };

const UpdateMovieForm = props => {

    const[movie, setMovie] = useState(initialMovie)

    useEffect(()=> {
        const id = props.match.params.id;
        const movieToUpdate = props.savedList.find(movie => `${movie.id}` === id)
        if(movieToUpdate) setMovie(movieToUpdate)
    }, [props.savedList, props.match.params.id])

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        if(e.target.name === 'metascore'){
            value = parseInt(value, 10)
        }
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            props.setSavedList([...setMovie, res.data])
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h1>HELLO</h1>
            <form onSubmit={handleSubmit}>

                <input type="text" name="movie-title" placeholder="Movie Title"
                onChange={changeHandler}
                value={movie.title} />

                <input type="text" name="movie-director" placeholder="Movie Director"
                onChange={changeHandler}
                value={movie.director} />

                <input type="number" name="movie-metascpre" placeholder="Metascore"
                onChange={changeHandler}
                value={movie.metascore} />

                <input type="text" name="movie-actors" placeholder="Actors"
                onChange={changeHandler}
                value={movie.actors} />
                
                <button type="submit">
                    Update
                </button>
            </form>
        </div>
    )
}


export default UpdateMovieForm;