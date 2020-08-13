import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Card,  CardHeader  } from 'reactstrap';

const UpdateMovie = (props) => {
	const { push } = useHistory();
	const [movie, setMovie] = useState({
		title: '',
		director: '',
		metascore: '',
		stars: [],
	});

	console.log(props.movieList);

	const { title, director, metascore, stars } = movie;

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
			.then((res) => {
				setMovie(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleChanges = (e) => {
		setMovie({ ...movie, [e.target.name]: e.target.value });
		if (e.target.name === 'stars') {
			setMovie({ ...movie, stars: e.target.value.split(',') });
		}
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
			.then((res) => {
				const newMovies = props.movieList.map((film) => {
					if (film.id === res.data.id) {
						return (film = res.data);
					}
					return film;
				});
				props.setMovieList(newMovies);
				push('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
            <Card style={{ width: '20%', marginLeft: '38%', textAlign: 'center', border: 'none', background: 'transparent', color: 'whitesmoke', fontSize: '35px', fontWeight: 'bolder' }}>
                <CardHeader>Update Movie</CardHeader>
            </Card>

        <Form onSubmit={handleUpdate} style={{ width: '45%', margin: '1%', marginLeft: '25%' }} >
           
            <FormGroup style={{ fontSize: '20px', fontWeight: 'bolder' }} >
                <Label style={{ color: 'whitesmoke'}} >Movie Title</Label>
                <Input style={{ background: '#e4ddbd'}}
                    type="text"
					name="title"
                    value={title}
                    placeholder='Movie Title'
					onChange={handleChanges}
                />
            </FormGroup>

            <FormGroup style={{ fontSize: '20px', fontWeight: 'bolder' }} >
            <Label style={{ color: 'whitesmoke',}} >Director</Label>
                <Input style={{ background: '#e4ddbd'}}
                    type="text"
					name="director"
                    value={director}
                    placeholder='Director'
					onChange={handleChanges}
                />
            </FormGroup>

            <FormGroup style={{ fontSize: '20px', fontWeight: 'bolder' }} >
            <Label style={{ color: 'whitesmoke'}} >Medascore</Label>
                <Input  style={{ background: '#e4ddbd'}}
                    type="text"
                    name="metascore"
                    value={metascore}
                    placeholder='Metascore'
                    onChange={handleChanges}
                />
            </FormGroup>

            <FormGroup style={{ fontSize: '20px', fontWeight: 'bolder' }} >
            <Label style={{ color: 'whitesmoke'}} >Actor/Actress</Label>
                <Input  style={{ background: '#e4ddbd'}}
                	type="text"
					name="stars"
                    value={stars}
                    placeholder='Actor/Actress'
					onChange={handleChanges}    
                />
            </FormGroup>

            <Button style={{ width: '20%' ,margin: '2%',marginLeft: '43%', background: 'lightseagreen' }}  >Update</Button>

        </Form>
    </div>
	);
};

export default UpdateMovie;
