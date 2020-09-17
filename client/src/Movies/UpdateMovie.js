import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
const UpdateMovie = ({ movies }) => {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  // Getting the movie from props instead of making another axios call
  const getMovie = (id) => {
    const newMovie = movies.filter((selectedMovie) => selectedMovie.id == id);
    setMovie(newMovie[0]);
  };

  useEffect(() => {
    getMovie(params.id);
  }, [movies]);

  // handles updating state
  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };
  // Creates put request on submit and sends user to
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
    // No need to reset form state as this is dont through delcaring move state

    // Routing user movie list. This does not update until user refreshes
    history.push(`/`);
  };

  // If movies have not been passed down it will show user
  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  return (
    <div className="update-form">
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={movie.title}
                onChange={handleChange}
              ></Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="repairType">Director</Label>
              <Input
                type="director"
                name="director"
                id="director"
                value={movie.director}
                onChange={handleChange}
              ></Input>
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="metascore">Metascore</Label>
              <Input
                type="metascore"
                name="metascore"
                id="metascore"
                value={movie.metascore}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button color="primary">Update</Button>
      </Form>
    </div>
  );
};

export default UpdateMovie;
