import React from 'react';
import axios from 'axios';
import {useState, useEffect}from 'react';


const UpdateForm =(props)=> {
console.log("PROPS", props)
 const [movie, setMovie] =useState({});


 const id = props.history.match.params.id
 useEffect(()=> {
 	 axios.get(`http://localhost:5000/api/movies/${id}`)
	 .then(res=> setMovie(res.data))
	 .catch(err => console.log(err))
	 console.log("###MOVIE", movie)
 }, []);



 const [movieUpdate, setMovieUpdate]= useState({
	title: '',
	director: '',
	metascore: ' ',
	stars: []
})

const handleInput = (e)=> {
	e.preventDefault();
	setMovieUpdate({ 
		[e.target.name]:e.target.value
	})
}

const onSubmit = e => {
//const id = props.params.match.id
	axios.put(`http://localhost:5000/api/movies/${movieUpdate.id}`, movieUpdate)
	.then(res => {
		console.log(res);
		props.history.push('/');
	})
	.catch(err=> console.log(err))
}

return (
 <div> 
<h1> 888</h1>
 
console.log("MOVIE TO UPDATE", movie)

<form type = 'submit' onSubmit = {onSubmit}> 
<input 
type = 'text'
name = 'title'
value = {movieUpdate.title}
onChange ={handleInput}
placeholder = 'title'



/>
<input
type = 'text'
name = 'metascore'
value = {movieUpdate.metascore}
onChange = {handleInput}
placeholder = 'title'
/>
<input
type = 'text'
name = 'director'
value = {movieUpdate.director}
onChange = {handleInput}
placeholder = 'director'
/>
<input
type = 'stars'
name = 'metascore'
value = {movieUpdate.stars}
onChange = {handleInput}
placeholder = 'stars'
/>

<button type = 'submit'>Enter </button>
</form>
</div>
)
}

export default UpdateForm