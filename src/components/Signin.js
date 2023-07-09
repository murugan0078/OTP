import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../CustomHook/useInput';
import InputField from '../ReusableComponent/InputField';
import './Signin.css';

const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useInput('');
    const [password, setPassword] = useInput('');
    const [error, setError] = React.useState('');

    const registeredUsers = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        const user = registeredUsers.find(
            (user) => user.username === username && user.password === password
        );
        if (user) {
            navigate('/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container">
            <h1 className="heading">Signin</h1>
            <form onSubmit={handleLogin} className="form">
                <InputField
                    type="text"
                    value={username}
                    onChange={setUsername}
                    placeholder="Username"
                    className="input"
                />
                <InputField
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Password"
                    className="input"
                />
                <button type="submit" className="button">
                    Signin
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Signin;
