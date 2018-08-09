import React from 'react'; 
import {Link} from 'react-router-dom'; 

class MovieCreate extends React.Component {
    constructor(){
        super()
        this.state = { 
            title  : '',
            director : '', 
            metaScore : '',
            stars : [],
            star : '',
            movie: {}
        }
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    addStar = event => {
        event.preventDefault()
        const star = this.state.star.slice();
        const stars = this.state.stars.slice(); 
        if(star.length > 5){
            stars.push(star); 
            this.setState({star: '', stars})
        } else {
            alert("Enter the full name of the star you wish to add");
        }
    }
    validate = event => {
        event.preventDefault()
        const title = this.state.title.slice();
        const stars = this.state.stars.slice();
        const director = this.state.director.slice(); 
        const metaScore = this.state.metaScore.slice(); 
        const movie = {};
        if(title.length > 4){
            movie.title = title; 
        }
        else {
            alert('Please add a valid movie title')
        }
        if(stars.length){
            movie.stars = stars; 
        } else {
            alert('Please add a list one star to the list of stars. When added the star should show up on the screen under Add Star')
        }
        if (director.length > 4){
            movie.director = director; 
        } else {
            alert('Please enter a valid director name')
        }
        if (Number(metaScore) && Number(metaScore) < 101 && Number(metaScore) > 0){
            movie.metascore = Number(metaScore); 
        } else {
            alert('MetaScore should be a number between 1- 100 and not feature any other characters')
        }
        this.setState({stars: [], title: '', director: '', metaScore: ''})
        this.props.addMovie(movie);
        

    }

    render() {
        

        return (
            <div className="movie-card formCard">
              <form onSubmit = {this.test}>
                <h1>Title</h1>
                <input type="text" placeholder = "title goes here" onChange ={this.onChange} name = 'title' value = {this.state.title}/>
                <h1>Director</h1>
                <input type="text"  placeholder = "director goes here" onChange ={this.onChange} name = 'director' value = {this.state.director}/>
                <h1>MetaScore</h1>
                <input type="text" placeholder = "metaScore goes here" onChange ={this.onChange} name = 'metaScore' value = {this.state.metaScore}/>
                <h1>Stars</h1>
                {this.state.stars.map((star, i) => <div key = {i}>{star}</div>)}
                <h1>Add Star</h1>
                <input type="text" placeholder = "add star to list of stars" onChange ={this.onChange} name = 'star' value = {this.state.star}/>
                <button onClick = {this.addStar}>Add star to stars</button>
                <h1>Submit</h1>
                <button onClick = {this.validate}><Link to ="/">Submit Movie</Link></button>
              </form>
            </div>
            
        )
    }
}

export default MovieCreate; 