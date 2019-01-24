import React from 'react';

class MovieCreate extends React.Component {

  state = {
    movieInfo: {
      title: "",
      director: "",
      metascore: "",
      stars: []
    },
    isValid: false
  }

  checkValidity = (info) => {
    if(info.title && info.director && info.metascore && info.stars.length !== 0) return true;
    return false;
  }

  saveInput = (e) => {
    let stars = [...this.state.movieInfo.stars];
    let info = {};
    if(e.target.name !== "stars") {
      info = {
        ...this.state.movieInfo,
        stars: stars,
        [e.target.name]: e.target.value
      }
    } else {
      stars = e.target.value.split(',');
      info = {
        ...this.state.movieInfo,
        stars: stars
      }
    }
    let isValid = this.checkValidity(info);
    this.setState({ movieInfo: info, isValid: isValid });
  }
  render() {
    return ( 
      <div>
      <form onSubmit={(event) => this.props.createMovie(event, this.state.movieInfo)}>
        <h1>Create movie</h1>
        <input type="text" name="title" placeholder="Title" value={this.state.movieInfo.title} onChange={this.saveInput} />
        <input type="text" name="director" placeholder="Director" value={this.state.movieInfo.director} onChange={this.saveInput} />
        <input type="text" name="metascore" placeholder="Metascore" value={this.state.movieInfo.metascore} onChange={this.saveInput} />
        <input type="text" name="stars" placeholder="Stars - names separated by ," value={this.state.movieInfo.stars.join(',')} onChange={this.saveInput} />
        <button disabled={!this.state.isValid} >Add</button>
      </form>
      </div>
    );
  }
}
 
export default MovieCreate;