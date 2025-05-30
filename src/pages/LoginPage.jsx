import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccounts } from '../components/AccountData';
import '../styles/LoginPage.css'

const LoginPage = ({ onLoginStateChange }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const accounts = getAccounts();
        if (accounts.find(account => account.username === username && account.password === password)) {
            onLoginStateChange(true);
            navigate('/');
        }
    };

    return (
        <div className="login">
            <div className="login-image"></div>
            <div className="login-content">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Username:</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;