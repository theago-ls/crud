import React, { useEffect, useState } from 'react';
import './App.css';

import io from 'socket.io-client';

import api from './services/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Paciente from './pages/Pacientes';

function App() {
  return (
    <div className="App">
      <header>        
          <div className="logo">
            <a href="https://www.freepik.com/free-photos-vectors/logo">Hospital Bela Vida</a>
          </div>
          <nav>
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="features.html">Pacientes</a>
            </li>
            <li>
              <a href="news.html">Médicos</a>
            </li>
            <li className="active">
              <a href="about.html">Enfermeiros</a>
            </li>
            <li>
              <a href="contact.html">Consultas</a>
            </li>
          </nav>    
      </header>

      <section>         
          <Paciente />           
      </section>

      <footer>  
          <p>
            © 2023 Zerotype. All Rights Reserved.
          </p>      
          <div className="connect">
            <a href="http://freewebsitetemplates.com/go/facebook/" target="_blank" className="facebook"></a><a href="http://freewebsitetemplates.com/go/googleplus/" target="_blank" className="googleplus"></a><a href="http://freewebsitetemplates.com/go/twitter/" target="_blank" className="twitter"></a><a href="http://www.freewebsitetemplates.com/misc/contact/" target="_blank" className="tumbler"></a>
          </div>         
      </footer>
    </div>    
  );
}

export default App;
