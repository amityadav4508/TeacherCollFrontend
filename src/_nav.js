import React from 'react'
import { CNavGroup, CNavItem } from '@coreui/react'
import {
  cilSettings,
  cilSpeedometer,
  cilUserFemale,
  cilInfo,
  cilToggleOn,
  cilBook,
  cilBriefcase,
  cilMoney,
  cilDollar,
  cilPeople,
  cilCart,
  cibBitdefender,
  cibZoom,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const _Nav = [
  {
    component: CNavItem,
    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilSpeedometer}
        customClassName="nav-icon"
      />
    ),
    name: <span className="fw-bold text-white">Dashboard</span>,
    to: '/dashboard',
  },

  {
    component: CNavGroup,
    name: <span className="fw-bolder text-white">Manage User</span>,
    to: '/usermanagement',
    icon: <CIcon icon={cilUserFemale} style={{ color: '#fff' }} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Teacher</span>,
        to: '/usermanagement/teacher',
      },
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Student</span>,
        to: '/usermanagement/student',
      },
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Seller</span>,
        to: '/usermanagement/seller',
      },
    ],
  },
  {
    component: CNavGroup,
    name: <span className="fw-bold text-white">Manage Order</span>,
    icon: <CIcon icon={cilCart} style={{ color: '#fff' }} customClassName="nav-icon" />,
    to: '/manageorder',
    items: [
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Assignment List</span>,
        to: '/manageorder/assignment',
      },
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Order Listing</span>,
        to: '/manageorder/orderlisting',
      },
    ],
  },
  {
    component: CNavGroup,
    name: <span className="fw-bold text-white">Manage Content</span>,
    to: '/contentmanagement',
    icon: (
      <CIcon
        style={{ marginLeft: '-17px', color: '#fff' }}
        icon={cilInfo}
        customClassName="nav-icon"
      />
    ),
    items: [
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Content</span>,
        to: '/contentmanagement/content',
      },
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Question & Answer</span>,
        to: '/contentmanagement/questionanswer',
      },
    ],
  },
  {
    icon: <CIcon icon={cilToggleOn} style={{ color: '#fff' }} customClassName="nav-icon" />,
    component: CNavGroup,
    name: <span className="fw-bold text-white">Manage Request</span>,
    to: '/managerequest',
    items: [
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Requests</span>,
        to: '/managerequest/profile',
      },
    ],
  },

  {
    component: CNavItem,
    name: <span className="fw-bold text-white">Manage Payments</span>,
    to: '/managepayment',
    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilMoney}
        customClassName="nav-icon"
      />
    ),
  },
  {
    component: CNavItem,
    name: <span className="fw-bold text-white">Manage Admin</span>,
    to: '/manageadmin',
    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilPeople}
        customClassName="nav-icon"
      />
    ),
  },
  {
    component: CNavItem,
    name: <span className="fw-bold text-white">Manage Subjects</span>,
    to: '/managesubject',
    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilBook}
        customClassName="nav-icon"
      />
    ),
  },
  {
    icon: <CIcon style={{ color: '#fff' }} icon={cilSettings} customClassName="nav-icon" />,
    component: CNavGroup,
    name: <span className="fw-bold text-white">System Settings</span>,
    to: '/systemsetting',
    items: [
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Payment Settings</span>,
        to: '/systemsetting/paymentSetting',
      },
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Currency Settings</span>,
        to: '/systemsetting/currency',
      },
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Notification Settings</span>,
        to: '/systemsetting/notificationSetting',
      },
      {
        component: CNavItem,
        name: <span className="fw-bold text-white">Newsletter Settings</span>,
        to: '/systemsetting/newsletterSetting',
      },
    ],
  },
  {
    component: CNavItem,
    name: <span className="fw-bold text-white">Manage Subscription</span>,
    to: '/managesubscription',
    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilDollar}
        customClassName="nav-icon"
      />
    ),
  },
  {
    component: CNavItem,
    name: <span className="fw-bold text-white">Jobs & Internship</span>,
    to: '/jobsandinternship',

    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilBriefcase}
        customClassName="nav-icon"
      />
    ),
  },
  {
    component: CNavItem,
    name: <span className="fw-bold text-white">Assignments Bids</span>,
    to: '/assignmentsbids',

    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cibBitdefender}
        customClassName="nav-icon"
      />
    ),
  },
  {
    component: CNavItem,
    name: <span className="fw-bold text-white">Zoom Requests</span>,
    to: '/zoom-request',

    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cibZoom}
        customClassName="nav-icon"
      />
    ),
  },
]

export default _Nav
