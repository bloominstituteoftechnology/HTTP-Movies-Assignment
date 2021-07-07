import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

 const UpdateForm = props => {
  console.log(props)

  const intialState = {
    title: '',
    director: '',
    metascore: 0,
    stars: []
  }
  // setting state
    const [formState, setFormState] = useState(intialState);
    let { push } = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5500/api/movies/${id}`)
            .then(res => {
                setFormState(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    
    const onChange = e => {
        setFormState({ ...formState, 
          [e.target.name]: e.target.value,
          })}

    const handleSubmit = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5500/api/movies/${id}`, formState)
            .then(res => {
                props.setRefresh(true)
                push(`/movies/${id}`)
            })
    }


    return (
      <div>
      <h2>Update Movie List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={onChange}
          placeholder="title"
          value={formState.title}
        />
        <input
          type="text"
          name="director"
          onChange={onChange}
          placeholder="director"
          value={formState.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={onChange}
          placeholder="metascore"
          value={formState.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={onChange}
          placeholder="stars"
          value={formState.stars}
        />
        <button type="submit">Submit</button>
        </form>
      </div>
    )
}

export default UpdateForm;
