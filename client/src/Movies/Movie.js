import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Button } from "semantic-ui-react";
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

  UNSAFE_componentWillReceiveProps(newProps) {
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

  updateMovie = () => {
    this.props.history.push(`/update-movie/${this.state.movie.id}`);
  }

  deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err.response));
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div>
          <Button.Group>
            <Button onClick={this.saveMovie} positive>
              Save
            </Button>
            <Button.Or />
            <Button onClick={this.updateMovie} color="yellow">
              Update
            </Button>
            <Button.Or />
            <Button onClick={() => this.deleteMovie(this.state.movie.id)} negative>Delete</Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}