import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../services/api';

export default function Consultas(){
    const [consulta, setConsulta] = useState({
        paciente: '',
        medico: '',        
        data: '',
        horario: '',
        tipo: ''
    });    
    const [viewConsulta, setView] = useState(false);
    const [addConsulta, setAdd] = useState(false);
    const [updConsultas, setUpd] = useState(false);
    const [consultasList, setConsultas] = useState([]);
    const [pacientesList, setPacientes] = useState([]);
    const [medicosList, setMedicos] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const response = await api.get('/consultas');

            if(response.status === 200){
                setConsultas(response.data);
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
                setPacientes(response3.data);
            }else{
                alert(response3.data.message);
            }  
        }

        fetchData();
    }, [updConsultas]);

    async function handleSubmit(e){     
        e.preventDefault();  
        
        if(consulta.medico !== '' && consulta.paciente !== ''){
            const response = await api.post('/consultas/add', consulta);

            if(response.status === 200){
                let aux = !updConsultas;
                setUpd(aux);
                setView(false);
                setAdd(false);
            }else{
                alert(response.data.message);
            }    
        }else{
            alert('Selecione um médico e um paciente.');
        }
    }

    async function handleDelete(){
        const response = await api.post('/consultas/delete', consulta);

        if(response.status === 200){
            let aux = !updConsultas;
            setUpd(aux);
            setView(false);
        }else{
            alert(response.data.message);
        }       
    }

    async function handleUpdate(){
        if(consulta.medico !== '' && consulta.paciente !== ''){
            const response = await api.post('/consultas/update', consulta);

            if(response.status === 200){
                let aux = !updConsultas;
                setUpd(aux);
                setView(false);
            }else{
                alert(response.data.message);
            }      
        }else{
            alert('Selecione um médico e um paciente.');
        }
    }

    function loadButton(){
        if(!addConsulta){
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
                    <input id="enviar" type="submit" value="Salvar consulta" />
                </div>
            );
        }
    }

    function showAdd(){
        setConsulta({
            paciente: '',
            medico: '',
            data: '',
            horario: '',
            tipo: ''
        });
        setView(true);
        setAdd(true);
    }

    function voltar(){
        setAdd(false);
        setView(false);
    }

    function handleConsulta(consulta){
        setConsulta(consulta);
        setView(true);
    }

    return(
        <div className="mainContainer">
            <div>                                      
                {!viewConsulta && (
                    <div>
                        <table id="tabela">
                            <tbody>
                                <tr id="titulosTable">
                                    <td>Paciente</td>
                                    <td>Médico</td>
                                    <td>Data</td>
                                </tr>
                                {consultasList.length > 0 ? (consultasList.map(consulta => (
                                    <tr key={consulta._id} id="valoresTable" onClick={() => handleConsulta(consulta)}>
                                        <td>{consulta.paciente.nome}</td>
                                        <td>{consulta.medico.nome}</td>
                                        <td>{consulta.data}</td>                                    
                                    </tr>
                                ))) : (<tr key={'vazio'} id="valoresTable" >
                                        <td colSpan="3" style={{textAlign: 'center'}}>Vazio.</td>                                                                          
                                    </tr>)}
                            </tbody>
                        </table> 
                        <button id="adicionar" onClick={() => showAdd()}>Adicionar consulta</button>                        
                    </div>                  
                    )                        
                }                                     
            </div>
            {(viewConsulta || addConsulta) && (<div >
                <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="paciente" >Paciente:</label>
                        <select id="paciente" value={consulta.paciente || ''} readOnly onChange={(e) => setConsulta({ ...consulta, paciente: e.target.value })} required >
                            <option></option>
                            {pacientesList.map(paciente => (
                                <option key={paciente._id} value={paciente._id}>{paciente.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="medico">Médico:</label>
                        <select id="medico" value={consulta.medico || ''} readOnly onChange={(e) => setConsulta({ ...consulta, medico: e.target.value })} required >
                            <option></option>
                            {medicosList.map(medico => (
                                <option key={medico._id} value={medico._id}>{medico.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="data">Data:</label>
                        <input id="data" value={consulta.data || ''} type="date" onChange={(e) => setConsulta({ ...consulta, data: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="horario">Horário:</label>
                        <input id="horario" value={consulta.horario || ''} onChange={(e) => setConsulta({ ...consulta, horario: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tipo">Tipo:</label>
                        <input id="tipo" value={consulta.tipo || ''} onChange={(e) => setConsulta({ ...consulta, tipo: e.target.value })} required />
                    </div>
                    { loadButton()                    
                    }
                </form>
            </div>)}
        </div>
    );
}