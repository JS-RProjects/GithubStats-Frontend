import React, { useState,useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import { FaArrowLeft,FaPython,FaFileCode,FaFile,FaStar,FaCodeBranch,FaExclamationCircle,FaInfoCircle } from 'react-icons/fa';
import unknown from '../../assets/unknown.jpg';
import swal from 'sweetalert';

export default function Repositorios({ history,match }){
    const [userinfo,setUserinfo] = useState({});
    const [runned,setRunned] = useState(false);
    const [userRepos,setUserRepos] = useState({});

    const { username } = match.params;
    
    if (!username){
        history.push('/');
    }

    const get_user_info = async () => { const reponse = await api.get(`/users/${username}`); setUserinfo(reponse);console.log(reponse)}
    const get_user_repos = async () => { const response = await api.get(`/users/${username}/repos`); setUserRepos(response);console.log(response)}

    useEffect(() => {get_user_info();get_user_repos();},[]);

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
            <div className="principal-repo">
                <div className="repos-div">
                    <div className="profile-introduction">
                        <a onClick={() => history.goBack()} style={{paddingBottom: '0.5vh',marginBottom: '14vh',marginLeft: '2vh',cursor: 'pointer', display: 'flex',alignContent: "center",justifyContent: 'center', alignSelf: 'flex-start'}}><FaArrowLeft size="2.5vw"/><strong style={{marginTop: '0.5vh',marginLeft: '2vh', fontSize: '1.5vw'}}>Voltar</strong></a>
                        <img src={userinfo.data ? userinfo.data.avatar : unknown} style={{}}/>
                        <p className="profile-name">{userinfo.data ? userinfo.data.username : 'None'}</p>
                        <p className="profile-description" style={{marginBottom: '12vh'}}>{userinfo.data ? userinfo.data.description : 'None'}</p>
                    </div>
                    <div className="repos">
                        {
                        userRepos.data ? userRepos.data['repos'].map(function (item){
                            return (
                            <div className="repo">
                                <div style={{ display:'flex', alignContent:'center', justifyContent: 'space-between'}}>
                                    <a className="name-link" href={`https://github.com/${item.full_name}`} target="blank">{item.full_name}</a>
                                    <p style={{fontSize: '1.8vw'}}><strong>Criado em:</strong> {item.created_at}</p>
                                </div>
                                <div className="repo-details">
                                    <div className="repo-group">
                                        <p className="repo-detail"><FaPython color="#FFF" size="3vw" style={{marginRight: '0.4vw'}}/><strong style={{marginRight: '0.4vw'}}>Linguagem:</strong>{item.language ? item.language : 'None'}</p>
                                        <p className="repo-detail"><FaFile color="#FFF" size="3vw" style={{marginRight: '0.4vw'}}/><strong style={{marginRight: '0.4vw'}}>Size:</strong>{item.size}</p>
                                        <p className="repo-detail"><FaFileCode color="#FFF" size="3vw" style={{marginRight: '0.4vw'}}/><strong style={{marginRight: '0.4vw'}}>License:</strong>{item.license ? item.license : 'None'}</p>
                                    </div>
                                    <div className="repo-group">
                                        <p className="repo-detail"><FaStar color="#FFF" size="3vw"style={{marginRight: '0.4vw'}}/><strong style={{marginRight: '0.4vw'}}>Stars:</strong>{item.stars}</p>
                                        <p className="repo-detail"><FaCodeBranch color="#FFF" size="3vw"style={{marginRight: '0.4vw'}}/><strong style={{marginRight: '0.4vw'}}>Forks:</strong>{item.forks}</p>
                                        <p className="repo-detail"><FaExclamationCircle color="#FFF" size="3vw" style={{marginRight: '0.4vw'}}/><strong style={{marginRight: '0.4vw'}}>Issues:</strong>{item.issues}</p>
                                    </div>
                                    <div className="repo-group">
                                        <p className="repo-detail" style={{textAlign: 'center'}}><FaInfoCircle color="#FFF" size="3vw" style={{marginRight: '0.4vw'}}/><strong style={{marginRight: '0.4vw'}}>Descrição:</strong>{item.description ? item.description : 'None'}</p>
                                    </div>
                                </div>
                            </div>
                            );
                        }) : ''
                        }
                    </div>
                </div>
            </div>
        </>
    );
}