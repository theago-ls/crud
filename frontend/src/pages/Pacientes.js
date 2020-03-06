import React, { useState } from 'react';

import './styles.css';

import api from '../services/api';

export default function Paciente(){
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
        }
    });

    async function handleSubmit(e){     
        e.preventDefault();  
                
        const response = await api.post('/pacientes/add', paciente);

        console.log(response);
    }

    return(
        <div >
            <form className="formContainer" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="nome" >Nome:</label>
                    <input id="nome" value={paciente.nome || ''} onChange={(e) => setPaciente({...paciente, nome: e.target.value})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="cpf">CPF:</label>
                    <input id="cpf" value={paciente.CPF || ''} onChange={(e) => setPaciente({...paciente, CPF: e.target.value})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="sexo">Sexo:</label>
                    <input id="sexo" value={paciente.sexo || ''} type="select" onChange={(e) => setPaciente({...paciente, sexo: e.target.value})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="tel">Telefone:</label>
                    <input id="tel" value={paciente.telefone || ''}  onChange={(e) => setPaciente({...paciente, telefone: e.target.value})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="data">Data de nascimento:</label>
                    <input id="data" value={paciente.dataNascimento || ''} type="date"  onChange={(e) => setPaciente({...paciente, dataNascimento: e.target.value})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="log">Logradouro:</label>
                    <input id="log" value={paciente.endereco.logradouro || ''}  onChange={(e) => setPaciente({...paciente, endereco: {...paciente.endereco, logradouro: e.target.value}})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="num">Número:</label>
                    <input id="num" value={paciente.endereco.numero || ''}  onChange={(e) => setPaciente({...paciente, endereco: {...paciente.endereco, numero: e.target.value}})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="compl">Complemento:</label>
                    <input id="compl" value={paciente.endereco.complemento || ''}  onChange={(e) => setPaciente({...paciente, endereco: {...paciente.endereco, complemento: e.target.value}})} />
                </div>

                <div className="form-group">
                    <label htmlFor="cep">CEP:</label>
                    <input id="cep" value={paciente.endereco.cep || ''}  onChange={(e) => setPaciente({...paciente, endereco: {...paciente.endereco, cep: e.target.value}})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="bairro">Bairro:</label>
                    <input id="bairro" value={paciente.endereco.bairro || ''}  onChange={(e) => setPaciente({...paciente, endereco: {...paciente.endereco, bairro: e.target.value}})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="cidade">Cidade:</label>
                    <input id="cidade" value={paciente.endereco.cidade || ''}  onChange={(e) => setPaciente({...paciente, endereco: {...paciente.endereco, cidade: e.target.value}})} required/>
                </div>

                <div className="form-group">
                    <label htmlFor="estado">Estado:</label>
                    <input id="estado" value={paciente.endereco.estado || ''}  onChange={(e) => setPaciente({...paciente, endereco: {...paciente.endereco, estado: e.target.value}})} required/>
                </div>

                <div>
                    <input id="enviar" type="submit" value="Salvar paciente"/>
                </div>
            </form>           
        </div>
    );
}