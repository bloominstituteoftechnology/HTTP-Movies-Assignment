import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';


function UpdateForm(props) {
    console.log("Update", props);
    
    const { id } = useParams();
    //const { push } = useHistory();
    
    const [updateMovie, setUpdateMovie] = useState({
        id: Date.now(),
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    useEffect(() => {
    //    axios
    //    .get(`http://localhost:5000/api/movies/${id}`)
    //    .then(res => {
    //        setUpdateMovie(res.data)
    //        console.log(res.data, "useeffect console");
    //    })
    //    .catch(err => console.log(err));

        const itemToUpdate = props.movies.find(movie => `${movie.id}` === id)

        if (itemToUpdate){
            setUpdateMovie(itemToUpdate)
        }

    }, [props.movies, id]);

    const changeHandler = ev => {
        ev.preventDefault();
        ev.persist();
        let value = ev.target.value;
        if(ev.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        setUpdateMovie({
            ...updateMovie,
            [ev.target.name]: value
        });

    };

    const handleSubmit = e => {
        e.preventDefault();

        axios
        .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
        .then(res => {
            // props.setMovie(res.data);
            // push("/");
            props.setMovieList(res.data);
            props.history.push('/');
         
        })
        .catch( err => console.log(err));
        setUpdateMovie({
            id: '',
            title: '',
            director: '',
            metascore: '',
            stars: []
        })
    }

  return (
      <div>
          <h2>Update Movie</h2>
          <form onSubmit={handleSubmit}>
              <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="Title"
              value={updateMovie.title}
              />
              <input
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="Director"
              value={updateMovie.director}
              />
              <input
              type="text"
              name="metascore"
              onChange={changeHandler}
              placeholder="Metascore"
              value={updateMovie.metascore}
              />
            <input
            type="text"
            name="stars"
            onChange={changeHandler}
            placehodler="Stars"
            value={updateMovie.stars}
            />
            <button>Update</button>
          </form>
      </div>
    );  
};

export default UpdateForm;