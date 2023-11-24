import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Store from './pages/Store';
import Register from './pages/Register';
import Login from './pages/Login';
import AddProduct from './pages/AddProducts';
import SellerInventory from './pages/SellerInventory';
import Modal from 'react-modal';
import Cart from './pages/Cart'
import { AuthProvider } from './components/AuthContext';

Modal.setAppElement('#root');

function App() {
  return (
    <>
      <AuthProvider>
      <Container>
        {/* <NavbarComponent /> */}
        <BrowserRouter>
          <div className='container'>
            <NavbarComponent />
          </div>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/sellerInventory" element={<SellerInventory />} />
            <Route path="/store" element={<Store />} />
            <Route path="/cart" element={<Cart />} />
            
          </Routes>
        </BrowserRouter>
      </Container>
      </AuthProvider>
    </>
  );
}

export default App;
