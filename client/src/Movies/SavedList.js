import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Navbar } from 'reactstrap';

function SavedList({ list }) {
	return (
    <Navbar style={{ width: '70%', marginLeft: '15%' }} >
		<div className="saved-list">
			<h3>Saved Movies:</h3>
			{list.map((movie) => {
				return (
          
					<NavLink
						to={`/movies/${movie.id}`}
						key={movie.id}
						activeClassName="saved-active">
						<span className="saved-movie">{movie.title}</span>
					</NavLink>
				);
			})}
			<div className="home-button">
				<Link to="/">Home</Link>
			</div>
			<div className="home-button">
				<Link to="/add-movie">Add Movie</Link>
			</div>
		</div>
    </Navbar>
	);
}

export default SavedList;
