import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import axios from 'axios';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: []
    }
  }
  componentDidMount() {
    // axios
    // .get('http://localhost:5000/api/movies')
    // .then(response =>{
    //     console.log(response)
    //     this.setState({ savedList: response.data })
    // })
   
  }
  addToSavedList = (movie) => {
    console.log(this.state.savedList)
    const savedList = this.state.savedList;
    savedList.push(movie);
    this.setState({savedList});
  }

  render(){
    return (
      <div>
        <SavedList list={this.state.savedList} />
        <Route exact path="/" component={MovieList} />
        <Route path="/movies/:id" render={ (props) => {
          return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
        }} />
      </div>
    )
  }
}
