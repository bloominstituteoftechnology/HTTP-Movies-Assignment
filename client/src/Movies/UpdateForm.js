import React,{useState,useEffect} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import {Form,Input,Label,Button} from 'reactstrap';
import axios from 'axios';

function UpdateForm(props){
const [movie,setMovie]=useState({
    title:'',
    id:'',
    director:'',
    metascore:'',
    stars:''
})
const[updatedMovie,setUpdatedMovie]=useState({})

const params=useParams();
const history=useHistory();

useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
          console.log('get res in update=',res.data)
          setMovie(res.data)})
      .catch((err) => console.log(err.response));
  };

const handleChange=(e)=>{
    setMovie({
    ...movie,
    [e.target.name]:e.target.value
    })
}

const handleSubmit=(e)=>{
    e.preventDefault();
    const newArray={
        ...movie,
        stars:movie.stars.split(',')
    }
    axios.put(`http://localhost:5000/api/movies/${params.id}`,newArray)
    .then(res=>{
        console.log('put res=',res)
        setUpdatedMovie(res.data)
        const updatedList = props.movies.map(item=>{
             if (item.id === Number(params.id)){
                console.log('im here')
                return (res.data)
            }else return item;
        })
        console.log('updatedList=',updatedList);
        props.setMovieList(updatedList);
        history.push(`/movies/${params.id}`)
    })
    .catch(err=> console.log('err in put=',err.response))
}

return(
    <>
    <h4>Update Movie</h4>
    <div className="updateForm">
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
         onChange={handleChange}
         value={movie.stars}
        /></Label>
        <br/>
        <Button type="info">Update</Button>
        </Form>
    </div>
    </>
)
}
export default UpdateForm;