import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Movie from './Movie';


const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
  }

const Update = props => {
    const { id } = useParams();
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie)

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === 'metascore') {
          value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [ev.target.name]: value
        })
    }

    useEffect(()=>{
        const movieToUpdate = props.movies.find(element => `${element.id}` === id)
        console.log("Props",props)
        if (movieToUpdate) {
            setMovie(movieToUpdate)
        }
    }, [props.movies, id])

    const handleSubmit = e =>{
        e.preventDefault();
    }
    axios
    .put(`http://localhost:5001/api/movies/${id}`, movie)
    .then(response =>{
        console.log("PUT",response)
        const updatedList = props.movies.map(film => {
            if (`${film.id}`=== id){
                return movie
            }else {
                return film
            }
        })
        console.log("New Array",updatedList)
        props.setMovieList(updatedList)
        push('/')
    })




    return (
        <div>
        <h1>Update</h1>
        <form onSubmit={handleSubmit}>
            <input 
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="Title"
              value={movie.title}
            />
            <input 
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="Director"
              value={movie.director}
            />
            <input 
              type="number"
              name="metascore"
              onChange={changeHandler}
              placeholder="Metascore"
              value={movie.metascore}
            />
            <input 
              type="text"
              name="stars"
              onChange={changeHandler}
              placeholder="Stars"
              value={movie.stars}
            />
            <button>Update</button>
          </form>
        </div>
    )
}

export default Update



