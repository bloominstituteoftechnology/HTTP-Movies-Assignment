import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios' 

const initialValues = {
id:'',
title:'',
director:'',
metascore:null,
stars:[]
}

const UpdateMovie = (props) => {
    const {push} = useHistory()
    const [movie, setMovie]= useState(initialValues)
    const {id} =useParams()

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            console.log('RES IN UPDATE REQUEST:', res)
            setMovie(res.data)
        })
        .catch((err) => {
            console.log('couldnt get movies in updateForm,',err)
        })
    }, [])

    const handleChange= (e) =>{
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

const handleSubmit =(e) => {
    e.preventDefault()
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie )
    .then((res) =>{
        console.log('RES AFTER UPDATING:',res)
        props.setMovieList(props.movieList.map(item =>{
                if(item.id===res.data.id) {
                    return res.data
                } else{ 
                    return item
                }
        }))
        setMovie({
            title: '',
            director: '',
            metascore: null,
            stars: []
        })
        push(`/movies/${movie.id}`)
        // push('/'), above option allows you to go back to card
    })
    .catch((err) => {
        console.log('')
    })
}




    return (
        <div className='Update-Movie'>
            <form onSubmit={handleSubmit}>
                    <label>Title:</label>
                <input name='title' onChange={handleChange} type='text' value={movie.title} placeholder='Movie Title'></input>
                <label>Director:</label>
                <input name='director' onChange={handleChange} type='text' value={movie.director} placeholder='Movie Director Here'></input>
                <label>Metascore:</label>
                <input name='metascore' onChange={handleChange} type='number' value={movie.metascore} placeholder='Metascore Here'></input>
                {/* {movie.stars.map(star =>{
                    return <input 
                    name='stars'
                    key={star}
                    value={star}
                    type='text'
                    onChange={handleChange}                    
                    >
                    </input>
                })} */}
                <button>Update Movie!</button>
            </form>
        </div>
    )
}

export default UpdateMovie;