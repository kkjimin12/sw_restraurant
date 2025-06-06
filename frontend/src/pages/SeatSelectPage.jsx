import React from 'react';
import {useLocation} from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import SeatSelection from '../components/SeatSelection';
import '../styles/SeatSelectedPage.css'

const SeatSelectedPage = () => {

    const currentPage = useLocation();
    const {date, time} = currentPage.state || {};

    return (
        <div>
            <div className='main'>
                <div className='main-content'>
                    <h2 className='main-title'>Reservation</h2>                 
                    <section className='main-step'>
                        <StepIndicator currentPage = {currentPage.pathname}/>
                        {/* <p>단계 표시 자리</p> */}
                    </section>
                    <section className='main-seat'>
                        <SeatSelection date = {date} time = {time}/>
                        {/* <p>좌석 선택 표시 자리</p> */}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default SeatSelectedPage;