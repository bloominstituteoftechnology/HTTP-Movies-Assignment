import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMovie = ({ getMovieList }) => {
    const initialData = {
        title: "",
        director: "",
        metascore: "",
        stars: {
            star1: ""
        }
    }
    const initialStarData = ['star1']
    const [ data, setData ] = useState(initialData)
    const [ stars, setStars ] = useState(initialStarData)
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleOnStarsChange = (e) => {
        setData({ ...data, stars: { ...data.stars, [e.target.name]: e.target.value} })
    }
    const handleAddStars = e => {
        e.preventDefault();
        setStars([...stars, `$star${stars.length}`])
    }
    const handleOnSubmit = e => {
        e.preventDefault();
        
        let starsString = Object.keys(data.stars).map(star => (`${data.stars[star]},`)).join("")
        axios
        .post("http://localhost:5000/api/movies", {
            ...data,
            stars: starsString
        })
        .then(res => {
            console.log(res)
            getMovieList()
        })
        .catch(err => console.log(err))
        setData(initialData)
        setStars(initialStarData)
    }
  return (
    <form onSubmit={handleOnSubmit}>
      <h2>Add Movie</h2>
      <label>Title</label>
      <input  type="text" onChange={handleOnChange} value={data.title} name="title"/>
      <label>Director</label>
      <input  type="text" onChange={handleOnChange} name="director" value={data.director}/>
      <label>Metascore</label>
      <input  type="text" onChange={handleOnChange} name="metascore" value={data.metascore}/>      
      <label>Stars</label>
      {stars.map((star, i) => <input key={i} type="text" onChange={handleOnStarsChange} name={`star${stars.length}`} value={data.stars[`star${stars.length}`]} />)}
      <button type="button" onClick={(e) => handleAddStars(e)}>Add more stars</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddMovie;
