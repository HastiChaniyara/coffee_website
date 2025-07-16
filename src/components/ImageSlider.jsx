import React, { useEffect, useState } from 'react';
import './Styles/ImageSlider.css';

const images = [
  './image_slider/pexels-apgpotr-683039.jpg',
  './image_slider/pexels-fotios-photos-1995010.jpg',
  './image_slider/pexels-quang-nguyen-vinh-222549-2159106.jpg',
  './image_slider/pexels-lood-goosen-508841-1235717.jpg',
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="slider"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="overlay">
        <h1>Welcome to Roaster Cultur</h1>
        <p>Enjoy our delicious treats</p>
      </div>
    </div>
  );
}
