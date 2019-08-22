import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateMovie = props => {
    const [update, setUpdate] = useState(initialItem);

    useEffect(()=>{///component did mount
        const id = props.match.params.id
    })

    
    setUpdate({
        ...update,
        [ev.target.name]: value
      });

  const changeHandler = e => {
      e.preventDefault();
      setUpdate({...update, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/update-movie/${props.match.params.id}`, update )
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err.response)
    })
    props.history.push('/')
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
          onChange={changeHandler}
          value={update.stars}
        />
        <button className="form-button">Update Movie</button>
      </form>
    </div>
  );
}


export default UpdateMovie;
