import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getAccounts } from '../components/AccountData';
import '../styles/LoginPage.css'

const LoginPage = ({ onLoginStateChange }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const accounts = getAccounts();
        // if (accounts.find(account => account.username === username && account.password === password)) {
        //     onLoginStateChange(true);
        //     navigate('/');
        // }
        try{
            const response = await fetch("http://localhost:5000/api/login", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username,password}),
            });

            const data = await response.json();

            if(response.ok && data.success){
                localStorage.setItem('isLoggedIn',"true");
                localStorage.setItem('user_id',data.user_id);
                onLoginStateChange(true);
                navigate('/');
            }else{
                setError(data.message || "로그인 실패");
            }
        }catch(e){
            setError("서버 오류가 발생했습니다.");
            console.error(e);
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
                    {error && <div>{error}</div>}
                    <button type="submit" className='login-button'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;