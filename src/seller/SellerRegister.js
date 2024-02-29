import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllState, sellerRegisterAsync } from '../store/features/AuthSlice'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getList } from 'country-list-with-dial-code-and-flag'
import { toast } from 'react-toastify'
// import Loader from 'src/Views/Loader/Loader'
import CryptoJS from 'crypto-js'
import NavTopBar from 'src/layout/NavTopBar'
import Footer from 'src/layout/Footer'
import BackButton from 'src/Views/widgets/BackButton'
import { useNavigate } from 'react-router'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'
import { Link } from 'react-router-dom'

const SellerRegister = () => {
  const navigate = useNavigate()
  // const { loading } = useSelector((state) => state.auth)
  const { sellerRegister } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [formErr, setFormErr] = useState({})
  const [submit, setSubmit] = useState(false)
  const [dialcode, setDialCode] = useState('')
  const data = getList()
  const [checked, setChecked] = useState(false)
  const [data1, setData1] = useState('')
  const { subjectData } = useSelector((state) => state.subject)
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  useEffect(() => {
    dispatch(getSubjectList())
  }, [])


  useEffect(() => {
    if (sellerRegister) {
      // toast.success(sellerRegister.message)
      // dispatch( clearAllState())
      navigate('/home')
    }

  }, [sellerRegister])

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
    name: "",
    email: '',
    password: '',
    phonenumber: '',
    confirm_password: '',
    currency: ''
  })

  function handleChange(e) {
    setFormErr('')
    setSubmit(false)
    const { name, value } = e.target
    if (name === 'password') {
      setLoginData({ ...loginData, [name]: value.trim() })
    } else if (name === 'confirm_password') {
      setLoginData({ ...loginData, [name]: value.trim() })
    } else if (name === 'phonenumber') {
      const regex = /^\d{0,14}$/
      if (value === '' || regex.test(value)) {
        setLoginData({ ...loginData, [name]: value })
      }
    } else {
      setLoginData({ ...loginData, [name]: value })
    }
  }

  function personalInfoValidation(val) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const preregex = /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const phoneRegex = /^\d{7,14}$/
    const err = {}
    if (!loginData?.name) {
      err.name = 'Name is required!'
    }
    if (!loginData?.email) {
      err.email = 'Email is required!'
    }
    if (loginData?.email && !regex.test(loginData?.email)) {
      err.email = 'This is not a valid email format!'
    }
    if (!loginData?.password) {
      err.password = 'Password is required!'
    } else if (!preregex.test(loginData?.password)) {
      err.password =
        'Password should be atleast one upper case and one special character or a number and minimum 8 character'
    }
    if (!loginData.country) {
      err.country = 'Country is required!'
    }
    if (!loginData.currency) {
      err.currency = 'Currency is required!'
    }

    if (!loginData?.confirm_password) {
      err.confirm_password = 'Confirm Password is required!!'
    }
    if (loginData?.confirm_password !== loginData?.password) {
      err.confirm_password = "Password doesn't match"
    }
    if (!loginData?.phonenumber) {
      err.contact = 'Contact Number is required!'
    } else if (!phoneRegex.test(loginData?.phonenumber)) {
      err.contact = 'Invalid Contact Number'
    }

    return err
  }

  const userData = {
    name: loginData?.name ? loginData?.name : '',
    email: loginData?.email ? loginData?.email : '',
    password: loginData?.password ? loginData?.password : '',
    confirm_password: loginData?.confirm_password ? loginData?.confirm_password : '',
    contact: loginData?.phonenumber ? loginData?.phonenumber : '',
    country: loginData?.country ? loginData?.country : '',
    phone_code: dialcode ? dialcode : '',
    currency: loginData?.currency ? loginData?.currency : ""
  }


  const handleSubmit = async () => {
    setFormErr(personalInfoValidation())
    if (Object.keys(personalInfoValidation()).length == 0) {
      await dispatch(sellerRegisterAsync(userData))
      setLoginData('')

    }
  }

  const onChangeTermsCondition = () => {
    setChecked(!checked)
  }

  const dialCode = (e) => {
    data?.map((ele) => {
      if (e.target.value == ele.name) {
        setDialCode(ele.dial_code)
      }
    })
  }


  return (
    <>
      <NavTopBar />
      <section className='mb-5 pb-5'>
        <div className="d-flex justify-content-end mb-3 mt-4 me-3">
          <BackButton />
        </div>
        <div className="mt-3 p-5 height-max-content container">
          <h3 className="text-start mb-4">Seller Register</h3>

          <div className="shadow-sm mt-3 p-4 mt-4">
            <Row xs={1} md={1} lg={2}>
              <Col>
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">Name*</label>
                    <Form.Control
                      required
                      file="text"
                      value={loginData.name ? loginData.name : ""}
                      className="email-input  bg-none "
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-danger">{formErr?.name}</p>
                </div>
              </Col>
              <Col>
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">Email*</label>
                    <Form.Control
                      type="email"
                      value={loginData?.email ? loginData?.email : ""}
                      className="email-input  bg-none "
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-danger">{formErr?.email}</p>
                </div>
              </Col>
            </Row>
            <Row xs={1} md={1} lg={2}>
              <Col>
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Password*</label>
                    <Form.Control
                      required
                      type="password"
                      value={loginData.password ? loginData.password : ""}
                      className="email-input  bg-none "
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-danger">{formErr?.password}</p>
                </div>
              </Col>
              <Col>
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Confirm Password*</label>
                    <Form.Control
                      required
                      type="password"
                      className="email-input  bg-none "
                      value={loginData.confirm_password ? loginData.confirm_password : ""}
                      name="confirm_password"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="text-danger">{formErr?.confirm_password}</p>
                </div>
              </Col>
            </Row>
            <Row xs={1} md={1} lg={2}>
              <Col>
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">Country*</label>
                  <Form.Select
                    className="w-100"
                    aria-label="Default select example"
                    name="country"
                    value={loginData.country ? loginData.country : ""}
                    onChange={(e) => {
                      handleChange(e)
                      dialCode(e)
                    }}
                  >
                    {' '}
                    <option className="text-muted" value="">
                      Countries
                    </option>
                    {data?.map((ele, index) => (
                      <option key={index}>{ele.name}</option>
                    ))}
                  </Form.Select>
                  <p className="text-danger">{formErr?.country}</p>
                </div>
              </Col>
              <Col>
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <label className="fs-6 fw-normal ">Contact Number*</label>
                  <div className="d-flex align-items-center">
                    <div className="me-2 w-50   phone-register-st">
                      <Form.Control
                        className=""
                        style={{ marginRight: '45px' }}
                        disabled
                        type="text"
                        value={dialcode}
                      />
                    </div>
                    <div className="me-2 w-100">
                      <Form.Control
                        required
                        type="text"
                        maxLength={10}
                        value={loginData.phonenumber ? loginData.phonenumber : ''}
                        className="email-input  bg-none addtext "
                        name="phonenumber"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <p className="text-secondary  " style={{ fontSize: '12px' }}>
                    {' '}
                    That number will be used for whatsapp communication..
                  </p>

                  <p className="text-danger">{formErr?.contact}</p>
                </div>
              </Col>
            </Row>
            <Row xs={1} md={1} lg={2}>
              <Col>
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">Currency*</label>
                  <Form.Select
                    className="w-100"
                    aria-label="Default select example"
                    name="currency"
                    value={loginData.currency}
                    onChange={handleChange}
                  >
                    {' '}
                    <option className="text-muted" >
                      Currency
                    </option>
                    {subjectData?.data?.data?.currency?.map((ele, index) => (
                      <option key={index}>{ele.currencyCode}</option>
                    ))}
                  </Form.Select>
                  <p className="text-danger">{formErr?.currency}</p>
                </div>
              </Col>
            </Row>

            <div className="d-flex pt-3">
              <Form.Check
                required
                checked={checked}
                name="is_agree"
                label=<span>  I agree to the TEACHERCOOL <Link style={{ textDecoration: "none" }} to="/teachercoolprivacypolicy"> Privacy policies & Terms </Link> </span>
                feedback="You must agree before submitting."
                feedbackType="invalid"
                onChange={onChangeTermsCondition}
              />
              <p className="px-2"></p>
            </div>
            <p className="text-danger">{formErr?.is_agree}</p>

            <div className="d-flex justify-content-end ml-3">
              <Button className="button-custom mx-2" onClick={handleSubmit}>
                Sign up
              </Button>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default SellerRegister
