import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import RequestPayment from './HeaderTabs/Requestpayment'
import Transactionhistory from './HeaderTabs/Transactionhistory'

const TeacherPayment = () => {
  return (
    <div>
    <Tabs
    defaultActiveKey="home"
    transition={false}
    id="noanim-tab-example"
    className="mb-4 tabs-info tabs-wrapper-content "
    >
    <Tab eventKey="home" title="Request Payment">
     <RequestPayment/>
    </Tab>
    <Tab eventKey="profile" title="Transaction History">
 <Transactionhistory/>
    </Tab>

  </Tabs>
      </div>
  )
}

export default TeacherPayment