"use strict"


import dayjs from 'dayjs';

function Film(id, title, userId = 1) {
	this.Id = id;
	this.Title = title;
	this.Favorite = false;
	this.WatchDate = null;
	this.Rating = null;
	this.UserId = userId;

	this.SetFavorite = () => {
		this.Favorite = true;
		return this;
	}

	this.Watch = (watchDate) => {
		this.WatchDate = dayjs(watchDate);
		return this;
	}

	this.UpdateRating = (rating) => {
		this.Rating = rating;
		return this;
	}

	this.toString = () => {
		let dateStr = this.WatchDate? this.WatchDate.format("YYYY-MM-DD") : "";
		return `Id: ${this.Id}, Title: ${this.Title}, ` +
		`Favorite: ${this.Favorite}, Watch date: ${dateStr}, Rating: ${this.Rating}, User: ${this.UserId}`;
	}
}

function FilmLibrary() {
	this.films = [];

	this.AddFilm = (film) => {
		this.films.push(film);
		return this;
	}

	this.RemoveFilm = (filmId) => {
		this.films = this.films.filter((film) => film.Id !== filmId);
	}

	this.SortByDateAsc = () => {
		this.films.sort((a, b) => {
			// films without a watchDate go at the end
			if (a.WatchDate == null)
				return 1;
			else if (b.WatchDate == null)
				return -1;
			else
				return a.WatchDate.diff(b.WatchDate);
		});
	}
	
	this.SortByRatingDesc = () => {
		this.films.sort((a, b) => {
			// films without a rating go at the end
			if (a.Rating == null)
				return 1;
			else if (b.Rating == null)
				return -1;
			else
				return b.Rating - a.Rating;
		});
	}

	this.UpdateFilmRating = (filmId, newRating) => {
		let filmToUpdate = this.films.find((film) => film.Id === filmId);
		filmToUpdate.UpdateRating(newRating);
	}

	this.PrintFilms = () => {
		console.log("Film library:");
		for (let film of this.films)
			console.log("\t" + film);
	}
}

// create films
let f1 = new Film(1, "Pulp Fiction", 1).SetFavorite(true).Watch("2025-03-10").UpdateRating(5);
let f2 = new Film(2, "21 Grams", 1).SetFavorite(true).Watch("2025-03-17").UpdateRating(4);
let f3 = new Film(3, "Star Wars", 1);
let f4 = new Film(4, "Matrix", 1);
let f5 = new Film(5, "Shrek", 1).Watch("2025-03-21").UpdateRating(3);

// create library and populate it
let library = new FilmLibrary();
library.AddFilm(f1).AddFilm(f2).AddFilm(f3).AddFilm(f4).AddFilm(f5);

// print library films in various orders
console.log("By creation order");
library.PrintFilms();

console.log("By date ascending");
library.SortByDateAsc();
library.PrintFilms();

console.log("By rating descending");
library.SortByRatingDesc();
library.PrintFilms();

console.log("Without film 3");
library.RemoveFilm(3);
library.PrintFilms();
