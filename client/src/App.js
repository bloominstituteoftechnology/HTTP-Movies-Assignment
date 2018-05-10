import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie'
import MovieAdd from './Movies/MovieAdd';

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      savedList: []
    }
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

        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route path='/movies/add' component={ MovieAdd } />
          <Route path="/movies/:id" render={ (props) => {
            return(<Movie {...props} addToSavedList={this.addToSavedList}/>)
          }} />
        </Switch>
        
      </div>
    )
  }
}
