import React, { useState } from 'react';
import '../styles/AddBook.css';
import { createBook } from '../services/api';
import { BookFormState } from '../interface/Book';
import { FormErrors } from '../interface/FormErrors';
import { validateAddBookForm } from '../validators/FormValidator';




const AddBook: React.FC = () => {

    const [formData, setFormData] = useState<BookFormState>({
        title: '',
        author: '',
        description: ''
    });

    //state to hold error messages
    const [errors, setErrors] = useState<FormErrors>({});
    

    //Dynamically updates the corresponding state value when the user types in the input fields.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: BookFormState) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors: FormErrors) => ({ ...prevErrors, [name]: '' })); // Clears error when user types
    };

    const validateForm = (): boolean => {
        const newErrors = validateAddBookForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        //if there are no errors, and the function returns true, indicating the form is valid.
        //If there are errors, the function returns false, indicating the form is not valid.
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form before submitting
        if (!validateForm()) {
            return; // triggers the if block, and the function will return, preventing the form submission.
        }

        try {
            await createBook(formData);
            //console.log(response);
            window.alert("Book added successfully!");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-book-container">
        <div className="add-book">
            <form className="add-book-form" onSubmit={handleSubmit}>
                <p className="form-heading">Add New Book</p>

                <label className="cus-label">Title</label>
                <input
                    type="text"
                    className="cus-input"
                    name="title"
                    minLength={1}
                    maxLength={50}
                    value={formData.title}
                    onChange={handleChange}

                />
                {errors.title && <p className="error-message">{errors.title}</p>}


                <label className="cus-label">Author</label>
                <input
                    type="text"
                    className="cus-input"
                    name="author"
                    minLength={1}
                    maxLength={50}
                    value={formData.author}
                    onChange={handleChange}
                />
                {errors.author && <p className="error-message">{errors.author}</p>}

                <label className="cus-label">Description</label>
                <textarea
                    
                    className="cus-input-descrption"
                    name="description"
                    minLength={1}
                    maxLength={100}
                    value={formData.description}
                    onChange={handleChange}
                />
                {errors.description && <p className="error-message">{errors.description}</p>}

                <button className="btn-book" type="submit">
                    Add Book
                </button>
            </form>
        </div>
        </div>
    );
};

export default AddBook;
