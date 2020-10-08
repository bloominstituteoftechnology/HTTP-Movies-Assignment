import React, {useState,useEffect} from "react";
import { useHistory,useParams } from "react-router";
import axios from 'axios';

const AddMovie = () => {
     //useHistory hook & params
     const history = useHistory();
     const { id } = useParams();
    //setting up a state to stor the stars
    const [starz, setStarz] = useState("")
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
         stars:["Michael Jackson", "Chris Engal"]
     }
     const handleChanges = e => {
        const newFormData = {
            ...form, [e.target.name] : e.target.value
        }
        setForm(newFormData);
    }
    //star changes 
    const starChanges =e => {
        setStarz(e.target.value)
        console.log(starz);
    }
    //push star onclick function
    const addStar = (e) => {
        if(form.stars.includes(starz)){
            console.log("error, already have this star")
        }
        else{
        form.stars.push(starz);
        setStarz("")
        console.log("hey")
        }
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies`, form )
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
            <div>
                <h2>Your Form :</h2>
                <p>title:{form.title}</p>
                <p>director:{form.director}</p>
                <p>metascore:{form.metascore}</p>
                <p>stars:{form.stars.map(star => (
                    <p>{star},</p>
                ))}</p>
            </div>
            <h2>Add Movie!</h2>
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
            <label htmlFor = "metascore">
                metascore:
            <input
            type = "text" 
            name = "metascore"
            placeholder = "metascore"
            value = {form.metascore}
            onChange = {handleChanges}
             />
            </label>
            <label htmlFor = "stars">
                stars:
            <input
            type = "text" 
            name = "stars"
            placeholder = "stars"
            value = {starz}
            onChange = {starChanges}
             />
            </label>
            <button type = "submit">Add</button>
        </form>
        <button onClick = {() => addStar()}>Click to add a star!</button>
        </div>
    )
}

export default AddMovie;