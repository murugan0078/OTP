import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MobileNumberScreen from './components/MobileNumberScreen';
import OTPScreen from './components/OTPScreen';
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import Signin from './components/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MobileNumberScreen />} />
        <Route path="/otp" element={<OTPScreen />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
