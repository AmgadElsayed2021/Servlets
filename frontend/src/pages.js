import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

// import { Form, Button } from "semantic-ui-react";
// import jsonfile from "jsonfile";
// import "./index.css";
// import { addMovieFunction, updateTheMovies } from "./App";

export function Ratings() {
  return (
    <>
      <Header />
      <section
        style={{ position: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        <MovieForm />
      </section>
    </>
  );
}

export function Home({ movies = [], onRemoveMovie = (f) => f }) {
  // console.log(movies);

  return (
    <div className="App">
      <Header />

      <div className="mainDivStyle">
        {movies.map((movie, i) => (
          <Movie
            // {...movie}
            key={i}
            Title={movie.Title}
            Actors={movie.Actors}
            Poster={movie.Poster}
            Rating={movie.Rating}
            Released={movie.Released}
            onRemove={onRemoveMovie}
          ></Movie>
        ))}
      </div>
    </div>
  );
}
//  here goes the routes
function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container
          style={{
            position: "static",
          }}
        >
          <Navbar.Brand href="/">Moviflex</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}

          <Navbar.Brand href="/">Reviews</Navbar.Brand>
          <Navbar.Brand href="/ratings">Ratings</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}
export default function Movie({
  Title,
  Poster,
  Released,
  Actors,
  Rating,
  onRemove = (f) => f,
}) {
  // console.log(props);
  return (
    <Container
      style={{
        backgroundColor: "rgb(211 223 213 /  49%)",
        height: "fit-content",
        width: "fit-content",
        margin: "14px",
        padding: "6px",
        border: "11px solid rgb(181 150 55)",
        borderRadius: "68px",
        boxShadow: "2px 2px 13px 3px #8b586b",
      }}
    >
      <Row className=".text-center">
        <h2 style={{ color: "#8d2639" }}> {Title}</h2>
      </Row>

      <Row style={{ width: "19rem", height: "25.5rem" }}>
        <img
          className="poster"
          src={"./images/" + Poster}
          alt={Title}
          height="400px"
        />
      </Row>
      <Row xs={"auto"} style={{ textAlign: "left" }}>
        <Col
          style={{
            color: "blue",
          }}
        >
          <p>
            <b>Released &nbsp; &nbsp; &nbsp; :</b>
          </p>
        </Col>
        <Col className=".align-items-stretch">
          <p
            style={{
              color: "#6a0000",
            }}
          >
            {Released}
          </p>
        </Col>
      </Row>
      <Row xl={"auto"} style={{ textAlign: "left", height: "10rem" }}>
        <Col
          xs="auto"
          style={{
            color: "blue",
          }}
        >
          <p>
            <b>Main Actors :</b>
          </p>
        </Col>
        <Col className=".align-items-stretch">
          <Row>
            <p
              style={{
                color: "#6a0000",
              }}
            >
              {Actors[0]}
            </p>
          </Row>
          <Row>
            <p
              style={{
                color: "#6a0000",
              }}
            >
              {Actors[1]}
            </p>
          </Row>
          <Row>
            <p
              style={{
                color: "#6a0000",
              }}
            >
              {Actors[2]}
            </p>
          </Row>
          <Row>
            <p
              style={{
                color: "#6a0000",
              }}
            >
              {Actors[3]}
            </p>
          </Row>
        </Col>
      </Row>
      <Row xl={"auto"} style={{ textAlign: "left" }}>
        <Col
          style={{
            color: "blue",
          }}
        >
          <p>
            <b>Movie Rating :</b>
          </p>
        </Col>
        <Col>
          <p
            style={{
              color: "#6a0000",
            }}
          >
            {Rating}
          </p>
        </Col>
      </Row>
      <Button
        variant="danger"
        className=".text-center"
        onClick={() => {
          onRemove(Title);
        }}
      >
        Remove
      </Button>
    </Container>
  );
}
// create the movie form proto
const initialFormData = Object.freeze({
  Title: "",
  Rating: "",
  Released: "",
  Actors: "",
  Poster: "",
});
//  here gors the form route code
// newReview(Title, Actors, Poster, Rating, Released)
function MovieForm() {
  const [formData, updateFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    JSON.stringify(formData);
    console.log(formData);
    // addMovieFunction(formData, updateTheMovies);
  };
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Movie Title</Form.Label>
        <Form.Control
          type="text"
          id="title"
          name="Title"
          onChange={handleChange}
          placeholder="Enter movie Title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Actors</Form.Label>
        <Form.Control
          type="text"
          id="movie-actors"
          name="Actors"
          onChange={handleChange}
          placeholder="Enter Movie Actors seperated by comma"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Releasing Date</Form.Label>
        <Form.Control
          type="date"
          id="releaseDate"
          name="Released"
          onChange={handleChange}
          placeholder="Enter Movie Actors seperated by comma"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          id="movie-rating"
          name="Rating"
          min={1}
          max={5}
          onChange={handleChange}
          placeholder="Enter movie Rating out of 5"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Movie Poster</Form.Label>
        <Form.Control
          type="file"
          multiple
          accept=" image/*"
          id="movie-poster"
          name="Poster"
          onChange={handleChange}
          placeholder="Enter movie Rating out of 5"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
