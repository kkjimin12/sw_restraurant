import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css'

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const nav = useNavigate();

    const handleLogin = () =>{
        setShowPopup(false);
        nav('/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameError('');
        setEmailError('');
        setPasswordError('');

        let hasError = false;

        // Username 중복 체크
        const usernameCheck = await fetch("http://localhost:5000/api/check-username", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        });
        const usernameData = await usernameCheck.json();
        
        if (!usernameData.available) {
            setUsernameError("이미 사용 중인 사용자 이름입니다.");
            hasError = true;
        }

        // 이메일 중복 체크
        const emailCheck = await fetch("http://localhost:5000/api/check-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const emailData = await emailCheck.json();

        if (!emailData.available) {
            setEmailError("이미 사용 중인 이메일입니다.");
            hasError = true;
        }
        
        // 비밀번호 길이 체크
        if (password.length < 6) {
            setPasswordError("비밀번호는 6자 이상이어야 합니다.");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        // 회원가입
        const response = await fetch("http://localhost:5000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            setShowPopup(true);
            setUsername('');
            setEmail('');
            setPassword('');
        } else {
            setUsernameError(data.message || "회원가입에 실패했습니다.");
        }
    };

    return (
        <div className="signup">
            <div className="signup-image"></div>
            <div className="signup-content">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                         {usernameError && <div className="error-message">{usernameError}</div>}
                    </div>
                    <div className="form">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {emailError && <div className="error-message">{emailError}</div>}
                    </div>
                    <div className="form">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && <div className="error-message">{passwordError}</div>}
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            {showPopup && (
                <div className="popup">
                    <p>회원가입이 완료되었습니다</p>
                    <button onClick={handleLogin}>확인</button>
                </div>
            )}
        </div>
    );
};

export default SignUpPage;