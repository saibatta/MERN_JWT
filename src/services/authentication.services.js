import axios from "axios";
// axios.defaults.headers.common['x-access-token'] = `${token}`
export const login = async (data) => {
    let URL = "http://localhost:4001/login";
    return axios
        .post(URL, data)
        .then((response) => response)
        .catch((error) => error.response);
};

export const signup = async (data) => {
    let URL = "http://localhost:4001/register";
    return axios
        .post(URL, data)
        .then((response) => response)
        .catch((error) => error.response);
};

export const logout = async (data) => {
    let URL = "http://localhost:4001/logout";
    return axios
        .post(URL, data)
        .then((response) => response)
        .catch((error) => error.response);
};