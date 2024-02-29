import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { teacherRegisterAsync } from '../store/features/AuthSlice'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { getList } from 'country-list-with-dial-code-and-flag'
import { toast } from 'react-toastify'
import Loader from 'src/Views/Loader/Loader'
import CryptoJS from 'crypto-js'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CButton } from '@coreui/react'

const StudentRegister = () => {
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [formErr, setFormErr] = useState({})
  const [submit, setSubmit] = useState(false)
  const [image, setImage] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [checked, setChecked] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [data1, setData1] = useState('')
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const [profilePath, setProfilePath] = useState('')
  const [tempImage, setTempImage] = useState('')
  const [imgageShow, setImgageShow] = useState('')
  const { subjectData } = useSelector((state) => state.subject)
  
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

  const data = getList()

  const [dialcode, setDialCode] = useState('')
  const [loginData, setLoginData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phonenumber: '',
    country: '',
    confirm_password: '',
    reffer_code: '',
    is_agree: null,
    currency: '',
  })

  function handleChange(e) {
    setFormErr('')
    setSubmit(false)
    const { name, value } = e.target
    const onlyAlphabet = /^[a-zA-Z]*$/

    if (name == 'working_hours') {
      let income = value * 30
      setLoginData({ ...loginData, [name]: value, ['expected_income']: income })
    } else if (name === 'phonenumber') {
      const regex = /^\d{0,14}$/
      if (value === '' || regex.test(value)) {
        setLoginData({ ...loginData, [name]: value })
      }
    } else if (name === 'first_name') {
      if (!value || onlyAlphabet.test(value)) {
        setLoginData({ ...loginData, [name]: value.trim() })
      }
    } else if (name === 'last_name') {
      if (!value || onlyAlphabet.test(value)) {
        setLoginData({ ...loginData, [name]: value.trim() })
      }
    } else if (name === 'password') {
      setLoginData({ ...loginData, [name]: value.trim() })
    } else if (name === 'confirm_password') {
      setLoginData({ ...loginData, [name]: value.trim() })
    } else if (name === 'reffer_code') {
      setLoginData({ ...loginData, [name]: value.trim() })
    } else {
      setLoginData({ ...loginData, [name]: value })
    }
  }

  function personalInfoValidation(val) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const preregex = /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const phoneRegex = /^\d{7,14}$/
    const err = {}
    if (val.email.length == 0) {
      err.email = 'Email is required!'
    }
    if (val.email.length > 0 && !regex.test(val.email)) {
      err.email = 'This is not a valid email format!'
    }
    if (!val.password) {
      err.password = 'Password is required!'
    } else if (!preregex.test(val.password)) {
      err.password =
        'Password should be atleast one upper case and one special character or a number and minimum 8 character'
    }
    if (!val.first_name) {
      err.first_name = 'First Name is required!'
    }
    if (!val.contact) {
      err.contact = 'Contact Number is required!'
    } else if (!phoneRegex.test(val.contact)) {
      err.contact = 'Invalid Contact Number'
    }
    if (!val.country) {
      err.country = 'Country is required!'
    }
    if (!val.confirm_password) {
      err.confirm_password = 'Confirm Password is required!!'
    }
    if (val.confirm_password !== val.password) {
      err.confirm_password = "Password doesn't match"
    }
    if (!checked) {
      err.is_agree = 'You must agree before submitting.'
    }
    if (!val.currency) {
      err.currency = 'Currency is required!'
    }
    return err
  }

  const userData = {
    profile: profileImage ? profileImage : null,
    first_name: loginData?.first_name ? loginData?.first_name : '',
    last_name: loginData?.last_name ? loginData?.last_name : '',
    email: loginData?.email ? loginData?.email : '',
    password: loginData?.password ? loginData?.password : '',
    country: loginData?.country ? loginData?.country : '',
    contact: loginData?.phonenumber ? loginData?.phonenumber : '',
    confirm_password: loginData?.confirm_password ? loginData?.confirm_password : '',
    reffer_code: loginData?.reffer_code ? loginData?.reffer_code : '',
    is_agree: loginData.checked,
    is_teacher_request: '0',
    currency: loginData.currency,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await setFormErr(personalInfoValidation(userData))
    await setSubmit(true)
  }

  const uploadImage = (e) => {
    setProfileImage(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  useEffect(() => {
    if (submit) {
      const formData = new FormData()
      formData.append('profile', profileImage ? profileImage : null)
      formData.append('first_name', loginData?.first_name ? loginData?.first_name : '')
      formData.append('last_name', loginData?.last_name ? loginData?.last_name : '')
      formData.append('email', loginData?.email ? loginData?.email : '')
      formData.append('password', loginData?.password ? loginData?.password : '')
      formData.append('phone_code', dialcode ? dialcode : '')
      formData.append('country', loginData?.country ? loginData?.country : '')
      formData.append('contact', loginData?.phonenumber ? loginData?.phonenumber : '')
      formData.append(
        'confirm_password',
        loginData?.confirm_password ? loginData?.confirm_password : '',
      )
      formData.append('reffer_code', loginData?.reffer_code ? loginData?.reffer_code : '')
      formData.append('is_agree', loginData.checked)
      formData.append('is_teacher_request', '0')
      formData.append('currency', loginData.currency)

      if (Object.keys(formErr).length === 0) {
        dispatch(teacherRegisterAsync(formData))
      }
    }
  }, [formErr, submit])

  const handleErr = () => {}

  const onChangeTermsCondition = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    if (data1 === 'teacher' && Token) {
      return setTimeout(() => {
        toast.success('Please verify your account through email')
        navigate('/teacher/dashboard')
      }, 1000)
    } else if (Token && data1 === 'teacher') {
      return setTimeout(() => {
        toast.success('Please verify your account through email')
        navigate('/teacher/dashboard')
      }, 1000)
    }
    if (data1 === 'student' && Token) {
      return setTimeout(() => {
        toast.success('Please verify your account through email')
        navigate('/student')
      }, 1000)
    } else if (Token && data1 === 'student') {
      return setTimeout(() => {
        toast.success('Please verify your account through email')
        navigate('/student')
      }, 1000)
    }
  }, [user, data1, Token])

  const dialCode = (e) => { 
    data?.map((ele) => {
      if (e.target.value == ele.name) {
        setDialCode(ele.dial_code)
      }
    })
  }

  return (
    <div className="mt-3">
      <Row xs={1} md={2} lg={2}>
        <div className="avta-upload-main-outer p-4 align-items-center">
          <div className="avatar-upload mb-3">
            <div className="avatar-edit">
              <input
                type="file"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                onChange={(data) => {
                  if (
                    data.target.files[0].type == 'image/png' ||
                    data.target.files[0].type == 'image/jpeg' ||
                    data.target.files[0].type == 'image/jpg'
                  ) {
                    setTempImage(data?.target?.files[0])
                    setImgageShow(URL.createObjectURL(data?.target?.files[0]))
                    uploadImage(data)
                  } else if (
                    data.target.files[0].type !== 'image/png' ||
                    data.target.files[0].type !== 'image/jpeg' ||
                    data.target.files[0].type !== 'image/jpg'
                  ) {
                    toast.error('Please select only jpeg ,jpg & png')
                  }
                }}
              />
              <label
                htmlFor="imageUpload"
                className="d-flex justify-content-center align-items-center"
              >
                <FontAwesomeIcon icon={faPen} />
              </label>
            </div>

            <div className="avatar-preview position-relative">
              <div id="imagePreview">
                {imgageShow ? (
                  ''
                ) : (
                  <span className="position-absolute image-text-bg">
                    Image size should be 150*200
                  </span>
                )}
                <img
                  src={
                    imgageShow
                      ? imgageShow
                      : `${process.env.REACT_APP_API_URL}/public/storage/${profilePath}`
                  }
                  alt="a"
                />
              </div>
            </div>
          </div>
          <h6 className="w-75 ms-4 up-pic-mandatory">
            Upload Picture <span> (Non mandatory)</span>{' '}
          </h6>
        </div>
      </Row>
      <Row xs={1} md={2} lg={2}>
        <Col>
          <div className=" justify-content-between tabs-inner-content mb-3">
            <div className="me-2 w-100">
              <label className="fs-6 fw-normal my-1">First Name*</label>
              <Form.Control
                required
                file="text"
                maxLength={15}
                value={loginData.first_name}
                className="email-input  bg-none "
                name="first_name"
                onChange={handleChange}
                onClick={handleErr}
              />
            </div>
            <p className="text-danger">{formErr?.first_name}</p>
          </div>
        </Col>
        <Col>
          <div className=" justify-content-between tabs-inner-content mb-3">
            <div className="me-2 w-100">
              <label className="fs-6 fw-normal my-1">Last Name</label>
              <Form.Control
                file="text"
                maxLength={15}
                value={loginData.last_name}
                className="email-input  bg-none "
                name="last_name"
                onChange={handleChange}
                onClick={handleErr}
              />
            </div>
            {/* <p className="text-danger">{formError?.last_name}</p> */}
          </div>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={2}>
        <Col>
          <div className=" justify-content-between tabs-inner-content mb-3">
            <div className="me-2 w-100">
              <label className="fs-6 fw-normal my-1">Email*</label>
              <Form.Control
                type="email"
                value={loginData?.email}
                className="email-input  bg-none "
                name="email"
                onChange={handleChange}
                onClick={handleErr}
              />
            </div>
            <p className="text-danger">{formErr?.email}</p>
          </div>
        </Col>
        <Col>
          <div className="me-2 w-100">
            <label className="fs-6 fw-normal my-1">Country*</label>
            <Form.Select
              className="w-100"
              aria-label="Default select example"
              name="country"
              value={loginData.country}
              onChange={(e)=>{
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
      </Row>
      <Row xs={1} md={2} lg={2}>
        <Col>
          <div className=" justify-content-between tabs-inner-content mb-3">
            <label className="fs-6 fw-normal mb-2">Contact Number*</label>
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
                  value={loginData.phonenumber}
                  className="email-input  bg-none "
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
      <Row xs={1} md={2} lg={2}>
        <Col>
          <div className=" justify-content-between tabs-inner-content mb-3">
            <div className="me-2 w-100">
              <label className="fs-6 fw-normal my-1"> Password*</label>
              <Form.Control
                required
                type="password"
                value={loginData.password}
                className="email-input  bg-none "
                name="password"
                onChange={handleChange}
                onClick={handleErr}
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
                value={loginData.confirm_password}
                name="confirm_password"
                onChange={handleChange}
                onClick={handleErr}
              />
            </div>
            <p className="text-danger">{formErr?.confirm_password}</p>
          </div>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={2}>
        <Col>
          <div className=" justify-content-between tabs-inner-content mb-2">
            <div className="me-2 w-100">
              <label className="fs-6 fw-normal my-1"> Referal Code</label>
              <Form.Control
                required
                type="text"
                className="email-input  bg-none "
                value={loginData?.reffer_code ? loginData?.reffer_code : null}
                name="reffer_code"
                onChange={handleChange}
                onClick={handleErr}
                //   reffer_code
              />
            </div>
            <p className="text-danger">{formErr?.reffer_code}</p>
          </div>
        </Col>
      </Row>
      <div className="d-flex pt-2">
        <Form.Check
          required
          checked={checked}
          name="is_agree"
          label= <span>I agree to the TEACHERCOOL <Link style={{textDecoration:"none"}} to="/teachercoolprivacypolicy"> Privacy policies & Terms </Link> </span>
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
      <div className="d-flex justify-content-center mb-3">
            <Link className="  seller-login-link" to="/seller-register">
              Signup as a Seller
            </Link>
          </div>
        <div className="main-navbar-wrap justify-content-center align-items-center mt-3">
                            <h5 className="fs-6 fw-normal pt-2 px-2 text-center">Already have an account ? </h5>
                            <Link to="/login" className="text-login">
                              <CButton color="link" className="px-0 link-color fs-6 fw-normal">
                                Login
                              </CButton>
                            </Link>
                          </div>
                  
      {loading ? (
        <div className="d-flex justify-content-center zIndex load-custom">
          <Loader />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default StudentRegister
