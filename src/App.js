import React from 'react';
import logo from './logo.svg';
import './App.css';

/** Aqui importo un componente nav */
import  Nav from './components/Nav';

import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        {/* La etiqueta nav hace referencia al componente  Navbar.js */}
       <Navbar> </Navbar>

        {/* La etiqueta nav hace referencia al componente  NAV.js */}
        <Nav > </Nav> 
        <img src={logo} className="App-logo" alt="logo" />
       
      </header>


      <div className="container">

        <h1> Hola panita</h1>

      </div>
    </div>
  );
}

export default App;
