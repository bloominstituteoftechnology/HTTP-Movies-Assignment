import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';


const UpdateMovie = (props) => {
    const initialFormValues = {
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
    const [values,setValues] = useState(initialFormValues)
    const {id} = useParams();
    const {push} = useHistory()
  

    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
            setValues(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    console.log(values)

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, values)
        .then(res=>{
            props.setMovieList(res.data)
            push('/')

        })
        .catch(err=>{
            console.log('Update error', err.response)
        })
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title
                <input
                type='text'
                onChange={handleChange}
                value={values.title}
                name='title'
                />
                </label>

                <label>Director
                <input
                type='text'
                onChange={handleChange}
                value={values.director}
                name='director'
                />
                </label>

                <label>Metascore
                <input
                type='text'
                onChange={handleChange}
                value={values.metascore}
                name='metascore'
                />
                </label>
                {/* <label>Stars
                {values.stars.map((item,idx)=>{
                    return (
                        <input 
                        type='text'
                        onchange={handleChange}
                        value={values.stars[idx]}
                        name='stars'
                        />
                    )
                })}
               </label> */}
             
            <button>Submit</button>
            </form>
        </div>
    )
}
export default UpdateMovie;