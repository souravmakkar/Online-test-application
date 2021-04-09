import React from 'react';
import './question.css';
import PropTypes from 'prop-types';

function SingleQuestion(props) {
const { quesNo, quesIndex, optionClick, question,totalQuestions} = props;
const { title , options , multipleAns } = question;
	
const showOptions=(choices,multipleAns)=> {
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
										onChange={(e)=>optionClick( e , choiceIndex , quesIndex)}
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


