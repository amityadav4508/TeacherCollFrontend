import React from 'react'
import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import NavTopBar from 'src/layout/NavTopBar'
import { getList } from 'country-list-with-dial-code-and-flag'
import { useEffect } from 'react'
import { userProfileAsync } from 'src/store/features/userDataslice'
import BackButton from 'src/Views/widgets/BackButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearAllStateProfile,
  editTeacherProfileAsync,
} from 'src/store/features/TeacherEditProfileSlice'
import moment from 'moment'
import { toast } from 'react-toastify'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'

const StudentProfile = () => {
  const dispatch = useDispatch()
  const [formErr, setFormErr] = useState('')
  const [dialcode, setDialCode] = useState('')
  const [submit, setSubmit] = useState(false)
  const [profileImage, setProfileImage] = useState('')
  const [image, setImage] = useState('')
  const [tempImage, setTempImage] = useState('')
  const [imgageShow, setImgageShow] = useState('')
  const [errProfile, setErrProfile] = useState('')
  const { userProfile } = useSelector((state) => state.userSingleId)
  const { subjectData } = useSelector((state) => state.subject)
  const data = getList()
  const date = new Date()
  const currentDate = date.toISOString().substring(0, 10)
  const { editTeacher } = useSelector((state) => state.editTeacherProfile)
  const [userData, setUserData] = useState('')

  useEffect(() => {
    dispatch(getSubjectList())
  }, [])

  const [loginData, setLoginData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    contact: '',
    country: '',
    age: '',
    type: '',
    qualification: '',
    gender: '',
    subscription: '',
    profile_path: '',
    subscription_expire_date: '',
    assignment_request: '',
    file_download: '',
    currency: '',
  })
  useEffect(() => {
    setLoginData({
      profile: profileImage ? profileImage : null,
      first_name: userProfile?.data?.user?.first_name,
      last_name: userProfile?.data?.user?.last_name,
      email: userProfile?.data?.user?.email,
      contact: userProfile?.data?.user?.contact,
      country: userProfile?.data?.user?.country,
      age: userProfile?.data?.user?.age,
      type: userProfile?.data?.user?.user_type,
      qualification: userProfile?.data?.user?.qualification,
      gender: userProfile?.data?.user?.gender,
      profile_path: userProfile?.data?.user?.profile_path,
      subscription: userProfile?.data?.user?.subscription_name,
      subscription_expire_date: userProfile?.data?.user?.subscription_expire_date,
      assignment_request: userProfile?.data?.user?.assignment_request,
      file_download: userProfile?.data?.user?.file_download,
      currency: userProfile?.data?.user?.currency,
    })
  }, [userProfile])

  const uploadImage = (e) => {
    setProfileImage(e.target.files[0])
    setImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleChange = (e) => {
    setFormErr('')
    const { value, name } = e.target
    const onlyAlphabet = /^[a-zA-Z]*$/

    if (name == 'first_name') {
      if (!value || onlyAlphabet.test(value)) {
        setLoginData({ ...loginData, [name]: value })
      }
    } else if (name == 'last_name') {
      if (!value || onlyAlphabet.test(value)) {
        setLoginData({ ...loginData, [name]: value })
      }
    } 
   else if (name == 'age') {
       const ageregex = /^\d{0,14}$/;
      if (value || ageregex.test(value)) {
        setLoginData({ ...loginData, [name]: value })
      }
    } else {
      setLoginData({ ...loginData, [name]: value })
    }
  }

  const handleSubmit = () => {
    setFormErr(validate(loginData))
    setUserData(loginData)
    setSubmit(true)
  }

  const validate = (val) => {
    const phoneRegex = /^\d{7,14}$/
    const err = {}

    if (!val.first_name) {
      err.first_name = 'First Name is required!'
    }
    if (!val.currency) {
      err.currency = ' Currency is required!'
    }

    if (!val.contact) {
      err.contact = 'Contact Number is required!'
    } else if (!phoneRegex.test(val.contact)) {
      err.contact = 'Invalid Contact Number'
    }
    if (!val.country) {
      err.country = 'Country is required!'
    }
  
    if (!val.qualification) {
      err.qualification = 'Qualification is required!'
    }
    if (!val.gender) {
      err.gender = 'Gender is required!'
    }
    return err
  }
  useEffect(() => {
    data?.map((ele) => {
      if (loginData.country == ele.name) {
        setDialCode(ele.dial_code)
      }
    })
  }, [loginData])

  const dialCode = (e) => {
    data?.map((ele) => {
      if (e.target.value == ele.name) {
        setDialCode(ele.dial_code)
      }
    })
  }

  useEffect(() => {
    dispatch(userProfileAsync())
  }, [])

  useEffect(() => {
    if (submit) {
      const updateUser = async () => {
        const formData = new FormData()
        formData.append('profile', profileImage ? profileImage : null)
        formData.append('first_name', loginData.first_name ? loginData.first_name : '')
        formData.append('last_name', loginData.last_name ? loginData.last_name : '')
        formData.append('email', loginData.email ? loginData.email : '')
        formData.append('phone_code', dialcode ? dialcode : '')
        formData.append('contact', loginData.contact ? loginData.contact : '')
        formData.append('country', loginData.country ? loginData.country : '')
        formData.append('age', loginData.age ? loginData.age : '')
        formData.append('type', loginData.type ? loginData.type : '')
        formData.append('qualification', loginData.qualification ? loginData.qualification : '')
        formData.append('gender', loginData.gender ? loginData.gender : '')
        formData.append('subscription', loginData.subscription ? loginData.subscription : '')
        formData.append('profile_path', tempImage ? tempImage : loginData.profile_path)
        formData.append('currency', loginData.currency ? loginData.currency : '')
        formData.append( 'assignment_request', loginData.file_download ? loginData.file_download : '',)
        formData.append('file_download', loginData.file_download ? loginData.file_download : '')
        formData.append( 'subscription_expire_date', loginData.subscription_expire_date ? loginData.subscription_expire_date : '', )

        if (Object.keys(formErr).length === 0 && submit) {
          await dispatch(editTeacherProfileAsync(formData))
          await dispatch(clearAllStateProfile())
        }
        await setSubmit(false)
      }
      updateUser()
    }
  }, [formErr, submit])

  useEffect(() => {
    if (editTeacher?.data?.success == true) {
      toast.success('Profile updated successfully')
      dispatch(userProfileAsync())
    }
  }, [editTeacher])

  const HighestQualificationData = [
    { id: '0', text: 'Phd' },
    { id: '1', text: 'Masters' },
    { id: '2', text: 'Bachelors' },
    { id: '3', text: 'Secondary' },
    { id: '4', text: 'Matric' },
  ]

  return (
    <>
      <NavTopBar />
      <div className="px-5  mt-4">
        <BackButton />
      </div>
      <div className="p-5 pt-4">
        <Container fluid className="student-card-custom  ">
          <Row>
            <Col md="6">
              <div className="avatar-upload mb-3">
                <div className="avatar-edit">
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={(data) => {
                      const MAX_FILE_SIZE = 524288
                      if (
                        data.target.files[0].type == 'image/png' ||
                        data.target.files[0].type == 'image/jpeg' ||
                        (data.target.files[0].type == 'image/jpg' &&
                          data.target.files[0]?.size <= MAX_FILE_SIZE)
                      ) {
                        setErrProfile('')
                        setTempImage(data?.target?.files[0])
                        setImgageShow(URL.createObjectURL(data?.target?.files[0]))
                        uploadImage(data)
                      }
                      if (
                        !data.target.files[0].type == 'image/png' ||
                        !data.target.files[0].type == 'image/jpeg' ||
                        !data.target.files[0].type == 'image/jpg'
                      ) {
                        setErrProfile('Please select only jpeg ,jpg & png')
                      }
                      if (data.target.files[0]?.size <= MAX_FILE_SIZE == false) {
                        setErrProfile('File size should be less than 512kb')
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
                <div className="avatar-preview">
                  <div id="imagePreview">
                    {imgageShow || loginData?.profile_path ? (
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
                          : `${process.env.REACT_APP_API_URL}public/storage/${loginData?.profile_path}`
                      }
                      alt="profile"
                    />
                  </div>
                </div>
                <p className="text-danger">{errProfile}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1"> First Name</label>
                  <Form.Control
                    required
                    className="email-input  bg-none "
                    name="first_name"
                    value={loginData?.first_name}
                    placeholder=""
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  <p className="text-danger">{formErr?.first_name}</p>
                </div>
              </div>
            </Col>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1"> Last Name</label>
                  <Form.Control
                    required
                    className="email-input  bg-none "
                    name="last_name"
                    value={loginData?.last_name}
                    onChange={handleChange}
                    placeholder=""
                    autoComplete="name"
                  />
              
                </div>
              </div>
            </Col>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">Email</label>
                  <Form.Control
                    required
                    disabled
                    value={loginData?.email}
                    type="email"
                    className="email-input  bg-none "
                    placeholder=""
                    autoComplete="name"
                  />
                  <p className="text-danger">{formErr?.email}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
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
                  placeholder="Countries"
                >
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
                      name="phone_code"
                      type="text"
                      placeholder=""
                      onChange={handleChange}
                      value={dialcode}
                    />
                  </div>
                  <div className="me-2 w-100">
                    <Form.Control
                      required
                      type="text"
                      value={loginData.contact}
                      className="email-input  bg-none "
                      placeholder=""
                      name="contact"
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
                <label className="fs-6 fw-normal ">Currency*</label>
                <Form.Select
                  className="w-100"
                  aria-label="Default select example"
                  name="currency"
                  value={loginData.currency}
                  onChange={handleChange}
                  placeholder="Countries"
                >
                  {' '}
                  <option className="text-muted">Currency</option>
                  {subjectData?.data?.data?.currency?.map((ele, index) => (
                    <option key={index}>{ele.currencyCode}</option>
                  ))}
                </Form.Select>
                <p className="text-danger">{formErr?.currency}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1"> Highest Qualification</label>
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
                </div>
                <p className="text-danger">{formErr?.qualification}</p>
              </div>
            </Col>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">Gender</label>
                  <Form.Select
                    aria-label="Default select example"
                    name="gender"
                    value={loginData?.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                  <p className="text-danger">{formErr?.gender}</p>
                </div>
              </div>
            </Col>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">
                    Age 
                  </label>
                  <Form.Control
                    required
                    className="email-input  bg-none "
                    type="number"
                    name="age"
                    value={loginData?.age}
                    autoComplete="name"
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErr?.age}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1"> Remaining Days</label>
                  <Form.Control
                    disabled
                    required
                    type="email"
                    value={
                      loginData?.subscription_expire_date &&
                      moment(loginData?.subscription_expire_date).diff(currentDate, 'days') > 0
                        ? moment(loginData?.subscription_expire_date).diff(currentDate, 'days')
                        : '0'
                    }
                    className="email-input  bg-none "
                    placeholder="0"
                    autoComplete="name"
                  />
                  {/* <p className="teacher-color">
                   {' '}
                   
                  </p> */}
                </div>
              </div>
            </Col>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1"> Assignment Request</label>
                  <Form.Control
                    disabled
                    required
                    type="email"
                    value={loginData.assignment_request}
                    className="email-input  bg-none "
                    autoComplete="name"
                  />
                  {/* <p className="teacher-color">
                   {' '}
                   
                  </p> */}
                </div>
              </div>
            </Col>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1"> File Downloads</label>
                  <Form.Control
                    disabled
                    required
                    type="email"
                    value={loginData.file_download ? loginData.file_download : '0'}
                    className="email-input  bg-none "
                    autoComplete="name"
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">Subscription</label>
                  <Form.Control
                    disabled
                    required
                    type="email"
                    value={loginData?.subscription}
                    className="email-input  bg-none "
                    placeholder=""
                    autoComplete="name"
                  />
                  {/* <p className="teacher-color">
                    Remaining Days{' '}
                    {moment(loginData?.subscription_expire_date).diff(currentDate, 'days')}
                  </p> */}
                </div>
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-end mt-3">
            <Button className="button-custom button-subscription" onClick={handleSubmit}>
              Update Profile
            </Button>
          </div>
        </Container>
      </div>
      {/* {userloading === true ? (
        <div className="d-flex justify-content-center zIndex load-custom">
          <Loader />
        </div>
      ) : (
        ''
      )} */}
    </>
  )
}

export default StudentProfile
