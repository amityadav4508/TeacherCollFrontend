import React from 'react'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import { Form, Col } from 'react-bootstrap'
import { CFormInput, CFormSwitch, CInputGroup } from '@coreui/react'
import searchicnwrap from '../../../assets/images/search-new.svg'
import editicn from '../../../assets/images/landing-page/pen-to-square.svg'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
  const navigate = useNavigate()
  return (
    <>
      <BackDashboard />
      <div className='my-4 bg-custom-job p-3'>
        <div className='d-flex justify-content-between fw-bold    py-3'>

          <h6 className='fs-5'>Jobs and Internship</h6>
          <button type="button" className="add-btn"  onClick={()=>navigate('/addjobsandnotification')} >
            <span className="text-white"> Add</span>
          </button>
        </div>

        <div className="row  d-flex justify-content-between">
          <Col md={4} xl={3}>
            <Form.Select className="" aria-label="Default select example">
              <option>Change Status</option>
              <option value="3">Mark as Approved</option>
              <option value="4">Mark As Rejected</option>
            </Form.Select>
          </Col>
         
          <Col md={4} xl={3}>
            {' '}
            <div className="position-relative  d-flex justify-content-end">
              <img src={searchicnwrap} className="search-icon-wrap position-absolute mt-2 ms-2" alt="react img" />

              <CInputGroup className="">
                <CFormInput
                  className="form-search-input"
                  placeholder="Search"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </CInputGroup>
            </div>
          </Col>
        </div>
        <div className="row">
          <Col md={4} xl={3}>
            <div className="card-inner-jobs my-5">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h2 className="fs-6">Editor intern</h2>
                  <p className="mb-1">firm name</p>
                  <p>location</p>
                </div>

                <div className="d-flex  ">
                  <CFormSwitch className="switch-custom" />
                  <div>
                    <img src={editicn} className="img-fluid edit-size-img  " alt="react img" />
                  </div>
                </div>
              </div>
              <p className="text-end  fw-bold">See details</p>

              <div className="d-flex  justify-content-between">
                <p className="posted-text">Posted 4 hours ago</p>

                <p>Status</p>
              </div>
            </div>
          </Col>
          <Col md={4} xl={3}>
            <div className="card-inner-jobs my-5">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h2 className="fs-6">Editor intern</h2>
                  <p className="mb-1">firm name</p>
                  <p>location</p>
                </div>

                <div className="d-flex  ">
                  <CFormSwitch className="switch-custom" />
                  <div>
                    <img src={editicn} className="img-fluid edit-size-img  " alt="react img" />
                  </div>
                </div>
              </div>
              <p className="text-end  fw-bold">See details</p>

              <div className="d-flex  justify-content-between">
                <p className="posted-text">Posted 4 hours ago</p>

                <p>Status</p>
              </div>
            </div>
          </Col>
          <Col md={4} xl={3}>
            <div className="card-inner-jobs my-5">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h2 className="fs-6">Editor intern</h2>
                  <p className="mb-1">firm name</p>
                  <p>location</p>
                </div>

                <div className="d-flex  ">
                  <CFormSwitch className="switch-custom" />
                  <div>
                    <img src={editicn} className="img-fluid edit-size-img  " alt="react img" />
                  </div>
                </div>
              </div>
              <p className="text-end  fw-bold">See details</p>

              <div className="d-flex  justify-content-between">
                <p className="posted-text">Posted 4 hours ago</p>

                <p>Status</p>
              </div>
            </div>
          </Col>
          <Col md={4} xl={3}>
            <div className="card-inner-jobs my-5">
              <div className="d-flex justify-content-between">
                <div className="">
                  <h2 className="fs-6">Editor intern</h2>
                  <p className="mb-1">firm name</p>
                  <p>location</p>
                </div>

                <div className="d-flex  ">
                  <CFormSwitch className="switch-custom" />
                  <div>
                    <img src={editicn} className="img-fluid edit-size-img  "alt="react img"  />
                  </div>
                </div>
              </div>
              <p className="text-end  fw-bold">See details</p>

              <div className="d-flex  justify-content-between">
                <p className="posted-text">Posted 4 hours ago</p>

                <p>Status</p>
              </div>
            </div>
          </Col>
        </div>
      </div>
    </>
  )
}

export default Notification
