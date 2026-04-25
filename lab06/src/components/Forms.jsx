import dayjs from "dayjs";
import { useActionState } from "react";
import {Form, Button, Alert, Container, Row, Col} from 'react-bootstrap/';


function AddFilmForm(props) {
	const default_film = {
		title: "L'ultimo samurai", 
		watchDate: dayjs().format("YYYY-MM-DD"), 
		rating: 4,
		favorite: "on"
	}
	
	const handleAdd = async (prevState, formData) => {
		// creare un oggetto dal formData
		const film = Object.fromEntries(formData.entries());

		film.favorite = film.favorite? true : false;
		
		if (film.watchDate === "") {
			film.watchDate = null;
		}
		if (film.watchDate && dayjs().diff(dayjs(film.watchDate)) < 0) {
			film.error = "The watch date must be a valid date"
			return film;
		}

		if (film.title.trim()==="") {
			film.error = "The film title can't be empty, please fix it!"
			return film;
		}

		if (film.rating > 5 || film.rating < 0) {
			film.error = "The film rating, if present, must be between 0 and 5"
			return film;
		}

		props.addFilmAction(film);
		return default_film;
	}
	
	const [formState, formAction, isPending] = useActionState(handleAdd, default_film);
	
	return (
		<>
		{formState.error && <Alert variant="secondary">{formState.error}</Alert>}
		<Form action={formAction}>
			<Form.Group className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control name="title" type="text" required={true} minLength={2} defaultValue={formState.title}></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3" >
				<Form.Check name="favorite" type="checkbox" label="Favorite" defaultChecked={formState.favorite}></Form.Check>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Watch Date</Form.Label>
				<Form.Control name="watchDate" type="date" defaultValue={formState.watchDate}></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Rating</Form.Label>
				<Form.Control name="rating" required={true} defaultValue={formState.rating}></Form.Control>
			</Form.Group>
			
			{<Button variant="primary" type="submit">Add</Button>}
		</Form>
		</>
	)
}

function EditFilmForm(props) {
	let initial_film = {
		title: props.initial_film?.title, 
		watchDate: props.initial_film?.watchDate, 
		rating: props.initial_film?.rating,
		favorite: props.initial_film?.favorite,
		id: props.initial_film?.id,
		userId: props.initial_film?.userId
	}

	const handleEdit = async (prevState, formData) => {
		// creare un oggetto dal formData
		const film = Object.fromEntries(formData.entries());
		film.id = initial_film.id;
		film.userId = initial_film.userId;

		film.favorite = film.favorite? true : false;
		
		if (film.watchDate === "") {
			film.watchDate = null;
		}
		if (film.watchDate && dayjs().diff(dayjs(film.watchDate)) < 0) {
			film.error = "The watch date must be a valid date"
			return film;
		}

		if (film.title.trim()==="") {
			film.error = "The film title can't be empty, please fix it!"
			return film;
		}

		if (film.rating > 5 || film.rating < 0) {
			film.error = "The film rating, if present, must be between 0 and 5"
			return film;
		}

		props.editFilmAction(film);
		return initial_film;
	}
	
	const [formState, formAction, isPending] = useActionState(handleEdit, initial_film);
	
	return (
		<>
		{formState.error && <Alert variant="secondary">{formState.error}</Alert>}
		<Form action={formAction}>
			<Form.Group></Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control name="title" type="text" required={true} minLength={2} defaultValue={formState.title}></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Check name="favorite" type="checkbox" label="Favorite" defaultChecked={formState.favorite}></Form.Check>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Watch date</Form.Label>
				<Form.Control name="watchDate" type="date" defaultValue={formState.watchDate?.format("YYYY-MM-DD")}></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Rating</Form.Label>
				<Form.Control name="rating" defaultValue={formState.rating}></Form.Control>
			</Form.Group>
			
			{<Button variant="primary" type="submit">Save changes</Button>}
		</Form>
		</>
	)
}


export {AddFilmForm, EditFilmForm};