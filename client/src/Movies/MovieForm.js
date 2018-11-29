import React, {Component} from 'react';


// const Form = styled.form`
// 	width: 50%;
// 	border: 2px solid grey;
// 	border-radius: 10px;
// 	background: white;
// 	display: flex;
// 	flex-flow: column nowrap;
// 	padding: 2.5%;
// 	margin: 5% 33%;
// 	justify-content: space-around;
// 	align-items: space-between;
// `;
// const Input = styled.input`
// 	border: 1px solid black;
// 	border-radius: 5px;
// 	margin: 5% 5% 0;
// 	font-size: 1.5rem;
// 	width: 80%;
// 	text-align: center;
// 	align-self: center;
// `;

// const Label = styled.label`
// 	font-size: 1.8rem;
// 	margin: 1% 5% 2%;
// 	color: #272932;
// 	text-align: center;
// `;

// const Button = styled.button`
// 	border-radius: 10px;
// 	padding: 1% 5%;
// 	margin: 1% 25%;
// 	width: 50%;
// 	background: #8ba6a9;
// 	color: #272932;
// 	font-weight: bold;
// 	border: 2px solid #272932;
// 	:hover {
// 		border: 2px solid #cfc7d2;
// 		background: #272932;
// 		color: #cfc7d2;
// 	}
// `;


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
		this.setState({
			movie: {
				...this.state.movie,
				[event.target.name]: event.target.value
			}
		});
    };
    
    addMovie = (event) => {
		event.preventDefault();
		this.props.addMovie(this.state.movie);
    };
    render() {
		return (
			<form onSubmit={this.addMovie}>
				<label>
					Title
					<input
						type="text"
						name="title"
						value={this.state.movie.title}
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Director
					<input
						type="text"
						name="director"
						value={this.state.movie.director}
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Metascore
					<input
						type="number"
						name="metascore"
						value={this.state.movie.metascore}
						onChange={this.handleChange}
					/>
				</label>
                <label>
					Stars
					<input
						type="text"
						name="metascore"
						value={this.state.movie.stars}
						onChange={this.handleChange}
					/>
				</label>
				<button type="submit">Add Movie</button>
			</form>
		);
	}
}
export default MovieForm;