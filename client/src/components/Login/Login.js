import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FormLogin from '../FormLogin/FormLogin'

async function loginUser(credentials) {
    return fetch('http://localhost:9000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .catch((err) => console.error(err))
}

export default function Login({setToken}) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token)
        console.log("clicou")
    }

    return(
        <FormLogin handleSubmit={handleSubmit} setUsername={setUsername} setPassword={setPassword}/>
    )
}

Login.prototype = {
    setToken: PropTypes.func.isRequired
}