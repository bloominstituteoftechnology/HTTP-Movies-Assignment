import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
    id: null,
    title: '',
    director: '',
    metascore: null,
    stars: [],
};

const UpdateForm = (props) => {
    const [item, setItem] = useState(initialItem);
    const { push } = useHistory();
    const { id } = useParams(); //gets the variables that are in the url
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`) //recommended to get the data in this componenet just incase the items from index.js is to be and takes a longer time to loop through it
            .then((resp) => {
                setItem(resp.data);
            })
            .catch((error) => console.log(error));
    }, [id]); //when id changes run this useEffect //why? because the axios get request depends on the id
    const changeHandler = (ev) => {
        ev.persist();
        let value = ev.target.value;
        if (ev.target.type === "number") {
            value = parseInt(value, 10);
        }

        setItem({
            ...item,
            [ev.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item) //updates the server database
            .then((resp) => {
                // it returns the item
                console.log("API response", resp.data);
                // update the changes on a copy of the current UI state
                const updatedMovieList = props.movieList.map( aMovie => {
                    const findChangedMovieById = aMovie.id === item.id
                    if (findChangedMovieById){
                        aMovie = item
                    }
                    return aMovie
                })

                props.setMovieList(updatedMovieList); //updates the UI. this api sends back the whole list of items so we can just update the index.js state so it updates the GUI in the whole app
                push(`/movies/${id}`);
            })
            .catch((error) => console.log(`Handle submit error -${error}`));
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="title"
                    value={item.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="director"
                    value={item.director}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={item.metascore}
                />
                <div className="baseline" />

                {/* Display list of start */}
                {
                    item.stars.map((aStart, index) => {
                        return (
                            <>
                                <input
                                    type="text"
                                    name="stars"
                                    onChange={changeHandler}
                                    placeholder="stars"
                                    value={item.stars[index]}
                                />
                                <div className="baseline" />
                            </>
                        )
                    })
                }


                <button className="md-button form-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateForm;
