import React, { useEffect, useState} from 'react'
import axios from 'axios' 
import { useParams, Link } from 'react-router-dom'
import MovieForm from './MovieForm'

function ChangeMovie(props) {
    const [movie,setMovie] = useState(null);
    const  params  = useParams();

    const fetchMovie = (id) => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => setMovie(res.data))
        .catch((err) => console.log('Change Movie',err))
    }

    useEffect(() => {
        fetchMovie(params.id);
      }, [params.id]);

      return (
          <div>
              <MovieForm movie={movie} id={params.id} />
          </div>
      )
}

export default ChangeMovie