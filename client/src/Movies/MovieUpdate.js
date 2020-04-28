import React, { useState } from 'react';
import axios from 'axios';

const MovieUpdate = (props) => {

  console.log("movie stuff", props)

  const [update, setUpdate] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
  });
  
  return (
    <div>
      <button>Update</button>
    </div>
  )
}

export default MovieUpdate;