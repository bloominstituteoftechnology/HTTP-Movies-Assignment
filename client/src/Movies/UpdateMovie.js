import React, { useState } from "react";
import { Button, Form, Header, List } from "semantic-ui-react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const UpdateMovie = () => {
  const { id } = useParams();
  const { push } = useHistory();
  const [formData, setFormData] = useState({
    id: `${id}`,
    title: "",
    director: "",
    metascore: "",
    actors:"",
    stars: []
  });
    
  const submitHandler = (event) => {
    event.preventDefault();
    Axios.put(`http://localhost:5000/api/movies/${id}`, formData)
      .then((res) =>  push("/"))
      .catch((err) => console.log(err));

  };


  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const addActorHandler = (event) => {
    event.preventDefault()
    const { stars } = formData;
    stars.push(formData.actors)
    setFormData(prevState => {
      return {
        ...prevState,
        actors : stars
      }
    })
    setFormData(prevState => {
      return {
        ...prevState,
        actors : ""
      }
    })
  }


  return (
    <Form
      onSubmit={submitHandler}
      style={{ maxWidth: "400px", margin: "100px auto" }}
    >
      <Header as="h1">Update Movie Details</Header>
      <Form.Field>
        <label>Title</label>
        <input
          placeholder="Title"
          type="text"
          name="title"
          onChange={changeHandler}
          value={formData.title}
        />
      </Form.Field>
      <Form.Field>
        <label>Director</label>
        <input
          placeholder="Director"
          type="text"
          name="director"
          onChange={changeHandler}
          value={formData.director}
        />
      </Form.Field>
      <Form.Field>
        <label>Metascore:</label>
        <input
          placeholder="Metascore"
          type="text"
          name="metascore"
          onChange={changeHandler}
          value={formData.meta}
        />
      </Form.Field>
      <Form.Field>
        <label>Add Actors:</label>
        <input
          placeholder="Add Actors"
          type="text"
          name="actors"
          onChange={changeHandler}
          value={formData.actors}
        />
      </Form.Field>
      <Button type="submit" color="teal" onClick={addActorHandler}>Add Actor</Button>
      <List items={formData.stars}/>
      <Button type="submit">Update Movie!</Button>
    </Form>
  );
};

export default UpdateMovie;
