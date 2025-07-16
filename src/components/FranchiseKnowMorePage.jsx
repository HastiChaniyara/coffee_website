import React, { useEffect, useState } from "react";
import "./Styles/FranchiseKnowMorePage.css";
import VideoBanner from "./VideoBanner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

// const outlets = [
//   {
//     city: "Mumbai",
//     outlet: "BrewHeaven Mumbai Central",
//     address: "123 Marine Drive, Mumbai, MH",
//     phone: "022-12345678",
//     year: 2018,
//     map: "https://maps.google.com/?q=123+Marine+Drive,+Mumbai",
//   },
//   {
//     city: "Delhi",
//     outlet: "BrewHeaven Connaught Place",
//     address: "56 CP Circle, New Delhi, DL",
//     phone: "011-98765432",
//     year: 2019,
//     map: "https://maps.google.com/?q=56+CP+Circle,+New+Delhi",
//   },
//   {
//     city: "Ahmedabad",
//     outlet: "BrewHeaven CG Road",
//     address: "78 CG Road, Ahmedabad, GJ",
//     phone: "079-11223344",
//     year: 2021,
//     map: "https://maps.google.com/?q=78+CG+Road,+Ahmedabad",
//   },
//   {
//     city: "Ahmedabad",
//     outlet: "BrewHeaven CG Road",
//     address: "78 CG Road, Ahmedabad, GJ",
//     phone: "079-11223344",
//     year: 2021,
//     map: "https://maps.google.com/?q=78+CG+Road,+Ahmedabad",
//   },
//   {
//     city: "Ahmedabad",
//     outlet: "BrewHeaven CG Road",
//     address: "78 CG Road, Ahmedabad, GJ",
//     phone: "079-11223344",
//     year: 2021,
//     map: "https://maps.google.com/?q=78+CG+Road,+Ahmedabad",
//   },
//   {
//     city: "Ahmedabad",
//     outlet: "BrewHeaven CG Road",
//     address: "78 CG Road, Ahmedabad, GJ",
//     phone: "079-11223344",
//     year: 2021,
//     map: "https://maps.google.com/?q=78+CG+Road,+Ahmedabad",
//   },
//   {
//     city: "Mumbai",
//     outlet: "BrewHeaven Mumbai Central",
//     address: "123 Marine Drive, Mumbai, MH",
//     phone: "022-12345678",
//     year: 2018,
//     map: "https://maps.google.com/?q=123+Marine+Drive,+Mumbai",
//   },
// ];

const OutletsPage = () => {
  const [outlets, setOutlets] = useState([]);

  useEffect(() => {
    axios.get("http://coffee-website-83vf.onrender.com/api/outlets")
      .then(res => setOutlets(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <>
      <VideoBanner />
      <Navbar />
      <div className="outlets-container">
        <h2 className="outlets-title">☕ Our Outlets Across India ☕</h2>
        <div className="outlet-cards">
          {outlets.map((o, index) => (
            <div className="outlet-card animated-card" key={index}>
              <h3>{o.outlet}</h3>
              <p>
                <strong>City:</strong> {o.city}
              </p>
              <p>
                <strong>Address:</strong> {o.address}
              </p>
              <p>
                <strong>Phone:</strong> {o.phone}
              </p>
              <p>
                <strong>Established:</strong> {o.year}
              </p>
              {/* <a href={o.map} target="_blank" rel="noopener noreferrer">📍 View Location</a> */}

              <div className="map-container">
                <iframe
                  title={`map-${index}`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    o.address
                  )}&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OutletsPage;
