import React, { useEffect,useState } from 'react';
import '../styles/ViewBooks.css';
import { getBooks, deleteBook } from '../services/api';
import { BookFormState } from '../interface/book';




const ViewBooks: React.FC = () => {


    const [books, setBooks] = useState<BookFormState[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooks();
                setBooks(response.data);
            }
            catch (error) {
                console.error("Error fetching books.", error)
            }
        }
        fetchBooks();
    }, [])

    const handleDelete = async (id: number) => {
        try {
            await deleteBook(id);
           // window.alert("Book deleted successfully!");
            // Updating the state to remove the deleted book without reloading the page
            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error("Error deleting the book.", error);
        }
    };


    return (
        <div className="view-book-container">
       <div className="table-container">
           
                <p className="list-heading">Available Books</p>
                <table>
                 <thead> 
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Delete</th>
                        </tr>
                    </thead>  
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(Number(book.id))}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>     
                </table>
            </div>
            </div>
            
      
    )
}


export default ViewBooks;