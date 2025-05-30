
// 샘플 데이터
const sampleReservation = {
    reserver: '홍길동',
    phoneNumber: '010-1234-5678',
    date: '2025년 6월 22일',
    time: '저녁 19시 30분',
    table: '03 테이블',
    people: '3명'
};

let reservations = [sampleReservation];

const addReservation = (newReservation) => {
    reservations = [...reservations, newReservation];
};

const getReservations = () => {
    return reservations;
};

const updateReservations = (updatedReservations) => {
    reservations = updatedReservations;
};

export { addReservation, getReservations, updateReservations, sampleReservation };