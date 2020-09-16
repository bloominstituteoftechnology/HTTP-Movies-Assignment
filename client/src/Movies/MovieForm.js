import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialForm = {
  director: "",
  title: "",
  metascore: "",
  //   actors: [],
};

const MovieForm = () => {
  const [formValues, setFormValues] = useState(initialForm);
  const [movie, setMovie] = useState([]);

  return (
    <div>
      <form>
        <label>
          Movie Title:
          <input type="text" name="title" />
        </label>
        <label>
          Movie Director:
          <input type="text" name="director" />
        </label>
        <label>
          Movie MetaScore:
          <input type="numbers" name="metascore" />
        </label>
        {/* <label>
          Movie Actors:
          <input type="text" name="title" />
        </label> */}
        <button>Submit Edits</button>
      </form>
      <button>Add New Movie</button>
    </div>
  );
};

export default MovieForm;
