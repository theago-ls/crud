import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../services/api';

export default function Diagnosticos( props ){
    const [diagnostico, setDiag] = useState({
        medico: '',
        paciente: '',
        doenca: '',
        estagio: '',
        observacao: '',
        data: '',
    });    
    const [addDiag, setAdd] = useState(false);
    const [updDiags, setUpd] = useState(false);
    const [diagsList, setDiags] = useState([]);
    const [pacientesList, setPacientes] = useState([]);
    const [medicosList, setMedicos] = useState([]);


    useEffect(() => {
        async function fetchData(){
            if(props.paciente){
                const response = await api.get('/diagnosticos/search', props.paciente);

                if(response.status === 200){
                    setDiags(response.data);
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
        }

        fetchData();
    }, [updDiags]);

    async function handleSubmit(e){     
        e.preventDefault();            
        props.callbacks.setDiagnostico(diagnostico);
        props.callbacks.setModal(false);        
    }

    function loadButton(){
        if(diagnostico){
            return (
                <div className="buttonContainer">
                    <input id="voltar" type="button" value="Voltar" onClick={voltar}/>
                    <input id="atualizar" type="button" value="Editar" onClick={handleSubmit}/>
                </div>                
            );
        }else{
            return(
                <div className="buttonContainer">
                    <input id="voltar" type="button" value="Voltar" onClick={voltar}/>
                    <input id="enviar" type="submit" value="Salvar diagnostico" />
                </div>
            );
        }
    }
    
    function voltar(){
        setAdd(false);
    }

    return(
        <div className="mainContainer">
            <div >
                <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="medico">Médico:</label>
                        <select id="medico" value={diagnostico.medico || ''} readOnly onChange={(e) => setDiag({ ...diagnostico, medico: e.target.value })} required >
                            <option></option>
                            {medicosList.map(medico => (
                                <option key={medico._id} value={medico._id}>{medico.nome}</option>
                            ))}
                        </select>                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="paciente" >Paciente:</label>
                        <select id="paciente" value={diagnostico.paciente || ''} readOnly onChange={(e) => setDiag({ ...diagnostico, paciente: e.target.value })} required >
                            <option></option>
                            {pacientesList.map(paciente => (
                                <option key={paciente._id} value={paciente._id}>{paciente.nome}</option>
                            ))}
                        </select>                     
                    </div>

                    <div className="form-group">
                        <label htmlFor="doenca">Doença:</label>
                        <input id="doenca" value={diagnostico.doenca || ''} type="select" onChange={(e) => setDiag({ ...diagnostico, doenca: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estagio">Estágio:</label>
                        <input id="estagio" value={diagnostico.estagio || ''} onChange={(e) => setDiag({ ...diagnostico, estagio: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="observacao">Observação:</label>
                        <input id="observacao" value={diagnostico.observacao || ''} onChange={(e) => setDiag({ ...diagnostico, observacao: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="data">Data:</label>
                        <input id="data" value={diagnostico.data || ''} onChange={(e) => setDiag({ ...diagnostico, data: { ...diagnostico.endereco, logradouro: e.target.value } })} required />
                    </div>
                    { loadButton()                    
                    }
                </form>
            </div>)}
        </div>
    );
}