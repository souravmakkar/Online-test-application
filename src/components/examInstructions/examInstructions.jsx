import React,{useEffect,useContext} from 'react';
import './examInstructions.css';
import useValidate from '../../utilities/useValidate';
import MemoizedHeader from '../header/header';
import {levelType} from '../../utilities/constants';
import { ThemeContext } from '../../utilities/ThemeManager';
import { saveLevel } from'../../utilities/services/authService';

/**
 * examInstructions component is used for rendering the exam instruction and select box for the level of a test. 
 * @param {Object} history - It is an object which contains the push method which is used to push to particular
 * page after clicking on button take test and passing the  level state to the test  page.    
 *  
 */
function examInstructions({history}) {
	const {darkTheme} = useContext(ThemeContext);
	const examInfo = {
	agrementTerms : false,
	skill: '',
	};


	const { values,handleChange,handleSubmit,errors,isSubmitted } = useValidate(examInfo);

	useEffect(() => {
			if (Object.keys(errors).length === 0 && isSubmitted ) {
				saveLevel(values['skill']);
				history.push('/online/test');
			}},[errors])

	return (
		<>
		<MemoizedHeader/>
		<div className={`exam-info ${darkTheme ? 'night':''}`}>
				<div className="exam-instructions">
					<p className='title'>Basic Instructions for Online Examinations:</p>
					<p className='info-heading'>A. General information:</p>
					<ol>
							<li>The examination will comprise of Objective type Multiple Choice Questions (MCQs) </li>
							<li>All questions are compulsory and each carries One mark for correct answer and 0 for incorrect.</li>
							<li>There will be<strong> NO NEGATIVE MARKING</strong>   for the wrong answers.</li>
							<li>The questions covered in the exam will be as per the skill that you are selected.</li>
					</ol>
					<p className='info-heading'>B. Information & Instructions:</p>
					<ol>
							<li>The examination does not require using any paper, pen, pencil and calculator</li>
							<li>Every student will take the examination on a Laptop/Desktop</li>
							<li>On computer screen every student will be given objective type type Multiple Choice
								Questions (MCQs)</li>
							<li>For Multiple Choice Questions,each question has four options, and the candidate has to click
								the appropriate option.</li>
							<li>The Time of the examination begins only when the ???Start Test??? button is pressed.</li>
							<li>The answers can be changed at any time during the test and are saved automatically. </li>
							<li>	It is possible to Review the answered as well as the unanswered questions.</li>
							<li>The Time remaining is shown in the Right Top Corner of the screen.</li>
							<li>The system automatically shuts down when the time limit is over OR alternatively if
									examinee finishes the exam before time he can quit by pressing the ???Submit Test???
								button.
							</li>
							<li>Total time for the exam is <strong>10 minutes.</strong> </li>
					</ol>
				</div>
			<div className='exam-mandatry-info text-center'>
				<div className="agrement-line">
						<input type='checkbox' id='agrement'className='info-checkbox' name='agrementTerms' checked={values['agrementTerms']}  onChange={handleChange} />
						<label htmlFor='agrement'>I agree to all the terms and conditions. </label>
					</div>
					{errors.agrementTerms && <span className='error'>{errors.agrementTerms}</span>}

				<div className='skill-set'>
          <h4>Choose your skill level acc. to your knowledge</h4>
						<div className='radio-group'>
								<label htmlFor='skill1'>
										<input id='skill1' type="radio" value={levelType.Beginner} name="skill" 
												checked={ values.skill === '1'}
												onChange={handleChange}/>
										Beginner
								</label>
					<label htmlFor='skill2'>
									<input id='skill2' type="radio"  value={levelType.Intermediate} name="skill" 
										checked={ values.skill === '2'}
										onChange={handleChange}/>
										Intermediate
								</label>
								<label htmlFor='skill3'>
								<input id='skill3' type="radio"  value={levelType.Advanced} name="skill" 
									checked={ values.skill === '3'}
									onChange={handleChange}/>
									Advanced
								</label>
							</div>
							{errors.skill && <span className='error'>{errors.skill}</span>}
				</div>

				</div>
				<div className='text-center'>
           <button className='btn btn-small' onClick={handleSubmit}> Start Test</button>
				</div>
		</div>
	</>	
	)
}

export default examInstructions;

