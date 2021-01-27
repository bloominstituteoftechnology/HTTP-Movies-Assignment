import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


function UpdateMovie(props){
    const { id } = useParams();
    const movieId= parseInt(id)
    console.log(props.movies)
    console.log(id)

    const [movie, setMovie] = useState({})

    useEffect(()=>{
        props.movies.find(movie=>{
            if(movie.id === movieId){
                setMovie(movie)
            }
        })
    },[props.movies])
    
    function handleChange(e){
        const name = e.target.name;
        let value = e.target.value;
        if(name === "metascore"){
            value = parseInt(value);
        }
        setMovie({
            ...movie,
            [name]: value
        })
    }

    function submitEdit(e){
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies${id}`)
        .then(res=>{
            console.log(res)
        })
        .catch(drama=>{
            console.log(drama)
        })
    }

return(
    <div>
        <h3>Updating: {movie.name}</h3>
        <form onSubmit={submitEdit}>
            <input name="title" type="text" onChange={handleChange} value={movie.title}/>
            <input name="director" type="text" onChange={handleChange} value={movie.director}/>
            <input name="metascore" type="text" onChange={handleChange} value={movie.metascore}/>
        <button>Edit</button>
        </form>
    </div>
)
}
export default UpdateMovie