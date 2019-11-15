import React,{ useState, useEffect } from 'react';

import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []

}
const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie)

useEffect(() => {
    const editThisMovie = props.movies.find(
        item => `${item.id}` === props.match.params.id
    )

    if(!editThisMovie) {
        return
    } else {
        setMovie(editThisMovie)
    }

}, [props.movies, props.match.params.id])

const handleChanges = e => {
    e.persist()
    let value = e.target.value
    // if(e.target.name === 'metascore'){
    //     value = parseInt(value, 10)
    // }
    setMovie({
        ...movie, 
        [e.target.name]: value
    })
}

const handleSubmit = e => {
    e.preventDefault()
    axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {

            const updatedList = props.movies.map(item => {
                if(item.id === movie.id) {
                    return item = res.data
                } else {
                    return item
                }
            })
            props.setMovies(updatedList)
        })
        .catch(err => console.log(err))

    props.history.push('/');
}

    return (
        <div className="movie-cardupdate">
        <form onSubmit={handleSubmit}>   
        <input
            type='text' 
            name='title'
            value={movie.title}
            onChange={handleChanges}
            placeholder='title'
            className='update-card'
        />
        <input
            type='text' 
            name='director'
            value={movie.director}
            onChange={handleChanges}
            placeholder='director'
            className='update-card'
        />
        <input 
            type='text'
            name='metascore'
            value={movie.metascore}
            onChange={handleChanges}
            placeholder='metascore'
            className='update-card'
        />
        <input
            type='text' 
            name='stars'
            value={movie.stars}
            onChange={handleChanges}
            placeholder='stars'
            className='update-card'
        />
        <button className='edit-button'>Edit</button>
        </form> 
       
        </div>

    )
}

export default UpdateMovie;