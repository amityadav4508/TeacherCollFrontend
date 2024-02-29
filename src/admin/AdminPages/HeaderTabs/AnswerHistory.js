import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import greentick from '../../../assets/images/green-tick.svg'

const AnswerHistory = () => {
  return (
    <div className='answer-history-wrapper'>
      <Card className="border-0 p-4 ">
        <div>

          <h6>My Answer History</h6>
          <Row className="my-4">
            <Col  sm="12" md="2">
              <div className="me-2 w-100 tabs-inner-content">
                <label className="fs-6 fw-normal my-1"> Category</label>
                <Form.Select
                  className="w-100"
                  aria-label="Default select example"
                  name="subject"
                // onChange={handleChange}
                >
                  <option className=""></option>

                  {/* {SubjectData?.map((ele, index) => (
                                <option key={index}>{ele.text}</option>
                              ))} */}
                </Form.Select>
                {/* <p className='text-danger'>{formErr?.subject}</p> */}
              </div>
            </Col>
            <Col sm="12" md="2">
            <div className="me-2 w-100 tabs-inner-wrap">
                <label className="fs-6 fw-normal my-1"> From</label>
                <Form.Select
                  className="w-100"
                  aria-label="Default select example"
                  name="subject"
                // onChange={handleChange}
                >
                  <option className=""></option>

                  {/* {SubjectData?.map((ele, index) => (
                                <option key={index}>{ele.text}</option>
                              ))} */}
                </Form.Select>
                {/* <p className='text-danger'>{formErr?.subject}</p> */}
              </div>
            </Col>
            <Col sm="12" md="2">
            <div className="me-2 w-100 tabs-inner-wrap">
                <label className="fs-6 fw-normal my-1"> To</label>
                <Form.Select
                  className="w-100"
                  aria-label="Default select example"
                  name="subject"
                // onChange={handleChange}
                >
                  <option className=""></option>

                  {/* {SubjectData?.map((ele, index) => (
                                <option key={index}>{ele.text}</option>
                              ))} */}
                </Form.Select>
                {/* <p className='text-danger'>{formErr?.subject}</p> */}
              </div>
            </Col>
            <Col sm="12" md="4">
              <label></label>
              <Form.Control type="text" />
            </Col>
            <Col sm="12" md="2">
              <div className="mt-4">
                <Button className="button-custom mt-2">Search</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="3" className="d-flex justify-content-between align-items-center ans-box-wrapper py-2 mx-2 mb-3 mb-xl-0">
              <h6>Answered</h6>
              <h2 className=''>56</h2>
            </Col>
            <Col sm="12" md="3" className="d-flex justify-content-between align-items-center ans-box-wrapper py-2 mx-2 mb-3 mb-xl-0">
              <h6>Skipped</h6>
              <h2 className=''>56</h2>
            </Col>
            <Col sm="12" md="3" className="d-flex justify-content-between align-items-center ans-box-wrapper py-2 mx-2 mb-3 mb-xl-0">
              <h6>Total</h6>
              <h2 className=''>102</h2>
            </Col>
            <Col>
            </Col>
          </Row>
          <div className='my-4 inner-wrap-sizes'>
            <h6>Assignment 1</h6>
            <div className='green-wrap-outer justify-content-between'>
              <p className='bold-text'>Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit ?</p>
              <div className='icn-green-wrap'>
              <h6 className='heading-wrap me-3 mb-0'>Answered</h6>
              <img className="" src={greentick} alt="answered" />
              </div>
             
            </div>
            <Row className='my-3'>
              <Col xs={12} md={4}><h3><span className='me-2'> Due Date:</span>Thursday By 11pm</h3>
              </Col>
              <Col xs={12} md={4}><h3><span className='me-2'>Category:</span> Non IT</h3></Col>
              <Col xs={12} md={4}><h3><span className='me-2'>Number of pages/words:</span> 250</h3></Col>
            </Row>
            <Row>
              <Col>
                <div className='para-text-bg'>
                  <p>1) Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. </p>
                  <p>2) Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. </p>

                  <div className='d-flex justify-content-end'>
                    <Link className="text-decoration-none" to=""> Read More</Link>

                  </div>
                </div>


              </Col>
            </Row>


          </div>
          <div>
          </div>
          <hr className='my-5'></hr>
          <div className='my-4 inner-wrap-sizes'>
            <h6>Assignment 2</h6>
            <div className='green-wrap-outer justify-content-between'>
              <p className='bold-text'>Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit ?</p>
              <div className='icn-green-wrap'>
              <h6 className='heading-wrap me-3 mb-0'>Answered</h6>
              <img className="" src={greentick} alt="answered" />
              </div>
            </div>
            <Row className='my-3'>
              <Col xs={12} md={4}><h3><span className='me-2'> Due Date:</span>Thursday By 11pm</h3>
              </Col>
              <Col xs={12} md={4}><h3><span className='me-2'>Category:</span> Non IT</h3></Col>
              <Col xs={12} md={4}><h3><span className='me-2'>Number of pages/words:</span> 250</h3></Col>
            </Row>
            <Row>
              <Col>
                <div className='para-text-bg'>
                  <p>1) Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. </p>
                  <p>2) Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus. </p>

                  <div className='d-flex justify-content-end'>
                    <Link className="text-decoration-none" to=""> Read More</Link>

                  </div>
                </div>


              </Col>
            </Row>


          </div>
        </div>


      </Card>
    </div>
  )
}

export default AnswerHistory
