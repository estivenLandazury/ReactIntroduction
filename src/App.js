import React from 'react';
import logo from './logo.svg';
import './App.css';

/** Aqui importo un componente nav */
import Nav from './components/Nav';

import Navbar from './components/Navbar';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <header className="App-header">

        {/* La etiqueta nav hace referencia al componente  Navbar.js */}
        <Navbar> </Navbar>

        <div className="container">

          <h1 className="Titutlo-app"> Elecciones Colombia</h1>


        </div>

        {/* La etiqueta nav hace referencia al componente  NAV.js */}
        <Nav > </Nav>



      </header>




    </div>
  );
}

export default App;
