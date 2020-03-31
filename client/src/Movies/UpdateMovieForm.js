import React, { useState, useEffect } from "react";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovieForm = props => {
  const [updateMovie, setUpdateMovie] = useState(initialItem);

  return (
    <div>
      <h2>Update Movie</h2>
      <form>
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="director" placeholder="Director" />
        <input type="text" name="metascore" placeholder="Metascore" />
        <input type="text" name="stars" placeholder="Stars" />
      </form>
    </div>
  );
};

export default UpdateMovieForm;
