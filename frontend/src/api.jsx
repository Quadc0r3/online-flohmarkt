import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true, //Lässt Session Cookies zu
});

//Post
export const registerUser = (user) => API.post('/auth/register', user);
export const loginUser = (user) => API.post('/auth/login', user);
export const logoutUser = () => API.post('/auth/logout');

//Get
export const getCurrentUser = (username) =>  API.get(`/auth/${username}`);
export const getUserItems = (userId) => API.get(`/userItem/${userId}`);

//Delete
export const deleteItem = (itemId) => API.delete(`/items/${itemId}`);
