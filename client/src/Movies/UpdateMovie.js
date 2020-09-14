import React, { useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import axios from "axios";

const UpdateMovie = () => {
  
  
  let id = useParams().id

  const [state, setState] = useState({
    id: id,
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  const handleChanges = (e) => {
    e.preventDefault();
    setState({ ...state,director: e.target.value });
  };
  const handleMetaChanges = (e) => {
    e.preventDefault();
    setState({ ...state, metascore: e.target.value });
  };
  const handleStarsChanges = (e) => {
    e.preventDefault();
    setState({ ...state,stars: [e.target.value] });
  };
  const handleTitleChanges = (e) => {
    e.preventDefault();
    setState({ ...state,title: e.target.value });
  };

  //   Submit function for submit button
 const  SubmitButton = (e) => {
    e.preventDefault();
    console.log(state)
    axios
      .put(`http://localhost:5000/api/movies/${id}`, state)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const UpdateMovie = /(props)=>{
  //

  return (
    <div>
      <form>
        <label>
          Director:
          <input 
            name="Director"
            value={state.director}
            onChange={handleChanges}/>
          </label>
          <label>
          metascore:
          <input 
            name="metascore"
            value={state.metascore}
            onChange={handleMetaChanges}/>
          </label>
          <label>
          stars:
          <input 
            name="stars"
            value={state.stars}
            onChange={handleStarsChanges}/>
          </label>
        <label>
          Title:
          <input
            name="Title"
            value={state.title}
            onChange={handleTitleChanges}
          />
        </label>
        <button onClick={SubmitButton}>Submit</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
