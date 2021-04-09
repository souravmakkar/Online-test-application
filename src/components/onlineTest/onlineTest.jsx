import React,{useState,useEffect} from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import SingleQuestion from '../singleQuestion/question'
import { getQuestionsByLevel , countOfAttemptedQuestions } from '../../utilities/services/questionsService'; 
import { saveTestState} from '../../utilities/services/authService';
import Timer from '../Timer/Timer';
import usePreventNaigatePage from '../../utilities/usePreventNaigatePage';

import './onlineTest.css';

function onlineTest({history,location}) {
	const [questionsList,setQuestionsList] = useState([]);
  const [currentQues, setCurrentQues] = useState(0);
	const[timesUp,setTimesUp] = useState(false);

   const level = location.state['skillType'];

	const [Prompt,setTestStart,testcomplete] = usePreventNaigatePage();


	function formatQuestion(ques) {
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
	
	const submitWithoutAllQues =()=>{
		setTimesUp(true);
		saveTestState(true);
		swal("Test is submitted succesfully!", {
			icon: "success",
		}).then((afterSubmit)=>{
			if(afterSubmit)
			{
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
					testcomplete();
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
		testcomplete();
		submitWithoutAllQues();
	}
   }

	const moveToPrevQuestion=()=>{
		const questions = questionsList;
		questions[currentQues].questionState={
			...questions[currentQues].questionState,
			seen:true,
	}
	if(currentQues ===0) return;
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
		setCurrentQues(currentQues +1);
	}

	useEffect(()=>{
		setTestStart();
		let questions = getQuestionsByLevel(level);
				const filteredQuestions = [];
				questions.forEach((q) => {
					const formattedQues = formatQuestion(q);
					filteredQuestions.push(formattedQues);
				});
		
				setQuestionsList(filteredQuestions);
			}, []);

		
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
						{...questionsList[quesIndex]['options'][choiceIndex], selected:true },
						...questionsList[quesIndex].options.slice(choiceIndex + 1).map((option)=>{
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
					answered: selected
				}
			},
			...questionsList.slice(quesIndex + 1)
		])	
	}
 }

const showQuestionsOnSidePanel=(questionsList)=>
{
	const listItems =	questionsList.map((question,index) => {
						return	(<li key={question['title']}
							onClick={ () =>navigateToQuestion(index)}	>
								<label>		
									{index +1}
								</label>
							</li>)
			})
			return listItems;
}

	const navigateToQuestion =(quesNo)=>{
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
		}

return (
		<div className='test-page'>
			<div className='questions'>
		{		
		questionsList.length > 0
      && 
				<>
					<SingleQuestion
					totalQuestions={questionsList.length}
					question={{...questionsList[currentQues]}}
					quesNo={currentQues +1 }
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
	<Timer timesUp={timesUp} submitTest={submitWithoutAllQues} setTimesUp={setTimesUp}/>
				<div className='side-panel'>
							<ul>
								{	showQuestionsOnSidePanel(questionsList)}
							</ul>
				</div>
		</div>	
		{Prompt}
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