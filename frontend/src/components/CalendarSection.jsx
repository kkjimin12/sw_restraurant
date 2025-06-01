import { useEffect, useMemo, useState } from 'react';
import '../styles/CalendarSection.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
const CalendarSection = ({onDateSelect}) => {

    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [days, setDays] = useState([]);
    const today = useMemo(() => new Date(),[]);
    const endDate = new Date();

    endDate.setMonth(today.getMonth() +1);

    useEffect(() => {
        setYear(today.getFullYear());
        setMonth(today.getMonth());
    },[today]);

    useEffect(() => {
        if (year === 0) return;

        const firstDay = new Date(year,month,1).getDay(); //요일
        const lastDate = new Date(year, month+1,0).getDate();
        const temp = [];

        let week = Array(firstDay).fill(null);

        for(let day = 1; day <= lastDate; day++){
            week.push(day);
            if(week.length === 7){
                temp.push(week);
                week = [];
            }
        }

        if (week.length >0){
            while(week.length <7) week.push(null);
            temp.push(week);
        }

        setDays(temp);
    }, [year,month]);

    const handleDateClick = (day) => {
        if(!day) return;
        const clickedDate = new Date(year,month,day);

        if(clickedDate < today || clickedDate >endDate) return;
        const selected = `${year}-${String(month +1).padStart(2,'0')}-$${String(day).padStart(2,'0')}`;
        onDateSelect(selected);
    }
    return(
        <div className="calendarBox">
            <div className="datepick-ui">
                <div className="datepick-header">
                    <button 
                        className="change-month"
                        onClick={() => setMonth((prev) => (prev === 0?11:prev-1))}
                    ><MdKeyboardArrowLeft size={30}/></button>
                    <span className="current-month">{year}년 {month+1}월</span>
                    <button 
                        className="change-month"
                        onClick={() => setMonth((prev) => (prev === 0?11:prev+1))}
                    ><MdKeyboardArrowRight size={30}/></button>
                </div>
                <table className="datepick-date">
                    <thead>
                        <tr>
                            <th>일</th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                            <th>토</th>
                        </tr>
                    </thead>
                    <tbody>
                        {days.map((week,i) => (
                            <tr key={i}>
                                {week.map((day,j) => (
                                    <td
                                        key={j}
                                        onClick={() => handleDateClick(day)}
                                        className={
                                            !day
                                                ? 'empty'
                                                : new Date(year,month,day) < today || new Date(year,month,day)>endDate
                                                ? 'disabled'
                                                : ''
                                        }
                                    >
                                        {day || ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CalendarSection;