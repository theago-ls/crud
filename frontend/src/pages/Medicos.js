import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../services/api';

export default function Medicos(){
    const [medico, setMedico] = useState({
        CRM: '',
        nome: '',
        CPF: '',
        sexo: '',
        telefone: '',
        dataNascimento: '',
        dataAdmissao: '',
        endereco: {
            logradouro: '',
            numero: '',
            complemento: '',
            cep: '',
            bairro: '',
            cidade: '',
            estado: ''
        },
        area: ''
    });    
    const [viewMedico, setView] = useState(false);
    const [addMedico, setAdd] = useState(false);
    const [updMedicos, setUpd] = useState(false);
    const [medicosList, setMedicos] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const response = await api.get('/medicos');

            if(response.status === 200){
                setMedicos(response.data);
            }else{
                alert(response.data.message);
            }           
        }

        fetchData();
    }, [updMedicos]);

    async function handleSubmit(e){     
        e.preventDefault();  
                
        const response = await api.post('/medicos/add', medico);

        if(response.status === 200){
            let aux = !updMedicos;
            setUpd(aux);
            setView(false);
            setAdd(false);
        }else{
            alert(response.data.message);
        }    
    }

    async function handleDelete(){
        const response = await api.post('/medicos/delete', medico);

        if(response.status === 200){
            let aux = !updMedicos;
            setUpd(aux);
            setView(false);
        }else{
            alert(response.data.message);
        }       
    }

    async function handleUpdate(){
        const response = await api.post('/medicos/update', medico);

        if(response.status === 200){
            let aux = !updMedicos;
            setUpd(aux);
            setView(false);
        }else{
            alert(response.data.message);
        }      
    }

    function loadButton(){
        if(!addMedico){
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
                    <input id="enviar" type="submit" value="Salvar médico" />
                </div>
            );
        }
    }

    function showAdd(){
        setMedico({
            CRM: '',
            nome: '',
            CPF: '',
            sexo: '',
            telefone: '',
            dataNascimento: '',
            dataAdmissao: '',
            endereco: {
                logradouro: '',
                numero: '',
                complemento: '',
                cep: '',
                bairro: '',
                cidade: '',
                estado: ''
            },
            area: ''
        });
        setView(true);
        setAdd(true);
    }

    function voltar(){
        setAdd(false);
        setView(false);
    }

    function handleMedico(medico){
        setMedico(medico);
        setView(true);
    }

    return(
        <div className="mainContainer">
            <div>                                      
                {!viewMedico && (
                    <div>
                        <table id="tabela">
                            <tbody>
                                <tr id="titulosTable">
                                    <td>Nome</td>                                  
                                    <td>CRM</td>
                                    <td>Data de admissão</td>
                                </tr>
                                {medicosList.length > 0 ? (medicosList.map(medico => (
                                    <tr key={medico._id} id="valoresTable" onClick={() => handleMedico(medico)}>
                                        <td>{medico.nome}</td>
                                        <td>{medico.CRM}</td>
                                        <td>{medico.dataAdmissao}</td>
                                    </tr>
                                ))) : (<tr key={'vazio'} id="valoresTable" >
                                        <td colSpan="3" style={{textAlign: 'center'}}>Vazio.</td>                                                                          
                                    </tr>)}
                            </tbody>
                        </table> 
                        <button id="adicionar" onClick={() => showAdd()}>Adicionar médico</button>                        
                    </div>                  
                    )                        
                }                                     
            </div>
            {(viewMedico || addMedico) && (<div >
                <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="nome" >Nome:</label>
                        <input id="nome" value={medico.nome || ''} onChange={(e) => setMedico({ ...medico, nome: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="crm" >CRM:</label>
                        <input id="crm" value={medico.CRM || ''} onChange={(e) => setMedico({ ...medico, CRM: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF:</label>
                        <input id="cpf" value={medico.CPF || ''} onChange={(e) => setMedico({ ...medico, CPF: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sexo">Sexo:</label>
                        <input id="sexo" value={medico.sexo || ''} type="select" onChange={(e) => setMedico({ ...medico, sexo: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tel">Telefone:</label>
                        <input id="tel" value={medico.telefone || ''} onChange={(e) => setMedico({ ...medico, telefone: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="data">Data de nascimento:</label>
                        <input id="data" value={medico.dataNascimento || ''} type="date" onChange={(e) => setMedico({ ...medico, dataNascimento: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dataAdmissao">Data de admissão:</label>
                        <input id="dataAdmissao" value={medico.dataAdmissao || ''} type="date" onChange={(e) => setMedico({ ...medico, dataAdmissao: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="log">Logradouro:</label>
                        <input id="log" value={medico.endereco.logradouro || ''} onChange={(e) => setMedico({ ...medico, endereco: { ...medico.endereco, logradouro: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="num">Número:</label>
                        <input id="num" value={medico.endereco.numero || ''} onChange={(e) => setMedico({ ...medico, endereco: { ...medico.endereco, numero: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="compl">Complemento:</label>
                        <input id="compl" value={medico.endereco.complemento || ''} onChange={(e) => setMedico({ ...medico, endereco: { ...medico.endereco, complemento: e.target.value } })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cep">CEP:</label>
                        <input id="cep" value={medico.endereco.cep || ''} onChange={(e) => setMedico({ ...medico, endereco: { ...medico.endereco, cep: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bairro">Bairro:</label>
                        <input id="bairro" value={medico.endereco.bairro || ''} onChange={(e) => setMedico({ ...medico, endereco: { ...medico.endereco, bairro: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade">Cidade:</label>
                        <input id="cidade" value={medico.endereco.cidade || ''} onChange={(e) => setMedico({ ...medico, endereco: { ...medico.endereco, cidade: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado:</label>
                        <input id="estado" value={medico.endereco.estado || ''} onChange={(e) => setMedico({ ...medico, endereco: { ...medico.endereco, estado: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="area">Área:</label>
                        <input id="area" value={medico.area || ''} onChange={(e) => setMedico({ ...medico, area: e.target.value })} required />
                    </div>
                    { loadButton()                    
                    }
                </form>
            </div>)}
        </div>
    );
}