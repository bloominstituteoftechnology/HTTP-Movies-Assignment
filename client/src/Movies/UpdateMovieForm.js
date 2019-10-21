import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title:'',
    director:'',
    metascore:'',
    stars: []
  };

const UpdateMovieForm = props => {

    const[movie, setMovie] = useState(initialMovie)
    
    const fetchMovies = id => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(ErrorEvent))
    }

    useEffect(()=> {
        fetchMovies(props.match.params.id)
    }, [props.match.params.id]);

    const handleChange = e => setMovie({...movie, [e.target.name]: e.target.value});

    const handleStar = index => e => {
        setMovie({...movie, stars: movie.stars.map((star, index2) => {
            return index2 === index ? e.target.value: star; 
        })});
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            props.history.push('/');
        })
        .catch(err => console.log(err))
    }

    const addStar = e => {
        e.preventDefault();
        setMovie({...movie, stars: [...movie.stars, ""]});
      };
  
    return(
        <div>
            <form onSubmit={handleSubmit}>
      <input type="text"
             name="title"
             placeholder="title"
             value={movie.title}
             onChange={handleChange} />
      <input type="text"
             name="director"
             placeholder="director"
             value={movie.director}
             onChange={handleChange} />
      <input type="text"
             name="metascore"
             placeholder="metascore"
             value={movie.metascore}
             onChange={handleChange} />
      {movie.stars.map((starName, index) => {
        return <input type="text"
                      placeholder="star"
                      value={starName}
                      key={index}
                      onChange={handleStar(index)} />;
      })}
      <button onClick={addStar}>Add Star</button>
      <button type="submit">Update</button>
    </form>
        </div>
    )
}


export default UpdateMovieForm;