import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Styles/Navbar.css'; 


export default function MyNavbar() {

   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/Login');
  };
  return (
    <>
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm py-3 m-0 custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/HomePage" className="change-color d-flex align-items-center">
  {/* <img
    src="/image_slider/coffee.jpg"
    alt="Roaster Cultur Logo"
    height="40"
    className="me-2"
    style={{ borderRadius: '50%' }} 
  /> */}
  <span>Roaster Cultur</span>
</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar ">
          <Nav className="ms-auto"> 
            <NavLink to="/HomePage" className={({ isActive }) =>
    isActive ? 'nav-link nav-link-custom active' : 'nav-link nav-link-custom'
  }>Home</NavLink>
            <NavLink to="/AboutUs" className={({ isActive }) =>
    isActive ? 'nav-link nav-link-custom active' : 'nav-link nav-link-custom'
  }>About</NavLink>
  <NavLink to="/FranchiseKnowMorePage" className={({ isActive }) =>
    isActive ? 'nav-link nav-link-custom active' : 'nav-link nav-link-custom'
  }>Franchise</NavLink>
            <NavLink to="/MenuPage" className={({ isActive }) =>
    isActive ? 'nav-link nav-link-custom active' : 'nav-link nav-link-custom'
  }>Menu</NavLink>
            <NavLink to="/CartPage" className={({ isActive }) =>
    isActive ? 'nav-link nav-link-custom active' : 'nav-link nav-link-custom'
  }>View Cart</NavLink>
            <NavLink to="/MyOrderPage" className={({ isActive }) =>
    isActive ? 'nav-link nav-link-custom active' : 'nav-link nav-link-custom'
  }>My Orders</NavLink>
            <NavLink to="/ContactUs" className={({ isActive }) =>
    isActive ? 'nav-link nav-link-custom active' : 'nav-link nav-link-custom'
  }>Contact</NavLink>
          </Nav>
          <Button variant="primary" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}
