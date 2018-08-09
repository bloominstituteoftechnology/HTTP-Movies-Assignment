import React, { Component } from "react";
import axios from "axios";
export default class MovieCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      director: "",
      metascore: 0,
      stars: [""]
    };
  }

  addStar = () =>{
    this.setState((prevState) =>{  return{
      stars: prevState.stars.concat([''])
    }})
  }

  removeStar =(id)=>{
    let prevState = this.state.stars.slice();
    prevState.splice(id, 1)
    this.setState({
      stars: prevState
    })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleChangeStar = (event) => {
    let changedState = this.state.stars.slice();
    
    changedState[event.target.id]= event.target.value;

    this.setState({
      stars: changedState
    })
  }
  pushMovie= e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", {
        title: this.state.title,
        director: this.state.director,
        metascore: this.state.metascore,
        stars: this.state.stars,
      })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
  };
  componentDidMount = () => {};

  render() {
    return (
      <div className="save-wrapper">
        <div className="movie-card">
          <form onSubmit={this.pushMovie}>
            <input required onChange={this.handleChange} name='title' type="text" placeholder="Movie Title" />
            <input required onChange={this.handleChange} name='director' type="text" placeholder="Movie Director" />
            <input required onChange={this.handleChange} name='metascore' type="number" placeholder="Metascore" />
           
            { this.state.stars.map((e, i) => {
              return (
                <div key={i} className="movieStarLine">
                  
                  <input
                    required
                    onChange={this.handleChangeStar}
                    name='star'
                    id={i}
                    type="text"
                    placeholder="Movie Star"
                  />{" "}
                  <span onClick={()=>this.removeStar(i)} className="remove">-</span>
                </div>
              );
            })}
            <span onClick={this.addStar} className="addStar">+Add more</span>

            <button> Submit </button>
          </form>
        </div>
      </div>
    );
  }
}
