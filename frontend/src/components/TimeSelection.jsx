import React from 'react';
import '../styles/TimeSelection.css';
import '../styles/time.css';
import { MdKeyboardArrowLeft} from 'react-icons/md';
const TimeSelection = ({ selectedTime, onTimeSelect, onBack}) => {
    
    const times = [
        { label: '점심', values: ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'] },
        { label: '저녁', values: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'] }
    ];
    
    return(
        <div className="time-box">
            <div className="timepick-ui">
                <div className="timepick-header">
                    <button className='gotoCalendar' onClick={onBack}><MdKeyboardArrowLeft size={30}/></button>
                    <span>시간</span>
                    <button className='nop'><MdKeyboardArrowLeft size={30} color="#4285F4" /></button>
                </div>
                <ul className="timelist">
                    {times.map((section, idx) => (
                        <React.Fragment key = {idx}>
                            <li className='Time'>{section.label}</li>
                            {section.values.map((time) => (
                                <li 
                                    key={time}
                                    className={selectedTime === time ? 'selected' : ''}
                                    onClick = {() => onTimeSelect(selectedTime === time ? null : time)}
                                >
                                    {time}
                                </li>
                            ))}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TimeSelection;