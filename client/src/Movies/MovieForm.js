import React, {Component} from 'react';
import './form.css';





class MovieForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: {
				title: '',
				director: '',
                metascore: '',
                stars: []
			}
		};
	}

	handleChange = (event) => {
		if(event.target.name !== 'stars'){
			this.setState({
				movie: {
					...this.state.movie,
					[event.target.name]: event.target.value
				}
			});
		} else {
			this.setState({
				movie: {
					...this.state.movie,
					stars: event.target.value.split(',')
				}
			});
		}
		
    };
    
    addMovie = (event) => {
		event.preventDefault();
		this.props.addMovie(this.state.movie);
    };
    render() {
		return (
			<form onSubmit={this.addMovie} style={{display:'flex' }}>
				<div className='labels'>
				<label>
					Title
				</label>
				<label>
					Director
					
				</label>
				<label>
					Metascore
					
				</label>
                <label>
					Stars
				
				</label>
				</div>
				
				<div className='inputs'>
				<input
						type="text"
						name="title"
						value={this.state.movie.title}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="director"
						value={this.state.movie.director}
						onChange={this.handleChange}
					/>
					<input
						type="number"
						name="metascore"
						value={this.state.movie.metascore}
						onChange={this.handleChange}
					/>
					<input
						type="text"
						name="stars"
						value={this.state.movie.stars}
						onChange={this.handleChange}
					/>
				</div>
				
				
				<button type="submit">Add Movie</button>
			</form>
		);
	}
}
export default MovieForm;