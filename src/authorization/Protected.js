import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export const userAuth=()=>{
  let login = JSON.parse(localStorage.getItem('userAuth'))
  let teacherLogin = JSON.parse(localStorage.getItem('teacherAuth'))

  const user =login || teacherLogin? {"loggedIn":true}:{"loggedIn":false}
  return user
}

const Protected = (props) => {
  const navigate = useNavigate()

  let login = JSON.parse(localStorage.getItem('userAuth'))
  let teacherLogin = JSON.parse(localStorage.getItem('teacherAuth'))
  const { status } = useSelector((state) => state.auth)


  useEffect(() => {
    if (!login && !status === 200  ) {
      return navigate('/admin/login')
    }
    if (!teacherLogin && !status === 200  ) {
      return navigate('/login')
    }
    if(teacherLogin===null && !login){
      return navigate('/login')
    }

  }, [status, login])

  return <props.Component />
}

export default Protected
