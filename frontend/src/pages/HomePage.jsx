import '../styles/HomePage.css'

const HomePage = () => {
    return (
        <div className="home">
            <div className="home-left">
                <h1 className="home-phrase-main">DGK Dining</h1>
                <h6 className="home-phrase-sub">당신의 마지막 학기, 단 하나의 테이블을 위하여</h6>
            </div>
            <div className='home-right'>
                <p>
                    DGK Dining은 동국대학교(Dongguk)의 약자인 DGK를 바탕으로 직접 기획한 고급 양식 레스토랑 예약 시스템입니다.
                    <br/> 검은 정적 속, 붉은 와인 한 잔의 깊이를 닮은 이 공간은 단순한 식사가 아닌, 기억에 남을 경험을 예약하는 곳입니다.
                    <br/>저희는 ‘예약’이라는 행위를 단순한 선택이 아닌 한 끼의 예술, 한 번의 만남, 한 학기의 결실로 디자인하고자 했습니다.
                    <br/>지금, DGK Dining에서 당신의 마지막 학기를 빛낼 단 하나의 테이블을 선택하세요.
                </p>
            </div>
        </div>
    );
};

export default HomePage;