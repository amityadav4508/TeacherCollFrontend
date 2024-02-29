import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackButton from 'src/Views/widgets/BackButton'
import Footer from 'src/layout/Footer'
import NavTopBar from 'src/layout/NavTopBar'
import CryptoJS from 'crypto-js'
import { sellerLoginAsync } from 'src/store/features/AuthSlice'
// import { CForm } from '@coreui/react'

const SellerLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.auth)
  const [formErr, setFormErr] = useState({})
  const [submit, setSubmit] = useState(false)
  const [data1, setData1] = useState('')
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  useEffect(() => {
    if (checkType) {
      const handleLogin = async () => {
        const secretPass = 'XkhZG4fW2t2W'
        var bytes = CryptoJS.AES.decrypt(checkType, secretPass)
        setData1(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
      }
      handleLogin()
    }
  }, [checkType])

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormErr('')
    setSubmit(false)
    const { name, value } = e.target
    if (name === 'password') {
      setLoginData({ ...loginData, [name]: value.trim() })
    } else {
      setLoginData({ ...loginData, [name]: value })
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErr(validate())
    if (Object.keys(validate()).length == 0) {
      dispatch(sellerLoginAsync(loginData))
    }
  }
  
  function validate(val) {
    const err = {}
    if (!loginData.email) {
      err.email = 'Email is required!'
    }

    if (!loginData.password) {
      err.password = 'Password is required!'
    }

    return err
  }

  useEffect(() => {
    if (data1 === 'seller' && Token && status == 200) {
      navigate('/seller/dashboard')
    }
  }, [data1, Token])

  return (
    <>
      <NavTopBar />
      <div className="d-flex justify-content-end mb-3 mt-4 me-3">
        <BackButton />
      </div>
      <div className="mt-3 p-5 container">
        <h3 className="text-start mb-1 mb-lg-5">Seller Login</h3>
        <Form onSubmit={handleSubmit}>
          <div className="shadow-sm mt-3 p-5 mt-4">
            <Row xs={1} md={1} lg={1}>
              <Col>
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">Email*</label>
                    <Form.Control
                      type="email"
                      value={loginData?.email}
                      className="email-input bg-none"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-danger">{formErr?.email}</p>
                </div>
              </Col>

              <Col>
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">Password*</label>
                    <Form.Control
                      required
                      type="password"
                      value={loginData.password}
                      className="email-input  bg-none "
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-danger">{formErr?.password}</p>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-end ml-3">
            <Button className="button-custom mx-2 my-3" type="submit" onClick={handleSubmit}>
              Log In
            </Button>
          </div>
          <div className="d-flex justify-content-center mb-3">
            <Link className="  seller-login-link" to="/seller-register">
              Signup as a Seller
            </Link>
          </div>
          </div>

        
        </Form>
      </div>
      <Footer />
      {/* {loading === true ? (
        <div className="d-flex justify-content-center zIndex load-custom">
          <Loader />
        </div>
      ) : (
        ''
      )} */}
    </>
  )
}

export default SellerLogin
