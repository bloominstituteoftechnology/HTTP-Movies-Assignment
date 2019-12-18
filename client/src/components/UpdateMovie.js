import React from 'react';
import { Formik, Form, Field } from 'formik';

export default function UpdateMovie (){

    const formState = ({ id, title, director, metascore, stars }) => {
        return props.formState({ id, title, director, metascore, stars });
    };

    return (
        <Formik 
        initialValues={{ id: null, title: '', director: '', metascore: '', stars: '' }}
        onSubmit={formState}
        render={() => (
            <Form>
            <Field name="title" type="text" placeholder="title" />
            <Field name="director" type="text" placeholder="director" />
            <Field name="metascore" type="text" placeholder="metascore" />
            <Field name="starts" type="text" placeholder="stars" />
            <input type="submit">Update!</input>
            </Form>
        )}
        />
    );
}