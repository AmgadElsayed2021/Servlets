import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Ratings } from "./pages";
import { useState, useEffect } from "react";

function App() {
  let [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((response) => response.json())
      .then(setMovies);
  }, []);
  console.log(movies);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies}
              onRemoveMovie={(Title) => {
                const deleteMovie = onRemoveFunction(Title, updateTheMovies);
                deleteMovie();
              }}
            />
          }
        />
        <Route
          path="/ratings"
          element={
            <Ratings
              newReview={(formData) => {
                addMovieFunction(formData, updateTheMovies);
              }}
            />
          }
        />
        console.log(formData)
      </Routes>
    </div>
  );

  function updateTheMovies(body) {
    if (body.message === "1") {
      setMovies(body.movies);
    }
  }
}

export default App;
function addMovieFunction(formData, updateTheMovies) {
  const addMovie = async () => {
    const result = await fetch("/api/addMovie", {
      method: "post",
      body: formData,
    });
    const body = await result.json();
    console.log(body);
    updateTheMovies(body);
  };
  addMovie();
}

function onRemoveFunction(Title, updateTheMovies) {
  return async () => {
    const movie = await fetch("/api/delete", {
      method: "post",
      body: JSON.stringify({ Title: Title }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await movie.json();
    console.log(body);
    updateTheMovies(body);
  };
}
