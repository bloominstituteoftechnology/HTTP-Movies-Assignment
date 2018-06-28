import React from 'react';

const MovieCreate = props => {
  return(
    <div>
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
        <button onClick={props.handleMovieSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default MovieCreate;
