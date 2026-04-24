import dayjs from "dayjs";
import { useActionState } from "react";
import {Form, Button, Alert} from 'react-bootstrap/';


function AddFilmForm(props) {
	const default_film = {
		title: "L'ultimo samurai", 
		watchDate: dayjs(), 
		rating: 4,
		favorite: true
	}
	
	const handleAdd = async (prevState, formData) => {
		// creare un oggetto dal formData
		const film = Object.fromEntries(formData.entries());

		// esempio di validazione
		film.watchDate = dayjs(film.watchDate);

		if (dayjs().diff(film.watchDate) < 0) {
			film.error = "The watch date must be a valid date"
			return film;
		}

		if (film.title.trim()==="") {
			film.error = "The film title can't be empty, please fix it!"
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
			<Form.Group></Form.Group>
			<Form.Group>
				<Form.Label>Title</Form.Label>
				<Form.Control name="title" type="text" required={true} minLength={2} defaultValue={formState.title}></Form.Control>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>favorite</Form.Label>
				<Form.Check name="favorite" type="checkbox" defaultValue={formState.favorite}></Form.Check>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>watchDate</Form.Label>
				<Form.Control name="watchDate" type="date" defaultValue={formState.watchDate?.format("YYYY-MM-DD")}></Form.Control>
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


export default AddFilmForm