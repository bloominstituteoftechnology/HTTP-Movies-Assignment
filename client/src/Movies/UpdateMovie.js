import React, { useState, useEffect } from "react";
import axios from "axios";


const UpdateMovie = props => {
    const initialItem = {
        id: props.match.params.id,
        title: "",
        director: "",
        metascore: "",
    };

    const [stars, setStars] =useState([]);
    const [update, setUpdate] = useState(initialItem);
    console.log('update',update)

  const changeHandler = e => {
      e.preventDefault();
      setUpdate({...update, [e.target.name]: e.target.value })
  }

  const changeHandlerStars = e => {
    e.preventDefault();
    setStars({...stars, [e.target.name]: [e.target.value] })
}

const data={
    ...update,
    ...stars
}
console.log('data', data)

  const handleSubmit = e => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${props.match.params.id}`, data )
    .catch(err => {
        console.log(err.response)
    })
    props.history.push('/')
    window.location.href = window.location.href
  }

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          value={update.title}
        />
        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          value={update.metascore}
        />
        <input
          type='text'
          name="director"
          onChange={changeHandler}
          value={update.director}
        />
        <input
          type="array"
          name="stars"
          onChange={changeHandlerStars}
          value={update.stars}
        />
        <button className="form-button">Update Movie</button>
      </form>
    </div>
  );
}


export default UpdateMovie;
