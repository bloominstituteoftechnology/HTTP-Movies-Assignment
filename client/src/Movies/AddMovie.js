import React, { useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const initialAddValue = {
    title: '',
    director: '',
    metascore: '',
};

const AddMovie = (props) => {
    const [addMovie, setAddMovie] = useState(initialAddValue);
    const { push } = useHistory();

    const handleChange = e => {
        setAddMovie({
            ...addMovie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies`, addMovie)
        .then(res => {
            props.setMovieList(res.data);
            push('/');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='addMovie'>
            <h2>Add a Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                name='title'
                onChange={handleChange}
                placeholder='Add Movie Title'
                value={addMovie.title}
                />
                <input 
                type='text'
                name='director'
                onChange={handleChange}
                placeholder='Add Movie Director'
                value={addMovie.director}
                />
                <input 
                type='text'
                name='metascore'
                onChange={handleChange}
                placeholder='Add Insert metascore'
                value={addMovie.metascore}
                />
                <button className='addButton'>Add Movie</button>
            </form>
        </div>
    )
}



export default AddMovie;