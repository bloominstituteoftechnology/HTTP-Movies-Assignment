import React, { useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const UpdateMovie = (props) => {
    const [formData, setFormData] = useState({
        title: "",
        director: "",
        metascore: "",
        actors: ""
    })

    const submitHandler = (event) => {
        event.preventDefault()
        console.log("formData", formData)
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
        <Form onSubmit={submitHandler}>
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


