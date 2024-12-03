import { useState, useEffect } from 'react';
import './layout.css';

export default function Layout() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        'https://i.ibb.co/Wcfz2x0/Banner-Principal-La-Puntita.png',
        'https://i.ibb.co/yNYjR5Y/Lapuntita-Halloween-renderizada.png',
        'https://i.ibb.co/SnxtZh9/Nivel-Puntita.png',
        'https://i.ibb.co/ZSn2J9Y/Lapuntita-Delivery.png'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Cambia cada 3 segundos
        return () => clearInterval(interval);
    }, [images.length]);

    const handleDotClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        
        <div className="slider-container">
            <div
                className="slider"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            ></div>
            <div className="dots-container">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

