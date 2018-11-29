import React from 'react';
import axios from 'axios';

export default class AddForm extends React.Component {

  constructor() {

    super();

    this.state = ({

      title: '',
      director: '',
      metascore: 0,
      stars: [],
      star: ''

    });

  }

  handleChange = e => {

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  render() {

    return (

      <form onSubmit={e => {
        e.preventDefault();
        this.props.addFunc({
          title: this.state.title,
          director: this.state.director,
          metascore: this.state.metascore,
          stars: this.state.stars
        });
        this.props.history.push('/');
      }}>

        <input type='text' name='title' placeholder='movie title' value={this.state.title} onChange={this.handleChange} />
        <input type='text' name='director' placeholder='director' value={this.state.director} onChange={this.handleChange} />
        <input type='number' name='metascore' value={this.state.metascore} onChange={this.handleChange} />

        <form onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          this.setState({stars: [...this.state.stars, this.state.star]}, () => this.setState({star: ''}));
        }}>

          <input type='text' name='star' placeholder='movie star' value={this.state.star} onChange={this.handleChange} />

          <ul>
            {this.state.stars.map(star => <li>{star}</li>)}
          </ul>

          <button>Add star</button>

        </form>

        <button>Submit</button>

      </form>

    );

  }

}
