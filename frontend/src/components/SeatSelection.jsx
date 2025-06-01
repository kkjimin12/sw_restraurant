import TableGrid from '../components/TableGrid'
import '../styles/SeatSelection.css';

const SeatSelection = ({date, time}) => {
    const formatDate = (dateStr) =>{
        if(!dateStr) return '날짜 없음';
        const cleaned = dateStr.replace(/\$/g,'');
        const [year, month, day] = cleaned.split('-');
        return `${year}년 ${parseInt(month)}월 ${day}일`;
    };

    const formatTime = (timeStr) => {
        if(!timeStr) return '';
        const [hour, min] = timeStr.split(':');
        const period = parseInt(hour) < 16 ? '점심' : '저녁';
        if(parseInt(min) === 0)
            return `${period} ${parseInt(hour)}시`;
        else    
            return `${period} ${parseInt(hour)}시 ${parseInt(min)}분`;
    };

    return(
        <div>
            <div className='selecteddatetime'>{formatDate(date)} {formatTime(time)}</div>
            <ul className='seatselectBox'>
                <li className='window'>window</li>
                <li className='floor'>
                    <TableGrid date={formatDate(date)} time={formatTime(time)}/>
                    <div className='door'></div>
                </li>
                <li className='kitchen'>kitchen</li>
            </ul>
        </div>
    );
};

export default SeatSelection;