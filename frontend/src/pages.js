import React from "react";
import { Link } from "react-router-dom";
// import { Form, Button } from "semantic-ui-react";
// import jsonfile from "jsonfile";
// import "./index.css";

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
            Release={movie.Released}
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
    <div className="movie-frame">
      <div className="imgStyle">
        <img
          className="poster"
          src={"./images/" + Poster}
          alt={Title}
          width={300}
          height={400}
        />
      </div>
      <div className="divStyle">
        <div>
          <h2>Movie Name: {Title}</h2>
        </div>
        <div className="movieBox">
          <p> Released: {Released}</p>
        </div>
        <div>
          <p>
            Main Actors :{Actors[0]} ,{Actors[1]} ,{Actors[2]}
            and {Actors[3]}
          </p>
        </div>
        <div>
          <p>Movie Rating : {Rating}</p>
        </div>
      </div>
      <div className="remove-btn">
        <button
          className="delete"
          onClick={() => {
            onRemove(Title);
          }}
        >
          Remove
        </button>
      </div>
    </div>
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

    // newReview(
    //   formData.Title,
    //   formData.Actors.split(", "),
    //   formData.Poster,
    //   formData.Rating,
    //   formData.Released
    // );
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
