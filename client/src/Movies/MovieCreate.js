import React from 'react'; 

class MovieCreate extends React.Component {
    constructor(){
        super()
        this.state = { 
            title  : '',
            director : '', 
            metaScore : '',
            stars : [],
            star : ''
        }
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {

        return (
            <div className="movie-card formCard">
              <form>
                <h1>Title</h1>
                <input type="text" placeholder = "title goes here" onChange ={this.onChange} name = 'title' value = {this.state.title}/>
                <h1>Director</h1>
                <input type="text"  placeholder = "director goes here" onChange ={this.onChange} name = 'director' value = {this.state.director}/>
                <h1>MetaScore</h1>
                <input type="text" placeholder = "metaScore goes here" onChange ={this.onChange} name = 'metaScore' value = {this.state.metaScore}/>
                <h1>Stars</h1>
                {/* show starts  */}
                <h1>Add Star</h1>
                <input type="text" placeholder = "add star to list of stars" onChange ={this.onChange} name = 'star' value = {this.state.star}/>
                <button>Add star to stars</button>
                <h1>Submit</h1>
                <button>Submit Movie</button>
              </form>
            </div>
            
        )
    }
}

export default MovieCreate; 