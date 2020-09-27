import React, { useState, useEffect } from 'react';
import {  useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}
const UpdateMovie = props => {
    const { push } = useHistory();
    const { id } = useParams();
    const [movie, setMovie] = useState(initialMovie)

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    },[id])

    const changeHandler = e => {
        e.preventDefault();
        let value = e.target.value;
        if(e.target.name === 'metascore'){
            value = parseInt(value, 10)
        }
        if(e.target.name === 'stars') {
            value = value.split(',')
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios  
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                //res.data
                // props.setMovieList([...props.movieList, res.data])
                push(`/movies/${id}`)
            })
            .catch(err => console.log(err))
            .finally(() => {
                props.refreshHandler()
            }
            )
    }


    return (
        <>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                    type='text'
                    name='title'
                    placeholder='title'
                    value={movie.title}
                    onChange={changeHandler}
                />
                <label>Director</label>
                <input 
                    type='text'
                    name='director'
                    placeholder='director'
                    value={movie.director}
                    onChange={changeHandler}
                />
                <label>Metascore</label>
                <input 
                    type='number'
                    name='metascore'
                    placeholder='metascore'
                    value={movie.metascore}
                    onChange={changeHandler}
                />
                <label>Stars</label>
                <input 
                    type='text'
                    name='stars'
                    placeholder='stars'
                    value={movie.stars}
                    onChange={changeHandler}
                />
                <button>Update</button>
            </form>
        </>
    )

}
export default UpdateMovie