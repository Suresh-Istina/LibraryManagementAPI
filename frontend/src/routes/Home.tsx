import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomePage from '../components/Home';


const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <HomePage/>
            <Footer/>
        </div>
    );
}



export default Home;