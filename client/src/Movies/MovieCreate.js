import React from "react";
import axios from "axios";

class MovieCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      director: "",
      metascore: null,
      stars: []
    };
  }
}

export default MovieCreate;
