import React, { useState } from 'react';
import './AddBook.css';
import { createBook } from '../services/api';

//Defines the shape of the state, ensuring type safety.
interface AddBookFormState {
    title: string;
    author: string;
    description: string;
}

const AddBook: React.FC = () => {
    const [formData, setFormData] = useState<AddBookFormState>({
        title: '',
        author: '',
        description: ''
    });

    //Dynamically updates the corresponding state value when the user types in the input fields.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: AddBookFormState) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await createBook(formData);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-book">
            <form className="add-book-form" onSubmit={handleSubmit}>
                <p>Add New Book</p>

                <label className="cus-label">Title</label>
                <input
                    type="text"
                    className="cus-input"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label className="cus-label">Author</label>
                <input
                    type="text"
                    className="cus-input"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                />

                <label className="cus-label">Description</label>
                <input
                    type="text"
                    className="cus-input"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <button className="btn-book" type="submit">
                    Add Book
                </button>
            </form>
        </div>
    );
};

export default AddBook;
