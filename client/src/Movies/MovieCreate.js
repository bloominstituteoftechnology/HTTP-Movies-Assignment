// React
import React from 'react';

// Dependencies
import axios from 'axios';

export default class MovieCreate extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			movie: {
				title: '',
				director: '',
				metascore: '',
				stars: []
			},
			starInput: ''
		};
	}

	handleChange = e => {
		e.preventDefault();

		if (e.target.name === 'starInput') {
			this.setState({
				[e.target.name]: e.target.value
			});
		} else {
			this.setState({
				movie: {
					...this.state.movie,
					[e.target.name]: e.target.name === 'metascore' ? Number(e.target.value) : e.target.value
				}
			});
		}
	}

	handleAddStar = () => {
		const newState = this.state;
		newState.movie.stars.push(this.state.starInput);

		this.setState(newState, () => {
			this.setState({
				starInput: ''
			});
		});
	}

	handleDeleteStar = starToDelete => e => {
		e.preventDefault();
		const newState = this.state;
		const newStars = newState.movie.stars.filter(starElem => starElem !== starToDelete.star);
		newState.movie.stars = newStars;

		this.setState(newState)
	}

	handleSubmitForm = e => {
		e.preventDefault();
		const newMovie = {};

		for (let i = 0; i < e.target.length - 2; i++) {
			// its e.target.length - 2 in order to exclude starInput and the submit(Add) button
			newMovie[e.target[i].name] = e.target[i].value;
		}

		newMovie['stars'] = this.state.movie.stars
		axios
			.post('http://localhost:5000/api/movies', newMovie)
			.then(this.props.history.push('/'))
	}

	render() {
		return(
			<div className = 'save-wrapper'>
				<div className = 'movie-card'>
					<h2>Add a New Movie</h2>

					<form className = 'movie-create-form' onSubmit = { this.handleSubmitForm }>
						Title: 
						<input 
							required 
							name = 'title' 
							type = 'text' 
							placeholder = 'Enter title...' 
							value = { this.state.movie.title } 
							onChange = { this.handleChange }
						/>{' '}
						Director: 
						<input 
							required 
							name = 'director' 
							type = 'text' 
							placeholder = 'Enter director...' 
							value = { this.state.movie.director } 
							onChange = { this.handleChange }
						/>{' '}
						Metascore: 
						<input 
							required 
							name = 'metascore' 
							type = 'number' 
							placeholder = 'Enter metascore...' 
							value = { this.state.movie.metascore } 
							onChange = { this.handleChange }
						/><br />
						Stars: 
						<input 
							name = 'starInput' 
							type = 'text' 
							placeholder = 'Enter stars...' 
							value = { this.state.starInput } 
							onChange = { this.handleChange }
						/>
						<div className = 'add-star-button' onClick = { this.handleAddStar }>
							Add Star
						</div>
						<div className = 'stars-list'>
							<ul>
								{ this.state.movie.stars.map((star, i) => <li onClick = { this.handleDeleteStar({ star }) } key = { i }>{ star }</li>) }
							</ul>
						</div>

						<button className = 'save-button' type = 'submit'>Add</button>
					</form>
				</div>				
			</div>
		);
	}
}
