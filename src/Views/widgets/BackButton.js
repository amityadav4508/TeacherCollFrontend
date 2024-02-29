import React from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
const BackButton = () => {
  let navigate = useNavigate()
  // const Goback = () => {
  //     window.history.back()
  //   }
  return (
    <>
      <div className="d-flex justify-content-end ">
        <div className="share" onClick={() => navigate(-1)}>
          <span>
            Back
          </span>
          <a>
            <FontAwesomeIcon className="fa-xs me-2 " icon={faArrowLeft} />
          </a>
        </div>
      </div>
    </>
  )
}

export default BackButton
