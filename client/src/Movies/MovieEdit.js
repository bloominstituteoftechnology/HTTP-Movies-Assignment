import React, { useState, useEffect } from 'react';
import axios from "axios";

const initialMovie = {
  id: Number,
  title: '',
  director: '',
  metascore: Number,
  stars:[]
};

const MovieEdit = props => {
    const [film, setFilm] = useState(initialMovie);
    useEffect (() => {
        const selectedMovie = props.savedList.find(item => {
            return `${item.id}`=== props.match.params.id;
        });
        if(selectedMovie){
            setFilm(selectedMovie);
        }
    }, [props.savedList, props.match.params.id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.name === "price") {
          value = parseInt(value, 10);
        }
    
        setFilm({
          ...film,
          [ev.target.name]: value
        });
      };
    
      const handleSubmit = e => {
        console.log (film)
        e.preventDefault();
        axios
          .put(`http://localhost:3333/movies/${film.id}`, film)
          
          .then(res => {
            props.setSavedList(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      };

    return (
        <div>
            <h3>Update Movie</h3>
            <form onSubmit={handleSubmit}>
                <input
                   type="text"
                   name="title"
                   onChange={changeHandler}
                   placeholder="title"
                   value={film.title}
                />
                  <input
                   type="text"
                   name="director"
                   onChange={changeHandler}
                   placeholder="director"
                   value={film.director}
                />
                  <input
                   type="number"
                   name="metascore"
                   onChange={changeHandler}
                   placeholder="metascore"
                   value={film.metascore}
                />
                  <input
                   type="text"
                   name="name"
                   onChange={changeHandler}
                   placeholder="stars"
                   value={film.stars}
                />
                <button>Update</button>
            </form>
        </div>
    )

}
export default MovieEdit;