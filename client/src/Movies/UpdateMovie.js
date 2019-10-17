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
                <label>
                    <p>Name</p>
                <Field name='title' type='text' placeholder='Title' />
                </label>
               <label>
                   <p>Metascore</p>
               <Field name='metascore' type='number' placeholder='Metascore' />
               </label>
                <label>
                    <p>Director</p>
                <Field name='director' type='text' placeholder='Director' />
                </label>
                <label>
                    <p>Comma separated list of stars</p>
                <Field name='stars' type='text' placeholder='stars' />
                </label>
                
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
        height: 2.3rem;
        margin: 0.6rem auto;
    }

    label {
        width: 23rem;
        height: 3.5rem;
        margin: 0.6rem auto;
    }

    button {
        width: 8rem;
        margin: 1rem auto;
    }
`
