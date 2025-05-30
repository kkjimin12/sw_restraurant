import { useState } from 'react';
import { addAccount } from '../components/AccountData';
import '../styles/SignUpPage.css'

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        addAccount({ username, email, password });
        setShowPopup(true);
    };

    return (
        <div className="signup">
            <div className="signup-image"></div>
            <div className="signup-content">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} className="signup-form">
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
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            {showPopup && (
                <div className="popup">
                    <p>회원가입이 완료되었습니다</p>
                    <button onClick={() => setShowPopup(false)}>확인</button>
                </div>
            )}
        </div>
    );
};

export default SignUpPage;