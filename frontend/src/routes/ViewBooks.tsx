import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AllBooks from '../components/ViewBooks';


const AddBook: React.FC = () => {
    return (
        <div>
            <Header />
            <AllBooks/>

            <Footer />
        </div>
    );
}



export default AddBook;