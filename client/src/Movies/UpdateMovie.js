import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


const initialItem = {
	title: "",
	director: "",
	metascore: "",
	stars: []
};

const UpdateMovie = props => {
    const  {push} = useHistory();
    const {id} = useParams();
    const [movie, setMovie] = useState(initialItem)

    useEffect(() =>{
        const movieToUpdate = props.movieList.find(thing => `${thing.id}` === id);

        if(movieToUpdate){
            setMovie(movieToUpdate);
        }
    }, [props.setMovie, id])

    const changeHandler = e => {
        e.persist();
        let targetValue = e.target.value

        if(e.target.name === 'metascores'){
            targetValue = parseInt(targetValue, 10);
        }else if (e.target.name === 'stars'){
            targetValue = targetValue.split(',')
        }

        setMovie({
            ...movie,[e.target.name]: targetValue
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log(res)
            props.getMovieList();
            push(`/movies/${id}`);
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <h2>Update Movie</h2>

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
                    value={movie.director}
                />


                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movie.metascore}
                />


                <input
                    type="string"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Stars"
                    value={movie.stars}
                />

                <button type="submit">Edit</button>
            </form>

        </>
    )
}

export default UpdateMovie;
