import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateMove(props) {
  console.log("this is the prtops from UPDATE", props);
  let id = props.match.params.id;
  const [movie, setMovie] = useState({
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  const handleChange = e => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const [previewState, setPreviewState] = useState(false);

  const handlePreview = e => {
    e.preventDefault();
    setMovie({ ...movie, stars: movie.stars.split(", ") });
    setPreviewState(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        props.addToSavedList(res.data);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie({ ...res.data, stars: res.data.stars.join(" ,") }))
      .catch(err => console.log(err));
  }, [id]);
  return (
    <form onSubmit={previewState ? handleSubmit : handlePreview}>
      <input
        name="title"
        type="text"
        value={movie.title}
        onChange={handleChange}
      />
      <input
        name="director"
        type="text"
        value={movie.director}
        onChange={handleChange}
      />
      <input
        name="metascore"
        type="text"
        value={movie.metascore}
        onChange={handleChange}
      />
      <p></p>
      Stars:{" "}
      {previewState ? (
        movie.stars
      ) : (
        <input
          type="text"
          name="stars"
          value={movie.stars}
          placeholder="Stars"
          onChange={handleChange}
        />
      )}
      <button type="submit">Save</button>
    </form>
  );
}

export default UpdateMove;
