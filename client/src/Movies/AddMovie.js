import React,{ useState } from 'react'
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"

export default function AddMovie() {


const push =useHistory();

const [movie, setMovie] = useState([{
    id:"",
    title:"",
    director:"",
    metascore:"",
    stars:[]
}])
    const {id} = useParams()
    console.log(useParams())

    const onSubmit = (e) =>{
        e.preventDefault()
        axios
          .put(`http://localhost:5000/api/movies/${id}`)
          .then((res)=>setMovie(res.data))
          .catch((err)=>console.log(err.response))
          push(`/add-movie/${id}`)
    }
    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        setMovie({
            ...movie,
            [e.target.name]: value
          });
        }
    
    
      
      return (
        <div>
            <form onSubmit={onSubmit} >
                <label htmlFor="id">
                    <input
                    type ="text"
                    name="id"
                    value={movie.id}
                    onChange={handleChange}
                    />
               </label>
                <label>
                    <input
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                    type="text"
                    name="director"
                    id= "director"
                    value={movie.director}
                    onChange={handleChange}
                    />
                </label>

                <label htmlFor="metascore">
                    <input
                    type="text"
                    name="metascore"
                    id="metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                    />
                 </label>

                 <label htmlFor="stars">
                     <input
                     type="text"
                     id="stars"
                     name="stars"
                     value={movie.stars}
                     onChange={handleChange}
                     />
                </label>
            </form>
        </div>
    )      
}
