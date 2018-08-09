import React from 'react';
import axios from 'axios';

class MovieCreate extends React.Component {
    constructor(props){
    super(props);
    this.state={
        title:'',
        director:'',
        metascore:'',
        stars:''
    }
    }
    onInputChange=e=>{
        this.setState({[e.target.name]:e.target.value});
    }
    submitMovie=()=>{
        const newMovieObj={
            title:this.state.title,
            director:this.state.director,
            metascore:this.state.metascore,
            stars:this.state.stars.split(',')
        }
        axios.post('http://localhost:5000/api/movies/',newMovieObj).then(res=>this.props.history.push('/')).catch(err=>alert('something went wrong'));
    }
    render() {
        return (
        <form className='newMovieForm'>
            <input type='text' name='title' value={this.state.title} placeholder='Enter a title' onChange={this.onInputChange}/>
            <input type='text' name='director' value={this.state.director} placeholder='Enter a director name' onChange={this.onInputChange}/>
            <input type='number' name='metascore' value={this.state.metascore} placeholder='Enter a metascore' onChange={this.onInputChange}/>
            <input type='text' name='stars' value={this.state.stars} placeholder='Enter star names separated with commas' onChange={this.onInputChange}/>            
            <button type='button' className='btn waves-effect waves-light' onClick={this.submitMovie}>Submit New Movie</button>
        </form>
        )
    }
}
export default MovieCreate;