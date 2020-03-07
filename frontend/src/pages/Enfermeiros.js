import React, { useState, useEffect } from 'react';

import './styles.css';

import api from '../services/api';

export default function Enfermeiros(){
    const [enfermeiro, setEnfermeiro] = useState({
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
    const [viewEnfermeiro, setView] = useState(false);
    const [addEnfermeiro, setAdd] = useState(false);
    const [updEnfermeiros, setUpd] = useState(false);
    const [enfermeirosList, setEnfermeiros] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const response = await api.get('/enfermeiros');

            if(response.status === 200){
                setEnfermeiros(response.data);
            }else{
                alert(response.data.message);
            }           
        }

        fetchData();
    }, [updEnfermeiros]);

    async function handleSubmit(e){     
        e.preventDefault();  
                
        const response = await api.post('/enfermeiros/add', enfermeiro);

        if(response.status === 200){
            let aux = !updEnfermeiros;
            setUpd(aux);
            setView(false);
            setAdd(false);
        }else{
            alert(response.data.message);
        }    
    }

    async function handleDelete(){
        const response = await api.post('/enfermeiros/delete', enfermeiro);

        if(response.status === 200){
            let aux = !updEnfermeiros;
            setUpd(aux);
            setView(false);
        }else{
            alert(response.data.message);
        }       
    }

    async function handleUpdate(){
        const response = await api.post('/enfermeiros/update', enfermeiro);

        if(response.status === 200){
            let aux = !updEnfermeiros;
            setUpd(aux);
            setView(false);
        }else{
            alert(response.data.message);
        }      
    }

    function loadButton(){
        if(!addEnfermeiro){
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
        setEnfermeiro({
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

    function handleEnfermeiro(enfermeiro){
        setEnfermeiro(enfermeiro);
        setView(true);
    }

    return(
        <div className="mainContainer">
            <div>                                      
                {!viewEnfermeiro && (
                    <div>
                        <table id="tabela">
                            <tbody>
                                <tr id="titulosTable">
                                    <td>Nome</td>                                  
                                    <td>Área</td>
                                    <td>Data de admissão</td>
                                </tr>
                                {enfermeirosList.length > 0 ? (enfermeirosList.map(enfermeiro => (
                                    <tr key={enfermeiro._id} id="valoresTable" onClick={() => handleEnfermeiro(enfermeiro)}>
                                        <td>{enfermeiro.nome}</td>
                                        <td>{enfermeiro.area}</td>
                                        <td>{enfermeiro.dataAdmissao}</td>
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
            {(viewEnfermeiro || addEnfermeiro) && (<div >
                <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="nome" >Nome:</label>
                        <input id="nome" value={enfermeiro.nome || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, nome: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF:</label>
                        <input id="cpf" value={enfermeiro.CPF || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, CPF: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sexo">Sexo:</label>
                        <input id="sexo" value={enfermeiro.sexo || ''} type="select" onChange={(e) => setEnfermeiro({ ...enfermeiro, sexo: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tel">Telefone:</label>
                        <input id="tel" value={enfermeiro.telefone || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, telefone: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="data">Data de nascimento:</label>
                        <input id="data" value={enfermeiro.dataNascimento || ''} type="date" onChange={(e) => setEnfermeiro({ ...enfermeiro, dataNascimento: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dataAdmissao">Data de admissão:</label>
                        <input id="dataAdmissao" value={enfermeiro.dataAdmissao || ''} type="date" onChange={(e) => setEnfermeiro({ ...enfermeiro, dataAdmissao: e.target.value })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="log">Logradouro:</label>
                        <input id="log" value={enfermeiro.endereco.logradouro || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, endereco: { ...enfermeiro.endereco, logradouro: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="num">Número:</label>
                        <input id="num" value={enfermeiro.endereco.numero || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, endereco: { ...enfermeiro.endereco, numero: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="compl">Complemento:</label>
                        <input id="compl" value={enfermeiro.endereco.complemento || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, endereco: { ...enfermeiro.endereco, complemento: e.target.value } })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cep">CEP:</label>
                        <input id="cep" value={enfermeiro.endereco.cep || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, endereco: { ...enfermeiro.endereco, cep: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bairro">Bairro:</label>
                        <input id="bairro" value={enfermeiro.endereco.bairro || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, endereco: { ...enfermeiro.endereco, bairro: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade">Cidade:</label>
                        <input id="cidade" value={enfermeiro.endereco.cidade || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, endereco: { ...enfermeiro.endereco, cidade: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estado">Estado:</label>
                        <input id="estado" value={enfermeiro.endereco.estado || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, endereco: { ...enfermeiro.endereco, estado: e.target.value } })} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="area">Área:</label>
                        <input id="area" value={enfermeiro.area || ''} onChange={(e) => setEnfermeiro({ ...enfermeiro, area: e.target.value })} required />
                    </div>
                    { loadButton()                    
                    }
                </form>
            </div>)}
        </div>
    );
}