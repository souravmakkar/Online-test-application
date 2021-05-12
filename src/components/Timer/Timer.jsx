import React,{ useContext } from 'react'
import './Timer.css';
// import {EXAM_TIME} from '../../utilities/constants';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../utilities/ThemeManager';

/**
 * Timer component is used to render the timer on the page 
 * @param {Function} submitTest - It is used to submit the test after the times up for a test
 * @param {number} quizTime - It is an time for an quiz
 * @param {boolean} timesUp - It is an bbolean property which is set to true when the time is up
 * @returns 
 */

const Timer = ({timesUp,submitTest,quizTime}) => {
		const {darkTheme} = useContext(ThemeContext);
		let minutes = Math.floor(quizTime / 60);
		let seconds = quizTime % 60;
		minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
		seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds
	
		const finishTime=()=>{
			submitTest();
		}

		if (seconds === 0 && minutes === 0) {
			finishTime();
		} 
		else if(quizTime < 0 && timesUp){
			finishTime();
		}
    return (
        <div className={`timer-container ${darkTheme ?'night':''}`}>
        { timesUp
            ? ''
            : <h1> {minutes}:{seconds}</h1> 
        }
        </div>
    )
}
Timer.propTypes={
	timesUp:PropTypes.bool.isRequired,
	submitTest:PropTypes.func.isRequired,
	quizTime:PropTypes.number.isRequired
}

export default Timer;


