import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
