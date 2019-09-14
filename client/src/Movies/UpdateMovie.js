import React, { useEffect, useState } from "react";
import axios from "axios";
import {Input, TextArea, Button, Form} from 'semantic-ui-react';

const UpdateMovie = props => {
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie({
          id: id,
          title: res.data.title,
          director: res.data.director,
          metascore: res.data.metascore,
          stars: res.data.stars
        });
      })

      .catch(err => console.log(err));
  }, []);

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
      console.log(movie);
      console.log("submit handler");
      if (typeof movie.stars == "string") {
        const stars = movie.stars.split(",");

        const newMovie = {
          ...movie,
          stars: stars
        };

        axios
          .put(
            `http://localhost:5000/api/movies/${props.match.params.id}`,
            newMovie
          )
          .then(res => {
            props.history.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        axios
          .put(
            `http://localhost:5000/api/movies/${props.match.params.id}`,
            movie
          )
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
      <Button color="green">Update Movie</Button>
    </Form>
  );
};

export default UpdateMovie;
