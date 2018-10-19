import React, { Component } from 'react';
import axios from 'axios';
import styles from '../index';
import { Redirect } from 'react-router-dom';
import { EventEmitter } from '../event';

export default class MovieCreate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        director: '',
        metascore: '',
        stars: ''
      };
    }

    changeHandler = event => {
        event.target.name === 'metascore' ? 
        this.setState({ [event.target.name]: Number(event.target.value) }) :
        this.setState({ [event.target.name]: event.target.value })
    };

    submitMovie = event => {
        event.preventDefault();
        const { title, director, metascore, stars } = this.state;
        
        let starsArr = stars
        starsArr.length > 1 ? starsArr = starsArr.split(',').map(star => star.trim()) : starsArr
        
        let newMovie = {title: title, director: director, metascore: metascore, stars: starsArr}
        EventEmitter.dispatch('addMovie', newMovie);
    }

    render() {
        return (
            <div className='movie-create'>
                <form className='create-form' onSubmit={this.submitMovie}>Add Movie
                    <input className='create-input' name='title' value={this.state.title} onChange={this.changeHandler} type='text' placeholder='Title' required></input>
                    <input className='create-input' name='director' value={this.state.director} onChange={this.changeHandler} type='text' placeholder='Director' required></input>
                    <input className='create-input' name='metascore' value={this.state.metascore} onChange={this.changeHandler} type='text' placeholder='Metascore' required></input>
                    <input className='create-input' name='stars' value={this.state.stars} onChange={this.changeHandler} type='text' placeholder='List of stars (separate each name with a comma)' required></input>
                    <input className='submit' type='submit' value='Submit'/>
                </form>
            </div>
        )
    }
}