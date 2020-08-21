import React, { useState } from 'react';
import axios from "axios";


function AddForm(props) {
    console.log(props)
    const [ movie, setMovie ] = useState({
        id: "",
        title: "",
        metascore: "",
        stars: []
    })
   
     const hangleChange = e => {
        setMovie({
            ...movie, 
            [e.target.name]: e.target.value
        });
    }

     const handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`http://localhost/api/movies`, add)
            .then(res => {props.history.push('/')})
            .catch( err => console.log(err)) 
                // alert("Whoops our bad, an error occured :/")
    }
    
  

    return (
        <div> 
            <form onSubmt={handleSubmit}> 
            <h2><props.movie.id</h2>
                 
            </form>
        </div>
    )
}

export default AddForm;
