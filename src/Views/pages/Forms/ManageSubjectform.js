import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Col, Container, Row } from 'react-bootstrap'
import BackButton from 'src/Views/widgets/BackButton'

function ManageSubjectform() {


  return (
    <>
         <BackButton/>
      <h3 className="d-flex d-flex mb-3">Add Subjects</h3>
      <div className="edit-subs-card p-5 w-100">
        <Form>
          <Container fluid>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Subject Name</Form.Label>
                  <Form.Control
                    name="name"
                    className="email-input"
                    required
                    type="text"
                    placeholder="Enter Name"
                  />
                </Form.Group>
                {/* <span className="fs-6 text-danger">{err?.name}</span> */}
              </Col>
              <Col>
                <Form.Label>Subject Category</Form.Label>
                <Form.Group>
                  <Form.Select className="email-input" aria-label="Default select example">
                    <option value="1">Select </option>
                    <option value="2">IT</option>
                    <option value="3">NON-IT</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Button
              className="d-flex  button-custom button-subscription"
              variant="primary"
              type="submit"
            >
              Add
            </Button>
          </Container>
        </Form>
      </div>
    </>
  )
}

export default ManageSubjectform
