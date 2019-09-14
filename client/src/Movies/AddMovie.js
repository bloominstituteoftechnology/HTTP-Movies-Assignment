import React, { useEffect, useState } from "react";
import axios from "axios";
import {Input, TextArea, Button, Form} from 'semantic-ui-react';

const AddMovie = props => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
  });

  useEffect(() => {}, []);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      movie.title != "" &&
      movie.director != "" &&
      movie.stars != "" &&
      movie.metascore != ""
    ) {
      if (typeof movie.stars == "string") {
        const stars = movie.stars.split(",");

        const newMovie = {
          ...movie,
          stars: stars
        };

        axios
          .post(`http://localhost:5000/api/movies`, newMovie)
          .then(res => {
            props.history.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .post(`http://localhost:5000/api/movies`, movie)
          .then(res => {
            props.history.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
  return (
    <Form onSubmit={handleSubmit} className="special-form">
      <Input
        onChange={handleChange}
        value={movie.title}
        name="title"
        placeholder="Title"
      /><br />
      <Input
        onChange={handleChange}
        value={movie.director}
        name="director"
        placeholder="Director"
      /> <br />
      <Input
        onChange={handleChange}
        value={movie.metascore}
        name="metascore"
        placeholder="Metascore"
      />
      <TextArea
        onChange={handleChange}
        value={movie.stars}
        name="stars"
        placeholder="Stars - Seperate by commas"
      />
      <Button color="green">Add Movie</Button>
    </Form>
  );
};

export default AddMovie;
