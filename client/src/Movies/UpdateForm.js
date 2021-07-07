import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    stars: '',
    metascore: ''
}

const UpdateForm = (props) => {
    const { push } = useHistory();
    const { id } = useParams();
    const [ movie, setMovie ] = useState(initialMovie);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);

    const changeHandler = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios  
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                props.setMovieList(props.movieList.map(movieItem => {
                    if(movieItem.id === res.data.id) {
                        return res.data
                    } else {
                        return movieItem
                    }
                }));
                setMovie({
                    title: '',
                    director: '',
                    stars: '',
                    metascore: ''
                })
                push(`/movies/${id}`)
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Movie title'
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={movie.director}
                />
                {/* <input
                    type='number'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='Star Rating'
                    value={movie.stars}
                /> */}
                <input
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='Metascore'
                    value={movie.metascore}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm
