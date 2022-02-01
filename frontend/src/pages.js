import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// import { Form, Button } from "semantic-ui-react";
// import jsonfile from "jsonfile";
// import "./index.css";
// import { addMovieFunction, updateTheMovies } from "./App";

export function Ratings() {
  return (
    <>
      <Header />
      <section>
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
      <nav>
        <div className="nav-main">
          <div className="nav-div">
            <Link to="/">Movie Review</Link>
          </div>
          <div className="nav-div">
            <Link to="ratings">Ratings</Link>
          </div>
        </div>
      </nav>
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
    <Container>
      <Row className=".text-center">
        <h2> {Title}</h2>
      </Row>

      <Row style={{ width: "20rem", height: "30rem" }}>
        <img className="poster" src={"./images/" + Poster} alt={Title} />
      </Row>
      <Row xl={"auto"} style={{ textAlign: "left" }}>
        <Col>
          <p>
            <b>Released</b>:
          </p>
        </Col>
        <Col>
          <p>{Released}</p>
        </Col>
      </Row>
      <Row xl={"auto"} style={{ textAlign: "left", height: "10rem" }}>
        <Col xs="auto">
          <p>Main Actors :</p>
        </Col>
        <Col className=".align-items-stretch">
          <Row>
            <p>{Actors[0]}</p>
          </Row>
          <Row>
            <p>{Actors[1]}</p>
          </Row>
          <Row>
            <p>{Actors[2]}</p>
          </Row>
          <Row>
            <p>{Actors[3]}</p>
          </Row>
        </Col>
      </Row>
      <Row xl={"auto"} style={{ textAlign: "left" }}>
        <Col>
          <p>Movie Rating :</p>
        </Col>
        <Col>
          <p>{Rating}</p>
        </Col>
      </Row>
      <Button
        className=".text-center"
        onClick={() => {
          onRemove(Title);
        }}
      >
        Remove
      </Button>
    </Container>
    // <div className="movie-frame">
    //   <div className="imgStyle">
    //     <img
    //       className="poster"
    //       src={"./images/" + Poster}
    //       alt={Title}
    //       width={300}
    //       height={400}
    //     />
    //   </div>
    //   <div className="divStyle">
    //     <div>
    //       <h2>Movie Name: {Title}</h2>
    //     </div>
    //     <div className="movieBox">
    //       <p> Released: {Released}</p>
    //     </div>
    //     <div>
    // <p>
    //   Main Actors :{Actors[0]} ,{Actors[1]} ,{Actors[2]}
    //   and {Actors[3]}
    // </p>
    //     </div>
    //     <div>
    //       <p>Movie Rating : {Rating}</p>
    //     </div>
    //   </div>
    //   <div className="remove-btn">
    //     <button
    //       className="delete"
    //       onClick={() => {
    //         onRemove(Title);
    //       }}
    //     >
    //       Remove
    //     </button>
    //   </div>
    // </div>
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
    // console.log(formData);
    // addMovieFunction(formData, updateTheMovies);
  };
  return (
    <form action="">
      <div className="review-form">
        <div className="input-outer-container">
          <div className="input-inner">
            <label>Movie Title:</label>
          </div>
          <div className="input-inner">
            <input
              type="text"
              id="title"
              name="Title"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-outer-container">
          <div className="input-inner">
            <label>Actors:</label>
          </div>
          <div className="input-inner">
            <input
              type="text"
              id="movie-actors"
              name="Actors"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="input-outer-container">
          <div className="input-inner">
            <label>Release Date:</label>
          </div>
          <div className="input-inner">
            <input
              type="date"
              id="releaseDate"
              name="Released"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-outer-container">
          <div className="input-inner">
            <label>Rating:</label>
          </div>
          <div className="input-inner">
            <input
              type="number"
              id="movie-rating"
              name="Rating"
              min={1}
              max={5}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-outer-container">
          <div className="input-inner">
            <label>Movie Poster:</label>
          </div>
          <div className="input-inner">
            <input
              type="file"
              multiple
              accept=" image/*"
              id="movie-poster"
              name="Poster"
              onChange={handleChange}
            />
          </div>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        {/* <input type="submit" value="Submit" /> */}
      </div>
    </form>
  );
}
