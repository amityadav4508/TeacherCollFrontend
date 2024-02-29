import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Home from './HeadersTab/Home'
import MyFolder from './HeadersTab/Question'
import Question from './HeadersTab/Question'

const StudentNavbars = () => {
  return (
    <div>
    <Tabs
    defaultActiveKey="home"
    transition={false}
    id="noanim-tab-example"
    className="mb-3 tabs-info tabs-wrapper-content"
    >
    <Tab eventKey="home" title="Home">
 <Home/>
    </Tab>
    <Tab eventKey="profile" title="MyFolder">
 <MyFolder/>
    </Tab>
    <Tab eventKey="Request" title="Question">
 <Question/>
    </Tab>

  </Tabs>
      </div>
  )
}

export default StudentNavbars