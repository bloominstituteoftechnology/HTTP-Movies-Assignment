import React from 'react';
import { Link } from 'react-router-dom';
import {Button } from 'reactstrap';

function AddMovie() {
  return (
    <div className="add-movie">
      <h3>Add New Movie:</h3>
      <div className="add-button">
        <Button color="warning">
            <Link to="/add-movie">Add Movie</Link>
        </Button>
      </div>
    </div>
  );
}

export default AddMovie;
