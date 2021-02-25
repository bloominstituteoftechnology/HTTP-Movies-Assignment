import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialData ={
    title:'',
    director:'',
    metascore:'',
    stars:''
}

const UpdateMovie = (props) => {
    const[newMovie, setNewMovie] = useState(initialData)

    const {id} = useParams();
    const {push} = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
            console.log(res)
            setNewMovie(res.data)
        })
        .catch(err=>{console.log(err)})
    }, [])

    const changeHandler =(e)=>{
        setNewMovie({
            ...newMovie,
            [e.target.name]:e.target.value,
        })
    }
    console.log(props)

    const handleSubmit = e =>{
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, newMovie)
        .then(res=>{
            props.setMovieList(res.data);
            push(`/movies/${id}`);
        })
        .catch(err=>{console.log(err)})
    }


    return(
        <div>
            <h1>Hello</h1>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                onChange={changeHandler}
                placeholder='title' 
                value={newMovie.title}   
                />
                  <input
                type='text'
                name='director'
                onChange={changeHandler}
                placeholder='director' 
                value={newMovie.director}   
                />
                  <input
                type='number'
                name='metascore'
                onChange={changeHandler}
                placeholder='metascore' 
                value={newMovie.metascore}   
                />
                  <input
                type='text'
                name='stars'
                onChange={changeHandler}
                placeholder='stars' 
                value={newMovie.stars}   
                />

                <button>UPDATE</button>
            </form>
        </div>
    )
}

export default UpdateMovie