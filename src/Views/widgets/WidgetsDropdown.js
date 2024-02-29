import React, { useEffect } from 'react'
import { CCardImage, CCard, CCardBody } from '@coreui/react'
import dollar from '../../assets/images/Rupee Icon.svg'

import pendingresub from '../../assets/images/pending-resubmit.svg'
import resubans from '../../assets/images/resub-ans.svg'
import assignreject from '../../assets/images/assign-reject.svg'
import assignapprove from '../../assets/images/assign-approve.svg'
import totalstudent from '../../assets/images/total-student.svg'
import totalteacher from '../../assets/images/total-teacher.svg'
import questionmark from '../../assets/images/questionMark.svg'
import { Col, Row } from 'react-bootstrap'
import chatbox from '../../assets/images/chatbox.svg'
import nexticon from '../../assets/images/nextIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminStatsAsync } from '../../store/features/AdminStatsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faIndianRupeeSign,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

const WidgetsDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getadminStats = useSelector((state) => state?.AdminStats?.adminStats)
  let admin_Stats = getadminStats?.data

  useEffect(() => {
    dispatch(getAdminStatsAsync())
  }, [])

  const handlePending = (status) => {
    navigate(`/manageorder/assignment/${status}`)
  }

  const handlePaid = (ordered) => {
    navigate(`/manageorder/orderlisting/${ordered}`)
  }

  return (
    <div className="mb-4">
      <Row className="align-items-stretch g-4">
        <Col md={6} xl={3}>
          <CCard onClick={() => handlePaid(2)} className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex ">
            {/* <FontAwesomeIcon className="mt-4 ms-4 fa-sm fa-2xl"  icon={faIndianRupeeSign} /> */}
            <img className="img-size"  src={dollar} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing" style={{color:"#2C384AF2"}}>
                  Total  earnings
                </h6>
                <h2 className="price-card">{parseFloat(admin_Stats?.earning).toFixed(2)}</h2>
              
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>

        <Col md={6} xl={3}>
          <Link style={{textDecoration:"none"}} to="/manageorder/assignment">
          <CCard  className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={questionmark} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing" style={{color:"#2C384AF2"}}>Total Assignments</h6>
                <h2 className="price-card">{admin_Stats?.total_assignments}</h2>
               
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
          </Link>
        </Col>
        <Col md={6} xl={3}>
          <CCard onClick={() => handlePending(2)} className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={chatbox} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing" style={{color:"#2C384AF2"}}>Assignments Answered</h6>
                <h2 className="price-card">{admin_Stats?.assignment_answered}</h2>
               
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col md={6} xl={3}>
       
          <CCard onClick={() => handlePending(1)} className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={nexticon} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing" style={{color:"#2C384AF2"}}>Assignments Pending</h6>
                <h2 className="price-card">{admin_Stats?.assignment_pending}</h2>
               
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
          
        </Col>
      </Row>
      <Row className='mt-3'>
      <Col md={6} xl={3}>
          <CCard onClick={() => handlePending(5)} className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={pendingresub} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Assignments Pending Resubmit</h6>
                <h2 className="price-card">{admin_Stats?.assignment_pending_resubmit}</h2>
               
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col md={6} xl={3}>
          <CCard onClick={() => handlePending(6)} className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={resubans} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Assignments Resubmit Answer</h6>
                <h2 className="price-card">{admin_Stats?.assignment_resubmit_answer}</h2>
               
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col md={6} xl={3}>
          <CCard onClick={() => handlePending(4)} className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={assignapprove} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Assignments Rejected</h6>
                <h2 className="price-card">{admin_Stats?.assignment_rejected}</h2>
               
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col md={6} xl={3}>
          <CCard onClick={() => handlePending(3)} className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={assignreject} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Assignments Approved</h6>
                <h2 className="price-card">{admin_Stats?.assignment_approved}</h2>
               
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
     
      </Row>
      <Row className='mt-3'>
      <Col md={6} xl={3}>
        <Link style={{textDecoration:"none"}} to="/usermanagement/student">
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={totalstudent} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing" style={{color:"#2C384AF2"}}>Total Students</h6>
                <h2 className="price-card">{admin_Stats?.students}</h2>
               
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Link>
        </Col>
        <Col md={6} xl={3}>
        <Link style={{textDecoration:"none"}} to="/usermanagement/teacher">
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={totalteacher} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing" style={{color:"#2C384AF2"}}>Total Teachers</h6>
                <h2 className="price-card">{admin_Stats?.teachers}</h2>
               
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default WidgetsDropdown
