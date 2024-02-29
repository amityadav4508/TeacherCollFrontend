import React from 'react'
import { CNavItem, CNavTitle } from '@coreui/react'
import dasboard from './assets/images/Subtract.svg'
import CIcon from '@coreui/icons-react'


const halfNav = [
  {
    component: CNavItem,
    icon: <img className='me-2' alt="logo" src={dasboard} />,
    to: '/dashboard'
  },

  {
    component: CNavItem,
    to: '/usermanagement',
  },
  {
    component: CNavItem,
    to: '/students',
  },
  {
    component: CNavItem,
    to: '/contentmanagement',
  },
  {
    component: CNavItem,
    to: '/accountsettings',
  },
  {
    component: CNavItem,
    to: '/managerequest',
  },{
    component: CNavItem,
    to: '/managepayment',
  },
  {
    component: CNavItem,
    to: '/manageadmin',
  },
  {
    component: CNavItem,
    to: '/manageassignment',
  },
  {
    component: CNavItem,
    to: '/notifictaion',
  },
  {
    component: CNavItem,
    to: '/systemsetting',
  },


 
 
]

export default halfNav
