import React from 'react';
import axios from 'axios';
import '../index.css'
const URL = `http://localhost:5000/api/movies`;

class MovieCreate extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            director: '',
            metascore: '',
            stars: [],
            starAmount: ''
        };
    }
    addStars(num) {
        let person = [];
        for (let i = 0; i < num; ++i) {
            person[i] = prompt(`Please enter Actor#${i + 1}`)
        }
        return person;
    }

    handleSubmit = e => {
        e.preventDefault();
        if(!(this.state.title || this.state.director || this.state.metascore)){return;}
        const movie = ({
            title: this.state.title,
            director: this.state.director,
            metascore: this.state.metascore,
            stars: this.addStars(this.state.starAmount)
        });
        axios
            .post(URL, movie)
            .then(this.setState({ title: '', director: '', metascore: '', stars: '', starAmount: '' }))
            .catch(err => {
                console.log(err);
            })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <form className="add-form" onSubmit={this.handleSubmit}>
                <input
                    className="input-form"
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={this.handleChange}
                    value={this.state.title}
                />
                <input
                    className="input-form"
                    type="text"
                    placeholder="Director"
                    name="director"
                    onChange={this.handleChange}
                    value={this.state.director}
                />
                <input
                    className="input-form"
                    type="number"
                    placeholder="Metascore"
                    name="metascore"
                    onChange={this.handleChange}
                    value={this.state.metascore}
                />
                <input
                    className="input-form"
                    type="number"
                    placeholder="How many actors"
                    name='starAmount'
                    onChange={this.handleChange}
                    value={this.state.starAmount}
                />
                <button  className="input-form">Submit</button>
            </form>
        );
    }
}

export default MovieCreate;