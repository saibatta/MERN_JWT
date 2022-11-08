import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { deleteMovie, updateMovie } from '../services/movies.services';

export const ModalComponent = ({ modalData, enableModal, modalClose,onMovieChangeHandler }) => {
    const [show, setShow] = useState(enableModal);
    const handleClose = () => { setShow(false); modalClose(false) };
    const handleShow = () => setShow(true);
    const { title, type, data } = modalData;
    const [movieData, setMovieData] = useState(data);
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        movieData[name] = value;
        setMovieData({ ...movieData })
    }
    const onSave = () => {
        handleClose();
        switch (type) {
            case 'ADD':
            case 'EDIT':
                updateMovie({ movie: movieData }).then((data) => {console.log('Movie Updated Successfully !!!', data.data);onMovieChangeHandler()}).catch((error) => console.log('Movie Updated failed !!!', error))
                break;
            case 'DELETE':
                deleteMovie(movieData._id).then((data) => { console.log('Movie Deleted Successfully !!!', data.data);onMovieChangeHandler()}).catch((error) => console.log('Movie Delete failed !!!', error))
                break;
            default:
                break;
        }

    }
    return (
        <>
            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {type !== 'DELETE' ?
                        (<Form>
                            <Form.Group className="mb-3" controlId="modalForm.ControlInput1">
                                <Form.Label>Movie Name(Title)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={movieData.title}
                                    onChange={handleInputChange}
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="modalForm.ControlInput1">
                                <Form.Label>Year Of Release</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="year_release"
                                    value={movieData.year_release}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="modalForm.ControlInput1">
                                <Form.Label>IMDB Rating</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="imdb_rating"
                                    value={movieData.imdb_rating}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                        </Form>) : <p>Are you sure about delete this movie from list ?</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                        {type !== 'DELETE' ? 'Save Changes' : 'Delete'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

