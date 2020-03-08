import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../services/api';

export default function Turnos(){
    const [turno, setTurno] = useState({
        CPF: '',
        entrada: '',        
        saida: ''
    });    
    const [viewTurno, setView] = useState(false);
    const [addTurno, setAdd] = useState(false);
    const [updTurnos, setUpd] = useState(false);
    const [turnosList, setTurnos] = useState([]);
    const [enfermeirosList, setEnfermeiros] = useState([]);
    const [medicosList, setMedicos] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const response = await api.get('/turnos');

            if(response.status === 200){
                setTurnos(response.data);
            }else{
                alert(response.data.message);
            }      
            
            const response2 = await api.get('/medicos');

            if(response2.status === 200){
                setMedicos(response2.data);
            }else{
                alert(response2.data.message);
            }  

            const response3 = await api.get('/pacientes');

            if(response3.status === 200){
                setEnfermeiros(response3.data);
            }else{
                alert(response3.data.message);
            }  
        }

        fetchData();
    }, [updTurnos]);

    async function handleSubmit(e){     
        e.preventDefault();  
        
        const response = await api.post('/turnos/add', turno);

        if(response.status === 200){
            let aux = !updTurnos;
            setUpd(aux);
            setView(false);
            setAdd(false);
        }else{
            alert(response.data.message);
        }    
    }

    async function handleDelete(){
        const response = await api.post('/turnos/delete', turno);

        if(response.status === 200){
            let aux = !updTurnos;
            setUpd(aux);
            setView(false);
        }else{
            alert(response.data.message);
        }       
    }

    async function handleUpdate(){
        const response = await api.post('/turnos/update', turno);

        if(response.status === 200){
            let aux = !updTurnos;
            setUpd(aux);
            setView(false);
        }else{
            alert(response.data.message);
        }      
    }

    function loadButton(){
        if(!addTurno){
            return (
                <div className="buttonContainer">
                    <input id="voltar" type="button" value="Voltar" onClick={voltar}/>
                    <input id="deletar" type="button" value="Excluir" onClick={handleDelete}/>
                    <input id="atualizar" type="button" value="Editar" onClick={handleUpdate}/>
                </div>                
            );
        }else{
            return(
                <div className="buttonContainer">
                    <input id="voltar" type="button" value="Voltar" onClick={voltar}/>
                    <input id="enviar" type="submit" value="Salvar turno" />
                </div>
            );
        }
    }

    function showAdd(){
        setTurno({
            CPF: '',
            entrada: '',        
            saida: ''
        });
        setView(true);
        setAdd(true);
    }

    function voltar(){
        setAdd(false);
        setView(false);
    }

    function handleTurno(turno){
        setTurno(turno);
        setView(true);
    }

    return(
        <div className="mainContainer">
            <div>                                      
                {!viewTurno && (
                    <div>
                        <table id="tabela">
                            <tbody>
                                <tr id="titulosTable">
                                    <td>CPF</td>
                                    <td>Entrada</td>
                                    <td>Saída</td>
                                </tr>
                                {turnosList.length > 0 ? (turnosList.map(turno => (
                                    <tr key={turno._id} id="valoresTable" onClick={() => handleTurno(turno)}>
                                        <td>{turno.CPF}</td>
                                        <td>{turno.entrada}</td>
                                        <td>{turno.saida}</td>                                    
                                    </tr>
                                ))) : (<tr key={'vazio'} id="valoresTable" >
                                        <td colSpan="3" style={{textAlign: 'center'}}>Vazio.</td>                                                                          
                                    </tr>)}
                            </tbody>
                        </table> 
                        <button id="adicionar" onClick={() => showAdd()}>Adicionar turno</button>                        
                    </div>                  
                    )                        
                }                                     
            </div>
            {(viewTurno || addTurno) && (<div >
                <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="funcionario">Funcionário:</label>
                        <select id="funcionario" value={turno.medico || ''} readOnly onChange={(e) => setTurno({ ...turno, medico: e.target.value })} required >
                            <option></option>
                            {medicosList.map(medico => (
                                <option key={medico._id} value={medico.CPF}>{medico.nome}</option>
                            ))}
                            {enfermeirosList.map(enfermeiro => (
                                <option key={enfermeiro._id} value={enfermeiro.CPF}>{enfermeiro.nome}</option>
                            ))}
                        </select>
                    </div>
                
                    <div className="form-group">
                        <label htmlFor="entrada">Entrada:</label>
                        <input id="entrada" value={turno.entrada || ''} onChange={(e) => setTurno({ ...turno, entrada: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="saida">Saída:</label>
                        <input id="saida" value={turno.saida || ''} onChange={(e) => setTurno({ ...turno, saida: e.target.value })} required />
                    </div>
                    { loadButton()                    
                    }
                </form>
            </div>)}
        </div>
    );
}