import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const StudentHeader = () => {
  const [id, setId] = useState('')

  const route = [
    {
      id: '1',
      name: 'Home',
      path: '/studentdashboard/home',
    },
    {
      id: '2',
      name: 'Ask Question',
      path: '/studentdashboard/askquestion',
    }
  ]

  return (
    <>
      <div className="d-flex p-5 mb-3">
        {route.map((ele, ind) => {
          return (
            <div key={ind}>
              <NavLink
                className="text-decoration-none "
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? '600 ' : '',
                    color: isActive ? '#1670f8' : isPending? 'red': '#606176',
                    borderBottom:isActive ?'3px solid #1670f8 ':"",
                    marginRight:'20px',
                    paddingBottom:'8px'
                  }
                }}
                onClick={() => setId(ele.id)}
                to={ele.path}
              >
                {ele.name}
              </NavLink>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default StudentHeader