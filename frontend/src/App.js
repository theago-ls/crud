import React, { useState, useEffect } from 'react';
import './App.css';

import Pacientes from './pages/Pacientes';
import Medicos from './pages/Medicos';
import Enfermeiros from './pages/Enfermeiros';
import Consultas from './pages/Consultas';
import Diagnosticos from './pages/Diagnosticos';
import Turnos from './pages/Turnos';

function App() {
  const [page, setPage] = useState(<div>Home</div>);
    
  return (
    <div className="App">
      <header>        
          <div className="logo">
            <a href="https://www.freepik.com/free-photos-vectors/logo">Hospital Bela Vida</a>
          </div>
          <nav>
            <li>
  <a onClick={() => setPage(<div>HOME</div>)}>Home</a>
            </li>
            <li>
              <a onClick={() => setPage(<Pacientes />)}>Pacientes</a>
            </li>
            <li>
              <a onClick={() => setPage(<Enfermeiros />)}>Médicos</a>
            </li>
            <li className="active">
              <a onClick={() => setPage(<Medicos />)}>Enfermeiros</a>
            </li>
            <li>
              <a onClick={() => setPage(<Consultas />)}>Consultas</a>
            </li>
            <li>
              <a onClick={() => setPage(<Turnos />)}>Turnos</a>
            </li>            
          </nav>    
      </header>

      <section>         
          {page}         
      </section>

      <footer>  
          <p>
          © Hospital Bela Vida. Todos direitos reservados. 
          </p>      
          <div className="connect">
            <a href="https://github.com/theago-ls" target="_blank" rel="noopener noreferrer" className="facebook"></a><a href="https://github.com/theago-ls" target="_blank" className="googleplus"></a><a href="https://github.com/theago-ls" target="_blank" className="twitter"></a><a href="https://github.com/theago-ls" target="_blank" className="tumbler"></a>
          </div>         
      </footer>
    </div>    
  );
}

export default App;
