import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import { axiosCall } from "../utils/axiosCall";
import Popup from './Popup'

function Movie({ addToSavedList }, props) {
  const [movie, setMovie] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false)
  const params = useParams();
  const { push } = useHistory()

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const fetchMovie = id => {
    axiosCall()
      .get(`/api/movies/${id}`)
      .then(res => {
        setMovie(res.data)
      })
      .catch(err => console.log(err.response)
      )};
  
  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = e => {
    push(`/update-movie/${params.id}`)
  }

  const deleteCall = () => {
    axiosCall()
    .delete(`/api/movies/${params.id}`)
    .then(res => {
        setMovie(res.data)
        push('/')
    })
    .catch(err => console.log(err))
}

const deleteItem = () => {
setShowPopUp(true)
deleteCall()
}

const closePopup = () => {
    setShowPopUp(false)
}


  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button" onClick={updateMovie}>
      Edit Stats</div>
      <button className="delete-button" onClick={deleteCall}> Delete</button>

{ showPopUp &&
        <Popup onYes={deleteItem} onNo={closePopup}/>
}

    </div>
  );
}

export default Movie;
