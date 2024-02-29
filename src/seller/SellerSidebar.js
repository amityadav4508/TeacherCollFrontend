import React from 'react'
import { CNavItem } from '@coreui/react'
import { cilSpeedometer, cilNotes , cilMoney,cilDollar,cilInfo } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const SellerSidebar = [
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
    to: '/seller/dashboard',
  },

  {
    component: CNavItem,
    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilNotes}
        customClassName="nav-icon"
      />
    ),
    name: <span className="fw-bold text-white">Seller Billing Info </span>,
    to: '/seller/billinginfo',
  },

  {
    component: CNavItem,
    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilInfo}
        customClassName="nav-icon"
      />
    ),
    name: <span className="fw-bold text-white">Seller Content</span>,
    to: 'seller/content',
  },

  {
    component: CNavItem,
    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilDollar}
        customClassName="nav-icon"
      />
    ),
    name: <span className="fw-bold text-white">Seller Reward</span>,
    to: '/seller/rewards',
  },
  {
    component: CNavItem,
    icon: (
      <CIcon
        style={{ marginLeft: '-25px', color: '#fff' }}
        icon={cilMoney}
        customClassName="nav-icon"
      />
    ),
    name: <span className="fw-bold text-white">Seller Payment</span>,
    to: '/teacher/managepayment',
  },

]

export default SellerSidebar
