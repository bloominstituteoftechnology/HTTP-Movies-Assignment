import React, {useState} from 'react'
import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';

const MovieUpdate = (props) => {
    const {push} = useHistory();
    const {id} = useParams();

    const [movieValues, setMovieValues] = useState({
        id: 5,
        title: '',
        director: '',
        metascore: 0,
        stars: []
    })

    const onChange = (e) => {
        setMovieValues({
            ...movieValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, movieValues)
        .then((res) => {
            console.log(res)
            props.setMovies([
                ...props.movieList,
                res.data
            ])
            push(`/api/movies/${id}`)
        })
        .catch(err=>console.log(err))

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    Name:
                    <input 
                    name='title'
                    type='text'
                    placeholder='Enter Movie Name'
                    onChange={onChange}
                    value={movieValues.name}
                    />
                </label>
                <label>
                    Director:
                    <input 
                    name='director'
                    type='text'
                    placeholder='Enter Director Name'
                    onChange={onChange}
                    value={movieValues.director}
                    /> 
                </label>
                <label>
                    Metascore:
                    <input 
                    name='metascore'
                    placeholder='Metascore'
                    onChange={onChange}
                    value={movieValues.metascore}
                    />

                </label>
                <label>
                    Stars:
                    <input 
                    name='stars'
                    placeholder='Enter star actors of the film'
                    onChange={onChange}
                    value={movieValues.stars}
                    />
                </label>
                <button onClick={onSubmit}>Add Movie</button>
            </form>
        </div>
    )
}

export default MovieUpdate
