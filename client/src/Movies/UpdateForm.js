import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UpdateForm(props) {
   const {id} = props.match.params;
   const defaultMovie = {id: "", tittle:"", director:"", metascore:"",stars:[]}
   const [movie, setMovie] = useState(defaultMovie);
   useEffect( () => {
     axios.get(`http://localhost:5000/api/movies/${id}`)
          .then( (response) => {
             console.log(response.data)
             setMovie(response.data)
          })
   },[id])
   console.log(id)

   const handleChange = (event) => {
       setMovie({...movie, [event.target.name]:event.target.value})
   }

   const handleStars = (event) => {
      setMovie({
          ...movie,
           stars: [event.target.value]
      })
   }
   const handleSubmit = (event) => {
       event.preventDefault();
       console.log(movie)
       axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
               console.log(res);
               setMovie(defaultMovie);
               props.history.push("/");

            })
            .catch(error => {
               console.log(error);
            })
   }
   console.log(movie)
   return (
    <div className="save-wrapper">
      <h2 style={{textAlign:'center'}}>Update your Movie Details here</h2>
      <form onSubmit={handleSubmit}> 
       <label>Title:</label>
        <input type="text" 
               placeholder="Title" 
               name="title" 
               value={movie.title} 
               onChange={handleChange}

         />
         <br />
        <label>Director:</label>
        <input type="text" 
               placeholder="Director" 
               name="director"
               value={movie.director}
               onChange={handleChange}/>
         <br />
        <label>Meta-Score:</label>
        <input type="text" 
               placeholder="Meta score" 
               name="metascore" 
               value={movie.metascore} 
               onChange={handleChange}/>   
         <br /><label>Stars:</label>           
         <input 
                type='text'
                name='stars'
                placeholder='stars'
                value={movie.stars}
                onChange={handleStars}
            />
        <button>Update</button>        
      </form>
    </div>
   )
}