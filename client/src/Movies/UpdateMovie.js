

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialFormValue = {
    title: "",
    director: "", 
    metascore: 0,
    star: "",
}

const URL = "http://localhost:5000/api/movies"

function UpdateMovie  ({setMovieList})  {
const [formValue, setFormValue] =useState(initialFormValue);

const changeHandler = (evt) => {
    setFormValue({...formValue, [evt.target.name]: evt.target.value});
}

const sumbitHandler = (evt) => {
    evt.preventDefault();
    const newMovie = {
        title: formValue.title.trim(),
        director: formValue.director.trim(), 
        metascore: formValue.metascore.trim(),
        star: formValue.stars.trim(),
    }
    axios.post().then((res) => {
        setMovieList(true);
        console.log(newMovie)
    }).catch(err => console.log('error', err))
    .finally()
}

return (
    <>
    <form onSubmit={sumbitHandler}>
        <input
        name="title"
        type="text"
        value={formValue.title}
        onChange={changeHandler}
        placeholder="Movie Title Here"
        ></input>

<input
        name="director"
        type="text"
        value={formValue.director}
        onChange={changeHandler}
        placeholder="Movie Director Here"
        ></input>

<input
        name="metascore"
        type="number"
        value={formValue.metascore}
        onChange={changeHandler}
        placeholder="Movie Score Here"
        ></input>

<input
        name="star"
        type="text"
        value={formValue.star}
        onChange={changeHandler}
        placeholder="Movie Star Here"
        ></input>
        <button>Add Movie!</button>
    </form>
    
    </>
)

}

export default UpdateMovie