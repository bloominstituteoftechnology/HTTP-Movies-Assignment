import React, {useState, useEffect } from 'react';
import Axios from 'axios';


const UpdateMovie = (props) => {
    const [newInfo, setInfo] = useState()
    const [movie, setMovie] = useState({ title:'' , director:'', metascore:'', stars: [] })



    // const { title, director, metascore, stars } = props.location.state.movie
    
    useEffect(() => {
        if(props.location.state){
        setMovie({...props.location.state.movie})
        }
    }, [props.location.state])


     let updateMovie = (e) => {
         e.preventDefault();
         console.log(movie)
        Axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log(res)
        }).catch(err => {
            console.log('update failed')
        })
    }

    // if(!props.location.state) {
    //     props.history.push('/');
    // }

    let handleMovieChange = e => {
        e.preventDefault();
        setMovie({...movie, [e.target.name]: e.target.value})
    }

console.log(props.location)

// let movie = props.updateThisMovie.find(() => {return props.updateThisMovie.id === props.match.params.id});
// console.log(movie)

//  let movie = movies.filter((item, index) => {
//        return (item[index] === props.match.params.id )
//     })

//     if(movie.id === props.match.params.id) {
//         setInfo(movie)
//     }


    return (
        <form className='update-movie' onSubmit={updateMovie}>
            <input
            type='text'
            value={movie.title}
            name='title'
            placeholder='edit title'
            onChange={handleMovieChange}
            />
            <input
            type='text'
            value={movie.director}
            name='director'
            placeholder='edit director'
            onChange={handleMovieChange}
            />
            <input
            type='text'
            value={movie.metascore}
            name='metascore'
            placeholder='edit metascore'
            onChange={handleMovieChange}
            />
            <input
            type='text'
            value={movie.stars}
            name='stars'
            placeholder='edit actors'
            onChange={handleMovieChange}
            />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default UpdateMovie;