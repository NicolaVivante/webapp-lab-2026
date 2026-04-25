import 'dayjs';
import {Col, Row} from 'react-bootstrap/';

import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";

function FilmList({films, editCallback}) {
	
	// console.log("films" + JSON.stringify(props.films))
	// for (let film of props.films) {
	// 	console.log("film id: " + film.id)
	// }


    return (<ListGroup id="films-list" variant="flush">
        {films.map((film) => <FilmInList filmData={film} key={film.id} editCallback={editCallback}/>)}
    </ListGroup>);
}

FilmList.propTypes = {
    films: PropTypes.array.isRequired,
};

function FilmInList({filmData, editCallback}) {

    return (<ListGroupItem>
        <Row className="gy-2">

            <Col xs={6} xl={3} className="favorite-title d-flex gap-2 align-items-center">
                {filmData.title}
                <div className="d-xl-none actions">
                    <i className="bi bi-pencil"></i>
                    <i className="bi bi-trash"></i>
                </div>
            </Col>
            <Col xs={6} xl={3} className="text-end text-xl-center">
            <span className="custom-control custom-checkbox">
              <span className="custom-control custom-checkbox">
							{filmData.favorite? <i className="text-danger bi bi-heart-fill"></i> : <i className="text-danger bi bi-heart"></i>} 
							
                          {/* <input type="checkbox" className="custom-control-input" defaultChecked={filmData.favorite}/> */}
                          {/* <label className="custom-control-label">Favorite</label> */}
                        </span>
            </span>
            </Col>

            <Col xs={4} xl={3} className="text-xl-center">
                {filmData.formatWatchDate()}
            </Col>
            <Col xs={8} xl={3} className="actions-container text-end">
                <div className="rating">
                    <Rating rating={filmData.rating} maxStars={5}/>
                </div>
                <div className="d-none d-xl-flex actions">
                    <i className="bi bi-pencil" onClick={() => editCallback(filmData)}></i>
                    <i className="bi bi-trash"></i>
                </div>
            </Col>
        </Row></ListGroupItem>);
}

FilmInList.propTypes = {
    filmData: PropTypes.object.isRequired,
};

function Rating({maxStars, rating}) {
    return [...Array(maxStars)].map(
        (el, index) => <i key={index} className={(index < rating) ? "bi bi-star-fill" : "bi bi-star"}/>);
}

Rating.propTypes = {
    maxStars: PropTypes.number.isRequired,
};


export default FilmList;
