import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const initMovie={
    id: 0,
    title: "",
    director: "",
    metascore: "",
    stars: [],
    
}
function AddMovie(props){
    const [movie, setMovie] = useState(initMovie);
    const [actor, setActor] = useState("")
    const history = useHistory();

    function handleChange(e){
        if(e.target.name==="stars"){
            setActor(e.target.value)
        }
        else if(e.target.name==="metascore"){
            setMovie({
                ...movie,
                metascore: parseInt(e.target.value)
            })
        }
        else{
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
            })
        }
    }
    function addActor(e){
        e.preventDefault();
        setMovie({
            ...movie,
            stars: [...movie.stars, actor]
        })
        setActor("")
    }
    function submitMovie(e){
        e.preventDefault();
        setMovie({
            ...movie,
            id: Date.now()
        })
        axios.post('http://localhost:5000/api/movies', movie)
        .then(res=>{
            console.log(res)
            props.setList([res.data])
            history.push('/')
        })
        .catch(drama=>{
            console.log(drama);
        })
    }
    return(
        <form>
            <input type="text" name="title" placeholder="title" onChange={handleChange} value={movie.title}/><br/>
            <input type="text" name="director" placeholder="director" onChange={handleChange} value={movie.director}/><br/>
            <input type="number" name="metascore" placeholder="metascore" onChange={handleChange} value={movie.metascore}/><br/>
            <input type="text" name="stars" placeholder="actor" onChange={handleChange} value={actor}/>
            <button onClick={addActor}>Add Actor</button><br/>
            <button onClick={submitMovie}>Submit</button>
        </form>
    )
}
export default AddMovie;