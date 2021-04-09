import React  from 'react';
import {  useHistory } from "react-router-dom";
import './NoMatch.css';

function NoMatchPage() {
	const history = useHistory();
 
  return (
    <div className='no-match'>
      <h3>Looking for something?</h3>
      <p>We are sorry. The Web address you entered is not a functioning page on our application.</p>
			<p>Go to <button onClick={()=>history.replace('/register')}>Register</button> Here.
			</p>
    </div>
  )
}

export default NoMatchPage
