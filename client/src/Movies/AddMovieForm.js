import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function AddMovieForm({addMovie}) {

  return (
    <div>
      <Formik
        initialValues={{
            title: "",
            director: "",
            metascore: 0,
            stars: []
        }}
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
                Stars (Separated by commas!)
                <Field name="stars" type="text" />
              </label>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      />
    </div>
  );
}
