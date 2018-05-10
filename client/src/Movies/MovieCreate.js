import React from 'react';
import axios from 'axios';

export default class MovieCreate extends React.Component {
  state = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
  }

  handleChange = (e) => {
    if (e.target.name === "stars") {
      const arr = e.target.value.split(',')
      this.setState({
        [e.target.name]: arr
      })
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })    
    }
  }
  handleSubmit = () => {
    this.props.handleSubmit(this.state)
    this.setState({
      title: '',
      director: '',
      metascore: '',
      stars: ''
    })
  }

  render() {
    const { title, director, metascore, stars } = this.state
    return (
      <div>
        <input name='title' type='text' value={title} onChange={e => this.handleChange(e)} />
        <input name='director' type='text' value={director} onChange={e => this.handleChange(e)}/>
        <input name='metascore' type='number' value={metascore} onChange={e => this.handleChange(e)}/>
        <input name='stars' type='text' value={stars} placeholder='separate names of stars by commas' onChange={e => this.handleChange(e)}/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
