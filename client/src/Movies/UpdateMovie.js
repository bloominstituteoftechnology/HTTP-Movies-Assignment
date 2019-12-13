import React, { useState} from 'react';
import Axios from 'axios';

const UpdateMovie = props => {

    const [movie, setMovie] = useState({id: props.match.params.id});

    const handleChange = e => {

        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
        });
        console.log(movie);
    };
    

    const handleSubmit = e => {

        e.preventDefault();
        
        const movieFormatter = {
            ...movie,
            stars: movie.stars.split(", "),
        }
       
        Axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movieFormatter)
        .then(reponse => {
            console.log(reponse);
            document.querySelector('form').reset();
            props.history.push("/")
        })
        .catch( error => {
            console.log(error);
        });
    

    };
  
  return (
    <div className="movie-card">

        <p>Fill out the form here to update a movie, if adding more then one 
            star separate each star with a comma followed by a space</p>

        <form onSubmit={handleSubmit}>
            <input
            placeholder="Movie Name"
            name="title"
            onChange={handleChange}/>
             <input
            placeholder="Director"
            name="director"
            onChange={handleChange}/>
             <input
            placeholder="Metascore"
            name="metascore"
            onChange={handleChange}/>
             <input
            placeholder="Stars"
            name="stars"
            onChange={handleChange}/>
            <button type="submit">Update</button>
        </form>
    </div>
  );
};

export default UpdateMovie;