import React, { useState, useEffect} from "react";
import axios from "axios";

const MoviePutUpdate = (props, match, history)=>{
    const [movieEdit, setMovieEdit] = useState(
        {
            id: "",
            title: "",
            director: "",
            metascore: "",
            stars: []
        }
    );
    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then( res=>{
            console.log("get movie update", res.data);
            setMovieEdit(res.data);})
        
    }, [props.match.params.id]);

    const handleChange = event =>{
        setMovieEdit({ ...movieEdit,
             [event.target.name]: event.target.value});
    }
    const handleSubmit = event =>{
        event.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movieEdit)
        .then(res =>{
            console.log("movie updated", res);
            setMovieEdit({
                id: "",
            title: "",
            director: "",
            metascore: "",
            stars: [] 
            })
            props.setSavedList([...props.savedList, res])
            props.history.push('/')
        })
        .catch(error =>{console.log('movie did not Update', error)})
    };
    return(
        <div>
            <h2>Edit Movie Information</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
            id= "title"
            type= 'text'
            name= "title"
            placeholder= 'Enter Title'
            onChange={handleChange}
            value={movieEdit.title}
            />
            <label htmlFor='metascore'>Metascore</label>
            <input
            id= "metascore"
            type= 'text'
            name= "metascore"
            placeholder= 'Enter Metascore'
            onChange={handleChange}
            value={movieEdit.metascore}
            />
            <label htmlFor='stars'>Stars</label>
              <input
            id= "stars"
            type= 'text'
            name= "stars"
            placeholder= 'Enter Stars'
            onChange={handleChange}
            value={movieEdit.stars}
            />
            <button type='submit'>Update Movie Info</button>
            </form>
        </div>
    )

}
export default MoviePutUpdate;