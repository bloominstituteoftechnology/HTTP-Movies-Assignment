import React from 'react';

class MovieForm extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      director: '',
      metascore: null,
      starone: '',
      startwo: '',
      starthree: '',
    };
  }
  
  render(){
    return(
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={this.state.title}
          placeholder="Enter Movie Title"
        />
        <label htmlFor="director">Title:</label>
        <input
          type="text"
          name="director"
          id="director"
          value={this.state.director}
          placeholder="Enter Movie Director"
        />
        <label htmlFor="metascore">Title:</label>
        <input
          type="number"
          name="metascore"
          id="metascore"
          value={this.state.metascore}
          placeholder="Enter Movie Metascore"
        />
        <label htmlFor="starone">Title:</label>
        <input
          type="text"
          name="starone"
          id="starone"
          value={this.state.starone}
          placeholder="Enter First Movie Star"
        />
        <label htmlFor="startwo">Title:</label>
        <input
          type="text"
          name="startwo"
          id="startwo"
          value={this.state.startwo}
          placeholder="Enter Second Movie Star"
        />
        <label htmlFor="starthree">Title:</label>
        <input
          type="text"
          name="starthree"
          id="starthree"
          value={this.state.starthree}
          placeholder="Enter Third Movie Star"
        />
      </form>
    );
  }
}

export default MovieForm;
