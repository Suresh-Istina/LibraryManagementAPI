import axios from 'axios';
import { BookFormState } from '../interface/Book';

const API_URL = 'http://localhost:5180/api/books';


export const getBooks = async () => {
    return await axios.get(API_URL);
};

export const getBookById = async (id: number) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createBook = async (book: BookFormState) => {
    return await axios.post(API_URL, book);
};

export const updateBook = async (id: number, book: BookFormState) => {
    return await axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = async (id: number) => {
    return await axios.delete(`${API_URL}/${id}`);
};