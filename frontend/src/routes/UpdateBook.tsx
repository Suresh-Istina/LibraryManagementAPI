import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EditBook from '../components/UpdateBook';


const AddBook: React.FC = () => {
    return (
        <div>
            <Header />
            <EditBook />

            <Footer />
        </div>
    );
}



export default AddBook;