import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CForm, CInputGroup, CRow } from '@coreui/react'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'
import {
  teacherLoginAsync,
  clearAllState,
  linkedinloginAsync,
  linkedinEmail,
  registerSocial,
} from '../../store/features/AuthSlice'
import logoImge from '../../assets/images/login-logo.svg'
import tickSvg from '../../assets/images/tick.svg'
import tickSvgdull from '../../assets/images/tick-dull.svg'
import linkedinIcon from '../../assets/images/linkedin.svg'
import { LinkedInPage } from '../../SocialLogin/LinkedInLogin'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Row, Col } from 'react-bootstrap'
import Loader from 'src/Views/Loader/Loader'
import GoogleLoginCustom from 'src/SocialLogin/googleLogin'
import CryptoJS from 'crypto-js'
import FacebookLoginCustom from 'src/SocialLogin/facebookLogin'
import axios from 'axios'

const TeacherLogin = () => {
  const [searchParams] = useSearchParams()
  console.log(searchParams, 'searchParams')
  const code = searchParams.get('code')
  console.log(code, 'coddeeeeeeeeeeeee')
  const [formErr, setFormErr] = useState({})
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)
  const error1 = useSelector((state) => state.auth)
  const teacherProfileStatus = useSelector((state) => state.teacherauth.TeacherProfilePending)
  const [checked, setChecked] = useState(false)
  const [checkErr, setCheckErr] = useState('')
  const [toggle, setToggle] = useState(2)
  const { errorMsg, socialLogin, status } = useSelector((state) => state.auth)
  const [data1, setData1] = useState('')
  const secretPass = 'XkhZG4fW2t2W'
  const checkTypes = JSON.parse(localStorage.getItem('checkType'))
  const { userCode } = useParams()
  const { id } = useParams()

  useEffect(() => {
    if (checkTypes) {
      let bytes = CryptoJS?.AES?.decrypt(checkTypes, secretPass)
      setData1(JSON.parse(bytes?.toString(CryptoJS?.enc?.Utf8)))
    }
  }, [checkTypes])

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormErr(validate(loginData))
    setSubmit(true)
  }

  function validate(val) {
    const err = {}
    if (!val.email) {
      err.email = 'Email is required!'
    }

    if (!val.password) {
      err.password = 'Password is required!'
    }

    return err
  }

  const checklogin = {
    email: loginData?.email,
    password: loginData?.password,
    user_type: toggle,
  }

  useEffect(() => {
    if (Object.keys(formErr).length === 0 && submit) {
      dispatch(teacherLoginAsync(checklogin))
    }
  }, [formErr, checkErr, submit, dispatch])

  useEffect(() => {
    if (teacherProfileStatus) {
      navigate('/teacher/profilereview')
    }
  }, [teacherProfileStatus, navigate])

  const teacher = JSON.parse(localStorage.getItem('teacherAuth'))

  useEffect(() => {
    if (teacher && teacher && data1 && data1 == 'teacher') {
      navigate('/teacher/dashboard')
    }
    if (teacher && teacher && data1 && data1 == 'student') {
      navigate('/home')
    }
  }, [teacher, error1, data1, navigate])

  useEffect(() => {
    if (errorMsg && status == 500) {
      toast.error(errorMsg)
      dispatch(clearAllState())
    }
  }, [errorMsg, status, dispatch])

  const toggleHandle = (data) => {
    setToggle(data)
    localStorage.setItem('userlogged',data)
  }

  const checkedData = () => {
    setChecked(!checked)
    setCheckErr('')
  }

  const [accessToken, setAccessToken] = useState('')
  useEffect(() => {
    if (code) {
      handleLinkedInLogin()
    }
  }, [code])

  const handleLinkedInLogin = () => {
    return new Promise((resolve, reject) =>
      axios
        .get(
          // `https://www.linkedin.com/oauth/v2/accessToken?code=${code}&client_id=86veboemqxn1ai&scope=scope=r_liteprofile%20r_emailaddress%20w_member_social&client_secret=esVsQ5oFTLILSy8X&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_SERVER_URL}login`,
          `https://www.linkedin.com/oauth/v2/accessToken?code=${code}&client_id=78eo1izdyn46ku&client_secret=TMf3z7htgR9EDh38&scope=r_liteprofile%20r_emailaddress&grant_type=authorization_code&redirect_uri=${process.env.REACT_APP_SERVER_URL}login`,
        )
        .then(function (response) {
          if (response?.data?.access_token) {
            setAccessToken(response?.data?.access_token)
          }                                                 
          resolve(response)
          console.log(response, "res01")
        })
        .catch(function (error) {
          // reject(error.response.data.error)
          console.log(error)
        }),
    )
  }

  useEffect(() => {
    if (accessToken) {
      handleGetLinkedInUserInfo()
    }
  }, [accessToken])

const loggedType= localStorage.getItem('userlogged')
  const linkedInData={
    token:accessToken,
    user_type:loggedType,
    social_type:"linkedIn"
  }

  const handleGetLinkedInUserInfo = () => {
    dispatch(registerSocial(linkedInData))

  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center ">
      {loading ? (
        <div className="d-flex justify-content-center zIndex load-custom">
          <Loader />
        </div>
      ) : (
        <Container fluid>
          <Row md={12} className="justify-content-center ">
            <Col className="p-0">
              <CCardGroup className="card-main-signin">
                <CCard
                  className={
                    toggle == 1
                      ? 'text-white py-5 pt-3 login-img'
                      : 'text-white py-5 pt-3 login-img1'
                  }
                  style={{ width: '44%' }}
                >
                  <div className="ps-3">
                    <img src={logoImge} onClick={() => navigate('/')} alt="react img"/>
                  </div>
                  <CCardBody className="text-center d-flex ">
                    <div className="best-learning">
                      <h2 className=" text-start ms-3" style={{ fontSize: '22px' }}>
                        {' '}
                        A System Which Provides
                      </h2>
                      <h3 className="text-start ms-3 fw-bold">Best Classes for </h3>
                      <h3 className="text-start ms-3 fw-bold">Best Learning </h3>
                    </div>
                  </CCardBody>
                </CCard>
                <CCard className="p-4 pt-2 pt-lg-4 ">
                  <CCardBody className=" m-auto card-inner-width mt-0 mt-lg-5">
                    <CForm className="pt-3" onSubmit={handleSubmit}>
                      <div className="login-right">
                        <h1 className=" mt-4 fw-bold">Login</h1>
                        <p className="text-medium-emphasis fw-normal fs-6 ">
                          A new way to experience Learning with the best teachers.
                        </p>
                      </div>

                      <CInputGroup className="mb-3">
                        <div className="w-100">
                          <Form.Label className="fs-6 fw-normal labe-color">Email</Form.Label>
                          <div className="position-relative">
                            <span className="position-absolute px-3 py-1">
                              <svg
                                width="17"
                                height="14"
                                viewBox="0 0 17 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17 1.7C17 0.765 16.235 0 15.3 0H1.7C0.765 0 0 0.765 0 1.7V11.9C0 12.835 0.765 13.6 1.7 13.6H15.3C16.235 13.6 17 12.835 17 11.9V1.7ZM15.3 1.7L8.5 5.95L1.7 1.7H15.3ZM15.3 11.9H1.7V3.4L8.5 7.65L15.3 3.4V11.9Z"
                                  fill="#606176"
                                />
                              </svg>
                            </span>
                            <Form.Control
                              required
                              className="email-input  px-5 "
                              name="email"
                              autoComplete="username"
                              value={loginData.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <p className="text-danger">{formErr.email}</p>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <div className="w-100">
                          <Form.Label className="fs-6 fw-normal labe-color">Password</Form.Label>
                          <div className="position-relative">
                            <span className="position-absolute px-3 py-1">
                              <svg
                                className=""
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg "
                              >
                                <path
                                  d="M4.99884 16C3.79152 15.9992 2.62521 15.562 1.71514 14.769C0.805071 13.9759 0.212652 12.8806 0.0472025 11.6852C-0.118247 10.4897 0.154438 9.27483 0.814941 8.26461C1.47544 7.25439 2.47919 6.51706 3.64096 6.18867C4.48539 5.94696 5.37919 5.93591 6.22935 6.15667L11.5035 0.886012C11.7835 0.604201 12.1167 0.380769 12.4837 0.228677C12.8508 0.0765844 13.2444 -0.00113987 13.6417 1.26315e-05C14.267 0.000542252 14.8665 0.249073 15.3087 0.691044C15.7508 1.13301 15.9995 1.7323 16 2.35734C16.001 2.75454 15.9233 3.148 15.7713 3.51497C15.6192 3.88195 15.3959 4.21516 15.1143 4.49534L14.6661 4.94334C14.4153 5.1923 14.0765 5.33243 13.7231 5.33334H12.6653V6.00001C12.6653 6.35363 12.5248 6.69277 12.2746 6.94282C12.0245 7.19286 11.6852 7.33334 11.3314 7.33334H10.6645V8.39067C10.665 8.56583 10.6307 8.73934 10.5636 8.90115C10.4965 9.06297 10.3979 9.20986 10.2737 9.33334L9.84015 9.76667C10.0622 10.6161 10.0514 11.5096 9.8088 12.3533C9.53583 13.3147 8.98201 14.1727 8.21825 14.8175C7.45449 15.4623 6.51557 15.8645 5.52172 15.9727C5.34801 15.9907 5.17349 15.9998 4.99884 16ZM4.99884 7.33334C4.316 7.33268 3.64652 7.52256 3.06578 7.8816C2.48504 8.24064 2.01608 8.75459 1.71171 9.36559C1.40733 9.9766 1.27961 10.6604 1.34294 11.34C1.40626 12.0197 1.65811 12.6681 2.07013 13.2124C2.48215 13.7567 3.03799 14.1753 3.67508 14.4209C4.31216 14.6666 5.0052 14.7296 5.67618 14.6029C6.34716 14.4762 6.96944 14.1648 7.47297 13.7038C7.9765 13.2428 8.34129 12.6504 8.52628 11.9933C8.73436 11.271 8.71104 10.5017 8.45959 9.79334C8.41855 9.67503 8.41167 9.54757 8.43974 9.42554C8.46782 9.3035 8.5297 9.19184 8.61832 9.10334L9.33061 8.39067V7.33334C9.33061 6.97972 9.47114 6.64058 9.72129 6.39053C9.97144 6.14048 10.3107 6.00001 10.6645 6.00001H11.3314V5.33334C11.3314 4.97972 11.472 4.64058 11.7221 4.39053C11.9723 4.14049 12.3115 4.00001 12.6653 4.00001H13.7231L14.1712 3.55201C14.3286 3.39545 14.4534 3.20925 14.5383 3.00419C14.6233 2.79914 14.6667 2.57928 14.6661 2.35734C14.6659 2.08593 14.558 1.82568 14.3661 1.6337C14.1742 1.44172 13.9139 1.3337 13.6424 1.33334C13.4202 1.3328 13.2001 1.3763 12.9948 1.46132C12.7896 1.54634 12.6032 1.6712 12.4465 1.82868L6.89028 7.38201C6.80161 7.47059 6.68975 7.53241 6.56754 7.56035C6.44533 7.5883 6.31772 7.58125 6.19933 7.54001C5.81255 7.40388 5.40556 7.33401 4.99551 7.33334H4.99884ZM3.32816 12C3.32816 12.1319 3.36728 12.2608 3.44056 12.3704C3.51385 12.48 3.61801 12.5655 3.73988 12.6159C3.86174 12.6664 3.99584 12.6796 4.12521 12.6539C4.25459 12.6281 4.37342 12.5646 4.4667 12.4714C4.55997 12.3782 4.62349 12.2594 4.64922 12.1301C4.67496 12.0007 4.66175 11.8667 4.61127 11.7449C4.56079 11.6231 4.47531 11.5189 4.36563 11.4457C4.25596 11.3724 4.12701 11.3333 3.9951 11.3333C3.81822 11.3333 3.64858 11.4036 3.5235 11.5286C3.39843 11.6536 3.32816 11.8232 3.32816 12Z"
                                  fill="#606176"
                                />
                              </svg>
                            </span>

                            <Form.Control
                              required
                              className="email-input px-5 "
                              type="password"
                              name="password"
                              autoComplete="current-password"
                              value={loginData.password}
                              onChange={handleChange}
                            />
                            <p className="text-danger">{formErr.password}</p>
                          </div>
                        </div>
                      </CInputGroup>
                      <div className="main-navbar-wrap justify-content-between text-aligned-wrap">
                        <div className="d-flex justify-content-center mb-2 mb-lg-0">
                          {' '}
                          <Form.Check
                            className="rounded me-3 "
                            type="checkbox"
                            name="is_agree"
                            isChecked={checked}
                            onChange={checkedData}
                          />
                          Remember me
                        </div>

                        <Link to="/forgotpassword" className="link-color fs-6 fw-normal ">
                          Forgot Password
                        </Link>
                      </div>

                      <p className="text-danger">{checkErr}</p>
                      <div className="d login-btn-wrap-main my-2  my-3">
                        <div
                          className={
                            toggle == 2
                              ? 'login-teacher  me-4 mb-3 mb-lg-2 mb-xl-0 '
                              : 'login-student me-4 mb-3 mb-lg-2 mb-xl-0 '
                          }
                        >
                          <Button
                            onClick={(e) => toggleHandle(e.target.id)}
                            className="rounded-pill login-button"
                            id="2"
                            variant=""
                          >
                            Login As A Student
                          </Button>
                          <img
                            className="tickSvg me-2"
                            src={toggle == 2 ? tickSvg : tickSvgdull}
                            alt="React Image"
                          />
                        </div>
                        <div
                          className={
                            toggle == 1
                              ? 'login-teacher me-4  mb-3 mb-lg-2 mb-xl-0'
                              : 'login-student me-4 mb-3 mb-lg-2 mb-xl-0 '
                          }
                        >
                          <Button
                            onClick={(e) => toggleHandle(e.target.id)}
                            className="rounded-pill login-button "
                            variant=""
                            id="1"
                          >
                            Login As A Teacher
                          </Button>
                          <img
                            className="tickSvg me-2"
                            src={toggle == 1 ? tickSvg : tickSvgdull}
                            alt="React Image"
                          />
                        </div>
                      </div>
                      <p className="text-danger">{formErr.user_type}</p>
                      <hr className=" my-lg-5 "></hr>
                      <div className="mt-1 mb-1 mb-lg-4 text-aligned-wrap">
                        <h6 className="px-3 fs-6 fw-normal bottom-margin-wrap text-center mb-3">Or, login with</h6>
                        <Row className='justify-content-center'>
                          <Col md={1} className="mb-3">
                            <p className="button bg-transparent border-0 tickSvg mb-0">
                              <FacebookLoginCustom userType={toggle}/>
                            </p>
                          </Col>
                          <Col className='google-login-wrapper bottom-margin-wrap' md={6}>
                            <span className="tickSvg">
                              <GoogleLoginCustom userType={toggle}/>
                            </span>
                          </Col>
                          <Col className="tickSvg ps-0" md={1}>
                            {/* <span className='bg-transparent border-0 button' onClick={handleLinkedIn}><img src={linkedinIcon} /></span>*/}
                             {/* <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&scope=r_liteprofile%20r_emailaddress&client_id=86veboemqxn1ai&redirect_uri=${process.env.REACT_APP_SERVER_URL}login`}><img src={linkedinIcon}/></a> */}
                             <a href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78eo1izdyn46ku&scope=r_liteprofile%20r_emailaddress&redirect_uri=${process.env.REACT_APP_SERVER_URL}loginlogin`}><img src={linkedinIcon}/></a>
                            {/* <LinkedInPage /> */}
                          </Col>
                        </Row>
                      </div>
                      <div className="d-flex justify-content-center mb-3">
                        <Link className=" text-decoration-none" to="/seller-login">
                          Login as a Seller{' '}
                        </Link>
                      </div>
                      <CRow>
                        <div className="clm-btn">
                          <Button
                            className={
                              !toggle
                                ? 'login-main mb-3 button-custom'
                                : 'mb-3 button-custom link-color-student'
                            }
                            variant="primary"
                            type="submit"
                          >
                            Login
                          </Button>

                          <div className="main-navbar-wrap justify-content-center align-items-center">
                            <h5 className="fs-6 fw-normal pt-2 px-2 text-center">
                              Don’t have an account ?{' '}
                            </h5>
                            <Link to="/register" className="text-login">
                              <CButton color="link" className="px-0 link-color fs-6 fw-normal">
                                Sign Up
                              </CButton>
                            </Link>
                          </div>
                        </div>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default TeacherLogin
