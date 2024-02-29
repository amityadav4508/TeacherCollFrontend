
import React from 'react'
import {  CNavItem} from '@coreui/react'
import {cilSpeedometer, cilNotes} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AdminNav = [
  {
    component: CNavItem,
    icon: <CIcon style={{marginLeft:"-25px",color:"#fff"}} icon={cilSpeedometer} customClassName="nav-icon" />,
    name: <span className='fw-bold text-white'>Dashboard</span>,
    to: '/admin/dashboard'
  }, 

  {
    component: CNavItem,
    icon: <CIcon style={{marginLeft:"-25px",color:"#fff"}} icon={cilNotes} customClassName="nav-icon" />,
    name: <span className='fw-bold text-white'>Manage Assignment </span>,
    to: '/admin/Assignment'
  },

  
]

export default AdminNav
