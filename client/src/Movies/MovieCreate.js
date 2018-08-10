import React from 'react'
import axios from 'axios' 

class MovieCreate extends React.Component {
    constructor (){
        super()
        this.state = {
            title: '',
            director: '',
            metascore: '',
            stars: ''
        }
    }

    onInputChange (event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit (event){
        event
        const stars = this.state.stars.split(', ')
        const url = `http://localhost:5000/api/movies`;
        axios.post(url, {
            title: this.state.title,
            director: this.state.director,
            metascore: this.state.metascore,
            stars: stars
        })
            .then(res => {
                console.log(res)
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="newMovie" >
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" name="title" onChange={this.onInputChange.bind(this)} placeholder="Title" />
                    <input type="text" name="director" onChange={this.onInputChange.bind(this)} placeholder="Director" />
                    <input type="text" name="metascore" onChange={this.onInputChange.bind(this)} placeholder="Meta Score" />
                    <input type="text" stars="stars" onChange={this.onInputChange.bind(this)} placeholder="Stars" />
                    <button>Add</button>
                </form>
            </div>
        )
    }
}

export default MovieCreate