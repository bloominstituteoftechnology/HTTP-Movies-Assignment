import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    actors: ''
};

const UpdateMovieForm = props => {
    console.log(props)
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        const id = props.match.params.id;
        const movieToEdit = props.savedList.find(i => `${i.id}` === id);

        if (movieToEdit) setMovie(movieToEdit)
    }, [props.savedList, props.match.params.id])

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if(e.target.name === 'metascore'){
            value = parseInt(value, 10)
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`)
        .then(res => {
            props.updateList([...setMovie, res.data])
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h1>HELLO</h1>
            <form onSubmit={handleSubmit}>

                <input type="text" name="movie-title" placeholder="Movie Title"
                onChange={handleChanges}
                value={movie.title} />

                <input type="text" name="movie-director" placeholder="Movie Director"
                onChange={handleChanges}
                value={movie.director} />

                <input type="number" name="movie-metascpre" placeholder="Metascore"
                onChange={handleChanges}
                value={movie.metascore} />

                <input type="text" name="movie-actors" placeholder="Actors"
                onChange={handleChanges}
                value={movie.actors} />
                
                <button className='save-button'>
                    Update
                </button>
            </form>
        </div>
    )
}

export default UpdateMovieForm;