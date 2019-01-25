import React from 'react';
import axios from 'axios';

class AddMovie extends React.Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render(){
    return(
      <form>
        <input type="text" name="title" placeholder="Movie Title"/>
        <input type="text" name="director" placeholder="Movie Director"/>
        <input type="number" name="metascore" placeholder="Metascore"/>
        <input type="text" nmae="stars" placeholder="Movie Stars" />
      </form>
    )
  }
}

export default AddMovie;