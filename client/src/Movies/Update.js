import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useParams,useHistory} from 'react-router-dom';
            
const initialData={
                title:'',
                director:'',
                metascore:'',
                stars:[],
                id:''
            }

const Update=(props)=>{
    const {push}=useHistory();
    const [movie, setMovie]=useState(initialData);
    const {id}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/movies/${id}`)
        // .then(res=>console.log(res))
        .then(res=>setMovie({...movie,title:res.data.title,director:res.data.director,metascore:res.data.metascore,stars:res.data.stars,id:res.data.id}))
        .catch(err=>console.log(err))
    },[id]);

    // putRequest=()=>{
    //     axios   
    //         .put(`/update-movie/${id}`,movie)
    //         .then(res=>console.log(res))
    //         .catch(err=>console.log(err))
    // }

    const handleChange=(e)=>{

        setMovie({...movie,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios   
        .put(`http://localhost:5000/api/movies/${id}`,movie)
        .then(res=>
            // props.setMovieList(...props.movieList,{res.data}))
            console.log(res.data))
        .catch(err=>console.log(err))
        push(`/movies/${id}`);
    }

    
        // console.log(props.movieList)
        return(
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='title' placeholder='title' value={movie.title} onChange={handleChange}/>
                    <input type='text' name='director' placeholder='director' value={movie.director} onChange={handleChange}/>
                    <input type='text' name='metascore' placeholder='metascore' value={movie.metascore} onChange={handleChange}/>
                    <button>Update</button>
                </form>
            </div>
        )
    
}

export default Update;