// Data Access Object (DAO) per accedere ai film
import sqlite from "sqlite3";
import {Movie} from "./models.js";

// table name is "films" 🫩

const db = new sqlite.Database("films.db", (err) => {
  if (err) throw err;
});


function DBRowToMovie(row) {
  // DB contains 0 and 1 for isFavorite, so convert it to boolean
	return new Movie(row.id, row.title, Boolean(row.isFavorite), 
				row.watchDate, row.rating, row.userId);
}


// recuperare tutti i Movie
export const listMovies = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT films.* FROM films";
    db.all(sql, [], (err, rows) => {
      if(err)
        reject(err);
      else {
        const movies = rows.map((row) => DBRowToMovie(row));
        resolve(movies);
      }
    });
  });
}

// recuperare un Movie dato il suo id
export const getMovie = (movieId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT films.* FROM films WHERE id = ?";
    db.get(sql, [movieId], (err, row) => {
      if(err)
        reject(err);
      else if(row !== undefined)
        resolve(DBRowToMovie(row));
      else
        resolve({error: "Movie not available, check the id."});
    });
  });
}

// aggiungere un nuovo Movie
export const addMovie = (newMovie) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO films(id, title, favorite, watchDate, rating, userId) VALUES (?,?,?,?,?,?)";
    const date = newMovie.watchDate? newMovie.watchDate.format("YYYY-MM-DD") : null;
    const isFavorite = newMovie.isFavorite? 1 : 0;
	db.run(sql, [newMovie.id, newMovie.title, isFavorite, date, newMovie.rating, newMovie.userId], function(err) {
      if(err) reject (err);
      else resolve(this.lastID);
    });
  });
}

export const updateRating = (movieId, rating) => {
	return new Promise((resolve, reject) => {
    const sql = "UPDATE films SET rating = ? WHERE id = ?";
	db.run(sql, [rating, movieId], function(err) {
      if(err) reject (err);
      else resolve(this.changes);
    });
  });
}

export const updateWatchDate = (movieId, newWatchDate) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE films SET watchDate = ? WHERE id = ?";
	db.run(sql, [newWatchDate, movieId], function(err) {
      if(err) reject (err);
      else resolve(this.changes);
    });
  });
}

export const updateFavorite = (movieId, isFavorite) => {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE films SET isFavorite = ? WHERE id = ?";
	db.run(sql, [isFavorite, movieId], function(err) {
      if(err) reject (err);
      else resolve(this.changes);
    });
  });
}