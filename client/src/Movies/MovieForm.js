import React from 'react';

const MovieForm = props => {
  return(
    <div className="form-container">
      <h2>Add new movie:</h2>
      <form>
        <input
          autoComplete="off"
          type="text"
          placeholder="Title"
          name="title"
          onChange={props.handleChange}
          value={props.title}
        />
        <input
          autoComplete="off"
          type="text"
          placeholder="Director"
          name="director"
          onChange={props.handleChange}
          value={props.director}
        />
        <input
          autoComplete="off"
          type="text"
          placeholder="Metascore"
          name="metascore"
          onChange={props.handleChange}
          value={props.metascore}
        />
        <input
          autoComplete="off"
          type="text"
          placeholder="Stars"
          name="stars"
          onChange={props.handleChange}
          value={props.stars}
        />
        <button className="button" onClick={props.handleMovieSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default MovieForm;
