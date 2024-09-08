import React from 'react';
import '../styles/Home.css';
import Image1 from "../assets/book1.jpg";
import Image2 from "../assets/book2.jpg";
import Image3 from "../assets/book3.jpg";

interface ImageCardProps {
    imageUrl: string;
    title: string;
    author: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, title, author }) => {
    return (
        <div className="card">
            <img src={imageUrl} alt={title} className="card-image"/>
        
        <div className="card-content">
            <h3>{title}</h3>
            <p>{author}</p>
            </div>
        </div>
    );
};

const Home: React.FC = () => {
    const cards = [
        {
            imageUrl: Image1,
            title: "PILLAR OF THE WOLVES",
            author: "LOLA GLASS",
        },
        {
            imageUrl: Image2,
            title: "A LUNA'S CURSE",
            author: "KASSIE COX",
        },
        {
            imageUrl: Image3,
            title: "THE PAST IS RISING",
            author: "KATHRYN BYWATERS",
        },
    ];

    return (
        <div className="card-container">
            {cards.map((card, index) => (
                <ImageCard
                    key={index}
                    imageUrl={card.imageUrl}
                    title={card.title}
                    author={card.author}
                    />
            )) }
        </div>
    )
}


export default Home;