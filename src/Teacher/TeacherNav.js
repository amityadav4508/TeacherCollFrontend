import React, { useEffect } from 'react'
import {  CNavItem } from '@coreui/react'
import { cilSpeedometer, cilDollar, cilCart, cilChatBubble, cilVideo } from '@coreui/icons'
import CIcon from '@coreui/icons-react'



const TeacherNav = [
  {
    component: CNavItem,
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    name: <span className='fw-bold text-white'>Dashboard</span>,
    to: '/teacher/dashboard'
  },
  {
    component: CNavItem,
    name: <span className='fw-bold text-white'>Manage Order </span>,
    to: `/teacher/manageorder/startanswering`,
    icon: <CIcon icon={cilCart} style={{ color: "#fff" }} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: <span className='fw-bold text-white'>Manage Payment</span>,
    to: '/teacher/managepayment',
    icon: <CIcon icon={cilDollar} style={{ color: "#fff" }} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: <span className='fw-bold text-white'>Inbox</span>,
    to: '/teacher/inbox',
    icon: <CIcon icon={cilChatBubble} style={{ color: "#fff" }} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: <span className='fw-bold text-white'> Meeting Request</span>,
    to: '/teacher/meetingrequest',
    icon: <CIcon icon={cilVideo} style={{ color: "#fff" }} customClassName="nav-icon" />,
  }
 
]

export default TeacherNav
