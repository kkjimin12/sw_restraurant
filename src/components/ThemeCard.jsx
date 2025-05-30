import {useLocation} from 'react-router-dom';
import '../styles/ThemeCard.css'

const ThemeCard = () => {
    const currentPage = useLocation();
    const {number, seatCount} = currentPage.state || {};
    console.log("ThemeCard number:", number, typeof number);
    return(
        <div className="themecard">
            <div className="img">
                {currentPage.pathname ==='/date_reservation' ? (
                    <img src="/pasta.jpg" alt="pasta" />
                ):(
                    <img src="/wine.jpg" alt="wine" />
                )}
            </div>
            <div>
                {currentPage.pathname === '/date_reservation' ? (
                    <p className='datepage_theme'><span>About Us</span><br />전통과 현대가 조화롭게 어우러지는 프렌치 파인 다이닝 레스토랑입니다.
                    계절마다 바뀌는 제철 식재료를 사용하여, 자연이 주는 풍미를 그대로 담아냅니다. 모든 메뉴는 와인과의 궁합까지 섬세하게 설계되어 있습니다.
                    고풍스러운 인테리어와 은은한 조명, 클래식 음악이 흐르는 공간은 마치 유럽의 작은 레스토랑에 온 듯한 분위기를 자아냅니다.
                    진심이 담긴 서비스와 최고의 요리로, 여러분을 맞이하겠습니다.</p>
                ):(
                    <p className='inputpage_theme'>
                        저희 레스토랑을 찾아주셔서 감사합니다. <br /><br />
                        저희는 고객 한 분 한 분께 최고의 다이닝 경험을 선사하기 위해 전 좌석 사전 예약제로 운영되고 있습니다.
                        예약하신 시간 기준으로 최소 <strong>10분 전까지 도착</strong>해주시기를 부탁드립니다. 정시 이후 도착 시, 예약은 자동으로 취소될 수 있으며 좌석 제공이 어려울 수 있습니다.<br /><br />
                        예약이 완료되면 확인 팝업이 표시되며, 해당 내용은 마이페이지 또는 예약 조회 메뉴를 통해 언제든지 확인하실 수 있습니다.
                        부득이하게 예약을 변경하거나 취소하실 경우, <strong>방문 하루 전까지</strong> 온라인으로 처리하실 수 있습니다. <br /><br />
                        현재 선택하신 좌석은 <span>{typeof number === 'object' ? number?.number : number} 테이블</span>입니다. <br />
                        해당 테이블은 기본 {seatCount}석으로 최대 {seatCount+2}인 까지 수용이 가능합니다. <br /><br />
                        저희는 오로지 예약 고객만을 위한 프라이빗한 공간으로, 고요하고 정제된 분위기 속에서 깊이 있는 식사를 즐기실 수 있습니다.
                        특별한 날, 품격 있는 시간을 위해 정성껏 준비하고 기다리겠습니다.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ThemeCard;