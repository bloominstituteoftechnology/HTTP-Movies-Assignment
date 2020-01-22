import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";


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
      .then(res => {
        console.log("response:",  res.data)
        this.setState({ movie: res.data })
      })
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editMovie = () => {
    const linkAdd = `/update-movie/${this.props.match.params.id}`;
    this.props.editMovie(this.state.movie);
    this.props.history.push(linkAdd);

  }

  deleteMovie = () => {
    console.log("delete props:", this.props);
    // this.props.deleteMovie(this.state.movie.id);
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res =>{
        // this.setState({ movies: res.data})
        this.props.history.push('/');
      })
      .catch(err => console.log("Error: ", err))


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
        <div className="edit-button" onClick={this.editMovie}>
          Edit
        </div>
        <div className="delete-button" onClick={this.deleteMovie}>
          Delete
        </div>
      </div>
    );
  }
}
