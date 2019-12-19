import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom'
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }
  deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
    .then(res => {
      this.setState({movie: null});
      console.log(this.props);
       console.log(res); this.props.history.push("/")
       this.props.setSavedList(this.props.savedList.filter(savedMovie => savedMovie.id !== parseInt(this.props.match.params.id )))
    })
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }, console.log(res)))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
          
        </div>
        <button>
          <Link to={`/update-movie/${this.state.movie.id}`}>Edit</Link>
        </button>
        <button onClick={this.deleteMovie}>Delete Movie</button>
      
      </div>
    );
  }
}
