import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'


const initialState = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: ""
}

function UpdateMovie(props) {


const [movie, setMovie] = useState(initialState)
const params = useParams()

useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        // morphing of data
        console.log(res.data);
        setMovie(res.data);
      })
      .catch(err => console.error(err));
  }, [params.id]);


const handleChange = e => {
    e.preventDefault()
    setMovie({
        ...movie,   
        [e.target.name]: e.target.value
    })
}

const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    const url = `http://localhost:5000/api/movies/${params.id}`;
    axios.put(url, movie)
      .then((res) => {
        console.log(res)
        props.addToSavedList(movie)
      })    
      .catch(err => console.error(err));
  };

//   const handleStars = e => {
//       setMovie({
//           ...movie,
//           stars: e.target.value.split(',')
//       })
//   }


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>title</label>
            <input
            type="text"
            name="title"
            onChange={handleChange}
            value={movie.title}
            />
            <label>director</label>
            <input
            type="text"
            name="director"
            onChange={handleChange}
            value={movie.director}
            />
            <label>metascore</label>
            <input
            type="number"
            name="metascore"
            onChange={handleChange}
            value={movie.metascore}
            />
            <label>stars</label>
            <input
            type="text"
            name="stars"
            onChange={handleChange}
            value={movie.stars}
            />
        <button>Redirect to new Movie</button>
        </form>
        </div>
    )
}

// do axios call in this component, put request
// Add a button in the movie component that routes you to your new route with the movies's id as the URL param
// The form should make a PUT request to the server when submitted
// When the call comes back successfully, reset your form state and route the user to /movies where they will see the updated movie in the list

export default UpdateMovie


