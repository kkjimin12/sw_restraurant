import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'

const LoginPage = ({ onLoginStateChange }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
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
                setError('사용자 이름이나 비밀번호가 틀립니다.');
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
                    <div className="form">
                        <label>Username:</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className='login-button'>Login</button>
                </form>
            </div>
        </div>
    );
}
export default LoginPage;