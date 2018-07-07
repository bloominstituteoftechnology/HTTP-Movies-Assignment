import React from 'react';
import axios from 'axios';
import MovieForm from './MovieForm';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      isEditing: false,
      title: "",
      director: "",
      metascore: "",
      stars: ""
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
      .then(response => {
        console.log("Fetch: ", response.data);
        this.setState({ movie: response.data,
                        title: response.data.title,
                        director: response.data.director,
                        metascore: response.data.metascore,
                        stars: response.data.stars.toString(" ") });
      })
      .catch(error => {
        console.error("Server error: ", error);
      });
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ movie: null });
        console.log("Delete: ", response.data);
        this.props.handleSetData(response.data, Number(this.props.match.params.id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleEdit = () => {
    this.setState({ isEditing: true });
  }

  handleEditChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleEditSubmit = e => {
    e.preventDefault();

    const editedMovie = { title: this.state.title,
                       director: this.state.director,
                       metascore: this.state.metascore,
                       stars: this.state.stars.split(", ") };

    axios
      .put(`http://localhost:5000/api/movies/${this.props.match.params.id}`, editedMovie)
      .then(response => {
        console.log("Edit: ", response);
        const movie = response.data.find(movie => movie.id === Number(this.props.match.params.id));
        this.setState({ isEditing: false, movie });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    if (this.state.isEditing) {
      return <MovieForm title={this.state.title}
                        director={this.state.director}
                        metascore={this.state.metascore}
                        stars={this.state.stars}
                        handleChange={this.handleEditChange}
                        handleMovieSubmit={this.handleEditSubmit} />
    }

    return (
      <div className="movie-container">
        <h2>{this.state.movie.title}</h2>
        <div className="movie-director">
          <b>Director:</b> {this.state.movie.director}
        </div>
        <div className="movie-metascore">
          <b>Metascore: </b><strong>{this.state.movie.metascore}</strong>
        </div>
        <h3>Actors</h3>
        {this.state.movie.stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
        <div className="movie-buttons-container">
          <button className="button" onClick={this.saveMovie}>
            Save
          </button>
          <button className="button" onClick={this.handleDelete}>
            Delete
          </button>
          <button className="button" onClick={this.handleEdit}>
            Edit
          </button>
        </div>
      </div>
    );
  }
}
