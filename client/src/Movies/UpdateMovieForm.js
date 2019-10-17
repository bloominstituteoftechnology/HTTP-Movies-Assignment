import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";

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
              <label>
                Metascore
                <Field name="metascore" type="text" />
              </label>
              <FieldArray
                name="stars"
                render={arrayHelpers => {
                  return (
                    <div>
                      {props.values.stars.map((star, index) => {
                        return <Field name={`stars.${index}`} />;
                      })}
                    </div>
                  );
                }}
              />
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      />
    </div>
  );
}
