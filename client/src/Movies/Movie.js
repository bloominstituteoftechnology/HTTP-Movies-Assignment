import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from 'react-router-dom';
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

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = () => {
    console.log(this.props.match.params)
    axios.delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`).then(res => {
      this.props.history.push('/');
      console.log(res.data)
      }).catch(err => {
        console.log(err, 'delete failed')
    })
  }

  editMovie =() => {
    this.props.updateMovie(this.state.Movie)
    this.props.history.push(`/update-movie/${this.state.movie.id}`)
  }

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
        <div className="delete-button" onClick={this.deleteMovie}>
          Delete
        </div>
        <Link to={{ pathname: `/update-movie/${this.state.movie.id}`, state: {movie: this.state.movie }}}><button className='update-button'>Update</button></Link>
    
        
      </div>
    );
  }
}
