import React, { useState, useEffect } from 'react';
import './App.css';

import Pacientes from './pages/Pacientes';
import Medicos from './pages/Medicos';
import Enfermeiros from './pages/Enfermeiros';
import Consultas from './pages/Consultas';
import Diagnosticos from './pages/Diagnosticos';
import Turnos from './pages/Turnos';

function App() {
  const [page, setPage] = useState(<Pacientes />);
  const [active, setActive] = useState(2);
  
  function setClass(li){
    if(li === active)
      return "active";
    else
      return "";
  }

  function setPagina(page){
    switch(page){
      case 1:
        setPage(<div>HOME</div>);
        setActive(1);
        break;
      case 2:
        setPage(<Pacientes />);
        setActive(2);
        break;
      case 3:
        setPage(<Enfermeiros />);
        setActive(3);
        break;
      case 4:
        setPage(<Medicos />);
        setActive(4);
        break;
      case 5:
        setPage(<Consultas />);
        setActive(5);
        break;
      case 6:
        setPage(<Turnos />);
        setActive(6);
        break;
    }
  }
  return (
    <div className="App">
      <header>        
          <div className="logo">
            <a href="https://www.freepik.com/free-photos-vectors/logo">Hospital Bela Vida</a>
          </div>
          <nav>
            {/* <li className={`${setClass(1)}`}>
  <a onClick={() => setPagina(1)}>Home</a>
            </li> */}
            <li className={`${setClass(2)}`}>
              <a onClick={() => setPagina(2)}>Pacientes</a>
            </li>
            <li className={`${setClass(3)}`}>
              <a onClick={() => setPagina(3)}>Médicos</a>
            </li>
            <li className={`${setClass(4)}`}>
              <a onClick={() => setPagina(4)}>Enfermeiros</a>
            </li>
            <li className={`${setClass(5)}`}>
              <a onClick={() => setPagina(5)}>Consultas</a>
            </li>
            <li className={`${setClass(6)}`}>
              <a onClick={() => setPagina(6)}>Turnos</a>
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
