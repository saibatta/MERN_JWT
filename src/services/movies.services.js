import axios from "axios";
axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
export const getAllMovies = async () => {
    let URL = "https://jwt-node-server.herokuapp.com/getallmovies";
    return axios
        .get(URL, {})
        .then((response) => response)
        .catch((error) => error.response);
};

export const updateMovie = async (data) => {
    let URL = "https://jwt-node-server.herokuapp.com/updatemovie";
    return axios
        .put(URL, data)
        .then((response) => response)
        .catch((error) => error.response);
};

export const deleteMovie = async (id) => {
    let URL = `https://jwt-node-server.herokuapp.com/deletemovie/${id}`;
    return axios
        .delete(URL)
        .then((response) => response)
        .catch((error) => error.response);
};