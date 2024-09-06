import axios from 'axios';

const API_URL = 'http://localhost:5180/api/books';

interface Book {
    Id?: number;  
    Title: 'string';
    Author: 'string';
    Description: 'string';
}

export const getBooks = async () => {
    return await axios.get(API_URL);
};

export const getBookById = async (id: number) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createBook = async (book: Book) => {
    return await axios.post(API_URL, book);
};

export const updateBook = async (id: number, book: Book) => {
    return await axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = async (id: number) => {
    return await axios.delete(`${API_URL}/${id}`);
};