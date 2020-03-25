import React, { useState, useEffect } from 'react';

//import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


function UpdateForm(props) {
    console.log("Update", props);
    let id = props.match.params.id;
    
    const [updateMovie, setUpdateMovie] = useState({
        id: Date.now(),
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const changeHandler = ev => {
        ev.preventDefault();
        // ev.persist();
        // let value = ev.target.value;
        // if(ev.target.name === 'metascore') {
        //     value = parseInt(value, 10);
        // }

        setUpdateMovie({
            ...updateMovie,
            [ev.target.name]: ev.target.value
        });

    };

    const [starState, setStarState] = useState(false);
    const handleStar = e => {
        e.preventDefault();
        setUpdateMovie({...updateMovie, stars: updateMovie.stars.split(", ") });
        setStarState(true);
    };


    useEffect(() => {
       axios
       .get(`http://localhost:5000/api/movies/${id}`)
       .then(res => setUpdateMovie({ ...res.data, stars: res.data.stars.join(" ,")}))
       .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();

        axios
        .put(`http://localhost:5000/movies/${id}`, updateMovie)
        .then(res => {
            props.addToSavedList(res.data);
            props.history.push("/");
        })
        .catch( err => console.log(err));
    }

  return (
      <div>
          <h2>Update Movie</h2>
          <form onSubmit={handleSubmit}>
              <input
              type="text"
              name="title"
              onChange={changeHandler}
              placeholder="Title"
              value={updateMovie.title}
              />
              <input
              type="text"
              name="director"
              onChange={changeHandler}
              placeholder="Director"
              value={updateMovie.director}
              />
              <input
              type="text"
              name="metascore"
              onChange={changeHandler}
              placeholder="Metascore"
              value={updateMovie.metascore}
              />
              <p></p>
                  Stars: {" "}
                  {starState ? (
                      updateMovie.stars 
                  ) : (
                <input
                type="text"
                name="stars"
                onChange={changeHandler}
                placehodler="Stars"
                value={updateMovie.stars}
                />
                )}
              
              
            
            <button type="submit" >Update</button>
          </form>
      </div>
    );  
};

export default UpdateForm;