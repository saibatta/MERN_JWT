import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { getAllMovies } from "../services/movies.services";
import { ModalComponent } from "../helper/modal.component";

export const Movies = () => {
    const [moviesList, setMoviesList] = useState([]);
    const [enableModal, setEnableModal] = useState(false);
    const [modalData, setModalData] = useState({ title: '', type: '', data: {} })
    const [onMovieChangeHandler, setOnMovieChangeHandler] = useState(false);
    useEffect(() => {
        getAllMovies().then((data) => {
            console.log(data.data);
            setMoviesList(data.data);
            setOnMovieChangeHandler(false);
        });
    }, [onMovieChangeHandler]);
    const onMoviesSelection = (movie, actionType) => {
        console.log(movie, '*****onMoviesSelection*****', actionType)
        setEnableModal(true);
        switch (actionType) {
            case 'ADD':
                setModalData({ title: 'Add Movie', type: 'ADD', data: { title: '', year_release: '', imdb_rating: '' } })
                break;
            case 'DELETE':
                setModalData({ title: 'Delete Movie', type: 'DELETE', data: movie })
                break;
            case 'EDIT':
                setModalData({ title: 'Edit Movie', type: 'EDIT', data: movie })
                break;

            default:
                break;
        }
    }
    return (
        <>
            <h1> Movies List  <span style={{ float: "right" }}><Button onClick={() => onMoviesSelection('', 'ADD')}>Add Movie</Button></span></h1>
            <div
                style={{
                    overflow: "auto",
                    height: "auto",
                }}
            >
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Release Year</th>
                            <th>IMDB Rating </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesList?.map((movie, index) => {
                            return (
                                <tr key={movie._id}>
                                    <td>{index}</td>
                                    <td>Title : {movie.title}</td>
                                    <td>Release Year : {movie.year_release}</td>
                                    <td>IMDB Rating : {movie.imdb_rating}</td>
                                    <td><Button variant="info" onClick={() => onMoviesSelection(movie, 'EDIT')}>Edit</Button> <Button variant="danger" onClick={() => onMoviesSelection(movie, 'DELETE')}>Delete</Button> </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {!moviesList?.length && <p><center>No movies in the list.Please add movies from <u onClick={() => onMoviesSelection('', 'ADD')}>Add Movie button</u></center></p>}
            </div>
            {enableModal && <ModalComponent modalData={modalData} enableModal={enableModal} modalClose={(flag) => setEnableModal(flag)} onMovieChangeHandler={() => setOnMovieChangeHandler(true)} />}
        </>
    );
};
