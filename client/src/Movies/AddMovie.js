import React, { Component } from 'react';
import axios from 'axios';

class AddMovie extends Component {
    constructor() {
        super();
        this.state = {
            id: function () { return this.movies[this.movies.length - 1].id },
            title: '',
            director: '',
            metascore: 0,
            stars: '',
            movies: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/movies`)
            .then((response) => { this.setState({ movies: response.data }) })
            .catch(err => console.log(err))
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = () => {
        let id = this.state.id() + 1;
        axios.post(`http://localhost:5000/api/movies`, { id: id, title: this.state.title, director: this.state.director, metascore: Number(this.state.metascore), stars: this.state.stars.split(',') })
    }

    render() {
        return (
            <div>
                <h1>Add a new movie</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Title: <input name="title" type="text" value={this.state.title} placeholder="Add a title" onChange={this.handleChange} /><br /><br />
                        Director: <input name="director" type="text" value={this.state.director} placeholder="Add a director" onChange={this.handleChange} /><br /><br />
                        Metascore: <input name="metascore" type="number" min="1" value={this.state.metascore} placeholder="Add a metascore" onChange={this.handleChange} /><br /><br />
                        Stars: <input name="stars" type="text" value={this.state.stars} placeholder="To add multiple stars separate them with commas" onChange={this.handleChange} /><br /><br />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default AddMovie;
