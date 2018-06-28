import React from 'react'
import { post } from 'axios'

const URL = 'http://localhost:5000/api/movies'

class NewMovieForm extends React.Component {
  
  state = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
  }


  addTitle = e => {
    const { value: title } = e.target
    this.setState({ title })
  }

  addDirector = e => {
    const { value: director } = e.target
    this.setState({ director })
  }

  addMetascore = e => {
    const { value: metascore } = e.target
    this.setState({ metascore })
  }

  addStars = e => {
    const { value } = e.target
    const stars = value.split(',')

    this.setState({ stars })
  }

  addMovie = e => {
    const { state: newMovie } = this

    post(URL, newMovie)
      .then(({ data }) => {
        
        this.setState({
          title: '',
          director: '',
          metascore: '',
          stars: []
        })

        // changes location and adds to history stack 
        // history.push does not refresh component with new data
        
        window.location.href = '/'

      })
      .catch(e => console.log('uh oh', e))
    
  }

  render(){
    return <div>
      <input type="text" 
             placeholder="title" 
             onChange={this.addTitle}
      />
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
  
