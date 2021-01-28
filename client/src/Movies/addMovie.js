import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import MovieList from './MovieList';


const initialNewValue = {
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: []
}

const AddMovie = (props) => {
    const {push} = useHistory();
    const {id} = useParams();
    const [movie, setMovie] = useState(initialNewValue);


    const handleChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies`, movie)
        .then(res => {
            console.log(res.data)
            props.getMovieList();
            setMovie(initialNewValue)
            push(`/`)
        })
    }
    return (
        <div className='Update-Movie'>
            <form onSubmit={handleSubmit}>
               
            <label>Title:</label>
                <input name='title' onChange={handleChange} type='text' value={movie.title} placeholder='Movie Title'></input>
                <label>Director:</label>
                <input name='director' onChange={handleChange} type='text' value={movie.director} placeholder='Movie Director Here'></input>
                <label>Metascore:</label>
                <input name='metascore' onChange={handleChange} type='number' value={movie.metascore} placeholder='Metascore Here'></input>
                {/* {movie.stars.map(star =>{
                    return <input 
                    name='stars'
                    key={star}
                    value={star}
                    type='text'
                    onChange={handleChange}                    
                    >
                    </input>
                })} */}
                <button>Add Movie!</button>
            </form>
        </div>
    )
}

export default AddMovie;