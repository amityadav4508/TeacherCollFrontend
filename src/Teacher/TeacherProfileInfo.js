import React, { useState, useEffect } from 'react'
import { Card, Form, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userProfileAsync } from 'src/store/features/userDataslice'
import { clearAllState } from 'src/store/features/userDataslice'
import { clearAllStateProfile, editTeacherProfileAsync } from 'src/store/features/TeacherEditProfileSlice'
import { getList } from 'country-list-with-dial-code-and-flag'
import downloadIcn from '../assets/images/download-icn-wrap.svg'
import { CButton, CModal, CModalBody, CModalFooter } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'

function TeacherProfileInfo() {
  const dispatch = useDispatch()
  const data = getList()
  const navigate = useNavigate()
  const [profilePath, setProfilePath] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState('')
  const [age, setAge] = useState('')
  const [category, setCategory] = useState('')
  const [subject, setSubject] = useState('')
  const [teacherID, setTeacherID] = useState('')
  const [profileStatus, setProfileStatus] = useState('')
  const [workinghours, setWorkingHour] = useState()
  const [qualification, setQualification] = useState('')
  const [expectedincome, setExpectedIncome] = useState('')
  const [experience, setExperience] = useState('')
  const [currency, setCurrency] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [biography, setBiography] = useState('')
  const [uploadId, setUploadId] = useState('')
  const [userPreviousId, setUserPreviousId] = useState('')
  const [uploadDocs, setUploadDocs] = useState('')
  const [userPreviousDocs, setUserPreviousDocs] = useState('')
  const [expirenceLetter, setExpirenceLetter] = useState('')
  const [userPreviousLetter, setUserPreviousLetter] = useState('')
  const [panCard,setPanCard]=useState('')
  const [tempImage, setTempImage] = useState('')
  const [imgageShow, setImgageShow] = useState('')
  const [isReSubmitProceed, setIsReSubmitProceed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [proceedNext, setProceedNext] = useState(false)
  const [formError, setFormError] = useState({})
  const [dialcode, setDialCode] = useState('')
  const [checkSubmitDataChange, setCheckSubmitDataChange] = useState(false)
  const { userProfile } = useSelector((state) => state.userSingleId)
  const { status } = useSelector((state) => state.tabledata)
  const { status1 } = useSelector((state) => state?.editTeacherProfile)
  const [subjectList, setSubjectList] = useState([])
  const [subjectsByCategory, setSubjectsByCategory] = useState([])
  const { subjectData } = useSelector((state) => state.subject)

  useEffect(() => {
    dispatch(getSubjectList())
  }, [])

  useEffect(() => {
    if (status == 401) {
      toast.error('Un-authroised access')
      localStorage.removeItem('teacherAuth')
      localStorage.removeItem('checkType')
      dispatch(clearAllState())
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [status])

  useEffect(() => {
    if (status1 == 200) {
      setTimeout(() => {
        navigate('/teacher/dashboard')
        dispatch(clearAllStateProfile())
      }, 1000)
    }
  }, [status1])

  useEffect(() => {
    dispatch(userProfileAsync())
  }, [dispatch])

  useEffect(() => {
    if (userProfile) {
      setDialCode(userProfile?.data?.user?.phone_code)
      setFirstName(userProfile?.data?.user?.first_name)
      setLastName(userProfile?.data?.user?.last_name)
      setEmail(userProfile?.data?.user?.email)
      setContact(userProfile?.data?.user?.contact)
      setGender(userProfile?.data?.user?.gender)
      setTeacherID(userProfile?.data?.user?.teacher_id_number)
      {
        userProfile?.data.profile_status?.map((ele) => {
          if (ele.value == userProfile?.data?.user?.teacher_status) {
            setProfileStatus(ele?.name)
          }
        })
      }
      // setPhoneCode(userProfile?.data?.user?.phone_code)
      setQualification(userProfile?.data?.user?.qualification)
      setWorkingHour(userProfile?.data?.user?.working_hours)
      setExpectedIncome(userProfile?.data?.user?.expected_income)
      setCategory(userProfile?.data?.user?.category)
      setSubject(userProfile?.data?.user?.subject_id)
      setExperience(userProfile?.data?.user?.experience)
      setCurrency(userProfile?.data?.user?.currency?userProfile?.data?.user?.currency:userProfile?.data?.user?.currency)
      setCountry(userProfile?.data?.user?.country)
      setBiography(userProfile?.data?.user?.teacher_bio)
      setAge(userProfile?.data?.user?.age)
      setProfilePath(userProfile?.data?.user?.profile_path)
      setCity(userProfile?.data?.user?.city)
      setState(userProfile?.data?.user?.state)
      setUserPreviousDocs(userProfile?.data?.user?.document_path)
      setUserPreviousId(userProfile?.data?.user?.id_proof)
      setUserPreviousLetter(userProfile?.data?.user?.experience_letter)
      setSubjectsByCategory(userProfile?.data?.subjects_by_category)
      setSubjectList(userProfile?.data?.all_subjects)
      setPanCard(userProfile?.data?.user?.pan_card)
    }
  }, [userProfile])

  const submitProfile = async (e) => {
    setFormError(teacherInfoValidation())
    setProceedNext(true)
  }
  useEffect(() => {
    if (proceedNext && checkSubmitDataChange == false) {
      setIsReSubmitProceed(true)
    } else if (proceedNext && checkSubmitDataChange && Object.keys(formError).length === 0) {
      setVisible(!visible)
    }
  }, [proceedNext, formError])

  function teacherInfoValidation() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const phoneRegex = /^\+?[1-9][0-9]{7,14}$/
    const err = {}
    if (!email) {
      err.email = 'Email is required!'
    }
    if (!regex.test(email)) {
      err.email = 'This is not a valid email format!'
    }

    if (!firstName) {
      err.first_name = 'First Name is required!'
    }
    if (!lastName) {
      err.last_name = 'Last Name is required!'
    }
    if (!contact) {
      err.contact = 'Contact Number is required!'
    } else if (!phoneRegex.test(contact)) {
      err.contact = 'Invalid contact number'
    }

    if (!category && category != 0) {
      err.category = ' Category is required '
    }

    if (!subject) {
      err.subject = 'Subject is required!'
    }

    if (!workinghours) {
      err.workinghours = 'Working hours is required!'
    }

    if (!expectedincome) {
      err.expected_income = 'Expected income is required!'
    }

    if (!qualification) {
      err.qualification = 'Qualification is required!'
    }

    if (age != null && age < 18) {
      err.age = 'Age should be between 18 to 99'
    }

    if (!country) {
      err.country = 'Country is required!'
    }
    if (!currency) {
      err.preferred_currency = 'Currency is required!'
    }


    return err
  }

  useEffect(() => {
    const getUsers = async () => {
      if (!visible && isReSubmitProceed && proceedNext && Object.keys(formError).length === 0) {
        const formData = new FormData()
        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('contact', contact ? contact : '')
        formData.append('gender', gender)
        formData.append('profile_path', tempImage)
        formData.append('category', category)
        formData.append('subject', subject ? subject : '')
        formData.append('id_proof', uploadId ? uploadId : '')
        formData.append('phone_code', dialcode ? dialcode : '')
        formData.append('document_path', uploadDocs ? uploadDocs : '')
        formData.append('working_hours', workinghours ? workinghours : '')
        formData.append('qualification', qualification ? qualification : '')
        formData.append('expected_income', expectedincome ? expectedincome : '')
        formData.append('experience', experience ? experience : '')
        formData.append('currency', currency ? currency : '')
        formData.append('country', country ? country : '')
        formData.append('age', age ? age : '')
        formData.append('city', city)
        formData.append('state', state)
        formData.append('teacher_bio', biography)
        formData.append('subject', subject)
        formData.append('pan_card', panCard)

        formData.append('experience_letter', expirenceLetter)
        await dispatch(editTeacherProfileAsync(formData))
        // await dispatch(clearAllState())
        await dispatch(userProfileAsync())
        await toast.success('Profile updated successfully')
        await setProceedNext(false)
        await setCheckSubmitDataChange(false)
        await setIsReSubmitProceed(false)
      }
    }
    getUsers()
  }, [formError, isReSubmitProceed, visible, dispatch])

  const uploadDocsinfo = (e) => {
    setUploadDocs(e.target.files[0])
    var fileName = e.target.files[0].name
    document.getElementById('file_name').innerText = fileName
    setCheckSubmitDataChange(true)
  }

  const uploadIDinfo = (e) => {
    setUploadId(e.target.files[0])
    var idName = e.target.files[0].name
    document.getElementById('id_name').innerText = idName
    setCheckSubmitDataChange(true)
  }

  const uploadExpirenceinfo = (e) => {
    setExpirenceLetter(e.target.files[0])
    var expirenceName = e.target.files[0].name
    document.getElementById('expirence').innerText = expirenceName
  }

  function handleChange(e) {
    const { name, value } = e.target
    if (name == 'working_hours') {
      let income = value * 30
      setWorkingHour(value)
      setExpectedIncome(income)
    }
    setCheckSubmitDataChange(true)
  }

  const HighestQualificationData = [
    { id: '0', text: 'Phd' },
    { id: '1', text: 'Masters' },
    { id: '2', text: 'Bachelors' },
    { id: '3', text: 'Secondary' },
    { id: '4', text: 'Matric' },
  ]

  const availableHours = [
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

  let documentdata = []
  if (userPreviousDocs) {
    documentdata['userPreviousDocs'] = userPreviousDocs.split('/')[1]
  }
  if (userPreviousId) {
    documentdata['userPreviousId'] = userPreviousId.split('/')[1]
  }
  if (userPreviousLetter) {
    documentdata['userPreviousLetter'] = userPreviousLetter.split('/')[1]
  }

  function setTeacherByCat(cat) {
    if (cat == 1) {
      setSubjectList(subjectsByCategory[1])
      setSubject('')
    } else if (cat == 2) {
      setSubjectList(subjectsByCategory[2])
      setSubject('')
    } else {
      setSubjectList(userProfile?.data?.all_subjects)
      setSubject('')
    }
  }

  const countryCode = (e) => {
    data.map((ele) => {
      if (e.target.value == ele.dial_code) {
        setCountry(ele.name)
        setDialCode(ele.dial_code)
      }
    })
  }

  return (
    <>
      <div>
        <Card className="border-0 p-4">
          <h4 className="mb-3">Personal Details</h4>
          <Container fluid>
            <Row>
              <Col md="6">
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
                  <div className="avatar-preview">
                    <div id="imagePreview">
                      {imgageShow || profilePath ? (
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
                            : `${process.env.REACT_APP_API_URL}public/storage/${profilePath}`
                        }
                        alt="react img"
                      />
                    </div>
                  </div>
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
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value)
                        setCheckSubmitDataChange(true)
                      }}
                      className="email-input  bg-none "
                      autoComplete="name"
                    />
                    <p className="text-danger">{formError?.first_name}</p>
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Last Name</label>
                    <Form.Control
                      required
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value)
                        setCheckSubmitDataChange(true)
                      }}
                      className="email-input  bg-none "
                      autoComplete="name"
                    />
                    <p className="text-danger">{formError?.last_name}</p>
                  </div>
                </div>
              </Col>

              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      {' '}
                      Email<span className="star-icn">*</span>
                    </label>
                    <Form.Control
                      disabled
                      required
                      value={email}
                      onChange={(e) => {
                        // setEmail(e.target.value)
                      }}
                      className="email-input  bg-none "
                      autoComplete="username"
                    />
                    <p className="text-danger">{formError?.email}</p>
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      Country<span className="star-icn">*</span>
                    </label>

                    <Form.Select
                      aria-label="Default select example"
                      // value={country}
                      onChange={(e) => {
                        countryCode(e)

                        setCheckSubmitDataChange(true)
                      }}
                      // onClick={countrydialCode}
                    >
                      <option id="countryName" value="" className="text-muted">
                        {country}
                      </option>
                      {data?.map((ele, index) => (

                        <option key={index} value={ele.dial_code}>
                          {ele.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <p className="text-danger">{formError?.country}</p>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <label className="fs-6 fw-normal my-1">
                    Contact Number<span className="star-icn">*</span>
                  </label>
                  <div className="d-flex">
                    <div className="me-2 w-25">
                      {/* <label className="fs-6 fw-normal my-1">
                      {' '}
                      Contact Number<span className="star-icn">*</span>
                    </label> */}
                      <Form.Control
                        disabled
                        style={{ marginRight: '45px' }}
                        value={dialcode}
                      />
                      <p className="text-danger">{formError?.contact}</p>
                    </div>

                    <div className="me-2 w-100">
                      <Form.Control
                        required
                        value={contact}
                        onChange={(e) => {
                          const regex = /^\d{0,14}$/
                          if (e.target.value === '' || regex.test(e.target.value)) {
                            setContact(e.target.value)
                            setCheckSubmitDataChange(true)
                          }
                        }}
                        className="email-input  bg-none "
                        autoComplete="username"
                      />
                      <p className="text-danger">{formError?.contact}</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Gender</label>
                    <Form.Select
                      aria-label="Default select example"
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value)
                      }}
                    >
                      {' '}
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                  </div>
                  <p className="text-danger">{formError?.gender}</p>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      Age
                    </label>
                    <Form.Control
                      value={age}
                      type="number"
                      className="email-input  bg-none "
                      name="age"
                      onChange={(e) => {
                        if (e.target.value <= 99) {
                          setAge(e.target.value)
                        }
                      }}
                      min="18"
                      max="99"
                    />
                  </div>
                  <p className="text-danger">{formError?.age}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">Teacher Id*</label>
                    <Form.Control
                      required
                      disabled
                      value={teacherID}
                      onChange={(e) => {
                        setTeacherID(e.target.value)
                      }}
                      type="text"
                      className="email-input  bg-none "
                      name="email"
                      autoComplete="username"
                    />
                  </div>
                  <p className="text-danger">{formError?.teacher_id_number}</p>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">Profile Status*</label>
                    <Form.Control
                      disabled
                      type="text"
                      required
                      value={profileStatus}
                      onChange={(e) => {
                        setProfileStatus(e.target.value)
                      }}
                      className="email-input  bg-none "
                      name="email"
                      autoComplete="username"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Card>

        <Card className="border-0 p-4 mt-5">
          <h4 className="py-2">Professional details</h4>
          <Container fluid>
            <Row>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      Category<span className="star-icn">*</span>
                    </label>
                    <Form.Select
                      className="w-100"
                      aria-label="Default select example"
                      name="category"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value)
                        setTeacherByCat(e.target.value)
                        setCheckSubmitDataChange(true)
                      }}
                      // onClick={handleChange}
                    >
                      <option className="d-none"></option>
                      <option value="0">Both</option>
                      <option value="1">IT</option>
                      <option value="2">Non-IT</option>
                    </Form.Select>
                  </div>
                  <p className="text-danger">{formError?.category}</p>
                </div>
              </Col>

              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      Subject Specialization<span className="star-icn">*</span>
                    </label>
                    <Form.Select
                      required
                      aria-label="Default select example"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value)
                        setCheckSubmitDataChange(true)
                      }}
                    >
                      <option className="d-none"></option>
                      {subjectList?.map((ele, index) => (
                        <option
                          key={ele?.id}
                          value={ele?.id}
                          selected={ele?.id == subject ? true : false}
                        >
                          {ele?.subject_name}
                        </option>
                      ))}
                      {/* {userProfile?.data?.all_subjects?.map((ele, index) => {
                        if (ele.category_id == category) {
                          return (
                            <option key={index} value={ele?.id}>
                              {ele?.subject_name}
                            </option>
                          )
                        } else if (!ele.category_id == category) {
                          return (
                            <option key={index} value={ele?.id}>
                              {ele?.subject_name}
                            </option>
                          )
                        }
                      })} */}
                    </Form.Select>
                  </div>
                  <p className="text-danger">{formError?.subject}</p>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Highest Qualification</label>
                    <Form.Select
                      className="w-100"
                      aria-label="Default select example"
                      name="qualification"
                      value={qualification}
                      onChange={(e) => {
                        setQualification(e.target.value)
                        setCheckSubmitDataChange(true)
                      }}
                      // onClick={handleErr}
                    >
                      <option className="d-none"></option>

                      {HighestQualificationData?.map((ele, index) => (
                        <option key={index}>{ele.text}</option>
                      ))}
                    </Form.Select>
                  </div>
                  <p className="text-danger">{formError?.qualification}</p>
                </div>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      Experience<span className="star-icn">*</span>
                    </label>
                    <Form.Select
                      aria-label="Default select example"
                      value={experience}
                      onChange={(e) => {
                        setExperience(e.target.value)
                        setCheckSubmitDataChange(true)
                      }}
                    >
                      <option className="d-none"></option>
                      {userProfile?.data?.experience_arr?.map((ele, index) => {
                        return <option key={index}>{ele?.name}</option>
                      })}
                    </Form.Select>
                  </div>
                  <p className="text-danger">{formError?.experience}</p>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3 ">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      Available Working Hours<span className="star-icn">*</span>
                    </label>
                    <Form.Select
                      aria-label="Default select example"
                      name="working_hours"
                      value={workinghours}
                      onChange={handleChange}
                      // onChange={(e) => setWorkingHour(e.target.value)}
                    >
                      <option className="d-none"></option>
                      {availableHours?.map((ele, index) => (
                        <option key={index}>{ele.working_hours}</option>
                      ))}
                    </Form.Select>
                  </div>
                  <p className="text-danger">{formError?.workinghours}</p>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      Expected Income<span className="star-icn">*</span>
                    </label>
                    <Form.Control
                      disabled
                      type="text"
                      required
                      className="email-input  bg-none "
                      value={expectedincome}
                      // onChange={(e) => setExpectedIncome(e.target.value)}
                    />
                  </div>
                  <p className="text-danger">{formError?.expected_income}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6" lg="4" className="position-relative">
                <label className="fs-6 fw-normal my-1">
                  {' '}
                  Educational Documents<span className="star-icn">*</span>
                </label>
                <div className="me-2   border rounded position-relative d-flex align-items-center ">
                  <h6
                    id="file_name"
                    className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide"
                  >
                    <span className="fw-bold ms-1">
                      {documentdata['userPreviousDocs']
                        ? documentdata['userPreviousDocs']
                        : 'Upload Docs'}
                    </span>
                  </h6>
                  <Form.Control
                    className="input_file_type opacity-0"
                    type="file"
                    accept="application/msword, application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint,
                              text/plain, application/pdf"
                    files={uploadDocs}
                    onChange={uploadDocsinfo}
                  />
                </div>
                <div className="download-wrap-save">
                  <a
                    className="proof_tab text-decoration-none "
                    target="_blank"
                    rel="noreferrer"
                    href={`${process.env.REACT_APP_API_URL}public/storage/${userPreviousDocs}`}
                  >
                    {userProfile?.data?.user?.document_path ? (
                      <span className="text-black d-flex mx-1">
                        {' '}
                        <img
                          src={downloadIcn}
                          title={documentdata['userPreviousDocs']}
                          className="size-icn-wrap"
                          alt="react img"
                        />
                        <p className="px-3 fs-6 fw-normal" style={{ color: 'rgb(44 56 74 / 95%)' }}>
                          {/* {document.slice(8)} */}
                        </p>
                      </span>
                    ) : (
                      ''
                    )}
                  </a>
                </div>
                {
                  <p className="text-secondary  " style={{ fontSize: '12px' }}>
                    For Uploading new file Click on File name..
                  </p>
                }
              </Col>
              <Col md="6" lg="4" className="position-relative">
                <label className="fs-6 fw-normal my-1">
                  ID Proof<span className="star-icn">*</span>
                </label>
                <div className="me-2   border rounded position-relative d-flex align-items-center ">
                  <h6
                    id="id_name"
                    className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide "
                  >
                    <span className="fw-bold ms-1">
                      {documentdata['userPreviousId']
                        ? documentdata['userPreviousId']
                        : 'Upload Id Proff'}
                    </span>
                  </h6>
                  <Form.Control
                    className="input_file_type opacity-0"
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                              text/plain, application/pdf"
                    files={uploadDocs}
                    type="file"
                    onChange={uploadIDinfo}
                  />
                </div>
                <div className="download-wrap-save">
                  <a
                    className="proof_tab text-decoration-none "
                    target="_blank"
                    rel="noreferrer"
                    href={`${process.env.REACT_APP_API_URL}public/storage/${userPreviousId}`}
                  >
                    {userProfile?.data?.user?.id_proof ? (
                      <span className="text-black d-flex mx-1">
                        {' '}
                        <img
                          title={documentdata['userPreviousId']}
                          src={downloadIcn}
                          className="size-icn-wrap"
                          alt="react img"
                        />
                        <p
                          className="px-3 fs-6 fw-normal"
                          style={{ color: 'rgb(44 56 74 / 95%)' }}
                        ></p>
                      </span>
                    ) : (
                      ''
                    )}
                  </a>
                </div>
                {
                  <p className="text-secondary  " style={{ fontSize: '12px' }}>
                    For Uploading new file Click on File name..
                  </p>
                }
              </Col>
              <Col md="6" lg="4" className="position-relative">
                <label className="fs-6 fw-normal my-1">
                  Experience Letter<span className="star-icn">*</span>
                </label>
                <div className="me-2   border rounded position-relative d-flex align-items-center ">
                  <h6
                    id="expirence"
                    className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide"
                  >
                    <span className="fw-bold ms-1">
                      {documentdata['userPreviousLetter']
                        ? documentdata['userPreviousLetter']
                        : 'Upload Experience Letter'}
                    </span>
                  </h6>
                  <Form.Control
                    className="input_file_type opacity-0"
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                              text/plain, application/pdf"
                    name="experience_letter"
                    files={expirenceLetter}
                    type="file"
                    onChange={uploadExpirenceinfo}
                  />
                </div>
                <div className="download">
                  <a
                    className="proof_tab text-decoration-none "
                    target="_blank"
                    rel="noreferrer"
                    href={`${process.env.REACT_APP_API_URL}public/storage/${userPreviousLetter}`}
                  >
                    {userProfile?.data?.user?.experience_letter ? (
                      <span className="text-black d-flex mx-1">
                        {' '}
                        <img
                          src={downloadIcn}
                          title={documentdata['userPreviousLetter']}
                          className="size-icn-wrap me-3"
                          alt="react img"
                        />
                        <p
                          className="px-3 fs-6 fw-normal"
                          style={{ color: 'rgb(44 56 74 / 95%)' }}
                        ></p>
                      </span>
                    ) : (
                      ''
                    )}
                  </a>
                </div>
                {
                  <p className="text-secondary  " style={{ fontSize: '12px' }}>
                    For Uploading new file Click on File name..
                  </p>
                }
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">City</label>
                    <Form.Control
                      aria-label="Default select example"
                      value={city}
                      onChange={(e) => {
                        const regex = /^[a-zA-Z]+$/
                        if (e.target.value === '' || regex.test(e.target.value)) {
                          setCity(e.target.value)
                        }
                      }}
                      type="text"
                      required
                      className="email-input  bg-none text-capitalize"
                      name="city"
                      autoComplete="username"
                    />
                  </div>
                  <p className="text-danger">{formError?.city}</p>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">State</label>
                    <Form.Control
                      aria-label="Default select example"
                      value={state}
                      onChange={(e) => {
                        const regex = /^[a-zA-Z]+$/
                        if (e.target.value === '' || regex.test(e.target.value)) {
                          setState(e.target.value)
                        }
                      }}
                      type="text"
                      required
                      className="email-input  bg-none text-capitalize"
                      name="state"
                      autoComplete="username"
                    />
                  </div>
                  <p className="text-danger">{formError?.state}</p>
                </div>
              </Col>

              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      Currency<span className="star-icn">*</span>
                    </label>
                    <Form.Select
                      aria-label="Default select example"
                      value={currency}
                      onChange={(e) => {
                        setCurrency(e.target.value)
                        setCheckSubmitDataChange(true)
                      }}
                    >
                      <option className="d-none"></option>
                      {subjectData?.data?.data?.currency?.map((ele, index) => (
                    <option key={index}>{ele.currencyCode}</option>
                  ))}
                    </Form.Select>
                  </div>
                  <p className="text-danger">{formError?.preferred_currency}</p>
                </div>
              </Col>
              <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      Pan Card
                    </label>
                    <Form.Control
                      aria-label="Default select example"
                      value={panCard}
                      onChange={(e) => {
                        setPanCard(e.target.value)
                      }}
                    />
               
                  </div>
                  <p className="text-danger">{formError?.pan_card}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="12">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">Bio</label>
                    <textarea
                      value={biography ? biography : ''}
                      onChange={(e) => setBiography(e.target.value)}
                      className="form-control email-input"
                      rows="3"
                    ></textarea>
                  </div>
                  <p className="text-danger">{formError?.teacher_bio}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Card>
        <div className="profile-buttons my-5">
          <button type="submit" className="button-custom me-4" onClick={submitProfile}>
            Update
          </button>
        </div>
      </div>

      <CModal size="lg" className="modal-outer" visible={visible} onClose={() => setVisible(false)}>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            data-coreui-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setVisible(false)
              setIsReSubmitProceed(false)
            }}
          ></button>
        </div>

        <CModalBody className=" justify-content-center fw-bold fs-5">
          <h4 className="fw-bold text-center text-danger mb-2">ALERT</h4>
          <p className="fs-6 text-center fw-normal mb-1">
            You are trying to change your profile details which needs approval from Teacher Cool.
          </p>
          <p className="fs-6 text-center fw-normal ">
            <b>NOTE:</b> Your profile will go under resubmission process.
          </p>
          <p className="fs-5 text-center mb-0">Are you sure you want to proceed?</p>
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center border-0 pt-1">
          <CButton
            id="1"
            className="button-custom"
            onClick={async (e) => {
              await setVisible(false)
              setIsReSubmitProceed(true)
            }}
          >
            Yes
          </CButton>
          <CButton
            className="button-custom cancel-button"
            color="primary"
            onClick={() => setVisible(false)}
          >
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default TeacherProfileInfo
