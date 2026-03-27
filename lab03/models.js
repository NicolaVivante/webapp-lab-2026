import dayjs from "dayjs";

function Movie(id, title, favorite=false, watchDate=null,  rating=null, userId=1) {
	this.id = id;
	this.title = title;
	this.favorite = favorite;
	if (watchDate === null)
		this.watchDate = null
	else
		this.watchDate = dayjs(watchDate);
	this.rating = rating;
	this.userId = userId;
}

export {Movie};
