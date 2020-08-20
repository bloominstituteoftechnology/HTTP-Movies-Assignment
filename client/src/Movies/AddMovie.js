import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
    id: undefined,
    title: '',
    director: '',
    metascore: undefined,
    stars: [],
};

const AddMovie = (props) => {
    const [item, setItem] = useState(initialItem);
    const { push } = useHistory();
    
const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    debugger
    if (ev.target.type === "number") {
        value = parseInt(value, 10);
    }
    // //make the string starts into an array of strings
    // debugger
    // if (ev.target.name === 'starts') {
    //     value = value.stars.split(',')
    // }

    setItem({
        ...item,
        [ev.target.name]: value
    });
};
const handleSubmit = (e) => {
    e.preventDefault();
    //change the starts string into an array of starts
    const startList = item.stars.split(',') //cannot add this to the state because async makes state, and axios go first, and adding async and wait adds significan boiler plate.
    const newMovie = { ...item, stars: startList }
    debugger

    // make a POST request to edit the item
    axios
        .post(`http://localhost:5000/api/movies`, newMovie) //updates the server database
        .then((resp) => {
            // it returns the item
            console.log(`AddMovie post request -- ${resp.data}`);

            props.setMovieList(resp.data); //updates the UI. this api sends back the whole list of items so we can just update the index.js state so it updates the GUI in the whole app
            console.log(`AddMovie post request -- ${props.movieList}`);
            setItem(initialItem)
            push(`/`);
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

            <input
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="Add stars separate by commans"
                value={item.stars}
            />
            <div className="baseline" />

            <button className="md-button form-button">Update</button>
        </form>
    </div>
);
};

export default AddMovie;
