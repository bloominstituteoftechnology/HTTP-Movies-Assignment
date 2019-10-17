import React from 'react';
import { Formik, Form, Field } from "formik";
import styled from "styled-components";

import { Button, Card, Heading, Content } from "react-bulma-components";


export default function UpdateMovie({onFormSubmit, form}) {
    return <Formik
        initialValues = {form}
        onSubmit = {onFormSubmit}
        render = {props => {
            return <StyledForm>
                <Field name='title' type='text' placeholder='Title' />
                <Field name='metascore' type='number' placeholder='Metascore' />
                <Field name='director' type='text' placeholder='Director' />

                <Button color='primary' type='submit' >Submit</Button>
            </StyledForm>
        }}
    />
}


const StyledForm = styled(Form)`
    display: flex;
    margin: 0 auto;
    width: 30rem;
    flex-direction: column;

    input {
        width: 23rem;
        margin: 0.6rem auto;
    }

    button {
        width: 8rem;
        margin: 1rem auto;
    }
`
