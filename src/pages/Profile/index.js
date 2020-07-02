import React, { useState,useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import { FaStar,FaGithub,FaGlobeAmericas,FaUser,FaCalendar,FaArrowLeft } from 'react-icons/fa';
import unknown from '../../assets/unknown.jpg';
import swal from 'sweetalert';

export default function Profile({ history,match }){
    const [userinfo,setUserinfo] = useState({});
    const [runned,setRunned] = useState(false);

    const { username } = match.params;
    
    if (!username){
        history.push('/');
    }

    const get_user_info = async () => { const reponse = await api.get(`/users/${username}`); setUserinfo(reponse);console.log(reponse)};

    useEffect(() => {get_user_info()},[]);

    if (userinfo.data && runned == false){
        if (userinfo.data.error && runned == false){
            setRunned(true);
            swal({
                icon: 'error',
                title: 'ERRO',
                text: userinfo.data.error,
                buttons: {
                    ok: {
                        text: 'Ok',
                        value: 'ok'
                    }
                }
            }).then((value) => {
                if(value == 'ok'){
                    history.push('/');
                }
            });
        }
    }
    
    return (
        <>
        <div className="principal-1">
            <div className="profile-div">
                <div className="profile-introduction">
                    <a onClick={() => history.push('/')} style={{paddingBottom: '0.5vh',marginBottom: '14vh',marginLeft: '2vh',cursor: 'pointer', display: 'flex',alignContent: "center",justifyContent: 'center', alignSelf: 'flex-start'}}><FaArrowLeft size="2.5vw"/><strong style={{marginTop: '0.5vh',marginLeft: '2vh', fontSize: '1.5vw'}}>Voltar</strong></a>
                    <img src={userinfo.data ? userinfo.data.avatar : unknown} style={{}}/>
                    <p className="profile-name">{userinfo.data ? userinfo.data.username : 'None'}</p>
                    <p className="profile-description" style={{marginBottom: '12vh'}}>{userinfo.data ? userinfo.data.description : 'None'}</p>
                </div>

                <div className="profile-details">
                    <div className="detail-group">
                        <div className="profile-detail">
                            <FaStar size="4vw" className="profile-detail-icon"/>
                            <p><strong>Stars Recebidas:</strong> {userinfo.data ? parseInt(userinfo.data.stars_received).toLocaleString('pt-BR') : 0}</p>
                        </div>
                        <div className="profile-detail">
                            <FaUser size="3.5vw" className="profile-detail-icon"/>
                            <p style={{fontSize: "1.4vw"}}><strong>Seguidores:</strong> {userinfo.data ? parseInt(userinfo.data.followers).toLocaleString('pt-BR') : 0}</p>
                        </div>
                    </div>

                    <div className="detail-group">
                        <div className="profile-detail">
                            <FaGlobeAmericas size="4vw" className="profile-detail-icon"/>
                            <p style={{fontSize: "1.4vw"}}><strong>Localidade:</strong> {userinfo.data ? userinfo.data.location : 'None'}</p>
                        </div>
                        <div className="profile-detail">
                            <FaCalendar size="4vw" className="profile-detail-icon"/>
                            <p><strong>Contra Criada em:</strong> {userinfo.data ? userinfo.data.created_at : 'Nonen'}</p>
                        </div>
                    </div>

                    <div className="detail-group">
                        <div className="profile-detail">
                            <FaGithub size="4vw" className="profile-detail-icon"/>
                            <p style={{fontSize: "1.4vw"}}><strong style={{borderBottom: '0.4vh solid #FFF',cursor: 'pointer'}} onClick={() => history.push(`/users/${username}/repos`)}>Quantia de Repositórios:</strong> {userinfo.data ? userinfo.data.repos_count : 0}</p>
                        </div>
                        <div className="profile-detail">
                            <FaGithub size="4vw" className="profile-detail-icon"/>
                            <p style={{fontSize: "1.4vw"}}><strong>Quantia de Gists:</strong> {userinfo.data ? userinfo.data.gists_count : 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}