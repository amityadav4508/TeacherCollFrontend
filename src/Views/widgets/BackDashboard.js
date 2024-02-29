import React, { useEffect, useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
const BackDashboard = () => {
  let navigate = useNavigate();


  return (
    <>
      <div className="d-flex justify-content-end"  >
        <div className='share'>
        <span className="">
          Back
        </span>
        
          <a  onClick={() => navigate('/dashboard')}><FontAwesomeIcon className="fa-xs me-2 " icon={faArrowLeft} /></a>
        </div>

      </div>
    </>
  )
}

export default BackDashboard