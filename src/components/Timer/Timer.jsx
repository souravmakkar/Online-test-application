import React,{ useState, useEffect } from 'react'
import './Timer.css';
import {EXAM_TIME} from '../../utilities/constants';
import PropTypes from 'prop-types';

/**
 * Timer component is used to render the timer on the page 
 * @param {Function} submitTest - It is used to submit the test after the times up for a test
 * @returns 
 */

const Timer = ({timesUp,submitTest}) => {
    const [ minutes, setMinutes ] = useState(EXAM_TIME);
    const [seconds, setSeconds ] =  useState(0);
		let interval =null;

		const startTimer=()=>{
			if (seconds > 0) {
				setSeconds(seconds - 1);
		}
		if (seconds === 0) {
			if (minutes === 0) {
					finishTime();
				} 
				else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
		}
}

		const finishTime=()=>{
			clearInterval(interval);
			submitTest();
		}
    useEffect(()=>{
     interval = setInterval(() => {
           startTimer(); 
        }, 1000)
        return ()=> {
            clearInterval(interval);
          };
    });

    return (
        <div className='timer-container'>
        { timesUp
            ? ''
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}
Timer.propTypes={
	timesUp:PropTypes.bool.isRequired,
	setTimesUp:PropTypes.func,
	submitTest:PropTypes.func
}

export default Timer;


