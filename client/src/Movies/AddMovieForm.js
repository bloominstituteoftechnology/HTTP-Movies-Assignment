import React from "react";
import { Formik, Form, Field } from "formik";
import MovieDetails from './MovieDetails';

const initialForm = {
  title: '',
  director: '',
  metascore: '',
  actors:'',
  stars: []
};



export default function AddMovieForm({ addMovie }) {
  return (
    <Formik
      initialValues={initialForm}
      onSubmit={addMovie}
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
            <label>
              Actors
              <Field name="actors" type="text" />
            </label>
            <label>
              Metascore
              <Field name="metascore" type="text" />
            </label>

            <button className="submit-btn" type="submit">Submit</button>

          </Form>
        );
      }}
    />
  );
}