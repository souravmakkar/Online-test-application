import React,{useState,useEffect,useRef} from 'react';
import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
import { getCountOfCorrectAnswers,countOfAttemptedQuestions } from '../../utilities/services/questionsService';
import {cleanSession,getUserInfo} from '../../utilities/services/authService';
import MemoizedHeader from '../header/header';

import './TestReport.css';
import Confetti from 'react-confetti';

function TestReport({ location}) {

	const[showConfetti,setShowConfetti] = useState(false);
	const [testDetails,setTestDetails]= useState({});
	const [downloadFile,setDownloadFile] = useState();
	const width='1500px';
	const height='900px';
	const confettiRef = useRef(null);
  const history = useHistory();
  const allQuestions = location.state['questionState'];

	const dummyDetails = {
		score:0,
		numberOfQuestions:0,
		numberOfAttemptedQuestion:0,
		numberOfUnansweredQuestion:0,
		correctAnswers:0,
		partiallyCorrectAnswers:0,
		incorrectAnswers:0,
		remark:'',
	};

	const testAgain=()=>{
     cleanSession();
		history.replace('/register')

	}

	useEffect(()=>{
		dummyDetails['registrationDetails'] = getUserInfo();
		dummyDetails['numberOfAttemptedQuestion'] = countOfAttemptedQuestions(allQuestions);
		dummyDetails['numberOfQuestions'] = allQuestions.length;

	dummyDetails["userResponse"] = allQuestions.map((question)=>{
		const answerDetails = getCountOfCorrectAnswers(question);
			if(answerDetails.status ==='Correct'){
				dummyDetails['correctAnswers']++;
				}

			else if(answerDetails.status==='Partial-Correct'){
				dummyDetails['partiallyCorrectAnswers']++;
			}	 
			else{
				dummyDetails['incorrectAnswers']++;
			}
			dummyDetails['score'] = dummyDetails['score'] + answerDetails['score'];

			return{
				Question: question["title"],
        "Your-Answers": answerDetails.userAnswers,
        "Correct-Answers": answerDetails.correctAnswers,
        Status: answerDetails.status,
        Score: answerDetails.score,
			}
	});

	if(dummyDetails['score'] <= dummyDetails['numberOfQuestions']/2){
    dummyDetails['remark']= 'You need more practice!';
	}
	else if(dummyDetails['score'] > dummyDetails['numberOfQuestions']/2 && dummyDetails['score'] <= dummyDetails['numberOfQuestions']-1){
		dummyDetails['remark'] = 'You can do better!';
		setShowConfetti(true);

	}
	else{
		dummyDetails['remark'] = 'You done great job!';
		setShowConfetti(true);
	}
	setTestDetails(dummyDetails);
	const content =JSON.stringify(dummyDetails);
	const file = new Blob([content], { type: "application/json" });
	const blobUrl = URL.createObjectURL(file);
	setDownloadFile(blobUrl)

	return ()=>{
		URL.revokeObjectURL(blobUrl)
	};

},[])

	return (
		<div>
		<MemoizedHeader/>
			{
				showConfetti &&
				(
				<div className='confetti-wrapper'ref={confettiRef} >
					<Confetti
					numberOfPieces={600}
					recycle={false}
					width={width}
					height={height}
					tweenDuration	={3000}
					/>
				</div>
				)
				}
			<div className='test-report-details'>
				<h1 className='heading'>Test Result</h1>
				<h1 className='remark'>{testDetails['remark']}</h1>
				<h1 className='score'>Score is :{testDetails['score']}</h1>
				<ul>
					<li>
						<p>Total number of questions :</p><span>{testDetails['numberOfQuestions']}</span></li>
					<li><p>Number of Attempted questions :</p><span>{testDetails['numberOfAttemptedQuestion']}</span></li>
					<li><p>Number of Correct answers :</p><span>{testDetails['correctAnswers']}</span></li>
					<li><p>Number of Incorrect answers :</p><span>{testDetails['incorrectAnswers']}</span></li>
					<li><p>Number of Partially correct answers :</p><span>{testDetails['partiallyCorrectAnswers']}</span></li> 
				</ul>
         <div className='button-container'>
					<a className='btn btn-small' 
					href={downloadFile} 
					download={"TestResult.json"} 
					rel="noreferrer" 
					target="_blank"
					> Download Test</a>
					<button className='btn btn-danger' onClick={testAgain}>Take Test</button>
				</div>
		</div>	
	</div>	
	)
}

TestReport.propTypes = {
	location:PropTypes.shape({
	state:PropTypes.shape({
		questionState:PropTypes.array.isRequired
	})
}).isRequired,
}

export default TestReport
