import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CCard, CCardBody, CCardGroup, CForm, CButton } from '@coreui/react'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'
import { teacherRegisterAsync } from '../../store/features/AuthSlice'
import logoImge from '../../assets/images/login-logo.svg'
import tickSvg from '../../assets/images/tick.svg'
import tickSvgdull from '../../assets/images/tick-dull.svg'
import { Button, Col, Form, Row, } from 'react-bootstrap'
import uploadIcon from '../../assets/images/uploadicon.svg'
import { getList } from 'country-list-with-dial-code-and-flag'
import { toast } from 'react-toastify'
import Loader from 'src/Views/Loader/Loader'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'
import { clearAllState } from 'src/store/features/AuthSlice'
import CryptoJS from 'crypto-js'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StudentRegister from 'src/Student/StudentRegister'

const TeacherRegister = () => {
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const subjectList = useSelector((state) => state.subject.subjectData)
  const status = useSelector((state) => state.auth.status)
  const successMsg = useSelector((state) => state.auth.successMsg)
  const errorMsg = useSelector((state) => state.auth.errorMsg)
  const data = getList()
  const dispatch = useDispatch()
  const [formErr, setFormErr] = useState({})
  const [formError, setFormError] = useState({})
  const [submit, setSubmit] = useState(false)
  const [image, setImage] = useState('')
  const [UploadId, setUploadId] = useState('')
  const [UploadDocs, setUploadDocs] = useState([])
  const [profileImage, setProfileImage] = useState('')
  const [nextPageData, setNextPageData] = useState(false)
  const [submitTab, setSubmitTab] = useState(false)
  const [checked, setChecked] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const [subjects, setSubjects] = useState()
  const [subjectsByCategory, setSubjectsByCategory] = useState()
  const [data1, setData1] = useState('')
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const [dialcode, setDialCode] = useState('')
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

  const [loginData, setLoginData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phonenumber: '',
    confirm_password: '',
    expected_income: '',
    qualification: '',
    subject: '',
    working_hours: '',
    country: '',
    currency: '',
    category: '',
    pan_card:"",
    is_agree: null,
  })

  console.log(formErr,'formErr',loginData)

  useEffect(() => {
    dispatch(getSubjectList())
  }, [])

  useEffect(() => {
    if (subjectList) {
      setSubjects(subjectList?.data?.data?.all_subjects)
      setSubjectsByCategory(subjectList?.data?.data?.subjects_by_category)
    }

  }, [subjectList])

  function handleChange(e) {
    setFormErr('')
    setFormError('')
    setSubmitTab(false)
    setSubmit(false)
    const { name, value } = e.target
    const onlyAlphabet = /^[a-zA-Z]*$/

    if (name == 'working_hours') {
      let income = value * 30
      setLoginData({ ...loginData, [name]: value, ['expected_income']: income })
    } else if (name == 'category') {
      if (value == 1) {
        setSubjects(subjectsByCategory[1])
      } else if (value == 2) {
        setSubjects(subjectsByCategory[2])
      } else {
        setSubjects(subjectList?.data?.data?.all_subjects)
      }
      setLoginData({ ...loginData, [name]: value, ['subject']: '' })
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
    } else {
      setLoginData({ ...loginData, [name]: value })
    }
  }

  useEffect(() => {
    if (Object.keys(formError).length === 0 && submitTab) {
      setNextPageData(true)
    }
  }, [formError, submitTab])

  function ProfessionalInfovalidate(val) {
    console.log(val,'valllll')
    const err = {}
    if (!val.working_hours) {
      err.working_hours = 'Working hours is required!'
    }

    if (!val.expected_income) {
      err.expected_income = 'Expected Income is required!'
    }

    if (!val.qualification) {
      err.qualification = 'Qualification is required!'
    }
    if (!val.subject) {
      err.subject = 'Subject is required!'
    }

    if (!val.category) {
      err.category = ' Category is required '
    }
    if (!val.country) {
      err.country = 'Country is required!'
    }
    if (!val.preferred_currency) {
      err.preferred_currency = 'Currency is required!'
    }
 
    if (!checked) {
      err.is_agree = 'You must agree before submitting.'
    }

    return err
  }
  function personalInfoValidation(val) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const preregex = /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    const phoneRegex = /^\d{7,14}$/
    const err = {}
    if (!val.email) {
      err.email = 'Email is required!'
    }
    if (!regex.test(val.email)) {
      err.email = 'Please enter a valid Email!'
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
    if (!val.country) {
      err.country = 'Country is required!'
    }
    if (!val.contact) {
      err.contact = 'Contact Number is required!'
    } else if (!phoneRegex.test(val.contact)) {
      err.contact = 'Invalid Contact Number'
    }
    if (!val.confirm_password) {
      err.confirm_password = 'Confirm Password is required!'
    }
    if (val.confirm_password.length == 0) {
      err.confirm_password = "Confirm Password is required!"
    }
    if (val.confirm_password != val.password && val.confirm_password.length > 0) {
      err.confirm_password = "Password doesn't match"
    }

    return err
  }

  const userData = {
    profile: profileImage ? profileImage : null,
    first_name: loginData?.first_name ? loginData?.first_name : '',
    last_name: loginData?.last_name ? loginData?.last_name : '',
    email: loginData?.email ? loginData?.email : '',
    password: loginData?.password ? loginData?.password : '',
    contact: loginData?.phonenumber ? loginData?.phonenumber : '',
    confirm_password: loginData?.confirm_password ? loginData?.confirm_password : '',
    expected_income: loginData?.expected_income ? loginData?.expected_income : '',
    qualification: loginData?.qualification ? loginData?.qualification : '',
    subject: loginData?.subject ? loginData?.subject : '',
    category: loginData.category ? loginData.category : '',
    working_hours: loginData?.working_hours ? loginData?.working_hours : '',  
    country: loginData?.country ? loginData?.country : '',
    preferred_currency: loginData?.currency ? loginData?.currency : '',
    pan_card:loginData.pan_card?loginData.pan_card:"",
    id_proof: UploadId ? UploadId : null,
    document_path: UploadDocs ? UploadDocs : null,
    is_teacher_request: '1',
    is_agree: loginData.checked,
  }

  const nextTab = () => {
    setFormError(personalInfoValidation(userData))
    setSubmitTab(true)

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormErr(ProfessionalInfovalidate(userData))
    setSubmit(true)
  }


  const HighestQualificationData = [
    { id: '0', text: 'Phd' },
    { id: '1', text: 'Masters' },
    { id: '2', text: 'Bachelors' },
    { id: '3', text: 'Secondary' },
    { id: '4', text: 'Matric' },
  ]

  const AvailableHours = [
    { id: '0', working_hours: '1 ' },
    { id: '1', working_hours: '2 ' },
    { id: '2', working_hours: '3 ' },
    { id: '3', working_hours: '4 ' },
    { id: '4', working_hours: '5 ' },
    { id: '5', working_hours: '6 ' },
    { id: '6', working_hours: '7 ' },
    { id: '7', working_hours: '8 ' },
    { id: '8', working_hours: '9 ' },
    { id: '9', working_hours: '10 ' },
    { id: '10', working_hours: '11 ' },
    { id: '11', working_hours: '12 ' },
  ]

  const Category = [
    { id: '', category: 'SELECT' },
    { id: '0', category: 'BOTH' },
    { id: '1', category: 'IT' },
    { id: '2', category: 'NON-IT' },
  ]

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
      formData.append('contact', loginData?.phonenumber ? loginData?.phonenumber : '')
      formData.append(
        'confirm_password',
        loginData?.confirm_password ? loginData?.confirm_password : '',
      )
      formData.append(
        'expected_income',
        loginData?.expected_income ? loginData?.expected_income : '',
      )
      formData.append('qualification', loginData?.qualification ? loginData?.qualification : '')
      formData.append('subject', loginData?.subject ? loginData?.subject : '')
      formData.append('category', loginData.category ? loginData.category : '')
      formData.append('working_hours', loginData?.working_hours ? loginData?.working_hours : '')
      formData.append('country', loginData?.country ? loginData?.country : '')
      formData.append('currency', loginData?.currency ? loginData?.currency : '')
      formData.append('pan_card', loginData?.pan_card ? loginData?.pan_card : '')
      formData.append('id_proof', UploadId ? UploadId : null)
      formData.append('document_path', UploadDocs ? UploadDocs : null)
      formData.append('is_teacher_request', '1')
      formData.append('is_agree', loginData.checked)

      if (Object.keys(formErr).length === 0) {
        dispatch(teacherRegisterAsync(formData))
      }
    }
  }, [formErr, submit, dispatch])


  useEffect(() => {
    if (status == 200 && successMsg) {
      toast.success(successMsg)
      dispatch(clearAllState())

      //Redirect to Landing page

      setTimeout(async () => {
        await navigate('/')
      }, [2000])
    }
    if (status == 500) {
      toast.error(errorMsg)
      dispatch(clearAllState())
    }
  }, [status, successMsg, dispatch])

  const uploadIDinfo = (e) => {
    if (
      e.target.files[0].type == 'application/pdf' ||
      e.target.files[0].type == 'application/msword' ||
      e.target.files[0].type == 'image/png' ||
      e.target.files[0].type == 'image/jpg' ||
      e.target.files[0].type == 'image/jpeg'
    ) {
      setUploadId(e.target.files[0])
      var idName = e.target.files[0].name
      document.getElementById('id_name').innerText = idName
    } else {
      toast.error('Unsupported file extension')
      setUploadId('')
      document.getElementById('id_name').innerHTML =
        'Upload <span className="fw-bold ms-1"> ID Proof</span>'
    }

  }

  const uploadDocsinfo = (e) => {
    if (e.target.files[0].size >= 2000000) {
      toast.error('File size must be less then 2MB')

    }
    if (
      e.target.files[0].type == 'application/pdf' ||
      e.target.files[0].type == 'application/doc' ||
      e.target.files[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      e.target.files[0].type == 'application/docx' ||
      e.target.files[0].type == 'application/msword' ||
      e.target.files[0].type == 'image/png' ||
      e.target.files[0].type == 'image/jpg' ||
      e.target.files[0].type == 'image/jpeg'
    ) {
      setUploadDocs(e.target.files[0])
      var fileName = e.target.files[0].name
      document.getElementById('file_name').innerText = fileName

    } else {
      toast.error('Unsupported file extension')
      setUploadDocs('')
      document.getElementById('file_name').innerHTML =
        ' Upload <span className="fw-bold ms-1"> Educational  Docs</span>'
    }
  }

  const onChangeTermsCondition = () => {
    setChecked(!checked)
  }

  const [toggle, setToggle] = useState(2)

  const toggleHandle = (data) => {
    setToggle(data)
  }


  useEffect(() => {
    if (data1 === 'teacher' && Token) {
      return navigate('/teacher/dashboard')
    } else if (Token && data1 === 'teacher') {
      return navigate('/teacher/dashboard')
    }
    if (data1 === 'student' && Token) {
      return navigate('/student/dashboard')
    } else if (Token && data1 === 'student') {
      return navigate('/student/dashboard')
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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container fluid>
        <Row md={12} className="justify-content-center ">
          <Col className="p-0">
            <CCardGroup className="card-main-signin">
              <CCard
                className={
                  toggle==2
                    ? 'text-white py-5 pt-3 login-img1'
                    : 'text-white py-5 pt-3 login-img border-0'
                }
                style={{ width: '44%' }}
              >
                <div className="ps-3">
                  <Link to="/">
                    <img src={logoImge} alt="react img" />
                  </Link>
                </div>
                <CCardBody className="text-center d-flex ">
                  <div className="best-learning ms-4">
                    <h2 className=" text-start ms-3" style={{ fontSize: '22px' }}>
                      {' '}
                      A System Which Provides
                    </h2>
                    <h3 className="text-start ms-3 fw-bold">Best Classes for </h3>
                    <h3 className="text-start ms-3 fw-bold">Best Learning </h3>
                  </div>
                </CCardBody>
              </CCard>
              <CCard className="px-4 ">
                <CCardBody className="px-5">
                  <CForm>
                    <div className="login-right">
                      <h1 className=" mt-4 fw-bold">Sign Up</h1>
                      <p className=" fw-normal fs-6 mb-4 learning-size-wrap">
                        A new way to experience Learning with the best teachers.
                      </p>
                    </div>

                    <div className="login-btn-wrap-main my-2  my-3">


                      <div className={toggle==2 ? 'login-teacher me-4' : 'login-student me-2'}>
                        <Button
                          onClick={(e) => toggleHandle(e.target.id)}
                          className="rounded-pill login-button"
                          id="2"
                          variant=""
                        >
                          SignUp As A Student
                        </Button>
                        <img
                          className="tickSvg me-2"
                          src={toggle==2 ? tickSvg : tickSvgdull}
                          alt="React Image"
                        />
                      </div>
                      <div
                        className={
                          toggle==1 ? 'login-teacher me-4 me-md-2 me-lg-4' : 'login-student me-2'
                        }
                      >
                        <Button
                          onClick={(e) => toggleHandle(e.target.id)}
                          className="rounded-pill login-button "
                          id="1"
                          variant=""
                        >
                          SignUp As A Teacher
                        </Button>
                        <img
                          className="tickSvg me-2"
                          src={toggle==1 ? tickSvg : tickSvgdull}
                          alt="React Image"
                        />
                      </div>

                    </div>
                    <hr className="mb-3 mt-4"></hr>
                    {toggle==1 ? (
                      <div>
                        <div className="d-flex">
                          <h6
                            className={
                              nextPageData === false
                                ? 'border-bottom-sign mx-4 font-bold'
                                : ' mx-0 mx-lg-4 font-bold border-bottom-sign '
                            }
                            onClick={() => setNextPageData(false)}
                          >
                            Personal Information
                          </h6>

                          <h6
                            className={
                              nextPageData === true
                                ? 'border-bottom-sign  mx-4 font-bold text-primary'
                                : ' mx-0 mx-lg-4 font-bold '
                            }
                            onClick={nextTab}
                          >
                            Professional Information
                          </h6>
                        </div>
                        {nextPageData === false ? (
                          <div className="mt-3">
                            <Row xs={1} md={2} lg={2} >
                              <div className="avta-upload-main-outer p-4 align-items-center">
                                <div className="avatar-upload mb-3">
                                  <div className="avatar-edit">
                                    <input
                                      type="file"
                                      id="imageUpload"
                                      accept=".png, .jpg, .jpeg"
                                      className='text-add'
                                      onChange={(data) => {
                                        if (
                                          data.target.files[0].type == 'image/png' ||
                                          data.target.files[0].type == 'image/jpeg' ||
                                          data.target.files[0].type == 'image/jpg'
                                        ) {
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
                                    <label htmlFor="imageUpload" className='d-flex justify-content-center align-items-center'>
                                      <FontAwesomeIcon icon={faPen} />
                                    </label>
                                  </div>

                                  <div className="avatar-preview">
                                    <div id="imagePreview">
                                      {image ? "" :
                                        <span className='position-absolute image-text-bg'>Image size should be 150*200</span>
                                      }
                                      <img
                                        src={image}
                                        alt="r"
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
                                  />
                                </div>
                                <p className="text-danger">{formError?.first_name}</p>
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
                                    />
                                  </div>
                                  {/* <p className="text-danger">{formError?.last_name}</p> */}
                                </div>
                              </Col></Row>
                            <Row xs={1} md={2} lg={2} >
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
                                    />
                                  </div>
                                  <p className="text-danger">{formError?.email}</p>
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
                                  <p className="text-danger">{formError?.country}</p>
                                </div>
                              </Col>
                            </Row>
                            <Row xs={1} md={2} lg={2} >
                              <Col>
                                <div className=" justify-content-between tabs-inner-content mb-3">
                                  <label className="fs-6 fw-normal mb-2 ">Contact Number*</label>
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

                                  <p className="text-danger">{formError?.contact}</p>
                                </div>
                              </Col>
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
                                    />
                                  </div>
                                  <p className="text-danger">{formError?.password}</p>
                                </div>
                              </Col>
                            </Row>
                            <Col>
                              <div className=" justify-content-between tabs-inner-content mb-3">
                                <div className="me-2 width-custom-wraper">
                                  <label className="fs-6 fw-normal my-1"> Confirm Password*</label>
                                  <Form.Control
                                    required
                                    type="password"
                                    className="email-input  bg-none "
                                    value={loginData.confirm_password}
                                    name="confirm_password"
                                    onChange={handleChange}
                                  />
                                </div>
                                <p className="text-danger">{formError?.confirm_password}</p>
                              </div>
                            </Col>
                            <div className="d-flex justify-content-end ">
                              <Button className="button-custom" onClick={nextTab}>
                                Next
                              </Button>
                            </div>
                              <div className="main-navbar-wrap justify-content-center align-items-center mt-3">
                            <h5 className="fs-6 fw-normal pt-2 px-2 text-center">Already have an account ? </h5>
                            <Link to="/login" className="text-login">
                              <CButton color="link" className="px-0 link-color fs-6 fw-normal">
                                Login
                              </CButton>
                            </Link>
                          </div>

                          </div>
                        ) : (
                          <div>
                            <div className="main-navbar-wrap justify-content-between tabs-inner-content mb-3 mt-5">
                              <div className="me-2 w-100">
                                <label className="fs-6 fw-normal my-1">
                                  Highest Qualification*
                                </label>
                                <Form.Select
                                  className="w-100"
                                  aria-label="Default select example"
                                  name="qualification"
                                  value={loginData.qualification}
                                  onChange={handleChange}
                                >
                                  <option className="d-none"></option>

                                  {HighestQualificationData?.map((ele, index) => (
                                    <option key={index}>{ele.text}</option>
                                  ))}
                                </Form.Select>
                                <p className="text-danger">{formErr?.qualification}</p>
                              </div>
                              <div className="w-100">
                                <label className="fs-6 fw-normal my-1">Available Hours*</label>
                                <Form.Select
                                  aria-label="Default select example"
                                  name="working_hours"
                                  value={loginData.working_hours}
                                  onChange={handleChange}
                                >
                                  <option className="d-none"></option>

                                  {AvailableHours?.map((ele, index) => (
                                    <option key={index}>{ele.working_hours}</option>
                                  ))}
                                </Form.Select>
                                <p className="text-danger">{formErr?.working_hours}</p>
                              </div>
                            </div>
                            <div className="main-navbar-wrap justify-content-between tabs-inner-content">
                              <div className="width-custom-wraper">
                                <label className="fs-6 fw-normal my-1">Expected Income*</label>
                                <Form.Control
                                  disabled
                                  required
                                  type="number"
                                  value={loginData?.expected_income}
                                  className="email-input  bg-none "
                                  name="expected_income"
                                  onChange={handleChange}
                                />
                                <p className="text-danger">{formErr?.expected_income}</p>
                              </div>
                              <div className="width-custom-wraper mx-2">
                                <label className="fs-6 fw-normal my-1 mx-3 ">Currency*</label>
                                <Form.Select
                                  className="w-100"
                                  aria-label="Default select example"
                                  name="currency"
                                  value={loginData.currency}
                                  onChange={handleChange}
                                >
                                  <option className="d-none"></option>
                                  {subjectData?.data?.data?.currency?.map((ele, index) => (
                                    <option key={index}>{ele.currencyCode}</option>
                                  ))}
                                </Form.Select>
                                <p className="text-danger">{formErr?.preferred_currency}</p>
                              </div>
                            </div>
                            <div className="main-navbar-wrap justify-content-between tabs-inner-content">
                              <div className="me-2 w-100">
                                <label className="fs-6 fw-normal my-1">Category*</label>
                                <Form.Select
                                  className="w-100"
                                  aria-label="Default select example"
                                  name="category"
                                  value={loginData.category}
                                  onChange={handleChange}
                                >
                                  <option className="d-none"></option>

                                  {Category?.map((ele, index) => (
                                    <option value={ele.id} key={index}>
                                      {ele.category}
                                    </option>
                                  ))}
                                </Form.Select>
                                <p className="text-danger">{formErr?.category}</p>
                              </div>

                              <div className="me-2 w-100">
                                <label className="fs-6 fw-normal my-1">
                                  {' '}
                                  Subject Specialization*
                                </label>
                                <Form.Select
                                  className="w-100"
                                  name="subject"
                                  aria-label="Default select example"
                                  onChange={handleChange}
                                  value={loginData.subject}
                                >
                                  <option className="d-none"></option>
                                  {subjects?.map((ele, index) => (
                                    <option key={ele?.id} value={ele?.id}>
                                      {ele?.subject_name}
                                    </option>
                                  ))}
                                </Form.Select>
                                <p className="text-danger">{formErr?.subject}</p>
                              </div>
                            </div>
                         
                            <div className="main-navbar-wrap justify-content-between tabs-inner-content mt-4 mb-2">
                              {/* <label className="w-100">Currency</label> */}
                              <div className="me-2 w-100  border rounded position-relative d-flex align-items-center">
                                <h6
                                  id="id_name"
                                  className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide "
                                >
                                  Upload<span className="fw-bold ms-1">ID Proof</span>
                                </h6>

                                <Form.Control
                                  className="input_file_type opacity-0"
                                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                              text/plain, application/pdf, image/*"
                                  type="file"
                                  // value={filename}
                                  onChange={uploadIDinfo}
                                />
                                <img className="me-2" src={uploadIcon} alt="react img" />
                              </div>

                              <p className="text-danger">{formErr?.id_proof}</p>
                              <div className="me-2 w-100  border rounded position-relative d-flex align-items-center">
                                <h6
                                  id="file_name"
                                  className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide"
                                >
                                  Upload<span className="fw-bold ms-1">Educational Docs</span>
                                </h6>
                                <Form.Control
                                  className="input_file_type opacity-0"
                                  type="file"
                                  accept="application/msword, application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint,
                              text/plain, application/pdf, image/*"
                                  onChange={uploadDocsinfo}
                                />
                                <img className="me-2" src={uploadIcon} alt="react img" />
                              </div>
                              <p className="text-danger">{formErr?.educational_docs}</p>
                            </div>
                            <div className="d-flex justify-content-between tabs-inner-content mb-3 mt-3">
                            <div className="me-2 w-50">
                                <label className="fs-6 fw-normal my-1">
                                Pan Card
                                </label>
                                <Form.Control
                                  className="w-100 border-light"
                                  name="pan_card"
                                  maxLength={10}
                                  aria-label="Default select example"
                                  onChange={handleChange}
                                  value={loginData.pan_card}
                                />
                             
                                <p className="text-danger">{formErr?.pan_card}</p>
                              </div>
                            </div>
                            <div className="d-flex pt-3">
                              <Form.Check
                                required
                                checked={checked}
                                name="is_agree"
                                label=" I agree to the TEACHERCOOL Privacy policies & Terms"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                                onChange={onChangeTermsCondition}
                              />
                              <p className="px-2"></p>
                            </div>
                            <p className="text-danger">{formErr?.is_agree}</p>

                            <div className="d-flex justify-content-end">
                              <Button className="button-custom mx-2" onClick={handleSubmit}>
                                Sign up
                              </Button>
                              
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <StudentRegister />
                    )}
                  </CForm>
             
                </CCardBody>
              </CCard>
            </CCardGroup>

          </Col>
        </Row>
      </Container>
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

export default TeacherRegister
