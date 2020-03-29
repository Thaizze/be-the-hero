import React, {useState, useEffect}  from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    
    //1° parâmetro função: qual função será executada | 2° parâmetro quando
    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    //Função Deletar Incidents - recebe o ID do incident que quer deletar
    async function handleDeleteIncident(id){
        try{
            //Deleta - sempre passar o header de autorização
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            //Atualizar incident - remover os que foram deletados 
            setIncidents(incidents.filter(incident => incident.id !== id ));
        }catch (err){
            alert('Erro ao deletar o caso!');
        }
    }

    //Função Logout - Limpa a Storage e envia para a home
    function handleLogout(){
       localStorage.clear();
       history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo, {ongName}!</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>                              
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}





