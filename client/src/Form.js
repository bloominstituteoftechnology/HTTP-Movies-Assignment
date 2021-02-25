import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: null,
    stars: [],
}

const updateMovie = (props) => {
    const { push } = useHistory();
    const id = useParams();
    const [movie, setMovie] = useState(initialState)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovie(res.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    const changeHandler = event => {
        setMovie({...movie, [event.target.name]: [event.target.value]})
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
             .then(res => {
                 props.setMovieList(props.movieList.map(movieItem => {
                     if(movieItem.id === res.data.id) {
                         return res.data
                     } else {
                         return movieItem
                     }
                 }))
                 setMovie(initialState)
                 push(`/movies/${movie.id}`)
             })
             .catch(err => 
                {console.log(err.response)
                })
    }

    return(
        <div>
            <h1> Update Movie </h1>
            <form>
                <input />
                <input />
                <input />
                <button>Update This Movie</button>
            </form>
        </div>
    )


}

export default updateMovie;