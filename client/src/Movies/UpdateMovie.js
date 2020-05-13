import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import Axios from 'axios'
import { useParams, useHistory } from "react-router-dom";

const UpdateMovie = (props) => {
    const { id } = useParams();
    console.log("id", id)
    const { push } = useHistory()
    const [formData, setFormData] = useState({
        id: `${id}`,
        title: "",
        director: "",
        metascore: "",
        // actors: []
    })


    const submitHandler = (event) => {
        event.preventDefault()
        Axios
          .put(`http://localhost:5000/api/movies/${id}`, formData)
          .then(res => console.log(res))
          .catch(err => console.log(err))
          push('./')
          
          
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }

    return (
        <Form onSubmit={submitHandler} style={{maxWidth:"400px", margin:"0 auto"}}>
            <Form.Field>
                <label>Title</label>
                <input
                    placeholder='Title'
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    value={formData.title}
                />
            </Form.Field>
            <Form.Field>
                <label>Director</label>
                <input
                    placeholder='Title'
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    value={formData.director}
                />
            </Form.Field>
            <Form.Field>
                <label>Metascore:</label>
                <input
                    placeholder='Title'
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    value={formData.meta}
                />
            </Form.Field>
            <Form.Field>
                <label>Staring:</label>
                <input
                    placeholder='Title'
                    type="text"
                    name="actors"
                    onChange={changeHandler}
                    value={formData.actors}
                />
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
    )
}

export default UpdateMovie


