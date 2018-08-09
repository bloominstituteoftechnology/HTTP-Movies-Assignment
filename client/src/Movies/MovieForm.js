import React from "react";

class MovieForm extends React.Component {
	state = {
		title: "",
		director: "",
		metascore: "",
		stars: [],
	};

	handleChange = event =>
		this.setState({
			[event.target.name]: event.target.value
        });
        
    handStarsChange = event => {
        this.this.setState({
            [event.tartet.name] : event.target.value.split(",")
        })
    }
        

	render() {
		return (
			<form
				onSubmit={e => {
					e.preventDefault();
					this.props.onSubmit(this.state);
					this.setState({
						title: "",
						director: "",
						metascore: "",
						stars: [],
					});
				}}
			>
				<h3>New Movie!</h3>
				<div>
					<input
						onChange={this.handleChange}
						type="text"
						placeholder="title"
						name="title"
						value={this.state.title}
					/>
				</div>
				<div>
					<input
						onChange={this.handleChange}
						type="text"
						placeholder="director"
						name="director"
						value={this.state.directormetascore}
					/>
				</div>
				<div>
					<input
						onChange={this.handleChange}
						type="text"
						placeholder="metascore"
						name="metascore"
						value={this.state.metascore}
					/>
				</div>
				<div>
					<input
						onChange={this.handleStarsChange}
						type="text"
						placeholder="stars"
						name="stars"
						value={this.state.stars.join(",")}
					/>
				</div>
                <button>Submit</button>
			</form>
		);
	}
}

export default MovieForm;
