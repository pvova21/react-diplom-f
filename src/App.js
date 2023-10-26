import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Измените импорт на Routes
import HeadPage from './components/HeadPage';
import CatalogPage from './components/CatalogPage';
import About from './components/About';
import Contacts from './components/Contacts';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import Page404 from './components/Page404';
import Cart from './components/Cart';

export default function App() {
  return (
    <Router>
      <Menu />
      <Routes> 
        <Route path='/' element={<HeadPage />} />
        <Route path='/catalog' element={<CatalogPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/contacts' element={<Contacts />} /> 
        <Route path='/catalog/:id' element={<ProductPage />} /> 
        <Route path='*' element={<Page404 />} /> 
      </Routes> 
      <Footer />
    </Router>
  );
}
