import React,{useEffect} from 'react';
import './register.css';
import{ registerUser} from '../../utilities/services/authService';
import useValidate from '../../utilities/useValidate';
import MemoizedHeader from '../header/header';

function register({history}) {

	const emp_details={
    empName: "",
    empId: "",
  };
	
	const { values,handleChange,handleSubmit,errors,isSubmitted } = useValidate(emp_details);	

	useEffect(() => {
			if (Object.keys(errors).length === 0 && isSubmitted ) {
				if(registerUser(values)){
					history.push({ pathname: "/exam-info" });
				}
			}},[errors])

	return (
    <div className='register_wrapper'>
			<MemoizedHeader/>
      <div className="register_card" style={{}}>
        <h1 className='title'>Register Here</h1>
        <p>For a Test Please Register First</p>
        <hr className='line'/>
         <form onSubmit={handleSubmit}> 
            <div className='form-inputs'>
              <label className='form-label' htmlFor='emp_name'>
								<strong> Employee Name</strong>
               </label>
              <input
                className='input'
                type='text'
                id='emp_name'
                name='empName'
                value={values.empName}
                onChange={handleChange}
                placeholder='Enter here'
              />
               {errors.empName && <span className='error-popup'>{errors.empName}</span>}
           </div>  
             <div className='form-inputs'>
                  <label className='form-label' htmlFor='emp_id'>
                    <strong> Employee Id</strong> 
                  </label>
                  <input
                   className='input'
                    type='text'
                    id='emp_id'
                    name='empId'
                    placeholder='Enter your Id'
                    value={values.empId}
                    onChange={handleChange}
                    />
                   {errors.empId && <span className='error-popup'>{errors.empId}</span>}
              </div> 
							<div className='text-center'>
                <button type='submit' 
                 className='btn btn-medium'>
                  Register
                </button>
						</div>		
        </form>
     </div>
  </div>
  
  )
}
export default register
