import React from "react";
import { Button, Form, Input, FormText } from "reactstrap";

const MovieForm = props => {
  return (
    <div className="movie-form">
      <h2 className="form-header">
        &darr; &nbsp; Add your very own movie below! &nbsp; &darr;
      </h2>
      <Form onSubmit={props.addMovie}>
        <Input
          type="text"
          name="title"
          placeholder="Title..."
          onChange={props.onChange}
          required
          autoComplete="off"
        />
        <FormText>&nbsp;Nothing too lengthy, please.</FormText>
        <Input
          type="text"
          name="director"
          placeholder="Director..."
          onChange={props.onChange}
          required
          autoComplete="off"
        />
        <FormText>&nbsp;One only.</FormText>
        <Input
          type="number"
          name="metascore"
          placeholder="Metascore..."
          onChange={props.onChange}
          min="0"
          max="100"
          required
          autoComplete="off"
        />
        <FormText>&nbsp;On a scale of 1 - 100.</FormText>
        <Input
          type="text"
          name="stars"
          placeholder="Stars..."
          onChange={props.onChange}
          required
          autoComplete="off"
        />
        <FormText>
          &nbsp;Separate with commas, like this:
          <strong>
            <em> Eric Suave, Erica Star, Erikson Eriksen</em>
          </strong>
        </FormText>
        <Input
          type="text"
          name="src"
          placeholder="Image URL..."
          onChange={props.onChange}
          required
          autoComplete="off"
        />
        <FormText>
          &nbsp;Try fetching one from <a href="https://www.imdb.com/">IMDb</a>!
        </FormText>
        <Button>Add new movie</Button>
      </Form>
    </div>
  );
};

export default MovieForm;
