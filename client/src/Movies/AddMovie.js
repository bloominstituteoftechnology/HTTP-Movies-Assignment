import React, { useState} from "react";
import axios from "axios"
import { useHistory } from "react-router-dom"


  const AddMovie = (props) =>{

    const initialMovies = {
        id: '',
        title: '',
        director: '',
        metascore:'' ,
        stars: [],
      }

    const [movie, setMovie] = useState(initialMovies);
    const  { push } = useHistory();

    const updateMovies = () => {
        axios.get('http://localhost:5000/api/movies')
            .then(res => {
                console.log(res);
                props.setMovieList(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }
    const handleChange = (e) => {
        if(e.target.name === 'stars')  {

            const array = e.target.value.split(',');
            console.log(array);
            setMovie({
                ...movie,
                stars: array
            })
        } else {
            setMovie({
                ...movie,
                [e.target.name]: e.target.value
            })
        }

    };


    const postMovie = e =>{
        e.preventDefault();
        axios.post('http://localhost:5000/api/movies/', movie)
        .then(addedMovie =>{
            console.log(addedMovie)
            updateMovies();
        })
        .catch(err =>{
            console.log("post error",err)
        })
        push('/');
        
    }
    return(
        <div>
            <h2>Add Movie</h2>
            <form className="add-form" onSubmit={postMovie}>
            <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            placeholder="title"
            value={movie.title}
            />
            <input
            type="text"
            id="director"
            name="director"
            onChange={handleChange}
            placeholder="director"
            value={movie.director}
            />
            <input
            type="text"
            id="metascore"
            name="metascore"
            onChange={handleChange}
            placeholder="metascore"
            value={movie.metascore}
            />
            <input
            type="text"
            id="stars"
            name="stars"
            onChange={handleChange}
            placeholder="stars"
            value={movie.stars}
            />
<button className="add-button" >
        Add Movie
      </button>

            </form>
            
         
        </div>
    )
  
}


export default AddMovie;