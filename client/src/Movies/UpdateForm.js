import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateForm = props => {

    const [ movie, setMovie ] = useState(initialMovie);

    useEffect(() => {
        const movieToEdit = props.movies.find(
          movie => `${movie.id}` === props.match.params.id
        );
    
        if (movieToEdit) setMovie(movieToEdit);
      }, [props.movies, props.match.params.id]);

    const changeHandler = e => {
        e.persist()
        if(e.target.name === "stars") {
            setMovie({
                ...movie,
                [e.target.name]: [e.target.value]
            })
        } else {
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
            }) 
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.updateMovieList(res.data);
                props.history.push(`/`);
            })
            .catch(err => {
                console.log(err)
            })
    }

    console.log(movie, movie.id)

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                   type="text"
                   name="title"
                   onChange={changeHandler}
                   placeholder="title"
                   value={movie.title} 
                />
                <input 
                   type="text"
                   name="director"
                   onChange={changeHandler}
                   placeholder="director"
                   value={movie.director} 
                />
                <input 
                   type="number"
                   name="metascore"
                   onChange={changeHandler}
                   placeholder="metascore"
                   value={movie.metascore} 
                />
                <input 
                   type="text"
                   name="stars"
                   onChange={changeHandler}
                   placeholder="stars"
                   value={movie.stars} 
                />
                <button>Submit</button>
            </form>
        </div>

    )
}

export default UpdateForm;