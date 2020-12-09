import React,{useState,useEffect} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import {Form,Input,Label,Button} from 'reactstrap';
import axios from 'axios';

function AddForm(props){
const [movie,setMovie]=useState({
    id:"",
    title:'',
    director:'',
    metascore:'',
    stars:"",
})
 

const params=useParams();
const history=useHistory();

 const handleChange=(e)=>{
    setMovie({
    ...movie,
    [e.target.name]:e.target.value,
    })
    console.log('in change=',movie.stars)

}

const handleSubmit=(e)=>{
    e.preventDefault();
    const newMovie={
        ...movie,
        stars:movie.stars.split(",")
    }
    postMovie(newMovie);
}


const postMovie=(newMovie)=>{
    console.log('in post=',newMovie);
axios.post('http://localhost:5000/api/movies',newMovie)
.then(res=>{
    console.log('post friends',res)
    const newList=res.data;
    //update the movieList
    props.setMovieList(newList);
    //userexperience to route to prev page
    history.push('/')
})
.catch(err=> console.log('err in post',err))
}

return(
    <>
    <h4>Add Movie</h4>
    <div className="addForm">
        <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Movie Title
        <Input 
         id="title"
         name="title"
         value={movie.title}
         onChange={handleChange}
        /></Label>
         <Label htmlFor="director">Director
        <Input
         id="director"
         name="director"
         value={movie.director}
         onChange={handleChange}
        /></Label>
        <Label htmlFor="metascore">Meta Score
        <Input
         id="metascore"
         name="metascore"
         type="number"
         onChange={handleChange}
         value={movie.metascore}
        /></Label>
         
        <Label htmlFor="stars">Stars
        <Input
         id="stars"
         name="stars"
         type="text"
         onChange={handleChange}
         value={movie.stars}
        /></Label>
        <br/>
        <Button color="primary">Add</Button>
        </Form>
    </div>
    </>
)
}
export default AddForm;