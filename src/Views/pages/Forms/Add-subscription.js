import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from 'src/Views/widgets/BackButton'
import { postSubscriptionAsync } from '../../../store/features/SubscriptionSlice'

const AddSubscription = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const dashboardData = useSelector((state) => state?.editAdmin?.postAdmin)
  const [name, setName] = useState(' ')
  const [subscription_id, setSubscription_id] = useState(' ')
  const [duration, setDuration] = useState(' ')
  const [assignment_request, setAssignment_request] = useState('')
  const [file_download, setFile_download] = useState(' ')
  const [type, setType] = useState('')
  const [validated, setValidated] = useState(false)
  const [checked, setChecked] = useState(false)
  const [userData, setUserData] = useState(false)


  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else if (form.checkValidity() === true) {
      event.preventDefault()
      event.stopPropagation()
      dispatch(
        postSubscriptionAsync({
          name: name,
          subscription_id: subscription_id,
          duration: duration,
          assignment_request: assignment_request,
          file_download: file_download,
        }),
      )
      setName('')
      setSubscription_id('')
      setDuration('')
      setAssignment_request('')
      setFile_download('')
      setValidated(false)
      setUserData(true)
    }
  }

  useEffect(() => {
    if (userData) {
      toast.success('succefully Added')
      // navigate('/theme/manageadmin')
    }
  }, [userData])

  return (
    <>
         <BackButton/>
      <h3 className="d-flex  mb-3">Add Subsciption</h3>
      <div className="form-wrapper">
        <div className="edit-subs-card p-5 w-100">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md="12" lg="6">
                <Form.Group className="mb-3 " controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="email-input"
                    required
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    placeholder="Enter Name"
                  />
                </Form.Group>
              </Col>
              <Col md="12" lg="6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Subscription_id</Form.Label>
              
                  <Form.Select onChange={(e) => {
                      setSubscription_id(e.target.value)
                    }} className="email-input" aria-label="Default select example">
                    <option value="1">Platinum</option>
                    <option value="2">Gold</option>
                    <option value="3">Silver</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="12" lg="6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    className="email-input"
                    required
                    type="text"
                    value={duration}
                    onChange={(e) => {
                      setDuration(e.target.value)
                    }}
                    placeholder="Enter Duration"
                  />
                </Form.Group>
              </Col>
              <Col md="12" lg="6">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Assignment_request</Form.Label>
                  <Form.Control
                    className="email-input"
                    required
                    type="text"
                    value={assignment_request}
                    onChange={(e) => {
                      setAssignment_request(e.target.value)
                    }}
                    placeholder="Enter Requests"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md="12" lg="6">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>File_download</Form.Label>
                  <Form.Control
                    className="email-input"
                    required
                    type="text"
                    value={file_download}
                    onChange={(e) => {
                      setFile_download(e.target.value)
                    }}
                    placeholder="Enter Downloads"
                  />
                </Form.Group>
              </Col>
              <Col md="12" lg="6"></Col>
            </Row>

            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                required
                feedback="You must agree before submitting."
                feedbackType="invalid"
                value={checked}
                onChange={() => setChecked(!checked)}
                type="checkbox"
                label="Check me out"
              />
            </Form.Group> */}
            <Button
              className="d-flex  button-custom button-subscription"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddSubscription
