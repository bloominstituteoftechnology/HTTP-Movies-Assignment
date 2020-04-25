import React from "react";
import axios from "axios";

const EditMovieForm = () => {
  return (
    <form>
      <label htmlFor="title">
        Title:
        <input type="text" />
      </label>
      <label htmlFor="director">
        Director:
        <input type="text" />
      </label>
      <label htmlFor="metascore">
        MetaScore:
        <input type="text" />
      </label>
      <button className="submit-btn">Submit</button>
    </form>
  );
};

export default EditMovieForm;
