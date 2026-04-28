import dayjs from "dayjs";
import { useActionState } from "react";
import {Form, Button, Collapse, Alert, Container, Row, Col} from 'react-bootstrap/';
import {useState} from 'react';
import Filters from './Filters';
import Header from "./Header.jsx";
import FilmList from "./FilmList.jsx";
import {AddFilmForm, EditFilmForm} from "./Forms.jsx";
import { Outlet } from "react-router";

function CommonLayout(props) {

	// This state controls the expansion of the sidebar (on small breakpoints only)
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
	const filters = props.filters;

	return (
		<div className="min-vh-100 d-flex flex-column">
            <Header isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}/>

            {/* Main */}
            <Container fluid className="flex-grow-1 d-flex flex-column">
                <Row className="flex-grow-1">
                    <Collapse id="films-filters" in={isSidebarExpanded} className="col-md-3 bg-light d-md-block">
                        <div className="py-4">
                            <h5 className="mb-3">Filters</h5>
                            <Filters items={props.filters} onSelect={props.setActiveFilter}/>
                        </div>
                    </Collapse>
					<Col md={9} className="pt-3">
                        
                        <Outlet></Outlet>
						{/* <FilmList films={films.filter(filters[activeFilter].filterFunction)} editCallback={onEdit}/> */}
						<hr/>
                    </Col>
					
                </Row>
				{/* <Outlet/> */}
            </Container>
        </div>
	)
}



export {CommonLayout};