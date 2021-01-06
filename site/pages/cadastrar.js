import React, { useState } from 'react'


function Cadastrar() {

    const [meta, setMeta] = useState({
        name: '',
        description: '',
        status: ''
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setMeta({ ...meta, [e.target.name]: e.target.value });

    const sendMeta = async e => {
        e.preventDefault();
        console.log(meta);
        try {
            const res = await fetch('http://localhost:8080/metas',
             {
                method: 'POST',
                body: JSON.stringify(meta),
                headers: { 'Content-Type': 'application/json' }
            });

            const responseEnv = await res.json();
            if(responseEnv.error){
                setResponse({
                    formSave: false,
                    type: 'error',
                    messge: responseEnv.message
                });
            }else{
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.message
                });
            }
        } catch(err){
            setResponse({
                formSave: false,
                type: 'error', 
                message: 'Erro: Meta não cadastrada com sucesso, tente novamente mais tarde!'
            });
        }
    }

    return (
        <>
            <h1>Cadastrar Minha Meta</h1>
            <hr />
            
            {response.type === 'error' ? <p>{response.message}</p> : ""}
            {response.type === 'success' ? <p>{response.message}</p> : ""}
            
            <form onSubmit={sendMeta}>
                <label>Nome</label>
                <input type="text" name="name" id="name" placeholder="Nome da meta" onChange={onChangeInput} /><br /><br />
                <label>Descrição</label>
                <input type="text" name="description" id="description" placeholder="Descreva a meta" onChange={onChangeInput} /><br /><br />
                <label>Status</label>
                <input type="text" name="status" id="status" placeholder="Status da meta" onChange={onChangeInput} /><br /><br />
                <button type="submit">Cadastrar</button>
            </form>
        </>
    )
};

export default Cadastrar