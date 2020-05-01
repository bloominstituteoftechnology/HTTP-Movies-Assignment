// import React, { Component } from 'react';
// import axios from 'axios';

// class UpdateMovie extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movie: null
//     };
//   }
//   componentDidMount() {
//     this.getData(this.props.match.params.id);
//   }

//   getData = id => {
//     axios
//       .get(`http://localhost:5000/api/movies/${id}`)
//       .then(response => this.setState({ movie: response.data }))
//       .catch(error => console.log('Unable', error));
//   };

//   handleTitle = event => {
//     this.setState({
//       ...this.state,
//       movie: { ...this.state.movie, title: event.target.value }
//     });
//   };

//   handleMetaScore = event => {
//     this.setState({
//       ...this.state,
//       movie: { ...this.state.movie, score: event.target.value }
//     });
//   };

//   handleDirctor = event => {
//     this.setState({
//       ...this.state.movie,
//       movie: { ...this.state.movie, director: event.target.value }
//     });
//   };

//   handleStars = event => {
//     this.setState({
//       ...this.state.movie,
//       movie: { ...this.state.movie, stars: event.target.value }
//     });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     axios
//       .put(
//         `http://localhost:5000/api/movies/${this.state.movie.id}`,
//         this.state.movie
//       )
//       .then(() => {
//         this.props.history.push(`/movies/${this.state.movie.id}`);
//       })
//       .catch(err => console.log(err.response));
//   };
//   render() {
//     return (
//       <div>
//         <form>
//           <h3>
//             {this.state.movie ? `Edit ${this.state.movie.title}` : 'Loading...'}
//           </h3>
//           <label>
//             Title:
//             <input onChange={this.handleTitle} type='text' />
//           </label>
//           <br />
//           <label>
//             Metascore:
//             <input onChange={this.handleMetaScore} type='number' />
//           </label>
//           <br />
//           <label>
//             Director:
//             <input onChange={this.handleDirector} type='text' />
//           </label>
//           <br />
//           <label>
//             Stars*
//             <input onChange={this.handleStars} type='text' />
//           </label>
//           <h6>*Seperate stars with commas.</h6>
//           <button onClick={this.handleSubmit}>Update Movie</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default UpdateMovie;

import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
export default class UpdateMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }
  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }
  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };
  handleTitle = event => {
    this.setState({
      ...this.state,
      movie: { ...this.state.movie, title: event.target.value }
    });
  };
  handleScore = event => {
    this.setState({
      ...this.state,
      movie: { ...this.state.movie, score: event.target.value }
    });
  };
  handleDirect = event => {
    this.setState({
      ...this.state,
      movie: { ...this.state.movie, director: event.target.value }
    });
  };
  handleStars = event => {
    this.setState({
      ...this.state,
      movie: { ...this.state.movie, stars: event.target.value.split(',') }
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/movies/${this.state.movie.id}`,
        this.state.movie
      )
      .then(() => {
        this.props.history.push(`/movies/${this.state.movie.id}`);
      })
      .catch(err => console.log(err.response));
  };
  render() {
    return (
      <form className='formBody'>
        <h3>
          {/* {this.state.movie ? `Edit ${this.state.movie.title}` : 'Loading...'} */}
        </h3>

        <input
          onChange={this.handleTitle}
          className='form-control '
          type='text'
          placeholder='Title'
        />

        <br />

        <input
          onChange={this.handleScore}
          className='form-control '
          type='number'
          placeholder='Metascore'
        />

        <br />

        <input
          onChange={this.handleDirect}
          className='form-control '
          type='text'
          placeholder='Director'
        />

        <br />

        <input
          onChange={this.handleStars}
          className='form-control '
          type='text'
          placeholder='Stars'
        />

        <button
          className='btn btn-primary btn-block'
          onClick={this.handleSubmit}>
          Edit Movie
        </button>
      </form>
    );
  }
}
