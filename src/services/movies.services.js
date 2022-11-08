import axios from "axios";
axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
export const getAllMovies = async () => {
    let URL = "http://localhost:4001/getallmovies";
    return axios
        .get(URL, {})
        .then((response) => response)
        .catch((error) => error.response);
};

export const updateMovie = async (data) => {
    let URL = "http://localhost:4001/updatemovie";
    return axios
        .put(URL, data)
        .then((response) => response)
        .catch((error) => error.response);
};

export const deleteMovie = async (id) => {
    let URL = `http://localhost:4001/deletemovie/${id}`;
    return axios
        .delete(URL)
        .then((response) => response)
        .catch((error) => error.response);
};