import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api/auth',
});

export const registerUser = (user) => API.post('/register', user);
export const loginUser = (user) => API.post('/login', user);
