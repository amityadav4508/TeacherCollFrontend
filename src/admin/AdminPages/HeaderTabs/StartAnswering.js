import { CCard } from '@coreui/react'
import React from 'react'
import { useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'



const StartAnswering = () => {
  const [stratTest, setStartTest] = useState(true)
  const [submitPage, setSubmitPage] = useState(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const TestStart = () => {
    setStartTest(true)
  }
  const nextPage = () => {
    setStartTest(false)
    setSubmitPage(true)
  }

  return (
    <>
      {stratTest ? (
        <div>
        
        </div>
      ) : (
        <div>
          <CCard className="p-5 border-0 outer-card-lms">
            <Col xs={12}>
              <h6>Welcome Experts</h6>
              <p className="">
                Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus.
                Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus.
                Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus.
                Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus.
                Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus.
                Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus.
                Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus.
                Aenean et augue sed enim blandit sollicitudin ac non dui. Donec in justo lacus.
              </p>
            </Col>
            <Col className="my-4">
              <h6 className="mb-4">Assignments Guidelines</h6>
              <Row>
                <Col xs={12} md={6}>
                  <p>
                    <span className="fw-bold">1)</span> Aenean et augue sed enim blandit
                    sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit
                    sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit
                    sollicitudin ac non dui. Donec in justo lacus.{' '}
                  </p>
                </Col>
                <Col xs={12} md={6}>
                  <p>
                    <span className="fw-bold">2)</span> Aenean et augue sed enim blandit
                    sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit
                    sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit
                    sollicitudin ac non dui. Donec in justo lacus.{' '}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <p>
                    <span className="fw-bold">3)</span> Aenean et augue sed enim blandit
                    sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim
                  </p>
                </Col>
                <Col xs={12} md={6}>
                  <p>
                    <span className="fw-bold">4)</span> Aenean et augue sed enim blandit
                    sollicitudin ac non dui. Donec in justo lacus. Aenean et augue sed enim blandit
                    sollicitudin ac non dui. Donec in justo lacus. Aenea
                  </p>
                </Col>
              </Row>
            </Col>
            <div className="d-flex btn-tab-lms">
              <Button className="button-custom " onClick={TestStart}>
                Start Answering
              </Button>
            </div>
          </CCard>
        </div>
      )}
    </>
  )
}

export default StartAnswering
