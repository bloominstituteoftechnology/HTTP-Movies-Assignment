import React, { Component } from 'react'

class MovieForm extends Component {
    state = {
        newMovie: {
            title: '',
            director: '',
            metascore: '',
            stars: []
        }
    }

    handleChanges = e => {
        let name = e.target.name;
        let value = e.target.value;
        if(name === 'stars'){
            value = value.split(',')
        }
        this.setState({
            newMovie:{
                ...this.state.newMovie,
                [name]: value
            }
        })
    }

    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                this.props.addMovie(this.state.newMovie)
            }}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={this.handleChanges}
                    value={this.state.newMovie.title}
                />
                <input
                    type="text"
                    placeholder="Director"
                    name="director"
                    onChange={this.handleChanges}
                    value={this.state.newMovie.director}
                />
                <input
                    type="text"
                    placeholder="Metascore"
                    name="metascore"
                    onChange={this.handleChanges}
                    value={this.state.newMovie.metascore}
                />
                <input
                    type="text"
                    placeholder="Actors"
                    name="stars"
                    onChange={this.handleChanges}
                    value={this.state.newMovie.stars}
                />
                <input
                    type="submit"
                    value="Submit"
                />
            </form>
        )
    }
}

export default MovieForm

