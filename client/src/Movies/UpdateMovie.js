import React, { useState, useEffect, Component } from 'react'
import api from '../utils/api'

class UpdateMovie extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: '',
            title: '',
            director: '',
            metascore: '',
            stars: []
        }
    }

    componentDidMount() {
        api().get(`/movies/${this.props.match.params.id}`)
            .then(res => {
                this.setState(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange = e => {
        this.setState({
            ...this.state.movie,
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        
        api().put(`/movies/${this.state.id}`, this.state)
            .then(res => {
                this.props.history.push(`/movies/${this.state.id}`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
    return (
            <div className='movie-card'>
                <form onSubmit={this.handleSubmit} className='edit-form'>
                    <h1>Update Movie</h1>
                    <label>Title</label>
                    <input 
                        type='text'
                        placeholder={this.state.title}
                        value={this.state.title}
                        onChange={this.handleChange}
                    />

                    <label>Director</label>
                    <input 
                        type='text'
                        placeholder={this.state.director}
                        value={this.state.director}
                        onChange={this.handleChange}
                    />

                    <label>Metascore</label>
                    <input 
                        type='text'
                        placeholder={this.state.metascore}
                        value={this.state.metascore}
                        onChange={this.handleChange}
                    />

                    <label>Stars</label>
                    <input 
                        type='text'
                        placeholder={this.state.stars}
                        value={this.state.stars}
                        onChange={this.handleChange}
                    />

                    <button className='save-button'>Save</button>
                </form>
            </div>
        )
    }
}


export default UpdateMovie;