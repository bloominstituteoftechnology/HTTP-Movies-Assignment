import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
};

const UpdateForm = ({ setMovieList, movieList }) => {
  const history = useHistory();
  const { id } = useParams();
  const [newMovie, setNewMovie] = useState(initialItem);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setNewMovie(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (e) => {
      e.persist()
    setNewMovie({
      ...newMovie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //   console.log('handleSubmit', newMovie)
    axios
      .put(`http://localhost:5000/api/movies/${id}`, newMovie)
      .then((res) => {
          console.log('inside of input',res)
        // setMovieList([...movieList, res.data]);
        const updatedState = movieList.map(movie => {
            return movie.id === id ? res.data.data : movie;
         })
         setMovieList(updatedState)
      
      })
      .catch((err) => console.log(err))
      .finally(() => {
        history.push("/")
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update Your Movie!</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newMovie.title}
        onChange={changeHandler}
      />
      <input
        type="text"
        name="director"
        placeholder="Director"
        value={newMovie.director}
        onChange={changeHandler}
      />
      <input
        type="text"
        name="metascore"
        placeholder="Metascore"
        value={newMovie.metascore}
        onChange={changeHandler}
      />
      <button>Update</button>
    </form>
  );
};

export default UpdateForm;
