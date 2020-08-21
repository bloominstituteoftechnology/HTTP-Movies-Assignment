import React, { useState } from 'react';
import axios from "axios";


function AddMovie(props) {
    console.log(props)
    const { add, setAdd} = useState({
        id: "",
        title: "",
        metascore: "",
        stars: ""
    })
   
      hangleChange = e => {
        setMovie({
            ...add, 
            [e.target.name]: e.target.value
        });
    }

      handleSubmit = e => {
        e.preventDefault();
        axios
            .post(`http://localhost/api/movies`, add)
            .then(res => {props.history.push('/')})
            .catch( err => console.log(err)) 
        }  
    
  

    return (
        <div> 
            <form onSubmt={handleSubmit}> 
            <h1>{add.title}</h1>
      <p>{add.director}</p>
      <p>{add.metascore}</p>
      <p>{add.stars}</p>
      <input
        name='title'
        placeholder='Title'
        value={add.title}
        onChange={handleChange}
      />
      <input
        name='director'
        placeholder='Director'
        value={add.director}
        onChange={handleChange}
      />
      <input
        name='metascore'
        placeholder='Metascore'
        value={add.metascore}
        onChange={handleChange}
      />
      <input
        name='stars'
        placeholder='Stars'
        value={add.stars}
        onChange={handleChange}
      />
    </form>
</div>
  );
};

export default AddMovie;
                 
