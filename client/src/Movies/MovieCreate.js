import React, {Component} from 'react';
import axios from 'axios';

class MovieCreate extends Component {
  constructor(props){
    super();
    this.state = {
     'title': '',
     'director': '',
     'metascore': '',
     'stars': [''] 
    }
  }

  handleFormChange = event => {
    this.setState({[event.target.name]:event.target.value})
  }

  submitFormChange(){
    const movies = this.props.state.movies;
    const info = {title: this.state.title, director: this.state.director, metascore: this.state.metascore, stars: this.state.stars}
    movies.push(info);

    axios.post('http://localhost:5000/api/movies', info)
    .then(response => {
      console.log(response)
      this.setState({title: '', director: '', metascore: '', stars: ['']})
    })
    .catch(err => {
      console.log(err);
    })
  }

  render(){
  return(
    <div>
      <form>
        <p> Title: <br/>
          <input type="text" placeholder="Tombstone" name="title" value={this.state.title} onChange={this.handleFormChange}/>
        </p>

        <p> Director: <br/>
          <input type="text" placeholder="George P. Cosmatos" name="director" value={this.state.director} onChange={this.handleFormChange}/>
        </p>

        <p> Metascore: <br/>
          <input type="number" placeholder="89" name="metascore" value={this.state.metascore} onChange={this.handleFormChange}/>
        </p>

        <p> Stars: <br/>  
          <input type="text" placeholder="Kurt Russell, Bill Paxton" name="stars" value={this.state.stars} onChange={this.handleFormChange}/>
        </p>

          <input type="submit" onClick={this.submitFormChange}/>
      </form>
    </div>
  )}
}

export default MovieCreate;