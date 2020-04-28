import React, { useState } from 'react';
import axios from 'axios';

const MovieUpdate = (props) => {
  const [update, setUpdate] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
  });

  return (
    <div>
      <form>

      </form>
      
      <button>Update</button>
    </div>
  )
}

export default MovieUpdate;