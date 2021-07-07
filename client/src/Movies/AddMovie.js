import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Card,  CardHeader  } from 'reactstrap';

const AddMovie = (props) => {
	const [movie, setMovie] = useState({
		title: '',
		director: '',
		metascore: '',
		stars: [],
	});
	const { title, director, metascore, stars } = movie;
	const { push } = useHistory();
	const handleChanges = (e) => {
		setMovie({ ...movie, [e.target.name]: e.target.value });
		if (e.target.name === 'stars') {
			setMovie({ ...movie, stars: e.target.value.split(',') });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`http://localhost:5000/api/movies`, movie)
			.then((res) => {
				props.setMovieList(res.data);
				push('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	console.log(movie);
	return (
		<div>
        <Card style={{ width: '20%', marginLeft: '38%', textAlign: 'center', border: 'none', background: 'transparent', color: 'whitesmoke', fontSize: '35px', fontWeight: 'bolder' }}>
            <CardHeader>Add Movie</CardHeader>
        </Card>

    <Form onSubmit={handleSubmit} style={{ width: '45%', margin: '1%', marginLeft: '25%' }} >
       
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

export default AddMovie;
