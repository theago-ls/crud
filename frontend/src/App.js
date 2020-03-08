import React, { useState } from 'react';
import './App.css';

import Pacientes from './pages/Pacientes';
import Medicos from './pages/Medicos';
import Enfermeiros from './pages/Enfermeiros';
import Consultas from './pages/Consultas';
import Diagnosticos from './pages/Diagnosticos';
import Turnos from './pages/Turnos';

function App() {
  const [page, setPage] = useState('H');

  function selectedPage(){
    switch(page){
      case 'H':
        return <div>Home</div>;
      case 'P':
        return <Pacientes />;
      case 'E':
        return <Enfermeiros />;
      case 'M':
        return <Medicos />;
      case 'C':
        return <Consultas />;
      case 'T':
        return <Turnos />;
      case 'D':
        return <Diagnosticos />;
    }
  }

  return (
    <div className="App">
      <header>        
          <div className="logo">
            <a href="https://www.freepik.com/free-photos-vectors/logo">Hospital Bela Vida</a>
          </div>
          <nav>
            <li>
              <a href={() => setPage('H')}>Home</a>
            </li>
            <li>
              <a href={() => setPage('P')}>Pacientes</a>
            </li>
            <li>
              <a href={() => setPage('M')}>Médicos</a>
            </li>
            <li className="active">
              <a href={() => setPage('E')}>Enfermeiros</a>
            </li>
            <li>
              <a href={() => setPage('C')}>Consultas</a>
            </li>
            <li>
              <a href={() => setPage('T')}>Turnos</a>
            </li>
            <li>
              <a href={() => setPage('D')}>Diagnósticos</a>
            </li>
          </nav>    
      </header>

      <section>         
          {selectedPage}         
      </section>

      <footer>  
          <p>
            © 2023 Zerotype. All Rights Reserved.
          </p>      
          <div className="connect">
            <a href="http://freewebsitetemplates.com/go/facebook/" target="_blank" rel="noopener noreferrer" className="facebook"></a><a href="http://freewebsitetemplates.com/go/googleplus/" target="_blank" className="googleplus"></a><a href="http://freewebsitetemplates.com/go/twitter/" target="_blank" className="twitter"></a><a href="http://www.freewebsitetemplates.com/misc/contact/" target="_blank" className="tumbler"></a>
          </div>         
      </footer>
    </div>    
  );
}

export default App;
