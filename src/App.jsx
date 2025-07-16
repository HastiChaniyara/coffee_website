import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css'
import AboutUs from './components/AboutUs'
import Dashboard from './components/Dashboard'
import ContactUs from './components/ContactUs';
import MenuPage from './components/MenuPage';
import CartPage from './components/CartPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import FranchisePage from './components/FranchisePage';
import FranchiseKnowMorePage from './components/FranchiseKnowMorePage';
import PlaceOrderPage from './components/PlaceOrderPage';
import ThankYouPage from './components/ThankyouPage';
import MyOrderPage from './components/MyOrderPage';
import Dashboard_Ad from './components/Admin/Dashboard';
import Login from './components/Admin/AdminLoginPage';
import AdminList from './components/Admin/AdminList';
import UserList from './components/Admin/UserList';
import AdminProductPage from './components/Admin/AdminProductPage';
import AdminProductList from './components/Admin/AdminProductList';
import AdminOrderList from './components/Admin/AdminOrderList';
import AdminRoute from './components/Admin/AdminRoutes';
import AdminOutletList from './components/Admin/AdminOutletList';
import AdminContactList from './components/Admin/AdminContactList';

function App() {

  const [admin, setAdmin] = useState(null);
 

  return (
    <>
       <Routes>
     <Route path="/" element={<RegisterPage />} />
     <Route path="/Login" element={<LoginPage />} />
     <Route path="/HomePage" element={<Dashboard />} />
     <Route path="/AboutUs" element={<AboutUs />} />
     <Route path="/ContactUs" element={<ContactUs />} />
     <Route path="/MenuPage" element={<MenuPage />} />
     <Route path="/CartPage" element={<CartPage />} />
     <Route path="/FranchisePage" element={<FranchisePage />} />
     <Route path="/FranchiseKnowMorePage" element={<FranchiseKnowMorePage />} />
     <Route path="/PlaceOrderPage" element={<PlaceOrderPage />} />
     <Route path="/thank-you" element={<ThankYouPage />} />
     <Route path="/MyOrderPage" element={<MyOrderPage />} />



     {/* Admin Panel */}
     <Route path="/Admin" element={<Login setAdmin={setAdmin}/>} />
     {/* <Route path="/Admin/Dashboard" element={<Dashboard_Ad />} /> */}
     <Route
        path="/Admin/Dashboard"
        element={
          <AdminRoute>
            <Dashboard_Ad  admin={admin}/>
          </AdminRoute>
        }
      />
     <Route path="/Admin/AdminList" element={<AdminList />} />
     <Route path="/Admin/UserList" element={<UserList />} />
     <Route path="/Admin/Product" element={<AdminProductPage />} />
     <Route path="/Admin/ShowProduct" element={<AdminProductList />} />
     <Route path="/Admin/OrderList" element={<AdminOrderList />} />
     <Route path="/Admin/OutletList" element={<AdminOutletList />} />
     <Route path="/Admin/ContactList" element={<AdminContactList />} />
    </Routes>
    </>
  )
}

export default App
