import React, {useState, useEffect} from 'react'
import axios from "axios";


const UpdateMovie = (props) => {
    const [movie, setMovie] = useState({
        id:"",
        title: "",
        director:"",
        metascore: null
    })
        
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(response => {
            setMovie(response.data)
        })
        .catch(error => {
            console.log(error)
        })            
    }, [props.match.params.id])

    const handleChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(response => {
            props.history.push("/")
        })
        .catch(error => {
            console.log(error)
        })
    }
    return(
        <div>
            <h1>Update Movie Info</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placehold="Movie Title" value={movie.title} onChange={handleChange}/>
                <input type="text" name="director" placehold="Movie Director" value={movie.director} onChange={handleChange}/>
                <input type="number" name="metascore" placehold="Movie Metascore" value={movie.metascore} onChange={handleChange}/>
                <input type="text" name="stars" placehold="Movie Stars" value={movie.stars} onChange={handleChange}/>
                  
                <button className="update-save" type="submit">Save</button>
               
            </form>
        </div>
    )
}

export default UpdateMovie;