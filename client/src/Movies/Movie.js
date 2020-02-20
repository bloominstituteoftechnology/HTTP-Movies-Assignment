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
    console.log("id",id)
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log ("Response in the GET request MovieEdit", res)
        this.setState({ movie: res.data })
      })
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = id => {
    console.log("id in delete", id)
   //e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log ("Response in the DELETE request MovieEdit", res)
        this.setState({
          movie: res.data.filter(item =>{
            return item.id !== id
        }) });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  render() {
    if (!this.state.movie) {
      return <div className="loading-info-wrap">Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button  onClick={() => this.props.history.push(`/movies/${this.props.id}`)}>EDIT</button>
        <button onClick={() => { this.deleteMovie(this.state.movie.id)}} > Delete </button>
      </div>
    );
  }
}
