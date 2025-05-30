import { useNavigate } from "react-router-dom";


const TableGroup = ({ type = 'four', number = '01' ,date ,time}) => {
    const seatCount = {
        two: 2,
        four: 4,
        six: 6,
    }[type];

    const navigator = useNavigate();
    const handleConfirm = () => {
        navigator('/information_input',{
            state:{
                number: typeof number === 'object' ? number.number : number,
                seatCount,
                date: date,
                time: time
            }
        });
    };

    const seatElements = new Array(seatCount).fill(0).map((_, i) => <div key={i} className="seat"></div>);

    // 가운데 테이블 삽입
    const centerIndex = Math.floor(seatElements.length / 2);
    seatElements.splice(centerIndex, 0,
        <div key="table" className="table" onClick={handleConfirm}>
            {number}<br /><span></span>
        </div>
    );

    return <div className={`tableGroup ${type}`}>{seatElements}</div>;
};

export default TableGroup;
