import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const TeacherOrder = () => {
  const navigate = useNavigate()

  const route = [
    {
      id: '1',
      name: 'Start Answering ',
      path: '/teacher/manageorder/startanswering',
    },
    {
      id: '2',
      name: 'My Answer History',
      path: '/teacher/manageorder/myanswerhistory',
    },
    {
      id: '3',
      name: 'Re-submission Request',
      path: '/teacher/manageorder/resubmission',
    },
  ]

return (
    <>
      <div className="copy-right-wrap py-4 mb-3">
        {route.map((ele, ind) => {
          return (
            
            <div key={ind}>
              <div>
                
              <NavLink
                className="text-decoration-none mb-3 d-block text-center navlink-tabs-teacher"
                  
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? '600 ' : '',
                    color: isActive ? '#1670f8' : isPending? 'red': '#606176',
                    borderBottom:isActive ?'3px solid #1670f8 ':"",
                    marginRight:'20px',
                    paddingBottom:'8px'
                  }
                }}
                to={ele.path}
                >
                {ele.name}
              </NavLink>
            </div>
                </div>
          )
        })}
      </div>
    </>
  )
}

export default TeacherOrder
