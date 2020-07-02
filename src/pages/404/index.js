import React from 'react';
import './styles.css';

export default function NotFoundPage({ history }){
    return (
        <>
            <div className="erro-principal" style={{width: '100vw',height: '100vh',display: 'flex',alignContent: 'center',justifyContent: 'center',flexDirection: 'column'}}>
                <p style={{color: '#FFF',fontWeight: '700',fontSize: '12vh',marginLeft: '65vh'}}>404 ERROR</p>
                <p style={{color: '#FFF',fontSize: '5vh', marginLeft: '40vh',marginTop: '5vh'}}>Página não encontrada, volte para a <a style={{borderBottom: '0.6vh solid #FFF',cursor:'pointer' }} onClick={() => history.push('/')}>página principal.</a></p>
            </div>
        </>
    );
}