import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
// let movieData = undefined;
// fs.readFile("./data/movies.json", "utf8", (err, data) => {
//   console.log(err);
//   console.log(data);
//   movieData = data;
// });
// const amgad = 5;
const app = express();
app.use(express.static(path.join(__dirName, "build")));

app.use(bodyParser.json());
// app.get("/hello", (req, res) => res.send("Hello Amgad!"));
// app.post("/hello", (req, res) => res.send(`hello ${req.body.name}`));
// app.get("/hello/:name", (req, res) => res.send(`hello ${req.params.name}`));
app.use(bodyParser.urlencoded({ extended: false }));

// creat a data base connection function to save the code writing
async function DBConnection() {
  const client = await MongoClient.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
  });
  const db = client.db("my-movies");
  return { db, client };
}

app.get("/api/movies", async (req, res) => {
  try {
    const { db, client } = await DBConnection();

    const movie = await db.collection("movies").find({}).toArray();
    console.log(movie);
    res.status(200).json(movie);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});
// const Amgad = 3;

app.post("/api/addMovie", async (req, res) => {
  try {
    const { db, client } = await DBConnection();
    await db.collection("movies").insertOne({
      Title: req.body.Title,
      Rating: req.body.Rating,
      Released: req.body.Released,
      Actors: req.body.Actors,
      Poster: req.body.Poster,
    });

    res.status(200).json({
      message: `1`,
    });
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

app.post("/api/delete", async (req, res) => {
  try {
    //  start db connection
    const { db, client } = await DBConnection();

    let delMovie = await db
      .collection("movies")
      .deleteOne({ Title: req.body.Title });
    console.log(delMovie);

    if (delMovie.deletedCount > 0) {
      const movie = await db.collection("movies").find({}).toArray();
      res.status(200).json({
        message: `1`,
        movies: movie,
      });
    } else {
      res.status(200).json({ message: "can't find the movie name" });
    }

    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connceting to db", error });
  }
});

app.get("/api/Movie/:Title", async (req, res) => {
  console.log(req.params.Title);
  try {
    const { db, client } = await DBConnection();

    const movie = await db
      .collection("movies")
      .find({ Title: req.params.Title })
      .toArray();
    console.log(movie);
    res.status(200).json(movie);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});
// lets try this and hopefully it will work
const storage = multer.diskStorage({
  destination: "./src/build/images/",
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.listen(8000, () => console.log("App is listening on port 8000"));
