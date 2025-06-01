import { useState ,useEffect} from 'react';
// import { getReservations, updateReservations } from '../components/ReservationData';
import '../styles/ReservationCancelPage.css';

const ReservationCancelPage = () => {
    const [reservations, setReservations] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservations = async() => {
            const userId = localStorage.getItem("user_id");
            try{
                const response = await fetch(`http://localhost:5000/api/cancel?user_id=${userId}`);
                const data = await response.json();
                if(data.success){
                    setReservations(data.reservations);
                }
            }catch(e){
                setError("서버 오류가 발생했습니다.");
                console.error(e);
            }
        };
        fetchReservations();
    },[]);

    const handleCancel = async (reservation) => {
        // 예약 날짜
        const dateStr = reservation.date;
        const year = parseInt(dateStr.split('년')[0]);
        const month = parseInt(dateStr.split('년')[1].split('월')[0]) - 1;
        const day = parseInt(dateStr.split('월')[1].split('일')[0]);
        const reservationDate = new Date(year, month, day);
        
        // 오늘 날짜
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (reservationDate > today) {
            // const updatedReservations = reservations.filter(res => 
            //     res.reserver !== reservation.reserver || 
            //     res.date !== reservation.date || 
            //     res.time !== reservation.time
            // );
            // setReservations(updatedReservations);
            // updateReservations(updatedReservations);  // ReservationPage의 reservations도 업데이트
            // setShowPopup(true);
            try{
                const response = await fetch(`http://localhost:5000/api/cancel/${reservation.id}`,{
                    method:"DELETE"
                });
                const data = await response.json();
                if(data.success){
                    const updatedReservations = reservations.filter(r => r.id !== reservation.id);
                    setReservations(updatedReservations);
                    setShowPopup(true);
                }else{
                    setError(data.message || "취소 실패")
                }
            }catch(e){
                setError("서버 오류가 발생했습니다.");
                console.error(e);
            }
        }
    };

    return (
        <div className="cancel-page">
            <div className="cancel-container">
                <h2>예약 조회 및 취소</h2>
                <div className="reservation-list">
                    {reservations.map((reservation, index) => (
                        <div key={index} className="reservation-item">
                            <div className="reservation-info">
                                <p>예약자: {reservation.reserver}</p>
                                <p>전화번호: {reservation.phoneNumber}</p>
                                <p>날짜: {reservation.date}</p>
                                <p>시간: {reservation.time}</p>
                                <p>테이블: {reservation.tableNumber}</p>
                                <p>인원: {reservation.people}</p>
                            </div>
                            <div className="cancel-section">
                                <p className="cancel-notice">예약은 하루 전에만 취소가 가능합니다. 정말로 취소하시겠습니까?</p>
                                {error && <div>{error}</div>}
                                <button 
                                    className="cancel-button"
                                    onClick={() => handleCancel(reservation)}
                                >
                                    Cancel Reservation
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>예약이 정상적으로 취소되었습니다.</p>
                        <button onClick={() => setShowPopup(false)}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReservationCancelPage;