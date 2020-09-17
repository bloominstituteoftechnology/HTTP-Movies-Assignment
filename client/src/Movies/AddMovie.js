import React, { useState } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
const AddMovie = ({ length, getMovieList }) => {
  const history = useHistory();
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  const [stars, setStars] = useState([{ value: null }]);

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
    // Pushing stars value to movie.stars
    stars.map((star) => {
      movie.stars.push(star.value);
    });

    // Adding id based on how long move length is
    setMovie({
      ...movie,
      id: length + 1,
    });

    // Create Post request
    axios
      .post("http://localhost:5000/api/movies", movie)
      .then((res) => getMovieList())
      .catch((err) => console.log(err.response));

    history.push("/");
  };

  /** Logic to handle stars Form **/

  // Updates stars state with all info
  const handleStarsChanges = (index, e) => {
    const newStars = [...stars];
    newStars[index].value = e.target.value;
    setStars(newStars);
  };

  // add new star object to array
  const handleAdd = () => {
    const newStar = [...stars];
    newStar.push({ value: null });
    setStars(newStar);
  };

  // Remove stary by splicing to find correct one to remove
  const handleRemove = (index) => {
    const newStars = [...stars];
    newStars.splice(index, 1);
    setStars(newStars);
  };

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
        <div id="stars-label">
          <Label for="stars">Stars</Label>

          <Button color="success" size="sm" onClick={() => handleAdd()}>
            +
          </Button>
        </div>

        <Row form>
          {stars.map((star, index) => {
            return (
              <Col md={2}>
                <FormGroup className="stars" key={`${star}-${index}`}>
                  <Input
                    type="text"
                    value={stars.value}
                    onChange={(e) => handleStarsChanges(index, e)}
                  />
                  <Button color="danger" onClick={() => handleRemove(index)}>
                    -
                  </Button>
                </FormGroup>
              </Col>
            );
          })}
        </Row>
        <Button color="primary">Update</Button>
      </Form>
    </div>
  );
};

export default AddMovie;
