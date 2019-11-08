import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
// export default class Movie extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movie: null
//     };
//   }

//   componentDidMount() {
//     this.fetchMovie(this.props.match.params.id);
//   }

//   componentWillReceiveProps(newProps) {
//     if (this.props.match.params.id !== newProps.match.params.id) {
//       this.fetchMovie(newProps.match.params.id);
//     }
//   }

//   fetchMovie = id => {
//     axios
//       .get(`http://localhost:5000/api/movies/${id}`)
//       .then(res => this.setState({ movie: res.data }))
//       .catch(err => console.log(err.response));
//   };

  // saveMovie = () => {
  //   const addToSavedList = this.props.addToSavedList;
  //   addToSavedList(this.state.movie);
  // };

  // editMovie = (id, data) =>{
  //   axios
  //     .put(`http://localhost:5000/api/movies/${id}`, data)
  //     .then((res)=> console.log(res))
  //     .catch((err)=> console.log(err))
  // }

//   render() {
//     if (!this.state.movie) {
//       return <div>Loading movie information...</div>;
//     }

    // return (
    //   <div className="save-wrapper">
    //     <MovieCard movie={this.state.movie} />
    //     <div className="save-button" onClick={this.saveMovie}>
    //       Save
    //     </div>
    //     <div className="edit-button" onClick={this.editMovie}>
    //       Edit
    //     </div>

    //   </div>
    // );
//   }
// }


export default function Movie(props){
  const [movie, setMovie] = useState({
    id:'',
    directer:'',
    title:'',
    stars:[],
    metascore:''
  })

  useEffect(()=>{
     axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  },[props.match.params.id])

  const saveMovie = () =>{
    const addToSavedList = props.addToSavedList;
    addToSavedList(movie);
  }

  const editMovie = () =>{
    props.history.push(`/edit/${props.match.params.id}`)
  }

  const deleteMovie = () =>{
    axios
    .delete(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
    .then((res)=> props.history.push('/'))
    .catch((err)=> console.log(err))
  }

  return(
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="edit-button" onClick={editMovie}>
        Edit
      </div>
      <div className="delete-button" onClick={deleteMovie}>
        Delete
      </div>

    </div>
    )
}








