import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import './DownloadedSuccessfully.css'

function DownloadedSuccessfully() {
const navigate = useNavigate();


  const navigateFunction = () => {
    navigate('/home');
  }

  return (
    <>
    <div className='center-container'>
      <div className='text-box'>
        <h2>Forms Downloaded Successfully</h2>
        <button className="btn btn-success"onClick={navigateFunction}>Fill more forms</button>
      </div>
    </div>
    </>
  );
    
}

export default DownloadedSuccessfully