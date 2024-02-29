import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { toast,  } from 'react-toastify'
import { Col, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { resetAdminPassAsync, resetPassTokenAsync } from 'src/store/features/ForgetPasswordSlice'
import Loader from 'src/Views/Loader/Loader'

const ForgetPassPage = () => {
  const { id } = useParams()
  const [err, setErr] = useState('')
  const dispatch = useDispatch()
  const [subData, setSubData] = useState('')
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate()
  const { forgetPassloading } = useSelector((state) => state.forgetPass)
  const [editData, setEditData] = useState({
    token: id,
    password: '',
    password_confirmation: '',
  })
  const { status } = useSelector((state) => state.forgetPass)
  const { successMessage } = useSelector((state) => state.forgetPass)


  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'password') {
      setEditData({ ...editData, [name]: value.trim() })
    }else if (name === 'password_confirmation') {
      setEditData({ ...editData, [name]: value.trim() })
    }else{
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

    if (!values.password) {
      errors.password = 'New Password is Required'
    } else if (!preregex.test(values.password)) {
      errors.password =
        'Password should be atleast one upper case and one special character or a number and minimum 8 character'
    }
    if (!values.password_confirmation) {
      errors.password_confirmation = 'Confirmation Password is Required'
    } else if (values.password_confirmation !== values.password) {
      errors.password_confirmation = "Password doesn't match"
    }

    return errors
  }

  const [message, setMessage] = useState(false)

  useEffect(() => {
    if (Object.keys(err).length === 0 && submit) {
      const timer = setTimeout(async () => {
        await dispatch(resetAdminPassAsync(subData))
        setMessage(true)
      }, 1000)
    } 
  }, [submit, err])

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [message])

  useEffect(() => {
    if (id) {
      dispatch(resetPassTokenAsync(id))
    }
  }, [id])

  useEffect(() => {
    if (status === '404') {
      navigate('/')
    }
  }, [status])

  
  return (
    <>

      <Container fluid className="p-5 mt-5 d-flex justify-content-center">
        <div className="border rounded  p-4 w-50 bg-light">
          <h3 className="d-flex d-flex mb-3">Change Password</h3>
          <div className="edit-subs-card p-5 w-100">
            <Form>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    name="password"
                    className="email-input"
                    required
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <span className="fs-6 text-danger">{err.password}</span>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="password_confirmation"
                    className="email-input"
                    required
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  <span className="fs-6 text-danger">{err.password_confirmation}</span>
                </Form.Group>
              </Col>

              <Button
                className="d-flex my-3 button-custom button-subscription"
                variant="primary"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Form>
          </div>
        </div>
      </Container>
      {forgetPassloading === true ? (
        <div className="d-flex justify-content-center zIndex load-custom">
          <Loader />
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default ForgetPassPage
