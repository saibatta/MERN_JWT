import axios from "axios";
// axios.defaults.headers.common['x-access-token'] = `${token}`
export const login = async (data) => {
    let URL = "https://jwt-node-server.herokuapp.com/login";
    return axios
        .post(URL, data)
        .then((response) => response)
        .catch((error) => error.response);
};

export const signup = async (data) => {
    let URL = "https://jwt-node-server.herokuapp.com/register";
    return axios
        .post(URL, data)
        .then((response) => response)
        .catch((error) => error.response);
};

export const logout = async (data) => {
    let URL = "https://jwt-node-server.herokuapp.com/logout";
    return axios
        .post(URL, data)
        .then((response) => response)
        .catch((error) => error.response);
};