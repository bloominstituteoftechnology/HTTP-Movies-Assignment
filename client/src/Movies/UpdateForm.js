import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};


const UpdateForm = props => {
    const { push } = useHistory(); 
    const { id } = useParams();  
    const [ movieValues, setMovieValues] = useState(initialValues);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log(res);
            setMovieValues(res.data);

        })
        .catch(err => {
            console.log(err); 
        })
    }, [])

const changeHandler = e => {
    let name = e.target.name; 
    let value = e.target.value; 

    setMovieValues({
        ...movieValues,
        [name]: value, 
    })
}

const handleSubmit = e => {
    e.preventDefault();

    axios.put(`http://localhost:5000/api/movies/${id}`, movieValues)
        .then(res => {
            console.log(res);
            setMovieValues(initialValues); 
            push('/');
            props.setRefresh(true); 
        })
        .catch(err => {
            console.log(err);
        })
}


  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movieValues.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movieValues.director}
        />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movieValues.metascore}
        />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movieValues.stars}
        />

        <button>Update</button>
      </form>
    </div>
  )

}

export default UpdateForm