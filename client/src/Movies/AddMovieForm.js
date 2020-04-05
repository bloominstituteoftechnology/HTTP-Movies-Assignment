import React, { useState } from "react";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovieForm = (props) => {
  const [addNewMovie, setAddNewMovie] = useState(initialItem);

  return (
    <div className="add-new-movie">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandler}
          value={updateMovie.title}
        />
        <br />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={changeHandler}
          value={updateMovie.director}
        />
        <br />
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          onChange={changeHandler}
          value={updateMovie.metascore}
        />
        <br />
        <input
          type="array"
          name="stars"
          placeholder="Stars"
          onChange={changeHandler}
          value={updateMovie.stars}
        />
        <br />
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
