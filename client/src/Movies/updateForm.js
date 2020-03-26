// the form is use to update the chosen movie
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: 0,
    stars: []
};

const UpdateForm = props => {
    // get the params and history objects
    const { id } = useParams();

    const [movie, setMovie] = useState(initialMovie);

    const changeHandler = event => {
        event.persist();
        let value = event.target.value;
        if (event.target.name === 'metascore') {
            value = parseInt(value, 10);
        }
        if (event.target.name === 'stars') {
            value = value.split(',');
        }

        setMovie({
            ...movie,
            [event.target.name]: value
        });
    };

    //****** Find the item and set it to state ******//
    //get the id from params
    //loop through the movie list to find the item
    //set the movie to state to pre-populate the form\
    useEffect(() => {
        const movieToUpdate = props.movies.find(element => `${element.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    } , [props.movies, id]);//why 2 dependencies
    //****** Find the item and set it to state ******//

    const handleSubmit = e => {
        console.log("Submit was clicked");
        e.preventDefault();

        //****** Make the PUT request to the server when submit *********/
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log("Axios call worked");
                //update state in App through the setter function
                //navigate user to the movie page (or to the shop)
                // (Potentially, you could just show a success message without navigating)
                props.setMovie(res.data);
                props.history.push("/");
            })
            .catch(err => console.log(err));
            //*******make the PUT request*********/
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit} className="form">
                <span>Title:</span> <input type="text" name="title" placeholder="title" onChange={changeHandler} value={movie.title} />
                <span>Name: </span><input type="text" name="director" placeholder="name" onChange={changeHandler} value={movie.director} />
                <span>Metascore:</span> <input type="text" name="metascore" placeholder="metascore" onChange={changeHandler} value={movie.metascore} />
                <span>Stars:</span> <input type="text" name="stars" placeholder="stars" onChange={changeHandler} value={movie.stars} />
                <span></span><input type="submit"  />
                
            </form>
        </div>
    );

};

export default UpdateForm;

