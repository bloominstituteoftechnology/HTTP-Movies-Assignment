import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";

//need initialState for formValues
const initialFormValues = {
     title: ''
}
const UpdateMovie = (props) => {

    const [item, setItem] = useState(initialFormValues);
    const { id } = useParams();
    const { push } = useHistory();

    //need get request to get the updated movielist
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => {
            console.log(res);
            setItem(res.data);
          })
          .catch(err=>{
            console.log(err);
          })
        }, [id]);

    const updateMovie = () => {
        axios
            .get('http://localhost:5000/api/movies')
            .then(res => {
                props.setMovieList(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then((res) => {
                updateMovie();  
            })
            .catch((err) => {
                console.log(err);
            })
            push(`/movies/${id}`);
    }

    const handleChange = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input 
                type="text"
                name="title"
                value={item.title}
                onChange={handleChange}
                placeholder="Change title here"
                />
                <button>Change</button>
            </form>
        </div>
    )
}

export default UpdateMovie;