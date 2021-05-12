import React,{useContext} from 'react'
import{ Link} from 'react-router-dom';
import'./header.css';
import { useHistory } from "react-router-dom";
import { memo } from "react";
import { ThemeContext } from '../../utilities/ThemeManager';
import {getUserInfo,isRegistered,cleanSession,removeTheme }from '../../utilities/services/authService';
import {removeQuestionState }from '../../utilities/services/questionsService';
import Toggle from '../Toggle/Toggle';

/**
 * 
 * Header component is used simple an pure component which is used to render an header component which contain
 * an registered username and an signout link to for signout from the test.
 *  
 */
function header() 
{
	const {darkTheme} = useContext(ThemeContext);
	const history = useHistory();
	const userName = getUserInfo();

	const handleLogout = ()=> {
    cleanSession();
		removeTheme();
		removeQuestionState();
    history.replace("/register");
  }

	return (
		<header>
			<div className={`${isRegistered() ?`navbar ${darkTheme ? 'night':''}`:'navbar'}`}>
				<Link to='/register' className='navbar-logo'>
						Online Test
						<i className='fab fa-firstdraft' />
				</Link>
			{
				isRegistered()
					&&
				<ul className='nav-menu'>
					<li className='nav-item'>
							<Toggle/>
						</li>
						<li className='nav-item'>
							<div className='nav-links'>
								<i className="fa fa-user-circle" aria-hidden="true"></i>
								{userName['empName']}
							</div>
						</li>
						<li className='nav-item'>
							<Link to='/' className='nav-links' onClick={handleLogout}>
								<i className="fa fa-sign-out" aria-hidden="true"></i>
								Sign Out
							</Link>
						</li>
				</ul>	 
		}
		</div>
</header>
	)
}
const MemoizedHeader = memo(header);


export default MemoizedHeader
