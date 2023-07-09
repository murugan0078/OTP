import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../CustomHook/useInput';
import InputField from '../ReusableComponent/InputField';
import './SignUp.css';

function SignUp() {
    const [name, setName] = useInput('');
    const [email, setEmail] = useInput('');
    const [address, setAddress] = useInput('');
    const [dob, setDob] = useInput('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !address || !dob) {
            alert('Please fill in all fields');
            return;
        }
        navigate('/dashboard');
    };

    return (
        <div className="container">
            <h1 className="heading">SignUp</h1>
            <form onSubmit={handleSubmit} className="form">
                <InputField
                    type="text"
                    value={name}
                    onChange={setName}
                    placeholder="Enter your name"
                    className="input"
                />
                <InputField
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter your email"
                    className="input"
                />
                <InputField
                    type="text"
                    value={address}
                    onChange={setAddress}
                    placeholder="Enter your address"
                    className="input"
                />
                <InputField
                    type="date"
                    value={dob}
                    onChange={setDob}
                    placeholder="Enter your date of birth"
                    className="input"
                />
                <button type="submit" className="button">
                    SignUp
                </button>
            </form>
        </div>
    );
}

export default SignUp;
