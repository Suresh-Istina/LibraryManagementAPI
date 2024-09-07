import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreateBook from '../components/AddBook';


const AddBook: React.FC = () => {
    return (
        <div>
            <Header />
            <CreateBook />
         
            <Footer />
        </div>
    );
}



export default AddBook;