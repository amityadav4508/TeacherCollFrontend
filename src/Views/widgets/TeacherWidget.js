import React, { useEffect } from 'react'
import { CCardImage, CCard, CCardBody } from '@coreui/react'
 
import uppererrow from '../../assets/images/uppererrow.svg'
import questionmark from '../../assets/images/questionMark.svg'
import { Col, Row } from 'react-bootstrap'
import chatbox from '../../assets/images/chatbox.svg'
import nexticon from '../../assets/images/nextIcon.svg'
import { getTeacherStatsAsync } from '../../store/features/TeacherStatsinfo'
import resubans from '../../assets/images/resub-ans.svg'
import { useDispatch, useSelector } from 'react-redux'
import dollar from '../../assets/images/dollar.svg'
import pendingresub from '../../assets/images/pending-resubmit.svg'
import DefaultCurrency from 'src/layout/DefaultCurrency'

const TeacherWidget = () => {
  const dispatch = useDispatch()
  const { teacherStats } = useSelector((state) => state?.TeacherStats)
  let teacher_Stats = teacherStats?.data?.data


  return (
    <div className="mb-4">
      <Row className="align-items-stretch g-4">
        <Col md={6} xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex ">
              {/* <img className="img-size"  src={dollar} alt="react img" /> */}
              <span className=" fs-1 currency-icon rounded-circle "><DefaultCurrency/></span>
              <div className="ms-4">
                <h6 className="walllet-spacing">Total earnings</h6>
                <h2 className="price-card">{teacher_Stats?.total_earnings ? parseFloat(teacher_Stats?.total_earnings * teacher_Stats?.exchange_rate).toFixed(2):'0'}</h2>
              
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>

        <Col md={6} xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={questionmark} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Total Assignments</h6>
                <h2 className="price-card">{teacher_Stats?.total_assignments}</h2>
                
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col md={6} xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top"/>
            <CCardBody className="d-flex">
              <img className="img-size"  src={chatbox} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Assignments Answered</h6>
                <h2 className="price-card">{teacher_Stats?.assignment_answered}</h2>
                
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col md={6} xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={nexticon} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Approved Assignment</h6>
                <h2 className="price-card">{teacher_Stats?.assignment_approved}</h2>
                
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
      </Row>
      <Row className='mt-3'>
      <Col md={6} xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={resubans} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Assignment Resubmit Answer</h6>
                <h2 className="price-card">{teacher_Stats?.assignment_resubmit_answer}</h2>
                
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col md={6} xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={pendingresub} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Assignment Resubmit Request</h6>
                <h2 className="price-card">{teacher_Stats?.assignment_resubmit_request}</h2>
                
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
      </Row>
    </div>
  )
}

export default TeacherWidget
