import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Form, Input, Button, Icon } from 'semantic-ui-react';

const initialState = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovie = props => {
  const [state, setState] = useState(initialState);
  // console.log(props);

  useEffect(() => {
    fetchMovie(props.match.params.id);
  }, [props.match.params.id]);

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setState(res.data))
      .catch(err => console.log(err.response))
  }

  const handleChange = e => {
    e.persist();
    setState({
      ...state, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${state.id}`, state)
      .then(() => props.history.push(`/movies/${state.id}`))
      .catch(err => console.log(err))
  }

  const handleDelete = id => {
    setState({
      ...state,
      stars: state.stars.filter(star => star !== id)
    });
  }

  const handleAdd = () => {
    setState({
      ...state,
      stars: [...state.stars, '']
    })
  }

  const handleChanges = i => e => {
    setState({
      ...state,
      stars: state.stars.map((star, id) => {
        return id === i ? e.target.value : star;
      })
    })
  }

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <Input
              type="text"
              name="title"
              value={state.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Director</label>
            <Input
              type="text"
              name="director"
              value={state.director}
              onChange={handleChange}
              placeholder="Director"
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Metascore</label>
            <Input
              type="number"
              min="0"
              max="100"
              name="metascore"
              value={state.metascore}
              onChange={handleChange}
              placeholder="Metascore"
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Actors</label>
            {state.stars.map((star, id) => (
              <div key={id}>
                <Input
                  type="text"
                  name="stars"
                  key={id}
                  value={star}
                  onChange={handleChanges(id)}
                  placeholder="Stars"
                  required
                />
                <Button onClick={() => handleDelete(star)} color="red">
                  <Icon name="trash" />
                </Button>
              </div>
            ))}
            <Button onClick={handleAdd} positive>
              <Icon name="plus" />
              Add Actor
            </Button>
          </Form.Field>
          <Button color="yellow">Update</Button>
        </Form>
      </div>
    </div>
  );
}

export default UpdateMovie;