import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard'
export default class Movie extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps){
    if(this.props.match.params.id !== newProps.match.params.id){
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = (id) => {
    // change this line to grab the id passed on the URL
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        console.log(response)
        this.setState(() => ({ movie: response.data }))
      })
      .catch(error => {
        console.error(error);
      });
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie)
  }
  
  render() {
    if(!this.state.movie) {
      return <div>Loading movie information...</div>
    }

    const { title, director, metascore, stars } = this.state.movie;
    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>Save</div>
      </div>
    );
  }
}
