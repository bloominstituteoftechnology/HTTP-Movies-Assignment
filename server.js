const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(CORS());

const movies = [
  {
		id: 0,
		title: 'The Godfather',
		director: 'Francis Ford Coppola',
		metascore: 100,
		stars: ['Marlon Brando', 'Al Pacino', 'Robert Duvall'],
		src: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg'
	},
	{
		id: 1,
		title: 'Star Wars',
		director: 'George Lucas',
		metascore: 92,
		stars: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher'],
		src: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzMzM4NzkzOV5BMl5BanBnXkFtZTcwNjIyMTIyMw@@._CR302,100,957,1419_UX614_UY910.jpg'
	},
	{
		id: 2,
		title: 'The Lord of the Rings: The Fellowship of the Ring',
		director: 'Peter Jackson',
		metascore: 92,
		stars: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
		src: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX182_CR0,0,182,268_AL_.jpg'
	},
	{
		id: 3,
		title: 'Terminator 2: Judgement Day',
		director: 'James Cameron',
		metascore: 94,
		stars: ['Arnold Schwarzenegger', 'Edward Furlong', 'Linda Hamilton'],
		src: 'https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg' 
	},
	{
		id: 4,
		title: 'Dumb and Dumber',
		director: 'The Farely Brothers',
		metascore: 76,
		stars: ['Jim Carrey', 'Jeff Daniels', 'Lauren Holly'],
		src: 'https://m.media-amazon.com/images/M/MV5BZDQwMjNiMTQtY2UwYy00NjhiLTk0ZWEtZWM5ZWMzNGFjNTVkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY268_CR0,0,182,268_AL_.jpg'
	},
	{
		id: 5,
		title: 'Tombstone',
		director: 'George P. Cosmatos',
		metascore: 89,
		stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
		src: 'https://m.media-amazon.com/images/M/MV5BODRkYzA4MGItODE2MC00ZjkwLWI2NDEtYzU1NzFiZGU1YzA0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
	},
];

let movieId = movies.length;

app.get('/api/movies', (req, res) => {
  res.send(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.filter(
    movie => movie.id.toString() === req.params.id
  )[0];
  res.status(200).json(movie);
});

app.post('/api/movies', (req, res) => {
  if (req.body.title !== undefined) {
    const newMovie = req.body;
    newMovie['id'] = movieId;
    movies.push(newMovie);
  }
  ++movieId;
  res.status(201).json(movies);
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
