import React from 'react';
import './question.css';
import PropTypes from 'prop-types';

/**
 * Single question is basically used to render the questions on the screen with the options 
 * @param {*} props
 * @param {number} quesNo - In which question the user is
 * @param {number} quesIndex - It is used for basically uniquely give the key for map function
 * @param {number} totalQuestions- It is just an total question in particular level 
 * @param {Function} optionClick - It is an function which is going to call when user click an particular 
 * option to pass the value of selected option and update the state as well.
 * @param {Object} question - It is basically an object of question.
 * @param {String} title - It is an question title.
 * @param {boolean} multipleAns - It is basically used for question type like it come under radio button with
 * single selection or with checkbox contains multiple selections.
 * @param {Array} options - It is basically an array of question options and each value in particular index
 * is an object which contains the value property for showing the value of particular option and as well as a
 * selected property which is an boolean property which shows that user select the particular option or not 
 * @returns 
 */
function SingleQuestion(props) {
const { quesNo, quesIndex, optionClick, question,totalQuestions} = props;
const { title , options , multipleAns } = question;
	
const showOptions = (choices,multipleAns) => {
		if(multipleAns)
		{	
			return(
				choices.map((choice, choiceIndex) =>  (
				<li key={`${choiceIndex}-${quesIndex}`}>
								<input
										id={`${choice["value"]}`}
										className="option"
										name={quesIndex}
										type="checkbox"
										value={quesIndex}
										checked={choice["selected"]}
										onChange={(e)=> optionClick( e , choiceIndex , quesIndex)}
									/>
						<label htmlFor={`${choice["value"]}`}>
											{choice["value"]}
						</label>
				</li>
			))
			);
		}
	else
		{
			const options =	choices.map((choice, choiceIndex) => 
				{
			return <li key={`${choiceIndex}-${quesIndex}`}>
								<input
										id={`${choice["value"]}`}
										className="option"
										name={quesIndex}
										type="radio"
										value={quesIndex}
										checked={choice["selected"]}
										onChange={(e)=>optionClick(e,choiceIndex,quesIndex)}
									/>
						<label htmlFor={`${choice["value"]}`}>
									{choice["value"]}
					</label>
				</li>
				}
						);
		return options
	}
}

	return (
		<div className='question-container'>
			<div className='question'>
				<div className='question-no'>Q -<span> {quesNo} </span> of {totalQuestions}</div>
				<h3>{title}</h3>
				<div>
				<ul className="options">
					{
            showOptions(options,multipleAns)
					}
				</ul>
			</div>
			</div>	
	</div>
	)
}

SingleQuestion.propTypes={
	totalQuestions:PropTypes.number.isRequired,
	question:PropTypes.object.isRequired,
	quesNo:PropTypes.number.isRequired,
	quesIndex:PropTypes.number.isRequired,
	options:PropTypes.array,
	multipleAns:PropTypes.bool,
	optionClick:PropTypes.func.isRequired,
}

export default SingleQuestion


