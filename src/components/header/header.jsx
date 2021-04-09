import React from 'react'
import{ Link} from 'react-router-dom';
import'./header.css';
import { useHistory } from "react-router-dom";
import { memo } from "react";

import {getUserInfo,isRegistered,cleanSession }from '../../utilities/services/authService';


function header() 
{
	const history = useHistory();
	const userName = getUserInfo();

	function handleLogout() {
    cleanSession();
    history.replace("/register");
  }

	return (
		<header>
		<div className='navbar'>
		<Link to='/register' className='navbar-logo'>
				Online Test
				<i className='fab fa-firstdraft' />
    </Link>
			{
		isRegistered()
				&&
			<ul className='nav-menu'>
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
