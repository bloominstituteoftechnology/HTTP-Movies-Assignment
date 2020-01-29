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
  item = this.props.items.find(
    thing => `${thing.id}` === this.props.match.params.id
  );


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

  routeToUpdate = e => {
    e.persist()
    e.preventDefault();
    this.props.history.push(`/update-movie/${this.item.id}`);
  };

  deleteHandler = e => {
    // e.persist()
    // e.preventDefault();
    this.props.deleteItem(this.state.movie.id);
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
        <button onClick={this.routeToUpdate}>Edit</button>
        <button onClick={this.deleteHandler}>Delete</button>
      </div>
    );
  }
}