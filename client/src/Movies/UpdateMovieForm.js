import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function UpdateMovieForm({ listMovies, match, updateMovie }) {
  const movieToUpdate = listMovies.find(item => {
    return item.id === Number(match.params.id);
  });

  return (
    <div>
      <Formik
        initialValues={movieToUpdate}
        onSubmit={updateMovie}
        render={props => {
          return (
            <Form>
              <label>
                Director
                <Field name="director" type="text" />
              </label>
              <label>
                Title
                <Field name="title" type="text" />
              </label>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      />
    </div>
  );
}
