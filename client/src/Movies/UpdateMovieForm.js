import React, {useState, useEffect} from 'react';
import axios from 'axios';





const UpdateMovieForm = (props) => {
    console.log('props', props)
    const [movie, setMovie] = useState({
            id: '',
            title: '',
            director: '',
            metascore: '',
            stars: []
        
    });

    const id = props.match.params.id;

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(responce => setMovie(responce.data))
        //.then(responce => console.log("responce", responce.data))
        .catch(error =>(error))
        console.log(movie)
    }, []);


const changeHandler = (e) => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
      id:id
      
    });
    console.log(movie);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(responce => {
        console.log('movie',responce);
        setMovie(responce.data);
        props.history.push(`/movies/${movie.id}`); //`${id}`
      })
      .catch(err => {
        console.error(err);
      });
  };
    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={movie.title}
                    onChange={changeHandler}
                />
                <input
                    type='text'
                    name='director'
                    placeholder='director'
                    value={movie.director}
                    onChange={changeHandler}
                />
                <input
                    type='text'
                    name='metascore'
                    placeholder='metascore'
                    value={movie.metascore}
                    onChange={changeHandler}
                />
                <input
                    type='text'
                    name='stars'
                    placeholder='stars'
                    value={movie.stars}
                    onChange={changeHandler}
                />
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}


export default UpdateMovieForm;