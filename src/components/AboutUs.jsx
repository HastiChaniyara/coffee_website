import React from 'react';
import './Styles/AboutUs.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import VideoBanner from './VideoBanner';
import Navbar from './Navbar';
import Footer from './Footer';


export default function AboutUs() {
  return (
    <>
    <VideoBanner />
    <Navbar />
    <div className="about-us-page">
      <div className="hero-section">
        <Container>
          <h1 className="text-center text-black">About Roaster Cultur</h1>
          <p className="text-center text-black">
            Your daily dose of happiness, in a cup.
          </p>
        </Container>
      </div>
        <div className="about-content">

        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            At CoffeeCraft, we're passionate about delivering an unforgettable coffee experience. 
            From ethically sourced beans to artisan brewing methods, every cup tells a story of quality and love. 
            Our journey began in a small neighborhood shop and has grown into a vibrant community of coffee enthusiasts.
          </p>

          <h2>Our Mission</h2>
          <p>
            To serve freshly brewed joy in every cup while supporting sustainable and fair-trade practices around the world.
          </p>

          <h2>Why Choose Us?</h2>
          <ul>
            <li>🌱 Ethically Sourced Beans</li>
            <li>☕ Expertly Brewed by Passionate Baristas</li>
            <li>🏆 Award-winning Coffee Blends</li>
            <li>💚 Community and Sustainability Focused</li>
          </ul>
        </div>

        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93" alt="Coffee Shop" />
        </div>
      </div>
    </div>

    <Footer />
    </>
  );
}
