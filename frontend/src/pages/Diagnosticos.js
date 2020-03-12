import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../services/api';

export default function Diagnosticos( props ){
    const [diagnostico, setDiag] = useState({
        medico: '',
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
        async function fetchData() {
            const response = await api.get('/medicos');

            if (response.status === 200) {
                setMedicos(response.data);
            } else {
                alert(response.data.message);
            }
        }

        fetchData();
    }, [updDiags]);

    async function handleSubmit(e){     
        e.preventDefault();            
        props.callback.setDiagnostico(diagnostico);
        props.callback.showModal(false);        
    }

    function loadButton(){
        if(diagnostico.medico !== ''){
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
                    <input id="enviar" type="submit" value="Salvar" />
                </div>
            );
        }
    }
    
    function voltar(){
        props.callback.showModal(false);
    }

    return(
        <div className="mainContainer">
            <div>
                <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="medico">Médico:</label>
                        <select id="medico" value={props.paciente.diagnostico.medico || ''} readOnly onChange={(e) => setDiag({ ...diagnostico, medico: e.target.value })} required >
                            <option></option>
                            {medicosList.map(medico => (
                                <option key={medico._id} value={medico._id}>{medico.nome}</option>
                            ))}
                        </select>                        
                    </div>

                    <div className="form-group">
                        <label htmlFor="doenca">Doença:</label>
                        <input id="doenca" value={props.paciente.diagnostico.doenca || ''} type="select" onChange={(e) => setDiag({ ...diagnostico, doenca: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estagio">Estágio:</label>
                        <input id="estagio" value={props.paciente.diagnostico.estagio || ''} onChange={(e) => setDiag({ ...diagnostico, estagio: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="observacao">Observação:</label>
                        <input id="observacao" value={props.paciente.diagnostico.observacao || ''} onChange={(e) => setDiag({ ...diagnostico, observacao: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="data">Data:</label>
                        <input type="date" id="data" value={props.paciente.diagnostico.data || ''} onChange={(e) => setDiag({ ...diagnostico, data: e.target.value })} required />
                    </div>
                    { loadButton()                    
                    }
                </form>
            </div>
        </div>
    );
}