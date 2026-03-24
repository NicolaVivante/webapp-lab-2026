import dayjs from "dayjs";

function Movie(id, title, favorite=false, watchDate=null,  rating=null, userId=1) {
	this.id = id;
	this.title = title;
	this.favorite = favorite;
	this.watchDate = dayjs(watchDate);
	this.rating = rating;
	this.userId = userId;
}

export {Movie};
