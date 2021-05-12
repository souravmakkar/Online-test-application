import React,{useState,useEffect,useContext} from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SingleQuestion from '../singleQuestion/question'
import { getQuestionsByLevel , countOfAttemptedQuestions,storeQuestionState,getUpdatedQuestionState, removeQuestionState, getUpdatedCurrentQues } from '../../utilities/services/questionsService'; 
import { saveTestState,getSelectedLevel} from '../../utilities/services/authService';
import Timer from '../Timer/Timer';
import { ThemeContext } from '../../utilities/ThemeManager';

import './onlineTest.css';
import Toggle from '../Toggle/Toggle';

/**
 * OnlineTest is used to represent the test page in which users see's the questions according to the level that
 * user chooses and the timer that is running for the test and also contains the part of setting the state of 
 * an particular question by selecting an particular option or not. 
 * @param {Object} history -  In which the history object has a method which is used to send the state to ano
 * ther page 
 * 
 */

function onlineTest({history}) {
	const [questionsList,setQuestionsList] = useState([]);
	const [updatedQuestion,setUpdatedQuestion] = useState([]);
  const [currentQues, setCurrentQues] = useState(0);
	const[timesUp,setTimesUp] = useState(false);
	const {darkTheme} = useContext(ThemeContext);
	const[quizTime,setQuizTime] = useState(600);
	let interval =null;

	const formatQuestion=(ques)=>{
    const { title , options, multipleAns, answer } = ques;

    const mapOptions = options.map((option) => {
      return { value: option, selected: false };
    });

    return {
      title,
      options: mapOptions,
      multipleAns,
      questionState: { answered: false, seen: false },
      answer,
    };
  }	
	
	useEffect(()=>{
		JSON.parse(localStorage.getItem('timerState')) ? 
			setQuizTime(localStorage.getItem('timerState')):
			quizTime
			}, []);

	useEffect(()=>{
		localStorage.setItem('timerState',quizTime);
		},[quizTime])

	useEffect(()=>{
		interval = setInterval(() => {
			if(quizTime > 0){
				setQuizTime(quizTime-1)
			}
			else{
				setTimesUp(true)
				setQuizTime(-1);
				}
				}, 1000);
			return ()=> {
						clearInterval(interval);
						localStorage.removeItem('timerState')
			};
	});
	

	const initialQuestions =() =>{
		let questions = getQuestionsByLevel(getSelectedLevel());
				const filteredQuestions = [];
				questions.forEach((q) => {
					const formattedQues = formatQuestion(q);
					filteredQuestions.push(formattedQues);
				});
				setQuestionsList(filteredQuestions);
	}
	useEffect(()=>{
		if(JSON.parse(localStorage.getItem('questionState')))
		{
			setQuestionsList(getUpdatedQuestionState());
			setCurrentQues(getUpdatedCurrentQues());
		}
		else {
			initialQuestions();
		}
	}, []);

		useEffect(()=>{
			if(questionsList){
					storeQuestionState(questionsList,currentQues);
				}
		},[questionsList,currentQues])

		useEffect(()=>{
					setUpdatedQuestion(getUpdatedQuestionState());
		},[questionsList])


	const getQuesState = (question,quesNo)=>{
		if(currentQues === quesNo) return 'current-ques'
		else if(question.questionState['answered']) return 'answered-ques';
		else if(question.questionState['seen']) return 'unanswered-ques';
		else return 'unseen-ques'
	}
	
	const submitWithoutAllQues =()=>{
		saveTestState(true);
		swal("Test is submitted succesfully!", {
			icon: "success",
		}).then((afterSubmit)=>{
			if(afterSubmit)
			{
				removeQuestionState()
				history.replace({
					pathname:'/test/report',
         state:{ 'questionState' : questionsList}
			});
			}
		})
	}	

	const submitAllQuesTest =()=>
	{
	const attemptedQuestions = countOfAttemptedQuestions(questionsList);
	if(attemptedQuestions < questionsList.length){
		swal({
      title: "Are you sure?",
      text: `You attempted only ${attemptedQuestions} questions out of ${questionsList.length} !`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willSubmit) => {
      if (willSubmit) 
			{
					swal("Test is submitted succesfully!", {
						icon: "success", 
					});
					setTimesUp(true);
					saveTestState(true);
					removeQuestionState();
					history.replace({
					pathname:'/test/report',
					state:{'questionState':questionsList}
				});

      } 
			else {
        swal("Carry on with the test!");
      } 
    });
	}
	else{
		submitWithoutAllQues();
	}
   }

	const moveToPrevQuestion=()=>{
		const questions = questionsList;
		questions[currentQues].questionState={
			...questions[currentQues].questionState,
			seen:true,
	}
	if(currentQues === 0) return;
	else{
		setCurrentQues(currentQues-1)
	}
}

	const moveToNextQuestion = () => {
		const questions = questionsList;
		questions[currentQues].questionState={
			...questions[currentQues].questionState,
			seen:true,
		}
		if(currentQues >= questionsList.length) return;
		setCurrentQues(currentQues + 1);
		storeQuestionState(questionsList,currentQues);
	}

	const checkOthersAnswered =(options, currentOptionIndex)=> {
		return options.filter((ch, index) => index !== currentOptionIndex && ch.selected).length;
  }
	const navigateToQuestion = (quesNo) =>{
			const questions = questionsList;
			questions[currentQues].questionState = {
				...questions[currentQues].questionState,
				seen:true
			}
			questions[quesNo].questionState = {
				...questions[quesNo].questionState,
				seen:true
			}
			setCurrentQues(quesNo);
			storeQuestionState(questionsList,currentQues);
		}
		
 const handleOptionsChange = (event , choiceIndex , quesIndex)=>
{
	const selected = event.target.checked;
	if(event.target.type === "radio")
	{
		setQuestionsList([
       ...questionsList.slice(0,quesIndex),
		{
			...questionsList[quesIndex],  //firstly question pick from array and copy it
		options:
				[
					...questionsList[quesIndex].options.slice(0,choiceIndex).map((option)=>{
						return { ...option,selected:false }
						}),
						{
							...questionsList[quesIndex]['options'][choiceIndex], selected:true 
						},
						...questionsList[quesIndex].options.slice(choiceIndex + 1)
						.map((option)=>{
								return { ...option, selected: false };
							})					
					],
				questionState:
				{
					...questionsList[quesIndex].questionState,
					answered:true
				}
		},
				...questionsList.slice(quesIndex+1)
		])
		storeQuestionState(questionsList,currentQues);
	}
	else
	{
		setQuestionsList([
			...questionsList.slice(0,quesIndex),
			{
         ...questionsList[quesIndex],
		options:[
					...questionsList[quesIndex]["options"].slice(0,choiceIndex),
					{
						...questionsList[quesIndex].options[choiceIndex],
						selected:selected
					},
					...questionsList[quesIndex].options.slice(choiceIndex+1)
				],
				questionState:{
					...questionsList[quesIndex].questionState,
					answered:  checkOthersAnswered(questionsList[quesIndex].options, choiceIndex) ||selected
				}
			},
			...questionsList.slice(quesIndex + 1)
		])	
		storeQuestionState(questionsList,currentQues);
	}
 }

const showQuestionsOnSidePanel=(questionsList)=>
{
	const listItems =	questionsList.map((question,index) => {
						return	(<li key={question['title'] }
						className ={`question-button ${getQuesState(question,index)}`}
							onClick={ () => navigateToQuestion(index)}	>
								<label>		
									{index +1}
								</label>
							</li>)
			})
			return listItems;
}

return (
	<div className={`test-page ${darkTheme ? 'night':'' }`}>
		<div className='questions'>
			{		
			updatedQuestion.length > 0
				&& 
				<>
					<SingleQuestion
					totalQuestions={questionsList.length}
					question={{...updatedQuestion[currentQues]}}
					quesNo={currentQues + 1 }
					quesIndex={currentQues}
					optionClick={handleOptionsChange}
				/>
				</>
				}
		<div className='button-container'>
			<button className='btn btn-small'	onClick={moveToPrevQuestion}
			disabled={currentQues === 0}
			>
				Previous
			</button>
			{
					<button className='btn btn-primary'onClick={moveToNextQuestion}
				disabled= { currentQues >=  questionsList.length-1}	
				> 
				Next
				</button>		
			}
			<button className='btn btn-danger' onClick={submitAllQuesTest}>Submit</button>
		</div>
	</div>
	<div className='side-panel-container'>
		<Toggle/>	
		<Timer quizTime = {quizTime} timesUp = {timesUp} submitTest={submitWithoutAllQues} />
			<div className='side-panel'>
						<ul>
								{	showQuestionsOnSidePanel(questionsList)}
						</ul>
			</div>
			<div className="question-state">
				<h4 className='state-heading'><span className='current'></span> Current Q.</h4>
				<h4 className='state-heading'><span className='unanswered'></span>Unanswered Q.</h4>
				<h4 className='state-heading'><span className='answered'></span>Answered Q.</h4>
			</div>
		</div>	
	</div>
	)
}
onlineTest.propTypes = {
	location:PropTypes.shape({
	state:PropTypes.shape({
		skillType:PropTypes.string.isRequired
	})
}).isRequired
}

export default onlineTest;
