import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
// export default class MovieList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movies: []
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("http://localhost:5000/api/movies")
//       .then(res => this.setState({ movies: res.data }))
//       .catch(err => console.log(err.response));
//   }

//   render() {
//     return (
//       <div className="movie-list">
//         {this.state.movies.map(movie => (
//           <MovieDetails key={movie.id} movie={movie} />
//         ))}
//       </div>
//     );
//   }
// }



export default function MovieList(){
  const [movies, setMovies] = useState([])

  useEffect(()=>{
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovies(res.data)})
      .catch(err => console.log(err.response));
  },[])

  return(
    <div className="movie-list">
      {movies.map((movie)=>{
        return(
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard  movie={movie} />
          </Link>
          )
      })}
    </div>
    )
}


