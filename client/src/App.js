import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import "react-bulma-components/dist/react-bulma-components.min.css";
import UpdateMovie from "./Movies/UpdateMovie";
import axios from "axios";
import { withRouter } from "react-router-dom";


const initialForm = {
  title: "",
  metascore: "",
  director: "",
  stars: ""
}

const App = ({history}) => {
  const [savedList, setSavedList] = useState([]);
  const [id, setId] = useState(0)
  const [formValues, setFormValues] = useState(initialForm)

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const beginEdit = (movieDetails) => {
    setFormValues(movieDetails)
    setId(movieDetails.id)
  }

  const performEdit = (formValues, actions) =>  {
    axios.put(`http://localhost:5000/api/movies/${id}`, {
      id: id,
      title: formValues.title,
      director: formValues.director,
      metascore: formValues.metascore,
      stars: formValues.stars.split(','),
    })
    .then(({data}) => {
      console.log(data);
      setFormValues(initialForm)
      history.push('/')
    })
    .catch(err => console.log(err))
    // actions.resetForm();
  }

  const addNewMovie = (formValues, actions) => {
    axios.post(`http://localhost:5000/api/movies`, {
      title: formValues.title,
      director: formValues.director,
      metascore: formValues.metascore,
      stars: formValues.stars.split(','),
    })
    .then(({data}) => {
      console.log(data);
      setFormValues(initialForm)
      history.push('/')
    })
    .catch(err => console.log(err)) 
    actions.resetForm();
  }

  const performDelete = (doomedMovieId) =>  {
    axios.delete(`http://localhost:5000/api/movies/${doomedMovieId}`)
    .then(({data}) => {
      console.log(data);
      history.push('/')
    })
    .catch(err => console.log(err))
    // actions.resetForm();
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} beginEdit={beginEdit} performDelete={performDelete} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovie {...props} onFormSubmit={performEdit} form={formValues} />;
        }}
      />
      <Route
        path="/new-movie"
        render={props => {
          return <UpdateMovie {...props} onFormSubmit={addNewMovie} form={initialForm} />;
        }}
      />
    </>
  );
};

export default withRouter(App);
