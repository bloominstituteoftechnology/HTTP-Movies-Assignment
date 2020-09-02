import React, {useState, useEffect} from "react";
import {useParams, useHistory} from 'react-router-dom';
import axios from "axios";

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

export default function MovieForm(props) {
    const [movie, setMovie] = useState(initialMovie);
    const {id} = useParams();
    const history = useHistory();
    
    useEffect(()=> {
        axios.get(`http://localhost:5000/api/movies/${id}`)
              .then(res=> setMovie(res.data))
              .catch(err => console.log(err))
    },[id])

    const changeHandler = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`,movie)
            .then(()=> {
                props.getMovieList();
                props.history.push(`/movies/${id}`);
            })
            .catch(err => console.log(err))
      }

    const deleteHandler = e => {
        e.preventDefault();
        axios.delete(`http://localhost:5000/api/movies/${id}`)
        .then(() => {
            props.getMovieList();
            props.history.push('/')
        })
    }

    return (
        <div>
            <h1>Update Movie</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movie.title}
                     />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movie.director} />

                <input
                    type="number"
                    name="metascore"
                    id="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movie.metascore} />

                <input
                    type="string"
                    name=""
                    onChange={changeHandler}
                    placeholder='stars'
                    value={movie.stars}
                    />  

                <button>Update</button>
            </form>
            <button onClick={deleteHandler}>delete</button>
        </div>
    );
};


