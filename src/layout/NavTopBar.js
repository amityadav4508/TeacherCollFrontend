import React from 'react'
import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/landing-page/logo.svg'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeaderNav,
} from '@coreui/react'
import avatar8 from '../assets/images/avatars/Avatar0.jpg'
import dropicn from '../assets/images/st-landing/drop-icn-st.svg'
import phnsos from '../assets/images/st-landing/phone-icn-sos.svg'
import { getTeacherStatsAsync } from 'src/store/features/TeacherStatsinfo'
import { useDispatch, useSelector } from 'react-redux'
import { sosEmailSliceAsync } from 'src/store/features/sosEmailSlice'
import { Button, Modal } from 'react-bootstrap'
import Loader from 'src/Views/Loader/Loader'
import { checkSubscriptionAsync } from 'src/store/features/MainPageContentSlice'
import { serviceCheckAsync } from 'src/store/features/PostQuestionSlice'

const NavTopBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { teacherStats } = useSelector((state) => state?.TeacherStats)
  const [teacher, setTeacher] = useState(false)

  let teacher_Name = teacherStats?.data?.data
  const [data1, setData1] = useState('')
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const teacherAuth = JSON.parse(localStorage.getItem('teacherAuth'))
  const { sosloading } = useSelector((state) => state.sosEmail)
  const { meetingLoading } = useSelector((state) => state.meeting)
  const { subscription_status, mainContentloading } = useSelector((state) => state.mainPageContent)
  const { careerLoading, jobLoading } = useSelector((state) => state.getJobs)
  const { orderReLoading } = useSelector((state) => state.AssignmentbyId)
  const { loading } = useSelector((state) => state.auth)
  const { orderloading } = useSelector((state) => state.StudentOrders)
  const { userloading } = useSelector((state) => state.userSingleId)
  const { checkplanloading } = useSelector((state) => state.CheckoutPlans)
  const { Assistanceloading } = useSelector((state) => state.postQuestionResponse)

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

  useEffect(() => {
    if (Token) {
      if (data1 == 'student') {
        dispatch(getTeacherStatsAsync())
      }
    }
  }, [data1, Token])

  useEffect(() => {
    if (teacher) {
      navigate('/login')
    }
  }, [teacher, navigate])

  const Logout = async () => {
    if (teacherAuth) {
      await setTeacher(true)
      await localStorage.removeItem('teacherAuth')
      await localStorage.removeItem('checkType')
    }
  }
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  const handleSos = async () => {
    await dispatch(sosEmailSliceAsync())
    await setShow(false)
  }

  useEffect(() => {
    if (Token) {
      dispatch(checkSubscriptionAsync())
    }
  }, [Token])

  return (
    <header>
      <div className="header-wrapper">
        {sosloading ||
        meetingLoading ||
        careerLoading ||
        mainContentloading ||
        loading ||
        orderloading ||
        userloading ||
        orderReLoading ||
        jobLoading ||
        checkplanloading ||
        Assistanceloading ? (
          <div className=" d-flex justify-content-center zIndex load-custom ">
            <Loader />
          </div>
        ) : (
          ''
        )}
        <div className="main-container container">
          <div className="row">
            <div className="col">
              <header className="header main-header border-0">
                <nav className="navbar  navbar-dark navbar-expand-lg nav-custom w-100">
                  <div className="container-fluid">
                    <div>
                      <Link
                        className="navbar-brand"
                        to={data1 == 'teacher' || 'student' ? '/' : '/home'}
                      >
                        <img src={logo} className="img-fluid " alt="logo" />
                      </Link>
                    </div>

                    <button
                      className="navbar-toggler toggle-custom-color"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarText"
                      aria-controls="navbarText"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <div className="main-navbar-wrap">
                          <li className="nav-item">
                            <Link
                              className="nav-link me-md-2 me-xl-3 me-xxl-5 "
                              // aria-current="page"
                              to={data1 == 'teacher' ? '/' : '/home'}
                            >
                              Home
                            </Link>
                          </li>
                          <li className="nav-item">
                            {data1 == 'teacher' ? (
                              <Link
                                className="nav-link me-md-2 me-xl-3 me-xxl-5 "
                                //  aria-current="page"
                                to="/"
                              >
                                Services
                              </Link>
                            ) : (
                              <button
                                className="bg-transparent border-0 service-btn   pt-0  me-1 me-md-1 me-lg-1 me-xl-3 me-xxl-5 p-0 service-navbar-link hoverText"
                                onClick={() => {
                                  dispatch(serviceCheckAsync({ serviceCheck: true }))
                                  navigate('/home')
                                  setTimeout(() => {
                                    dispatch(serviceCheckAsync({ serviceCheck: false }))
                                  }, 1000)
                                }}
                              >
                                Services
                              </button>
                            )}
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link me-md-1 me-xl-3 me-xxl-5 "
                              href="#section2"
                              to={data1 == 'teacher' ? '/' : '/pricing'}
                            >
                              Pricing
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                              className="nav-link me-md-1 me-xl-3 me-xxl-5 "
                              to="/headerarticle"
                            >
                              Article
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link me-md-1 me-xl-3 me-xxl-5 " to="/orderwithus">
                              Order us
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link me-md-3 me-xl-3 me-xxl-5 " to="/careers">
                              Careers
                            </Link>
                          </li>
                        </div>

                        {Token && data1 === 'student' ? (
                          <li className="nav-item">
                            <a className="nav-link me-md-3 me-xl-0 me-xxl-0 pt-2 " href="#section3">
                              <img
                                src={phnsos}
                                className="img-fluid phn-sos"
                                alt="phone"
                                onClick={() => setShow(true)}
                              />
                            </a>
                          </li>
                        ) : (
                          ''
                        )}

                        {Token && data1 === 'teacher' ? (
                          <li className="nav-item mx-1">
                            <Link to="/teacher/dashboard">
                              <button type="button" className="button-custom cancel-button me-md-3">
                                Go To Dashboard
                              </button>
                            </Link>
                          </li>
                        ) : Token && data1 === 'seller' ? (
                          <li className="nav-item mx-1">
                            <Link to="/seller/dashboard">
                              <button type="button" className="button-custom cancel-button me-md-3">
                                Go To Dashboard
                              </button>
                            </Link>
                          </li>
                        ) : Token && data1 === 'student' ? (
                          <li>
                            <CHeaderNav className=" mt-1">
                              <CDropdown variant="nav-item">
                                <CDropdownToggle
                                  placement="bottom-end"
                                  className="py-0"
                                  caret={false}
                                >
                                  <div className="d-flex align-items-center">
                                    <CAvatar src={avatar8} />
                                    <CDropdownHeader className="px-2">
                                      {teacher_Name?.name}({data1})
                                    </CDropdownHeader>
                                    <CAvatar
                                      className="drop-icn-img "
                                      style={{ width: '18px' }}
                                      src={dropicn}
                                    />
                                  </div>
                                </CDropdownToggle>
                                <CDropdownMenu className="pt-0" placement="bottom-end">
                                  {subscription_status?.data?.data?.is_platinum == 0 ? (
                                    ''
                                  ) : (
                                    <Link
                                      className="text-decoration-none"
                                      to="/studentdashboard/chat"
                                    >
                                      <CDropdownItem>Chat</CDropdownItem>
                                    </Link>
                                  )}
                                  <Link className="text-decoration-none" to="/user/studentprofile">
                                    <CDropdownItem>Profile</CDropdownItem>
                                  </Link>
                                  <Link className="text-decoration-none" to="/user/orders">
                                    <CDropdownItem>Orders</CDropdownItem>
                                  </Link>

                                  <Link
                                    className="text-decoration-none"
                                    to="/studentdashboard/rewards"
                                  >
                                    <CDropdownItem>Rewards</CDropdownItem>
                                  </Link>
                                  <Link
                                    className="text-decoration-none"
                                    to="/studentdashboard/home"
                                  >
                                    <CDropdownItem>Dashboard</CDropdownItem>
                                  </Link>
                                  <Link
                                    className="text-decoration-none"
                                    to="/user/studentnotification"
                                  >
                                    <CDropdownItem>Notification</CDropdownItem>
                                  </Link>
                                  <Link className="text-decoration-none" to="/user/changepassword">
                                    <CDropdownItem>Change Password</CDropdownItem>
                                  </Link>
                                  {subscription_status?.data?.data?.is_platinum == 0 ? (
                                    ''
                                  ) : (
                                    <Link
                                      className="text-decoration-none"
                                      to="/meetingschedulelist"
                                    >
                                      <CDropdownItem>Meeting Schedule</CDropdownItem>
                                    </Link>
                                  )}

                                  <CDropdownItem className="Readmore" onClick={Logout}>
                                    Logout
                                  </CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </CHeaderNav>
                          </li>
                        ) : (
                          <>
                            <li className="nav-item">
                              <Link to="/login">
                                <button
                                  type="button"
                                  className="button-custom cancel-button me-md-3"
                                >
                                  Login
                                </button>
                              </Link>
                            </li>

                            <li className="nav-item">
                              <Link to="/register">
                                <button type="button" className="button-custom ">
                                  Sign up
                                </button>
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </nav>
              </header>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton className="border-0"></Modal.Header>
          <Modal.Body>
            <h5 className="text-center">Are you sure you want to send sos email to TeacherCool</h5>
          </Modal.Body>

          <div className="d-flex justify-content-center my-3">
            <div>
              <Button
                className="btn btn-primary button-custom"
                variant="primary"
                onClick={handleSos}
              >
                Yes
              </Button>
              <Button
                className="mx-3 btn btn-primary button-custom cancel-button  bg-white"
                onClick={handleClose}
              >
                No
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </header>
  )
}

export default NavTopBar
