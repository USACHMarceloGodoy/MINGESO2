import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const App = () => (
  <Router>
    <Header />
    
    <Footer />
  </Router>
);

export default App;