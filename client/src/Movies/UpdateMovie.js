import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
 
const initialMovie = {
 id: "",
 title: "",
 director: "",
 metascore: "",
 stars: []
}
 
const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const {id} = useParams();
 
    useEffect(() => {
        const movieToUpdate = props.movies.find(movie => `${movie.id}` === id);

   if(movieToUpdate) {
     setMovie(movieToUpdate);
   }
 }, [props.movies, id]);
 
 const changeHandler = (e) => {
     let value = e.target.value;
     setMovie({
         ...movie,
         [e.target.name]: value
     });
 };

//  const changeHandler = e => {
//     if (e.target.name !== 'stars'){
//         setMovie({
//             ...movie,
//             [e.target.name]: e.target.value,
//         })
//     } else {        
//         setMovie({
//             ...movie,
//             stars: [...e.target.value.split(",")]
//         })
//     }
//   };
 
 const handleSubmit = (e) => {
   e.preventDefault();
   axios
   .put(`http://localhost:5000/api/movies/${id}`, movie)
   .then(res => {
     console.log(res)
     props.history.push(`/movies/${id}`);
   })
   .catch(err => console.log(err));
 };
 
 return (
   <div>
     <h1>Update Movies</h1>
     <form onSubmit={handleSubmit}>
       <input
         type="text"
         name="title"
         onChange={changeHandler}
         placeholder="title"
         value={movie.title}
       />
       <input
         type="text"
         name="director"
         onChange={changeHandler}
         placeholder="Director"
         value={movie.director}
       />
       <input
         type="text"
         name="metascore"
         onChange={changeHandler}
         placeholder="Metascore"
         value={movie.metascore}
       />
       <input
         type="text"
         name="stars"
         onChange={changeHandler}
         placeholder="Stars"
         value={movie.stars}
       />
       <button>Update</button>
     </form>
   </div>
   )
}
 
export default UpdateMovie