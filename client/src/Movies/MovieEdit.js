import React, { useState, useEffect } from 'react';
import axios from "axios";

const initialMovie = {
  id: Number,
  title: '',
  director: '',
  metascore: 0,
  actor: '',
  stars:[]
};

const MovieEdit = props => {

    const [film, setFilm] = useState(initialMovie);

    useEffect (() => {
        const selectedMovie = props.list.find(item => {
            return `${item.id}`=== props.match.params.id;
        });
        if(selectedMovie){
            setFilm(selectedMovie);
        }
    }, [props.savedList, props.match.params.id]);

    const changeHandler = ev => {
        ev.persist();
        setFilm({...film, [ev.target.name]: ev.target.value });
      };
    
      const handleSubmit = e => {
        console.log ("Put film in handle submit", film)
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${film.id}`, film)
          
          .then(res => {
            console.log ("Response in the PUT request MovieEdit", res)
            props.history.push('/')
            // props.setSavedList(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      };

    return (
        <div className="movie-edit-wrapper">
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
                <input
                   type="text"
                   name="title"
                   onChange={changeHandler}
                   placeholder="Movie Title"
                   value={film.title}
                />
                  <input
                   type="text"
                   name="director"
                   onChange={changeHandler}
                   placeholder="Director"
                   value={film.director}
                />
                  <input
                   type="number"
                   name="metascore"
                   onChange={changeHandler}
                   placeholder="Meta Score"
                   value={film.metascore}
                />
                  <input
                   type="text"
                   name="name"
                   onChange={changeHandler}
                   placeholder="Add actor"
                   value={film.stars}
                />
                <button>Update</button>
            </form>
        </div>
    )

}
export default MovieEdit;