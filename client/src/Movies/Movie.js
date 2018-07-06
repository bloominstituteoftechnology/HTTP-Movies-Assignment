import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
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
        console.log("Fetching: ", response.data);
        this.setState({ movie: response.data,
                        title: response.data.title,
                        director: response.data.director,
                        metascore: response.data.metascore,
                        stars: response.data.stars });
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
        this.props.handleSetData(response.data, this.props.match.params.id);
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
                       stars: this.state.stars };

    axios
      .put(`http://localhost:5000/api/movies/${this.props.match.params.id}`, editedMovie)
      .then(response => {
        console.log("Edit: ", response);
        this.setState({ isEditing: false });
        this.props.handleSetData(response.data)
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
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button className="delete-button" onClick={this.handleDelete}>
          Delete
        </button>
        <button onClick={this.handleEdit}>
          Edit
        </button>
      </div>
    );
  }
}
