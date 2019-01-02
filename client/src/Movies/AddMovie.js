import React from 'react';
import axios from 'axios';

class AddMovie extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            director: '',
            metascore: '',
            stars: '',
        };
    }
    handleInput = (e, type) => {
        this.setState({ [type]: e.target.value });
    }
    addMovie = (e) => {
        e.preventDefault();
        const [title, director, metascore] = [this.state.title, this.state.director, parseInt(this.state.metascore, 10)]
        const stars = this.state.stars.split(/\s*,\s*/);
        if (!title || !director || !metascore || !stars) return alert('Please fill out all fields');
        this.setState({
            title: '',
            director: '',
            metascore: '',
            stars: '',
        });
        axios.post('http://localhost:5000/api/movies', {
            title,
            director,
            metascore,
            stars
        }).then(() => this.props.history.push('/'))
            .catch(err => { throw new Error(err) });
    }
    render(){
        return (
            <form className="new-movie-form" onSubmit={this.addMovie}>
                <h3>Add Movie:</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={this.state.title}
                    onChange={e => this.handleInput(e, 'title')}
                />
                <input 
                    type="text"
                    placeholder="Director" 
                    value={this.state.director}
                    onChange={e => this.handleInput(e, 'director')}
                />
                <input
                    type="number"
                    placeholder="Metascore"
                    value={this.state.metascore}
                    onChange={e => this.handleInput(e, 'metascore')}
                />
                <input
                    type="text"
                    placeholder="Stars (Separate by commas)"
                    value={this.state.stars}
                    onChange={e => this.handleInput(e, 'stars')}
                />
                <button type="submit">Add Movie</button>
            </form>
        );
    }
}

export default AddMovie;