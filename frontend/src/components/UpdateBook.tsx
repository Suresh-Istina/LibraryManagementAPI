import React, { useEffect, useState } from 'react';
import '../styles/AddBook.css';
import { updateBook, getBooks } from '../services/api';
import { BookFormState } from '../interface/book';
import { validateAddBookForm, FormErrors } from '../validators/formValidation';




const UpdateBook: React.FC = () => {

    const [formData, setFormData] = useState<BookFormState>({
        id:0,
        title: '',
        author: '',
        description: ''
    });

    //state to hold error messages
    const [errors, setErrors] = useState<FormErrors>({});
    const [books, setBooks] = useState<BookFormState[]>([]);
    const [isEditable, setIsEditable] = useState(false); //state to handle editability


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data);
            }
            catch (error) {
                console.error("Error fetching books.", error)
            }
        };

        fetchBooks();

    },[])

    //update form data when user selects a book
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selectedBook = books.find(book=>book.id=== Number(selectedId));

        if (selectedBook) {
            setFormData({
                id: selectedBook.id,
                title: selectedBook.title,
                author: selectedBook.author,
                description: selectedBook.description
            });
            setIsEditable(true); // Enable fields after a book is selected

        } else {
            setFormData({
                title: '',
                author: '',
                description: ''
            });
            setIsEditable(false); // Disable fields if no book is selected
        }
        setErrors({});
    }



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
            await updateBook(Number(formData.id), formData);
            //console.log(response);
            window.alert("Book updated successfully!");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-book-container">
            <div className="add-book">
                <form className="add-book-form" onSubmit={handleSubmit}>
                    <p className="form-heading">Update Book</p>

                    <label className="cus-label">Book ID</label>
                    <select className="cus-input" value={formData.id} onChange={handleSelectChange }>
                        <option value="">Select a book</option>
                        {
                            books.map((book) =>(
                                <option key={book.id} value={book.id}>
                                    {book.id}
                                </option>
                            ))}
                    </select>

                    <label className="cus-label">Title</label>
                    <input
                        type="text"
                        className="cus-input"
                        name="title"
                        minLength={1}
                        maxLength={50}
                        value={formData.title}
                        onChange={handleChange}
                        disabled={!isEditable} // Disable if no book is selected

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
                        disabled={!isEditable} // Disable if no book is selected
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
                        disabled={!isEditable} // Disable if no book is selected
                    />
                    {errors.description && <p className="error-message">{errors.description}</p>}

                    <button className="btn-book" type="submit" disabled={!isEditable} >
                        Update Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;
