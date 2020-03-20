import React, { useState, useEffect } from "react";

function UpdateMove(props) {
  console.log("this is the props from update movie", props);
  const [movie, setMovie] = useState({
    id: 5,
    title: "Tombstone",
    director: "George P. Cosmatos",
    metascore: 89,
    stars: ["Kurt Russell", "Bill Paxton", "Sam Elliot"]
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

  return (
    <form onSubmit={previewState ? null : handlePreview}>
      <input name="title" type="text" value={movie} onChange={handleChange} />
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
    </form>
  );
}

export default UpdateMove;
