import React, { useState} from "react";
import { useHistory} from "react-router-dom";
import axios from "axios";

const initialValues = {
    title: "",
    director: "",
    metascore: 0,
    stars: []
  };


const UpdateMovie = (props) => {
    const [updatedMovie, setUpdatedMovie] = useState(initialValues)

    const changeHandler = e => {
        setUpdatedMovie({
            ...updatedMovie,
            [e.target.name]: e.target.value
        })
    }
    const history = useHistory();

      const submitHandler = e => {
          e.preventDefault();
          props.setIsFetching(true)
          axios
          .post('http://localhost:5000/api/movies', updatedMovie)
          .then(res => {
              console.log(res)
            history.push('/movies')
            props.setIsFetching(false)
        })
          .catch(err => {
              console.log(err)
              props.setIsFetching(false)
            })
          }

    return(
        <div>
            <h2>Add Movie</h2>
            <form onSubmit={submitHandler}>
                <label>Title</label>
                <input 
                type='text'
                name="title"
                value={updatedMovie.title}
                onChange={changeHandler}
                />

                <label>Director</label>
                <input 
                type='text'
                name="director"
                value={updatedMovie.director}
                onChange={changeHandler}
                />

                <label>Metascore</label>
                <input 
                type='text'
                name="metascore"
                value={updatedMovie.metascore}
                onChange={changeHandler}
                />

                <label>Star of the Movie</label>
                <input 
                type='text'
                name="Stars"
                value={updatedMovie.Stars}
                onChange={changeHandler}
                />
                <button>ADD</button>
            </form>
        </div>
    )
}

export default UpdateMovie