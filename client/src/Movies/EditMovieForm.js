import React from "react";
import { Formik, Form, Field } from "formik";

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
          console.log('props', props)
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
              <label>
                Actors
                <Field name="actors" type="text" />
              </label>
                <label>
                Metascore
                <Field name="metascore" type="text" />
              </label>
                }}
              />
              <button className="submit-btn" type="submit">Submit</button>
            </Form>
          );
        }}
      />
    </div>
  );
}