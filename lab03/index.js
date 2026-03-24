// imports
import morgan from "morgan";
import express from "express";
import { check, validationResult } from "express-validator";
import { listMovies, getMovie, addMovie, updateRating, updateFavorite } from "./dao.js";

// app creation and configuration
const app = express();
const port = 3001;

// middleware injection
app.use(express.json());
app.use(morgan("dev"));

// endpoints creation

// list movies
// TODO: filters
app.get("/api/movies", async (req, resp) => {
	try {
		const movies = await listMovies();
		resp.json(movies);
	}
	catch {
		resp.status(500).end();
	}
});

// get movie by id
app.get("/api/movies/:movieId", async (req, resp) => {
	try {
		const movie = await getMovie(req.params.movieId);
		if (movie.error)
			resp.status(404).json(movie);
		else
			resp.json(movie);
	}
	catch {
		resp.status(500).end();
	}
});

// add movie
app.post("/api/movies", [
  check("title").notEmpty(),
  check("favorite").isBoolean(),
  check("rating").isNumeric(),
  check("userId").isNumeric(),
  check("date").isDate({format: "YYYY-MM-DD", strictMode: true})
], async (req, resp) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({errors: errors.array()});
	}

	const newMovie = req.body;

	try {
		await addMovie(newMovie);
		resp.status(201).send();
	}
	catch {
		resp.status(500).end();
	}

});

// put movie
// TODO

// update movie rating
app.put("/api/movies/:movieId/rating", [
  check("rating").isNumeric()
], async (req, resp) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return resp.status(422).json({errors: errors.array()});
	}

	const movieId = req.params.movieId;
	const newRating = req.body.rating;
	
	try {
		const numChanges = await updateRating(movieId, newRating);
		if (numChanges === 1)
			resp.status(204).end();
		else
      		resp.status(404).end();
	} catch {
		resp.status(500).end();
	}
});

// update movie favorite
app.put("/api/movies/:movieId/favorite", [
  check("favorite").isBoolean()
], async (req, resp) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return resp.status(422).json({errors: errors.array()});
	}

	const movieId = req.params.movieId;
	const isFavorite = req.body.favorite;
	
	try {
		const numChanges = await updateFavorite(movieId, isFavorite);
		if (numChanges === 1)
			resp.status(204).end();
		else
      		resp.status(404).end();
	} catch {
		resp.status(500).end();
	}
});

// delete movie
// TODO


// server start
app.listen(port, "localhost", () => {console.log(`Server started at port ${port}`)});