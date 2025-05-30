import { useState } from 'react';
import { addReservation } from './ReservationData';
import '../styles/App.css';

const Inputform = ({number, seatCount, date, time}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [cardNumber, setCardNumber] = useState(0);
    const [guest, setGuest] = useState(seatCount);

    const handleClick = () => {
        const reservationData = {
            reserver: name,
            phoneNumber: `010-${phone2}-${phone3}`,
            date: date,
            time: time,
            table: `${number} 테이블`,
            people: `${guest}명`
        };

        addReservation(reservationData);
        setIsPopupOpen(true);
    };

    const handleClose = () => {
        setIsPopupOpen(false);
    }

    return(
        <div className='Inputform'>
            <div className="Inputform_name">
                <div className='inputform_left'>이름</div>
                <div className="inputform_right">
                    <input type="text" name='name' placeholder='이름을 입력해주세요' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <div className="Inputform_phone">
                <div className='inputform_left'>연락처</div>
                <div className="inputform_right">
                    <input type="number" name='phone1' defaultValue='010' />
                    -
                    <input type="number" name='phone2' placeholder='0000' max={9999} value={phone2} onChange={(e) => setPhone2(e.target.value)}/>
                    -
                    <input type="number" name='phone3' placeholder='0000' max={9999} value={phone3} onChange={(e) => setPhone3((e.target.value))}/>
                </div>
            </div>
            <div className="Inputform_card">
                <div className='inputform_left'>카드번호</div>
                <div className="inputform_right">
                    <input type="number" name='cardnumber' placeholder='카드 번호를 입력해주세요' value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                </div>
            </div>
            <div className="Inputform_guest">
                <div className='inputform_left'>인원</div>
                <div className="inputform_right">
                    <select name="person" id="person" value={guest} onChange={(e) => setGuest(e.target.value)}>
                        {Array.from({length:3},(_,i) => seatCount + i).map((count) => (
                            <option key={count} value={count}>
                                {count}명
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button className='gotoSeatSelcet' onClick={handleClick} disabled = {!name || !cardNumber || !guest || !phone2 || !phone3}>
                확인
            </button>
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup_header">
                        <p>예약이 완료되었습니다.</p>
                        <i className="popup-close" onClick={handleClose}>❌</i>
                    </div>
                    <div className="popup_content">
                        <div className="popup_resturant">레스토랑 이름</div>
                        <div className="popup_confrim">
                        <div className="popup_name">
                                <div>예약자 :</div>
                                <div>{name}</div>
                            </div>
                            <div className="popup_name">
                                <div>전화번호 :</div>
                                <div>010-{phone2}-{phone3}</div>
                            </div>
                            <div className="popup_date">
                                <div>날짜 / 시간 :</div>
                                <div>{date} / {time}</div>
                            </div>
                            <div className="popup_table">
                                <div>테이블 / 인원 :</div>
                                <div> {number} 테이블 / {guest}명</div>
                            </div>
                        </div>
                        <div className="popup_price">
                            <p>총 결제 금액</p>
                            <p>
                                {(guest * 15000).toLocaleString()}원
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inputform;