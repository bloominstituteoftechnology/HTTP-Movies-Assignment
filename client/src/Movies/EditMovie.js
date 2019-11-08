import React, { useState, useEffect} from 'react';
import axios from 'axios';

export default function EditMovie(props){
	const[movieInfo, setMovieInfo] = useState({
		title:'',
		director:'',
		metascore:'',
		stars: [],
		id:''
	})
	useEffect(()=>{
		axios
			.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
			.then((res)=> setMovieInfo(res.data))
			.catch((err)=> console.log(err.response))
	},[props.match.params.id])

	const handleChange = e =>{
		setMovieInfo({
			...movieInfo,
			[e.target.name] : e.target.value
		})
	}

	const handleSubmit = e =>{
		e.preventDefault()
		axios
		.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movieInfo)
		.then((res)=> props.history.push('/'))
		.catch((err)=> console.log(err))

	}

	return(
		<div>
			<h1>Update Movie</h1>
			<form onSubmit = {handleSubmit}>
				<input type="text" name='title' placeholder='Title' value={movieInfo.title} onChange={handleChange}/> <br/>
				<input type="text" name='director' placeholder='Director' value={movieInfo.director} onChange={handleChange}/><br/>
				<input type="text" name='metascore' placeholder='Metascore' value={movieInfo.metascore} onChange={handleChange}/><br/>
				<input type="text" name='stars' placeholder='stars' value={movieInfo.stars} onChange={handleChange}/><br/>
				<button> Submit Changes </button>
			</form>
		</div>
		)
};