import React, {useState,useEffect} from "react";
import { useHistory,useParams } from "react-router";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import axios from 'axios';
const UpdateMovie = movies => {
    //useHistory hook & params
    const history = useHistory();
    const { id } = useParams();

    //setting up empty state for axios put request to edit movie
    const [form,setForm] = useState({
        id:Date.now(),
        title:"",
        director:"",
        metascore:"",
        stars:[]
    });
    const emptyState = {
        id:Date.now(),
        title:"",
        director:"",
        metascore:"",
        stars:[]
    }
    //useEffect to pull in intial movie to edit 
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => {
            console.log(res);
            setForm(res.data);
          })
          .catch((err) => console.error(err));
      }, [id]);
    
    const handleChanges = e => {
        const newFormData = {
            ...form, [e.target.name] : e.target.value
        }
        setForm(newFormData);
    }
    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, form )
        .then((res) => {
            console.log(res)
            history.push("/");
        })
        .catch((err) => {
            console.log(form)
        })
    }
    return(
        <div>
        <h2>Please Sign in!</h2>
        <p>
            {form.title}
        </p>
        <p>
            {form.director}
        </p>
        <form onSubmit = {handleSubmit}>
            <label htmlFor = "title">
                title:
            <input
            type = "text" 
            name = "title"
            placeholder = "title"
            value = {form.title}
            onChange = {handleChanges}
             />
            </label>
            <label htmlFor = "director">
                director:
            <input
            type = "text" 
            name = "director"
            placeholder = "director"
            value = {form.director}
            onChange = {handleChanges}
             />
            </label>
            <button>Update</button>
        </form>
        </div>
    )
}

export default UpdateMovie;