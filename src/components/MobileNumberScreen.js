import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../CustomHook/useInput';
import InputField from '../ReusableComponent/InputField';
import './MobileNumberScreen.css';

const MobileNumberScreen = () => {
    const [mobileNumber, setMobileNumber] = useInput('');
    const navigate = useNavigate();

    const handleMobileNumberSubmit = (e) => {
        e.preventDefault();
        if (mobileNumber.length === 0) {
            alert('Enter your mobile number');
            return;
        }
        const isValidNumber = /^\d+$/.test(mobileNumber);
        if (!isValidNumber) {
            alert('Invalid mobile number. Please enter numbers only.');
            return;
        }
        if (mobileNumber.length < 10) {
            alert('Mobile number should have at least 10 characters');
            return;
        }
        navigate('/otp');
    };

    return (
        <div className="mobile-number-screen">
            <form onSubmit={handleMobileNumberSubmit}>
                <h1 className="enter-mobile-text">Mobile Number</h1>
                <InputField
                    type="text"
                    value={mobileNumber}
                    onChange={setMobileNumber}
                    placeholder="Enter your mobile number"
                    className="input-field"
                />
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MobileNumberScreen;
