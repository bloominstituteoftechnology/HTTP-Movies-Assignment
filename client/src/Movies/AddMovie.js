import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const initialValue = {
    id: 5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: '80',
    stars: []
};



const AddMovie = ({ setMovieList }) => {
const [someState, setSomeState] = useState(initialValue);
const { push } = useHistory();

const handleChanges = (e) => {
    setSomeState({
        ...someState,
        [e.target.name]: e.target.value  
    })
}

const handleSubmit = (e) => {
    e.preventDefault();
    axios
        .post('http://localhost:5000/api/movies', someState)
        .then(res => {
            console.log(res);
            setMovieList(res.data);
          
        })
        .catch(err => {
            console.log(err);
        })
        push("/");
}
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                onChange={handleChanges}
                placeholder='title'
                value={someState.title}
                />
                <input
                type='text'
                name='director'
                onChange={handleChanges}
                placeholder='director'
                value={someState.director}
                />
               <input
                type='text'
                name='metascore'
                onChange={handleChanges}
                placeholder='metascore'
                value={someState.metascore}
                />
                <input
                type='text'
                name='stars'
                onChange={handleChanges}
                placeholder='stars'
                value={someState.stars}
                />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddMovie;