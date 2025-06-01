import React from 'react';
import {useLocation} from 'react-router-dom';
import Footer from '../components/Footer';
import StepIndicator from '../components/StepIndicator';
import ThemeCard from '../components/ThemeCard';
import Inputform from '../components/Inputform';
import '../styles/InformationInputPage.css'

const SeatSelectedPage = () => {
    const currentPage = useLocation();
    const {number, seatCount, date, time} = currentPage.state || {};

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
                        <ThemeCard number = {number} seatCount={seatCount}/>
                        {/* <p>레스토랑 소개 공간</p> */}
                    </section>
                    <section className='main-date-time'>
                        <Inputform number={number} seatCount={seatCount} date = {date} time={time}/>
                    </section>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SeatSelectedPage;