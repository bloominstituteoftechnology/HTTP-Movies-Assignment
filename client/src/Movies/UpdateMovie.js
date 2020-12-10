import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios'


const initialState = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
}

function UpdateMovie(props) {


const [movieList, setMovieList] = useState(initialState)
const params = useParams()
const {push} = useHistory()

useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        // morphing of data
        res.data.stars = res.data.stars.join(',')
        console.log(res.data);
        setMovieList(res.data);
      })
      .catch(err => console.error(err));
  }, [params.id]);


const handleChange = e => {
    e.preventDefault()
    setMovieList({
        ...movieList,   
        [e.target.name]: e.target.value
    })
}

const handleSubmit = e => {
    e.preventDefault();
    movieList.stars = movieList.stars.split(',')
    // make a PUT request to edit the item
    const url = `http://localhost:5000/api/movies/${params.id}`;
    axios.put(url, movieList)
      .then((res) => {
        console.log(res);
        setMovieList(initialState);
        props.getMovieList();
        push('/');
        props.setRefresh(true);
        
      })    
      .catch(err => console.error(err));
  };




    return (
        <div>
          <h1>Update Movies</h1>
            <form onSubmit={handleSubmit}>
            <label>title</label>
            <input
            type="text"
            name="title"
            onChange={handleChange}
            value={movieList.title}
            />
            <label>director</label>
            <input
            type="text"
            name="director"
            onChange={handleChange}
            value={movieList.director}
            />
            <label>metascore</label>
            <input
            type="number"
            name="metascore"
            onChange={handleChange}
            value={movieList.metascore}
            />
            <label>stars</label>
            <input
            type="text"
            name="stars"
            onChange={handleChange}
            value={movieList.stars}
            />
        <button>Update Movie</button>
        </form>
        </div>
    )
}

// do axios call in this component, put request
// Add a button in the movie component that routes you to your new route with the movies's id as the URL param
// The form should make a PUT request to the server when submitted
// When the call comes back successfully, reset your form state and route the user to /movies where they will see the updated movie in the list

export default UpdateMovie


