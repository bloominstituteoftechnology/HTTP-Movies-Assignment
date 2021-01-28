import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialFormValues = {
    id:"",
    title: '',
    director: '',
    metascore: 0,
    stars: [],
}

function UpdateMovie(props) {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialFormValues)
    const  id = props.location.updateProps.id

    useEffect(() => {
        console.log(props.location)
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=> {
            console.log(res)
            setMovie(res.data)
        })
        .catch(err => {
            console.log(err)
    })
}, []);

const changeHandler = (evt) => {
    evt.persist();
    let value = evt.target.value;
    if (evt.target.name === "metascore") {
        value = parseInt(value, 10)
    }

    
    
    if (evt.target.name !== "star") {
        setMovie({
        ...movie,
        [evt.target.name]: value
    })}
    else {
        const starArray = movie.stars
        starArray[evt.target.id] = value
        setMovie(
            {
                ...movie,
                stars: starArray
            }
            )
        } 
}

const submitHandler = evt => {
    evt.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${id}`, movie)
    .then(res=> {
        setMovie(initialFormValues)
        push('/movies')
    })
    .catch(err => {
        console.log(err)
    })
}

    return (
        <form onSubmit={submitHandler}>
            <h1>Update Movie</h1>
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
          placeholder="metascore"
          value={movie.metascore}
        />
        {movie.stars.map((star, id) => {
            return(
                <input
          id={id}      
          type="text"
          name="star"
          onChange={changeHandler}
          placeholder="star"
          value={star}
        />
            )
        })}
        <button>Submit</button>
        </form>
    )
}

export default UpdateMovie