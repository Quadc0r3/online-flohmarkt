import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true, //Lässt Session Cookies zu
});

//Post
export const registerUser = (user) => API.post('/auth/register', user);
export const loginUser = (user) => API.post('/auth/login', user);
export const logoutUser = () => API.post('/auth/logout');
export const addItem = (item) => API.post('/items', item);

//Get
export const getCurrentUser = (username) =>  API.get(`/auth/${username}`);
export const getUserItems = (userId) => API.get(`/userItem/${userId}`);
export const getItem = (itemId) => API.get(`/${itemId}`);

//Delete
export const deleteItem = (itemId) => API.delete(`/items/${itemId}`);

//Put
export const sellItem = (item) => API.put(`/items/${item.id}`, item);