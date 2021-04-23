import React  from 'react';
import {  useHistory } from "react-router-dom";
import {isRegistered} from '../../utilities/services/authService';
import './NoMatch.css';

/**
 * 
 * NoMatch page is going to render when the user enter the invalid url that the application doesn't supports
 * and also give an link to navigate to register page. 
 */

function NoMatchPage() {

	const history = useHistory();
 
  return (
    <div className='no-match'>
      <h3>Looking for something?</h3>
      <p>We are sorry. The Web address you entered is not a functioning page on our application.</p>
			{
				! isRegistered && <p>Go to <button onClick={()=>history.replace('/register')}>Register</button> Here.</p>
			}
		
    </div>
  )
}

export default NoMatchPage
