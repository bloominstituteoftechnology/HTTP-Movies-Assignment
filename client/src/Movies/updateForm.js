// the form is use to update the chosen movie
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',//? it should be a number type
    starts: "" //? it should be an array
};

const updateForm = props => {
    // get the params and history objects
    const { id } = useParams();
    const { push } = useHistory();

    const [movie, setMovie] = useState(initialMovie);

    const changeHandler = event => {
        event.persisit();
        let value = event.target.value;
        if (event.target,name === 'title') {//not sure the 'title' ?
            value = parseInt(value, 10);//not sure '10' ?
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
        const movieToUpdate = props.movies.find(element => `{element.id}` === id);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    } , [props.movies, id]);//why 2 dependencies
    //****** Find the item and set it to state ******//

    const handleSubmit = e => {
        e.preventDefault();

        //****** Make the PUT request to the server when submit *********/
        axios
            .put(`http://localhost:5000/movies/${id}`, movie)
            .then(res => {
                //update state in App through the setter function
                //navigate user to the movie page (or to the shop)
                // (Potentially, you could just show a success message without navigating)
                props.setMovie(res.data);
                push(`/movie-list/${id}`);
            })
            .catch(err => console.log(err));
            //*******make the PUT request*********/
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="title" onChange={changeHandler} value={movie.title} />
                <input type="text" name="name" placeholder="name" onChange={changeHandler} value={movie.name} />
                <inpit type="text" name="metascore" placeholder="metascore" onChange={changeHandler} value={movie.metascore} />
                <input type="text" name="starts" placeholder="starts" onChange={changeHandler} value={movie.starts} />
                
            </form>
        </div>
    );

};

export default updateForm;

