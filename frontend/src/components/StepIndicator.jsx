import '../styles/StepIndicator.css';
const StepIndicator = ({currentPage}) => {
    return(
        <ul className="step">
            <li className={currentPage === '/date_reservation' ? 'thispage stepItem':'stepItem'}>날짜/시간 선택</li>
            <li className={currentPage === '/seat_reservation' ? 'thispage stepItem':'stepItem'}>좌석선택</li>
            <li className={currentPage === '/information_input' ? 'thispage stepItem':'stepItem'}>정보입력</li>
        </ul>
        
    );
};

export default StepIndicator;