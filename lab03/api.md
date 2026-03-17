# List of Server APIs

## 1. 

GET /api/movies?favorite=<favorite>&most_rated=<top_rated>&seen_recently=<seen_recently>&unseen=<unseen>

Retrieve the list of all the available movies, also with filters:
- only favourite movies (<favorite> = true)
- only most rated movies (<top_rated> = true)
- only movies seen in the last month (<seen_recently> = true)
- only unseen movies (<unseen> = true)

Returns a list of json objects (see below), one for each movie that satisfies the filters

Request example: 
GET /api/movies (no body)

Response example:

(success)
200 OK
body:

```
[
	{
		"id": 1,
		"title": "Star Wars",
		"favorite": true,
		"watchDate": "2026-01-01",
		"rating" : 5,
		"userID": 1
	}
]
```

(error)
500 Internal Server Error (no body)

---

## 2. 

GET /api/movies/<movie_id>

Retrieve the movie identified by <movie_id>

Returns a json object (see below) representing the wanted movie

Request example: GET /api/movies/1

Response example:

(success)
200 OK
body:

```
{
	"id": 1,
	"title": "Star Wars",
	"favorite": true,
	"watchDate": "2026-01-01",
	"rating" : 5,
	"userID": 1
}
```

(not found)
404 Not Found (no body)

(error)
500 Internal Server Error (no body)

---

## 3. 

POST /api/movies

Create a new movie

Request example: POST /api/movies
body:
```
{
	"title": "Star Wars",
	"favorite": true,
	"watchDate": "2026-01-01",
	"rating" : 5,
	"userID": 1
}
```

Response example:

(success)
201 Created (no body)

(error)
500 Internal Server Error (no body)

---

## 4. 

PUT /api/movies/<movie_id>

Updates all the properties (except id) of the movie identified by <movie_id>

Request example: PUT /api/movies/1
body:
```
{
	"title": "Star Wars, the phantom menace",
	"favorite": true,
	"watchDate": "2026-01-01",
	"rating" : 5,
	"userID": 1
}
```

Response example:

(success)
204 No Content (no body)

(not found)
404 Not Found (no body)

(error)
500 Internal Server Error (no body)

---

## 5. 

PUT /api/movies/<movie_id>/rating

Updates the rating of the movie identified by <movie_id>

Request example: PUT /api/movies/1/rating
body:
```
{
	"rating": 4
}
```

Response example:

(success)
204 No Content (no body)

(not found)
404 Not Found (no body)

(error)
500 Internal Server Error (no body)

---

## 6. 

PUT /api/movies/<movie_id>/favorite

Updates the favorite status of the movie identified by <movie_id>

Request example: PUT /api/movies/1/favorite
body:
```
{
	"favorite": true
}
```

Response example:

(success)
204 No Content (no body)

(not found)
404 Not Found (no body)

(error)
500 Internal Server Error (no body)

---

## 7. 

DELETE /api/movies/<movie_id>

Deletes the movie identified by <movie_id>

Request example: DELETE /api/movies/1 (no body)

Response example:

(success)
204 No Content (no body)

(not found)
404 Not Found (no body)

(error)
500 Internal Server Error (no body)