import React from 'react'; 


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
        this.props.addMovie(this.state.movie);

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
                <button onClick = {this.validate}>Submit Movie</button>
              </form>
            </div>
            
        )
    }
}

export default MovieCreate; 