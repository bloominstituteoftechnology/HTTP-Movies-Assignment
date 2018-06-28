import React from 'react'

class NewMovieForm extends React.Component {
  state = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
  }

  addTitle = e => {
  }

  addDirector = e => {
  }

  addMetascore = e => {
  }

  addMovie = e => {
  }
  render(){
    return <div>
      <input type="text" 
             placeholder="title" 
             onChange={this.addTitle}
      ></input>
      <input type="text" 
             placeholder="director" 
             onChange={this.addDirector}
      />
      <input type="text" 
             placeholder="metascore" 
             onChange={this.addMetascore}
      />
      <input type="text" 
             placeholder="stars (comma separated)" 
             onChange={this.addStars}
      />
      <button onClick={this.addMovie}>add movie</button>
    </div>
  }
}

export default NewMovieForm
  
