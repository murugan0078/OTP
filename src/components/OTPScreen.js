import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../ReusableComponent/InputField';
import './OTPScreen.css';

function OTPScreen() {
    const [otp, setOTP] = useState(['']);
    const [timer, setTimer] = useState(15);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [canResendOTP, setCanResendOTP] = useState(false);
    const [isResendOTP, setIsResendOTP] = useState(false);
    const navigate = useNavigate();
    const OTPArray = ['1234'];
    const resendOTPArray = ['5678'];

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0 && isTimerRunning) {
                setTimer((prevTimer) => prevTimer - 1);
            } else {
                setIsTimerRunning(false);
                setCanResendOTP(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, isTimerRunning]);


    useEffect(() => {
        const storedOTP = localStorage.getItem('otp');
        const storedResendOTP = localStorage.getItem('resendOTP');
        if (storedOTP) {
            setOTP(JSON.parse(storedOTP));
        }
        if (storedResendOTP) {
            setIsResendOTP(JSON.parse(storedResendOTP));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('otp', JSON.stringify(otp));
    }, [otp]);

    useEffect(() => {
        localStorage.setItem('resendOTP', JSON.stringify(isResendOTP));
    }, [isResendOTP]);

    const handleOTPSubmit = (e) => {
        e.preventDefault();
        const enteredOTP = otp.join('');
        const signupOTP = '5768';

        if (enteredOTP.length === 0) {
            alert('Please enter the OTP');
            return;
        }

        if (enteredOTP.length !== 4) {
            alert('Invalid OTP. OTP must be exactly 4 digits');
            return;
        }
        if (enteredOTP === signupOTP) {
            navigate('/signup');
            return;
        }

        if (!isResendOTP && OTPArray.includes(enteredOTP)) {
            const registeredUser = getUserByOTP(enteredOTP);
            const { username, password } = registeredUser;
            navigate(`/Signin?username=${username}&password=${password}`);
        } else if (isResendOTP && resendOTPArray.includes(enteredOTP)) {
            navigate('/Signin');
        } else {
            alert("Enter Valid OTP");
        }
    };

    const getUserByOTP = (enteredOTP) => {
        const registeredUsers = [
            { username: 'user1', password: 'password1', otp: '1234' },
            { username: 'user2', password: 'password2', otp: '5678' },
        ];

        return registeredUsers.find((user) => user.otp === enteredOTP);
    };

    const handleResendOTP = () => {
        setTimer(15);
        setIsTimerRunning(true);
        setCanResendOTP(false);
        setIsResendOTP(true);
        setOTP(['']);
        localStorage.removeItem('otp');
        localStorage.setItem('resendOTP', JSON.stringify(true));
    };

    const handleOTPDigitChange = (index, value) => {
        const updatedOTP = [...otp];
        updatedOTP[index] = value;
        setOTP(updatedOTP);
    };

    return (
        <div className="otp-screen">
            <h1>OTP Verification</h1>
            <p>Time Remaining: {timer} seconds</p>
            <form onSubmit={handleOTPSubmit}>
                <div className="otp-input-container">
                    {otp.map((digit, index) => (
                        <InputField
                            key={index}
                            type="text"
                            value={digit}
                            onChange={(e) => handleOTPDigitChange(index, e.target.value)}
                        />
                    ))}
                </div>
                <button type="submit">Submit OTP</button>
            </form>
            {canResendOTP && !isResendOTP && (
                <button onClick={handleResendOTP}>Resend OTP</button>
            )}
        </div>
    );
}

export default OTPScreen;
