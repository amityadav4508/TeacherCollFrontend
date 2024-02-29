import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Col, Container, Row } from 'react-bootstrap'
import BackButton from 'src/Views/widgets/BackButton'
import { changePassAdminAsync } from 'src/store/features/EditsubadminSlice'
import { clearAllState } from '../../store/features/EditsubadminSlice'

function Changepassword() {
  const [err, setErr] = useState('')
  const dispatch = useDispatch()
  const [subData, setSubData] = useState('')
  const [submit, setSubmit] = useState(false)
  const [userData, setUserData] = useState(false)
  const [editData, setEditData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
  const successMsg = useSelector((state) => state.editSubAdminProfile.changePassSuccessMsg)
  const errorMsg = useSelector((state) => state.editSubAdminProfile.changePassErrorMsg)
  const status = useSelector((state) => state.editSubAdminProfile.status)

  const handleChange = (e) => {
    setErr('')
    const { name, value } = e.target
    if (name === 'new_password') {
      setEditData({ ...editData, [name]: value.trim() })
    } else if (name === 'new_password_confirmation') {
      setEditData({ ...editData, [name]: value.trim() })
    } else {
      setEditData({ ...editData, [name]: value })
    }
  }

  const handleSubmit = () => {
    setErr(validation(editData))
    setSubData(editData)
    setSubmit(true)
  }

  function validation(values) {
    const preregex = /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const errors = {}
    if (!values.current_password) {
      errors.current_password = 'Current Password Required.'
    }

    if (!values.new_password) {
      errors.new_password = 'New Password is Required'
    } else if (!preregex.test(values.new_password)) {
      errors.new_password =
        'Password should be atleast one upper case and one special character or a number and minimum 8 character'
    }

    if (!values.new_password_confirmation) {
      errors.new_password_confirmation = 'Confirmation Password is Required'
    }
    if (values.new_password_confirmation !== values.new_password) {
      errors.new_password_confirmation = "Password doesn't match"
    }

    return errors
  }

  useEffect(() => {
    if (Object.keys(err).length === 0 && submit) {
      dispatch(changePassAdminAsync(subData))
      setUserData(true)
    }
  }, [err, submit])

  useEffect(() => {
    if (userData) {
    
      if (status == 200) {
        setEditData({
          current_password: '',
          new_password: '',
          new_password_confirmation: '',
        })
        toast.success(successMsg)
        setUserData(false)
        dispatch(clearAllState())
      }
      if (status == 500) {
        toast.error(errorMsg)
        setUserData(false)
        dispatch(clearAllState())
      }
    }
  }, [userData, status])

  return (
    <>
      <BackButton />

      <div className="edit-subs-card p-3 w-100 mt-3">
        <Form>
          <h5 className="d-flex d-flex mb-4">CHANGE PASSWORD</h5>
          <Container fluid>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    name="current_password"
                    className="email-input"
                    required
                    value={editData.current_password}
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                <span className="fs-6 text-danger">{err?.current_password}</span>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    name="new_password"
                    className="email-input"
                    required
                    value={editData.new_password}
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                <span className="fs-6 text-danger">{err.new_password}</span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="new_password_confirmation"
                    className="email-input"
                    required
                    value={editData.new_password_confirmation}
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                <span className="fs-6 text-danger">{err.new_password_confirmation}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row></Row>

            <Button
              className="d-flex my-3 button-custom button-subscription"
              variant="primary"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Container>
        </Form>
      </div>

    </>
  )
}

export default Changepassword
