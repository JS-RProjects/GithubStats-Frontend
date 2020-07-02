import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import './styles.css';

export default function Home({ history }){
    const [username,setUsername] = useState('');

    return (
        <>
        <div className="principal">
            <FaGithub color="#FFF" size="40%" className="github-cion"/>
            <form className="form" onSubmit={() => history.push(`/users/${username}`)}>
                <input type="text" required autoComplete="on" className="input-name" placeholder="DIGITE SEU USERNAME" onChange={event => setUsername(event.target.value)}/>
                <button type="submit" className="submit-btn">BUSCAR</button>
            </form>
        </div>
        </>
    );
}