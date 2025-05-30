import '../styles/Header.css';
const Header = () => {
    return(
        <header className="header">
            <nav className='header-nav'>
                <div className='header-logo'>LOGO</div>
                <div className='header-profile'>profile</div>
                <div className='header-login'>Log In</div>
                <div className='header-signup'>Sign Up</div>
            </nav>
            <div className="header-cancel">
                예약 조회 및 취소
            </div>
        </header>
    );
};

export default Header;