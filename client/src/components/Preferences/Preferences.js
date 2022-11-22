import React from 'react';

// async function registerUser(credentials) {
//     return fetch('http://localhost:9000/api/create', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//     .then(data => data.json())
//     .catch((err) => console.error(err))
// }

export default function Preferences() {
    // const [username, setUsername] = useState();
    // const [password, setPassword] = useState();

    // const handleSubmit = async (e) => {
    //     console.log('criou')
    //     e.preventDefault();
    //     await registerUser({
    //         username,
    //         password
    //     });
        
    // }

    return(
        // <FormRegister handleSubmit={handleSubmit} setUsername={setUsername} setPassword={setPassword}/>
        <h2>Preferences</h2>
    )
}