import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
    const { id } = useParams()
    const history = useHistory();

    const fetchMovie = () => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => setUpdatedMovie(res.data))
          .catch((err) => console.log(err.response));
      };
    
      useEffect(() => {
        fetchMovie();
      }, [id]);

      const submitHandler = e => {
          e.preventDefault();
          props.setIsFetching(true)
          axios
          .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
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
            <h2>Update Movie</h2>
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
                <button>UPDATE</button>
            </form>
        </div>
    )
}

export default UpdateMovie