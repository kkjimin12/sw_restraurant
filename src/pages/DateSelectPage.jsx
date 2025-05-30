import React, {useEffect, useState} from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import Header from '../components/Header';
import ThemeCard from '../components/ThemeCard';
import CalendarSection from '../components/CalendarSection';
import TimeSelection from '../components/TimeSelection';
import StepIndicator from '../components/StepIndicator';
import Footer from '../components/Footer';
import '../styles/DateSelectPage.css'

const DateSelectPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const currentPage = useLocation();
    const navigator = useNavigate();

    useEffect(() => {
        if(selectedDate){
            console.log('👉 currentStep을 2로 바꿈');
            setCurrentStep(2);
        }
    }, [selectedDate]);

    const handleConfirm = () => {
        if(selectedDate && selectedTime){
            navigator('/seat_reservation',{
                state:{
                    date: selectedDate,
                    time: selectedTime
                }
            });
        }
    };

    return (
        <div>
            <div className='main'>
                <div className='main-content'>
                    <h2 className='main-title'>Reservation</h2>                 
                    <section className='main-step'>
                        <StepIndicator currentPage = {currentPage.pathname}/>
                        {/* <p>단계 표시 자리</p> */}
                    </section>
                    <section className='main-explain'>
                        <ThemeCard/>
                        {/* <p>레스토랑 소개 공간</p> */}
                    </section>
                    <section className='main-date-time'>
                        {currentStep === 1 ?(
                            <CalendarSection 
                            //selectedDate = {selectedDate}
                            onDateSelect={setSelectedDate}
                            />
                            //<p>캘린더</p>
                        ):(
                            <TimeSelection selectedTime = {selectedTime}
                            onTimeSelect={setSelectedTime}
                            selectedDate = {selectedDate}
                            onBack={() => setCurrentStep(1)} //뒤로가기
                            />
                            //<p>시간</p>
                        )}
                        <button
                            onClick={handleConfirm}
                            disabled={!selectedDate || !selectedTime}
                            className='gotoSeatSelcet'
                        >
                            다음
                        </button>
                    </section>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default DateSelectPage;