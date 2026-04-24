/*
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 6 - 2024
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import {INITIAL_FILMS, Film} from "./films.mjs";

import dayjs from 'dayjs';

import {useState} from 'react';
import {Button, Collapse, Col, Container, Row} from 'react-bootstrap/';
import Filters from './components/Filters';
import Header from "./components/Header.jsx";
import FilmList from "./components/FilmList.jsx";
import {AddFilmForm, EditFilmForm} from "./components/Forms.jsx";

function App() {
    /**
     * Defining a structure for Filters
     * Each filter is identified by a unique name and is composed by the following fields:
     * - A label to be shown in the GUI
     * - An ID (equal to the unique name), used as key during the table generation
     * - A filter function applied before passing the films to the FilmTable component
     */
    const filters = {
        'filter-all': {label: 'All', id: 'filter-all', filterFunction: () => true},
        'filter-favorite': {label: 'Favorites', id: 'filter-favorite', filterFunction: film => film.favorite},
        'filter-best': {label: 'Best Rated', id: 'filter-best', filterFunction: film => film.rating >= 5},
        'filter-lastmonth': {
            label: 'Seen Last Month',
            id: 'filter-lastmonth',
            filterFunction: film => {
                if (!film?.watchDate) return false;
                const diff = film.watchDate.diff(dayjs(), 'month');
                return diff <= 0 && diff > -1;
            }
        },
        'filter-unseen': {label: 'Unseen', id: 'filter-unseen', filterFunction: film => !film?.watchDate}
    };

    // This state contains the active filter
    const [activeFilter, setActiveFilter] = useState('filter-all');

    // This is not optimal - better ways will be introduced in the upcoming labs
    const [films, setFilms] = useState(INITIAL_FILMS);

	// This determines if the add / edit film forms are shown
	// values are "hidden", "add", "edit"
    const [formMode, setFormMode] = useState("hidden");

	// Currently selected film
	const [selectedFilm, setSelectedFilm] = useState();

    // This state controls the expansion of the sidebar (on small breakpoints only)
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

	const addNewFilm = (formFilm) => {
		const id = Math.max(...films.map(f => f.id)) + 1;
		const userId = films.map(f => f.userId)[0];
		const filmObj = new Film(id, formFilm.title, formFilm.favorite, formFilm.watchDate, formFilm.rating, userId)
		console.log("New film" + JSON.stringify(filmObj));
		setFilms((prevFilms) => {
			return [...prevFilms, filmObj];
		});
		setFormMode("hidden");
	}

	const editFilm = (formFilm) => {
		const filmObj = new Film(formFilm.id, formFilm.title, formFilm.favorite, 
						formFilm.watchDate, formFilm.rating, formFilm.userId);
		console.log("Edit film" + JSON.stringify(formFilm) + ", " + JSON.stringify(filmObj));
		setFilms((prevFilms) => {
			return prevFilms.map((film) => {
				if (film.id !== formFilm.id) {
					return film;
				}
				else {
					return filmObj;
				}
			});
		});
		setFormMode("hidden");
	}
	
	const onEdit = (film) => {
		setSelectedFilm(film);
		console.log("Editing film " + JSON.stringify(film));
		setFormMode("edit");
	}

    return (
        <div className="min-vh-100 d-flex flex-column">
            <Header isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}/>

            {/* Main */}
            <Container fluid className="flex-grow-1 d-flex flex-column">
                <Row className="flex-grow-1">
                    <Collapse id="films-filters" in={isSidebarExpanded} className="col-md-3 bg-light d-md-block">
                        <div className="py-4">
                            <h5 className="mb-3">Filters</h5>
                            <Filters items={filters} selected={activeFilter} onSelect={setActiveFilter}/>
                        </div>
                    </Collapse>
                    <Col md={9} className="pt-3">
                        <h1><span id="filter-title">{filters[activeFilter].label}</span> films</h1>
                        <FilmList films={films.filter(filters[activeFilter].filterFunction)} editCallback={onEdit}/>
						<hr/>
						{formMode === "add" && <AddFilmForm addFilmAction={addNewFilm} ></AddFilmForm> }
						{/* key is used to update form default data when selected changes
						(initial film is the default data)*/}
						{formMode === "edit" && <EditFilmForm key={selectedFilm.id} editFilmAction={editFilm} initial_film={selectedFilm} ></EditFilmForm> }
                    </Col>
					 
                </Row>
				
				
                {formMode !== "add" && <Button
                    variant="primary"
                    className="rounded-circle fixed-right-bottom"
					onClick={() => {setFormMode("add")}}
                >
                    <i className="bi bi-plus"></i>
                </Button>}
            </Container>
        </div>);
}

export default App;
