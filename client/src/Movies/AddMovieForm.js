import React, { useState } from "react";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddMovieForm = (props) => {
  const [addNewMovie, setAddNewMovie] = useState(initialItem);
  console.log(addNewMovie);

  const changeHandler = (e) => {
    e.preventDefault();

    setAddNewMovie({ ...addNewMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addMovie(addNewMovie);
  };

  return (
    <div className="add-new-movie">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandler}
          value={addNewMovie.title}
        />
        <br />
        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={changeHandler}
          value={addNewMovie.director}
        />
        <br />
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          onChange={changeHandler}
          value={addNewMovie.metascore}
        />
        <br />
        <input
          type="array"
          name="stars"
          placeholder="Stars"
          onChange={changeHandler}
          value={addNewMovie.stars}
        />
        <br />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
