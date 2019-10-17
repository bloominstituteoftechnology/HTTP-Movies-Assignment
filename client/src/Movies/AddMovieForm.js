import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";

const initialForm = {
  title: null,
  director: null,
  metascore: null,
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
              Metascore
              <Field name="metascore" type="text" />
            </label>
            <FieldArray
              name="stars"
              render={arrayHelpers => (
                <div>
                  {props.values.stars && props.values.stars.length > 0 ? (
                    props.values.stars.map((star, index) => (
                      <div key={index}>
                        <Field name={`stars.${index}`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push("")}>
                      {/* show this when user has removed all friends from the list */}
                      Add a star
                    </button>
                  )}
                </div>
              )}
            />
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    />
  );
}
