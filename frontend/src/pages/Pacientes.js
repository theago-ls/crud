import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../services/api';
import { Modal } from 'react-bootstrap';

import Diagnostico from './Diagnosticos';

export default function Pacientes(){
    const [paciente, setPaciente] = useState({
        nome: '',
        CPF: '',
        sexo: '',
        telefone: '',
        dataNascimento: '',
        endereco: {
            logradouro: '',
            numero: '',
            complemento: '',
            cep: '',
            bairro: '',
            cidade: '',
            estado: ''
        },
        diagnostico: {
            medico: '',
            paciente: '',
            doenca: '',
            estagio: '',
            observacao: '',
            data: '',
        }
    });    
    const [viewPaciente, setView] = useState(false);
    const [addPaciente, setAdd] = useState(false);
    const [updPacientes, setUpd] = useState(false);
    const [pacientesList, setPacientes] = useState([]);
    const [modal, setModal] = useState(false);


    useEffect(() => {
        async function fetchData(){
            const response = await api.get('/pacientes');

            if(response.status === 200){
                setPacientes(response.data);
            }else{
                alert(response.data.message);
            }           
        }

        fetchData();
    }, [updPacientes]);

    async function handleSubmit(e){     
        e.preventDefault();  
                
        const response = await api.post('/pacientes/add', paciente);

        if(response.status === 200){
            let aux = !updPacientes;
            setUpd(aux);
            setView(false);
            setAdd(false);
        }else{
            alert(response.data.message);
        }    
    }

    async function handleDelete(){
        const response = await api.post('/pacientes/delete', paciente);

        if(response.status === 200){
            let aux = !updPacientes;
            setUpd(aux);
            setView(false);
        }else{
            alert(response.data.message);
        }       
    }

    async function handleUpdate(){
        const response = await api.post('/pacientes/update', paciente);

        if(response.status === 200){
            let aux = !updPacientes;
            setUpd(aux);
            setView(false);
        }else{
            alert(response.data.message);
        }      
    }

    function loadButton(){
        if(!addPaciente){
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
                    <input id="enviar" type="submit" value="Salvar paciente" />
                </div>
            );
        }
    }

    function showAdd(){
        setPaciente({
            nome: '',
            CPF: '',
            sexo: '',
            telefone: '',
            dataNascimento: '',
            endereco: {
                logradouro: '',
                numero: '',
                complemento: '',
                cep: '',
                bairro: '',
                cidade: '',
                estado: ''
            },
            diagnostico: {
                medico: '',
                paciente: '',
                doenca: '',
                estagio: '',
                observacao: '',
                data: '',
            }
        });
        setView(true);
        setAdd(true);
    }

    function voltar(){
        setAdd(false);
        setView(false);
    }

    function handlePaciente(paciente){
        setPaciente(paciente);
        setView(true);
    }

    function setDiagnostico(diagnostico){
        setPaciente({...paciente, diagnostico: diagnostico});
    }

    return(
        <div className="mainContainer">
            <div>                                      
                {!viewPaciente && (
                    <div>
                        <table id="tabela">
                            <tbody>
                                <tr id="titulosTable">
                                    <td>Nome</td>
                                    <td>Sexo</td>
                                    <td>Idade</td>
                                </tr>
                                {pacientesList.length > 0 ? (pacientesList.map(paciente => (
                                    <tr key={paciente._id} id="valoresTable" onClick={() => handlePaciente(paciente)}>
                                        <td>{paciente.nome}</td>
                                        <td>{paciente.sexo}</td>
                                        <td>{paciente.dataNascimento}</td>                                    
                                    </tr>
                                ))) : (<tr key={'vazio'} id="valoresTable" >
                                        <td colSpan="3" style={{textAlign: 'center'}}>Vazio.</td>                                                                          
                                    </tr>)}
                            </tbody>
                        </table> 
                        <button id="adicionar" onClick={() => showAdd()}>Adicionar paciente</button>                        
                    </div>                  
                    )                        
                }                                     
            </div>
            {(viewPaciente || addPaciente) && (<div >
                <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="nome" >Nome:</label>
                        <input id="nome" value={paciente.nome || ''} onChange={(e) => setPaciente({ ...paciente, nome: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF:</label>
                        <input id="cpf" value={paciente.CPF || ''} onChange={(e) => setPaciente({ ...paciente, CPF: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sexo">Sexo:</label>
                        <input id="sexo" value={paciente.sexo || ''} type="select" onChange={(e) => setPaciente({ ...paciente, sexo: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tel">Telefone:</label>
                        <input id="tel" value={paciente.telefone || ''} onChange={(e) => setPaciente({ ...paciente, telefone: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="data">Data de nascimento:</label>
                        <input id="data" value={paciente.dataNascimento || ''} type="date" onChange={(e) => setPaciente({ ...paciente, dataNascimento: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="log">Logradouro:</label>
                        <input id="log" value={paciente.endereco.logradouro || ''} onChange={(e) => setPaciente({ ...paciente, endereco: { ...paciente.endereco, logradouro: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="num">Número:</label>
                        <input id="num" value={paciente.endereco.numero || ''} onChange={(e) => setPaciente({ ...paciente, endereco: { ...paciente.endereco, numero: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="compl">Complemento:</label>
                        <input id="compl" value={paciente.endereco.complemento || ''} onChange={(e) => setPaciente({ ...paciente, endereco: { ...paciente.endereco, complemento: e.target.value } })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cep">CEP:</label>
                        <input id="cep" value={paciente.endereco.cep || ''} onChange={(e) => setPaciente({ ...paciente, endereco: { ...paciente.endereco, cep: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bairro">Bairro:</label>
                        <input id="bairro" value={paciente.endereco.bairro || ''} onChange={(e) => setPaciente({ ...paciente, endereco: { ...paciente.endereco, bairro: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade">Cidade:</label>
                        <input id="cidade" value={paciente.endereco.cidade || ''} onChange={(e) => setPaciente({ ...paciente, endereco: { ...paciente.endereco, cidade: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado:</label>
                        <input id="estado" value={paciente.endereco.estado || ''} onChange={(e) => setPaciente({ ...paciente, endereco: { ...paciente.endereco, estado: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="diagnostico">Diagnóstico:</label>
                        <button id="diagnostico" onClick={(e) => setModal(true)} >Adicionar</button>
                    </div>
                    {modal && (
                        <Modal show={modal} onHide={() => setModal(false)}>
                            <Modal.Header>
                                Diagnóstico
                            </Modal.Header>
                            <Modal.Body>
                                <Diagnostico paciente={paciente} callback={setDiagnostico, setModal}/>
                            </Modal.Body>
                        </Modal>)}
                    { loadButton()                    
                    }
                </form>
            </div>)}
        </div>
    );
}