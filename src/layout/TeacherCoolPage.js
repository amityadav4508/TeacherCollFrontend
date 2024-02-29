import React, { useEffect, useState } from 'react'
import clientimg from '../assets/images/landing-page/landingavdhesh.png'
import buysell from '../assets/images/landing-page/sell-and-earn.png'
import virtual from '../assets/images/landing-page/virtual-learning.svg'
import meaningful from '../assets/images/landing-page/meaning-ful.svg'
import onlinecicum from '../assets/images/landing-page/online-ciculm.svg'
import socialinter from '../assets/images/landing-page/social-interaction.svg'
import exprtteach from '../assets/images/landing-page/expert-teacher.svg'
import onlinecourse from '../assets/images/landing-page/online-course.svg'
import support from '../assets/images/landing-page/support.svg'
import textbook from '../assets/images/landing-page/text-book.svg'
import featurelist from '../assets/images/landing-page/feature-list-img.png'
import featureicon from '../assets/images/landing-page/feature-icn.svg'
import featureicon2 from '../assets/images/landing-page/feat-icn-2.svg'
import featureicon3 from '../assets/images/landing-page/feat-icn-3.svg'
import moment from 'moment'
import chatNow from '../assets/images/landing-page/chat-now.svg'
import callBack from '../assets/images/landing-page/call-back.svg'
import whatsApp from '../assets/images/landing-page/whatsapp-icn.svg'
import becomeateacher from '../assets/images/landing-page/becomeateacher.svg'
import becomeastudent from '../assets/images/landing-page/becomeastudent.svg'
import tickIcon from '../assets/images/landing-page/tick-svg.svg'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { Card, Carousel, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Notifications from './Notifications'
import Article from './Article'
import { Modal, Button } from 'react-bootstrap'
import closeBtn from '../assets/images/modalcrose.svg'
import tutorifost from '../assets/images/st-landing/st-infography-landing.png'
import workone from '../assets/images/st-landing/make-money-st.svg'
import worktwo from '../assets/images/st-landing/work-want-st.svg'
import workthree from '../assets/images/st-landing/help-learn-st.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addReferAsync, freeAsistanceAsync } from 'src/store/features/PostQuestionSlice'
import { getList } from 'country-list-with-dial-code-and-flag'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'
import plus from '../assets/images/st-landing/plus.svg'
import minus from '../assets/images/st-landing/minus.svg'
import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'
import { BrilliantTeam } from './OurBrilliantTeam'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

const TeacherCoolPage = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data1, setData1] = useState('')
  const [contentErr, setContentErr] = useState('')
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [page, setPage] = useState(1)
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const secretPass = 'XkhZG4fW2t2W'
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const [pageCount, setPageCount] = useState(250)
  const [err, setErr] = useState('')
  const [dialcode, setDialCode] = useState('')
  const data = getList()
  const [date, setDate] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const { freeAssist } = useSelector((state) => state.postQuestionResponse)
  console.log(freeAssist, 'freeasist', fileName)

  const initialState = {
    email: '',
    category: '1',
    subject: '',
    question: '',
    category_other: '',
    assignment_attachment: '',
    word_count: '',
    currency: '',
    contact: '',
    country: '',
    due_date: '',
  }

  const [postQuestionData, setPostQuestionData] = useState(initialState)
  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS?.AES?.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes?.toString(CryptoJS?.enc?.Utf8)))
    }
  }, [checkType])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (pageCount || file || selectedDate) {
      setPostQuestionData({
        email: postQuestionData.email,
        category: postQuestionData.category,
        subject: postQuestionData.subject,
        question: postQuestionData.question,
        category_other: postQuestionData.category_other,
        assignment_attachment: file,
        word_count: pageCount,
        contact: postQuestionData.contact,
        currency: postQuestionData.currency,
        country: postQuestionData.country,
        due_date: selectedDate,
      })
    }
  }, [pageCount, file, selectedDate])

  const handleChange = (e) => {
    setErr('')
    const { name, value } = e.target
    if (name === 'contact') {
      const regex = /^\d{0,14}$/
      if (value === '' || regex.test(value)) {
        setPostQuestionData({ ...postQuestionData, [name]: value })
      }
    }
    if (name === 'subject') {
      const regex1 = /^[A-Za-z]+$/ 
      if (value === '' || regex1.test(value)) {
        setPostQuestionData({ ...postQuestionData, [name]: value })
      }
    }
     else {
      setPostQuestionData({ ...postQuestionData, [name]: value })
    }
  }

  const handlePageCountPlus = () => {
    // if (pageCount <= 4999) {
    setPage(Number.parseInt(page) + 1)
    setPageCount(Number.parseInt(pageCount) + 250)
    // }
  }

  useEffect(() => {
    dispatch(getSubjectList())
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async () => {
    setErr(validate())
    if (Object.keys(validate()).length == 0) {
      const formData = new FormData()
      formData.append('category', postQuestionData?.category ? postQuestionData?.category : '1')
      formData.append('subject', postQuestionData?.subject)
      formData.append('question', postQuestionData?.question)
      formData.append('category_other', postQuestionData?.category_other)
      formData.append('assignment_attachment', file)
      formData.append('word_count', pageCount)
      formData.append('email', postQuestionData?.email)
      formData.append('phone_code', dialcode ? dialcode : '')
      formData.append('country', postQuestionData?.country)
      formData.append('contact', postQuestionData?.contact)
      formData.append('due_date', postQuestionData?.due_date)
      await dispatch(freeAsistanceAsync(formData))

      setPostQuestionData(initialState)
      setSelectedDate('')
      setPage(1)
      setPageCount(250)
      setDialCode('')
      setFileName('')
      setDate('')
      setFile('')
    }
  }
  
  const validStartDate = (currentDate) => {
    const certainStartDate = new Date();
    certainStartDate.setDate(certainStartDate.getDate() - 1);
    console.log(certainStartDate, "certainDate1");
    return currentDate > certainStartDate;
  };

  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const err = {}
    if (postQuestionData.email.length == 0) {
      err.email = 'Email is required!'
    }
    if (postQuestionData.email.length > 0 && !regex.test(postQuestionData.email)) {
      err.email = 'This is not a valid email format!'
    }
    if (!postQuestionData.category) {
      err.category = ' Category is Required'
    }
    if (!postQuestionData.country) {
      err.country = ' Country is Required'
    }
    if (!postQuestionData.contact) {
      err.contact = ' Contact is Required'
    }
    if (postQuestionData.category != 4) {
      if (!postQuestionData.subject) {
        err.subject = ' Subject is Required'
      }
    }
    if (!postQuestionData.question) {
      err.question = ' Question is Required'
    }
    if (postQuestionData.category == 4) {
      if (!postQuestionData.category_other) {
        err.category_other = ' Other Category is Required'
      }
    }

    if (postQuestionData.category != 1) {
      if (!postQuestionData.word_count) {
        err.word_count = ' WordCount is Required'
      }
    }
    if (!postQuestionData.due_date) {
      err.due_date = ' Deadline is Required'
    }
    // if(!file){
    //   err.assignment_attachment='Document is Required'
    // }

    return err
  }

  const handlePageCountMinus = () => {
    if (pageCount > 250) {
      if (pageCount && page <= -1) {
        setPage(Number.parseInt(page) - 1)
        setPageCount(Number.parseInt(pageCount) - 250)
      } else if (pageCount) {
        setPage(Number.parseInt(page) - 1)
        setPageCount(Number.parseInt(pageCount) - 250)
      }
    }
  }

  const uploadDocsinfo = (e) => {
    setContentErr('')
    setFileName(e.target.files[0].name)

    if (e.target.files[0].size >= 8000000) {
      toast.error('File size must be less then 8MB')
      setFile('')
    }
    if (
      e.target.files[0].type == 'application/pdf' ||
      e.target.files[0].type ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      e.target.files[0].type == 'application/doc' ||
      e.target.files[0].type == 'application/docs' ||
      e.target.files[0].type == 'application/docx' ||
      e.target.files[0].type == 'application/msword' ||
      e.target.files[0].type == 'application/x-zip-compressed'||
      e.target.files[0].type == 'image/apng' ||
      e.target.files[0].type == 'image/avif' ||
      e.target.files[0].type == 'image/jpeg' ||
      e.target.files[0].type == 'image/jpg' ||
      e.target.files[0].type == 'image/png' ||
      e.target.files[0].type == 'image/webp' ||
      e.target.files[0].type == 'image/tiff'
    ) {
      setFile(e.target.files[0])
    } else {
      toast.error('This file format is not acceptable')
      setFile('')
      setFileName('')
    }
  }

  const dialCode = (e) => {
    data?.map((ele) => {
      if (e.target.value == ele.name) {
        setDialCode(ele.dial_code)
      }
    })
  }

  let today = new Date().toISOString().slice(0, 16)

  const handleDate = (val) => {
    setSelectedDate(moment(val).format('YYYY-MM-DD HH:mm:ss'))
    setDate(val)
  }

  const headerTypes = [
    { label: 'IT Coding', value: 1 },
    { label: 'IT', value: 3 },
    { label: 'Non-IT', value: 2 },
    { label: 'Others', value: 4 },
  ]

  return (
    <>
      <div className="social-links-wrap align-items-center position-fixed end-0">
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">+918595903939</Tooltip>}
        >
          <a className="d-block" href="sms:+918595903939">
            <img src={chatNow} className="img-fluid mb-3" alt="workone" />
          </a>
        </OverlayTrigger>
        {data1 == 'student' ? (
          <span
            className="d-block bg-transparent border-0 "
            onClick={() => {
              localStorage.removeItem('teacherAuth')
              localStorage.removeItem('checkType')
              navigate('/register')
            }}
          >
            <img src={becomeateacher} className="img-fluid mb-3 " alt="workone" />
          </span>
        ) : data1 == 'teacher' ? (
          <span
            className="d-block bg-transparent border-0"
            onClick={() => {
              localStorage.removeItem('teacherAuth')
              localStorage.removeItem('checkType')
              navigate('/register')
            }}
          >
            <img src={becomeastudent} className="img-fluid mb-3" alt="workone" />
          </span>
        ) : (
          <Link to="/register">
            {' '}
            <img src={becomeateacher} className="img-fluid mb-3" alt="workone" />
          </Link>
        )}
        <a className="d-block" href="tel:+918595903939">
          <img src={callBack} className="img-fluid mb-3" alt="workone" />
        </a>
        <a className="d-block" href="https://wa.me/+918595903939">
          <img src={whatsApp} className="img-fluid " alt="workone" />
        </a>
      </div>
      <div className="landing-page-bg">
        <section className="new-way-learning pt-3 pb-3">
          <Modal show={show} onHide={handleClose} centered className="redeem-popup ">
            <div className="d-flex justify-content-end close-btn-modal  position-absolute">
              <img height="50" width="50" src={closeBtn} alt="closebtn" onClick={handleClose} />
            </div>
            <Modal.Body className=" text-center mt-0 mt-md-3 mt-lg-3  mb-0 mb-md-5 mb-lg-5">
              <h2 className="text-center mt-4">Amazing Offer</h2>
              <p className="text-center"> Get your first order for FREE</p>
              <Button
                className="button-custom  text-center"
                onClick={() => {
                  dispatch(addReferAsync({ referCheck: true }))
                  navigate('/home')
                  setTimeout(() => {
                    dispatch(addReferAsync({ referCheck: false }))
                  }, 1000)
                }}
              >
                REDEEM NOW
              </Button>
            </Modal.Body>
          </Modal>
          <Container>
            <Row
              xs={1}
              md={1}
              lg={2}
              className="g-0 g-md-5 g-lg-5  text-mb-center align-items-center"
            >
              <Col xs={12} md={12} lg={12} xl={12} xxl={8} className="form-content-expert">
                <div className="p-5">
                  <Card className="border-0 p-4 card-color-shadow px-0 pt-0">
                    <div className="d-flex justify-content-start ">
                      <div className="get-exp-form">
                        <h5 className="text-center modal-inner-heading ">Get Expert Help</h5>
                      </div>
                    </div>

                    <div className="mx-auto pb-3 pt-2 d-flex flex-wrap justify-content-center">
                      <div className="p-2 me-2 d-flex flex-wrap  justify-content-center ">
                        {headerTypes?.map((ele, ind) => (
                          <div
                            className={`${
                              postQuestionData.category == ele.value
                                ? 'it-coding-active mb-4 mb-lg-0'
                                : ' non-active-it mb-4 mb-lg-0'
                            } p-2 me-2`}
                            key={ind}
                          >
                            {postQuestionData.category == ele.value && (
                              <img src={tickIcon} className="img-fluid " alt="workone" />
                            )}
                            <button
                              className="mt-1 d-block bg-transparent border-0 w-100"
                              name="category"
                              value={ele.value}
                              onClick={handleChange}
                            >
                              {ele.label}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="px-4 pt-3">
                      {parseInt(postQuestionData.category) == 4 ? (
                        <div className="mb-4">
                          <label className="label-expert-st  mb-2 ">Other Category</label>
                          <Form.Control
                            as="textarea"
                            name="category_other"
                            onChange={handleChange}
                            placeholder="Describe"
                          />
                        </div>
                      ) : (
                        ''
                      )}

                      <Row xs={1} md={1} lg={2}>
                        {parseInt(postQuestionData?.category) == 4 ? (
                          ''
                        ) : (
                          <Col>
                            <div className=" justify-content-between tabs-inner-content  subject-select">
                              <Form.Control
                                required
                                aria-label="Default select example"
                                value={postQuestionData?.subject}
                                name="subject"
                                maxLength={32}
                                placeholder="Subject"
                                onChange={handleChange}
                              />

                              <p className="text-danger">{err.subject}</p>
                            </div>
                          </Col>
                        )}
                        <Col>
                          <div className=" justify-content-between tabs-inner-content mb-3">
                            <div className="me-2 w-100">
                              <Form.Control
                                type="email"
                                className="email-input  bg-none "
                                value={postQuestionData?.email}
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                              />
                            </div>
                            <p className="text-danger">{err?.email}</p>
                          </div>
                        </Col>
                      </Row>

                      <Row xs={1} md={1} lg={2}>
                        <Col>
                          <div className="me-2 w-100 tabs-inner-content">
                            {/* <label className="fs-6 fw-normal my-1">Country*</label> */}
                            <Form.Select
                              className="w-100"
                              aria-label="Default select example"
                              name="country"
                              value={postQuestionData.country}
                              onChange={(e) => {
                                handleChange(e)
                                dialCode(e)
                              }}
                              placeholder="Countries"
                            >
                              {' '}
                              <option className="text-muted" value="">
                                Country
                              </option>
                              {data?.map((ele, index) => (
                                <option key={index}>{ele.name}</option>
                              ))}
                            </Form.Select>
                            <p className="text-danger">{err?.country}</p>
                          </div>
                        </Col>
                        <Col>
                          <div className=" justify-content-between tabs-inner-content ">
                            {/* <label className="fs-6 fw-normal mb-2">Contact Number*</label> */}
                            <div className="d-flex align-items-center mb-4 mb-lg-0">
                              <div className="me-2 w-50   phone-register-st">
                                <Form.Control
                                  className=""
                                  style={{ marginRight: '45px' }}
                                  disabled
                                  type="text"
                                  placeholder="+91"
                                  value={dialcode}
                                />
                              </div>
                              <div className="me-2 w-100">
                                <Form.Control
                                  required
                                  type="text"
                                  maxLength={10}
                                  value={postQuestionData.contact}
                                  className="email-input  bg-none "
                                  placeholder="9999999999"
                                  name="contact"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>

                            <p className="text-danger mb-0">{err?.contact}</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={12} lg={12}>
                          <Row>
                            <Col md={6}>
                              <Row>
                                <Col md={12}>
                                  <Datetime
                                    onChange={(date) => handleDate(date)}
                                    isValidDate={validStartDate}
                                    inputProps={{
                                      placeholder: 'Deadline',
                                      value: date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : '',
                                    }}
                                  />
                                  <p className="text-danger">{err.due_date}</p>
                                </Col>
                                <Col md={12}>
                                  {parseInt(postQuestionData?.category) === 1 ? (
                                    ''
                                  ) : (
                                    <Col
                                      xs={12}
                                      md={6}
                                      lg={12}
                                      className={
                                        parseInt(postQuestionData?.category) == 4 ? 'w-100' : ' '
                                      }
                                    >
                                      <div
                                        className="border-high rounded d-flex align-items-center justify-content-between "
                                        style={{ height: '37px', marginTop: '0px' }}
                                      >
                                        <Form.Control
                                          className="border-0 h-75"
                                          name="word_count"
                                          type="text"
                                          value={page + ': page' + ' ' + pageCount + ': count'}
                                          onChange={(e) => {
                                            let numberRegex = /^\d{0,1000}$/
                                            if (
                                              numberRegex.test(e.target.value) &&
                                              e.target.value <= 2000
                                            ) {
                                              setPageCount(e.target.value)
                                            }
                                          }}
                                          style={{ width: '80%' }}
                                        />

                                        <span className="my-1  d-flex">
                                          <Button
                                            className="bg-transparent border-0"
                                            onClick={handlePageCountMinus}
                                          >
                                            <img src={minus} alt="react img" />
                                          </Button>
                                          <Button
                                            className="bg-transparent border-0 "
                                            onClick={handlePageCountPlus}
                                          >
                                            <img src={plus} alt="react img" />
                                          </Button>
                                        </span>
                                      </div>
                                      <p className="text-danger">{err.word_count}</p>
                                    </Col>
                                  )}
                                </Col>
                                <Col md={12}>
                                  {/* <Form.Label className="label-expert-st mb-0 ">Docs*</Form.Label> */}
                                  <div
                                    className=" position-relative d-flex border rounded "
                                    style={{ height: '37px', marginTop: '5px' }}
                                  >
                                    <p className=" ps-5 position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide">
                                      {fileName}
                                    </p>
                                    <div className="fileUpload">Browse</div>
                                    <Form.Control
                                      placeholder="Upload Docs"
                                      className="w-100 opacity-0 "
                                      type="file"
                                      accept="application/msword, application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint,
                                      text/plain, application/pdf, image/*"
                                      onChange={uploadDocsinfo}
                                    />
                                  </div>
                                  <p className="text-danger">{err.assignment_attachment}</p>
                                </Col>
                              </Row>
                            </Col>

                            <Col md={6}>
                              <textarea
                                className="form-control text-area-custom"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                placeholder="Enter Question"
                                maxLength={2500}
                                value={postQuestionData.question}
                                name="question"
                                onChange={handleChange}
                              ></textarea>
                              <p className="text-danger">{err.question}</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row className="align-items-center">
                        <Col xs={12} md={12} lg={12}>
                          <div className="d-flex justify-content-center align-items-center">
                            <button
                              type="button"
                              className="button-custom mt-3  expert-form-btn"
                              onClick={handleSubmit}
                            >
                              Get Quote
                            </button>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </div>
              </Col>
              <Col
                xs={12}
                md={12}
                lg={12}
                xl={12}
                xxl={4}
                className="text-custom-center client-img-d-none"
              >
                <img src={clientimg} className="client-img  img-fluid " alt="clientimg" />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="about-teah-coool py-5 ">
          <Container>
            <Row
              xs={1}
              md={1}
              className="g-0 g-md-5 g-lg-5 align-items-center mb-4 mb-lg-5 text-mb-center"
            >
              <Col>
                <div id="about">
                  <h3 className="text-center fw-bold mb-3">About Us</h3>
                  <p className="fw-normal mb-0 mb-lg-5">
                    Teacher Cool is your one-stop destination for academic excellence and support.
                    We are passionate about empowering students to achieve their educational goals
                    and reach their full potential. Whether you need help with homework, exam
                    preparation, or mastering complex concepts, our tutors are ready to guide you
                    every step of the way.Since we understand the importance of accessible and
                    high-quality educational resources, we offer an extensive library of textbook
                    solutions, study guides, and practice problems, curated by subject matter
                    experts to enhance your learning experience.
                  </p>
                </div>
              </Col>
            </Row>
            <Row
              xs={1}
              md={1}
              xl={2}
              className="g-0 g-md-5 g-lg-5  pt-0 pt-lg-3 border-teach text-mb-center align-items-center"
            >
              <Col className="text-custom-center">
                {' '}
                <img src={buysell} className="img-fluid mt-5" alt="buysell" />
              </Col>
              <Col>
                {' '}
                <h3 className=" fw-bold mb-5 mb-lg-3  ">Sell & Earn</h3>
                <Row xs={1} md={2} className="g-0 g-md-5 g-lg-5  pt-0 pt-lg-5">
                  <Col>
                    <img src={virtual} className="img-fluid mb-4 " alt="virtual" />
                    <h5 className="mb-3">Virtual learning</h5>
                    <p>
                      Discover the power of flexible, interactive, and engaging virtual learning
                      through our cutting-edge platform.{' '}
                    </p>
                  </Col>
                  <Col>
                    <img src={meaningful} className="img-fluid mb-4 " alt="meaningful" />
                    <h5 className="mb-3">Meaningful education</h5>
                    <p>
                      We foster critical thinking, problem-solving, and creativity to ensure you
                      develop a deep understanding of concepts.{' '}
                    </p>
                  </Col>
                  <Col></Col>
                </Row>
                <Row xs={1} md={2} className="g-0 g-md-5 g-lg-5  pt-0 pt-lg-5">
                  <Col>
                    <img src={onlinecicum} className="img-fluid mb-4 " alt="onlinecicum" />
                    <h5 className="mb-3">Online curriculum</h5>
                    <p>
                      Our comprehensive online curriculum covers a wide range of subjects and caters
                      to various learning styles.{' '}
                    </p>
                  </Col>
                  <Col>
                    <img src={socialinter} className="img-fluid mb-4 " alt="socialinter" />
                    <h5 className="mb-3">Social interaction </h5>
                    <p>
                      Connect with like-minded peers & engage in meaningful discussions on the
                      interactive platform Teacher Cool is!.{' '}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              {Token ? (
                <Button
                  className="button-custom"
                  onClick={() => {
                    if (data1 == 'teacher') {
                      const secretPass = 'XkhZG4fW2t2W'
                      const data = CryptoJS.AES.encrypt(
                        JSON.stringify('seller'),
                        secretPass,
                      ).toString()
                      localStorage.setItem('checkType', JSON.stringify(data))
                      setTimeout(() => {
                        navigate('/seller/dashboard')
                      }, 100)
                    }
                    setTimeout(() => {
                      navigate('/seller/dashboard')
                    }, 1000)
                  }}
                >
                  Sell & Earn
                </Button>
              ) : (
                <Link to="/seller-login">
                  <Button className="button-custom" onClick={''}>
                    Sell & Earn
                  </Button>
                </Link>
              )}
            </div>
          </Container>
        </section>

        <section className="the-best pt-5">
          <Container className="best-module ">
            <Row className="g-0 g-md-5 g-lg-5 text-mb-center">
              <Col md={12} xl={12} className="text-center">
                <h3 className="fw-bold">We are the Best</h3>
                <p>
                  Discover a world of academic support and resources designed to help you excel in
                  your studies.
                </p>
              </Col>
              <Col md={12} xl={12}>
                <Row xs={1} xl={4} className="g-0 g-md-5 g-lg-5">
                  <Col>
                    <img src={exprtteach} className="img-fluid mb-4 " alt="exprttech" />
                    <h4>Homework Help</h4>
                    <p>Never miss an assignment again! Let our experts help.</p>
                  </Col>
                  <Col>
                    <img src={onlinecourse} className="img-fluid mb-4 " alt="onlinecourse" />
                    <h4>Lecture Notes</h4>
                    <p>Subject matter experts will demystify the most complex problems.</p>
                  </Col>
                  <Col>
                    <img src={support} className="img-fluid mb-4 " alt="support" />
                    <h4>Mock Tests & Quizzes</h4>
                    <p>Put your knowledge to the test with unlimited mock tests.</p>
                  </Col>
                  <Col>
                    <img src={textbook} className="img-fluid mb-4 " alt="textbook" />
                    <h4>Textbook Solutions</h4>
                    <p>Find the right answers to all the questions in your textbooks.</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="pb-4">
          <Container>
            <Row className="g-0 g-md-5 g-lg-5 align-items-center mb-4 mb-lg-5 text-mb-center">
              <h2 className="text-center mb-0 heading-wrap-tutor">
                Becoming a Teacher Cool tutor is easy!
              </h2>
              <p className="text-center para-e-wrap mt-4">
                We have onboarded the experts across all subjects as tutors on Teacher Cool. It’s
                time you too join us. Get started in 4 easy steps.
              </p>
              <img src={tutorifost} className="img-fluid" alt="tutorifost" />
            </Row>
          </Container>
        </section>

        <section className="the-bestt pt-2 pt-md-2 pt-xxl-3 ">
          <Container className="best-module ">
            <h2 className="text-center mb-5">As a Teacher Cool Tutor, You Can</h2>
            <Row xs={1} xl={3} className="g-0 g-md-5 g-lg-5 text-mb-center">
            <Col>
                <div className="p-5 card-module-inner-st h-100">
                <img src={workone} className="img-fluid mb-4 " alt="workone" />
                  <h4 className="">Make Extra Money</h4>
                  <p className="t">
                    {' '}
                    Nothing better than getting paid for something you enjoy doing. Get a chance to
                    expand your professional network and receive payments for each enrollment.
                  </p>
                </div>
              </Col>
              {/* <Col>
                <div className="p-3 p-lg-5 card-module-inner-stt active h-100">
                  <img src={workone} className="img-fluid mb-4 " alt="workone" />
                  <h4 className="">Make Extra Money</h4>
                  <p className="t">
                    Nothing better than getting paid for something you enjoy doing. Get a chance to
                    expand your professional network and receive payments for each enrollment.
                  </p>
                </div>
              </Col> */}
              <Col>
                <div className="p-5 card-module-inner-st h-100">
                  <img src={worktwo} className="img-fluid mb-4 " alt="worktwo" />
                  <h4 className="">Work When You Want</h4>
                  <p className="t">
                    {' '}
                    Be in charge of your time. Teach the subjects and topic you like the way you
                    like, and when you like.
                  </p>
                </div>
              </Col>
              <Col>
                <div className="p-5 card-module-inner-st h-100">
                  <img src={workthree} className="img-fluid mb-4 " alt="workthree" />
                  <h4 className="">Help Students Study & Learn</h4>
                  <p className="t">
                    Make an impact by helping students pick up new skills, boost their careers, and
                    explore their interests.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="leader-board pt-4 ">
          <Container>
            <Row xs={1} xl={2} className="g-0 g-md-5 g-lg-5 align-items-center">
              <Col>
                <h4 className="section-heading mb-4 text-start">Our Brilliant Team</h4>
                <p className="mb-4">
                  We are proud to have a team of seasoned experts with vast experience and a track
                  record of success in their field of expertise. Every member of the Teacher Cool
                  community is committed to helping our students unlock their maximum potential.
                </p>
                <p>
                  Our leadership team consists of technology enthusiasts, content experts,
                  experienced project managers, executive officers, and academic advisors.
                </p>
              </Col>

              <Col>
                <Carousel className="carousel-wrapper" indicators={false}>
                  {BrilliantTeam.map((ele, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <div className="item-slider">
                          <div className="item-slider-img mb-5 mb-lg-0">
                            <img
                              src={ele.img}
                              className="img-fluid "
                              width=""
                              height=""
                              alt="landingslide"
                            />
                          </div>
                          <div className="item-info mt-5 mt-md-0 mt-lg-0">
                            <p className="info-text">{ele.about}</p>

                            <h6>{ele.name}</h6>
                          </div>
                        </div>
                      </Carousel.Item>
                    )
                  })}
                </Carousel>
              </Col>
            </Row>
          </Container>
        </section>

        <Notifications />

        <section className="feature-list pb-0">
          <h4 className="section-heading mb-4">Features</h4>
          <Container>
            <Row xs={1} xl={2} className="g-0 g-md-5 g-lg-5 ">
              <Col>
                <img src={featurelist} className="img-fluid " alt="featurelist" />
              </Col>

              <Col>
                <h3 className="mt-5 fw-bold">Take Your Academic Performance Up.</h3>
                <div className="d-flex align-items-center  mt-4 mb-4">
                  <img src={featureicon} className="img-fluid icon-img" alt="featureicon" />
                  <p className="mb-0 ms-4">
                    More than 100 million step-by-step explanations with expert Q&As.
                  </p>
                </div>
                <div className="d-flex align-items-center  mt-3 mb-4">
                  <img src={featureicon2} className="img-fluid icon-img" alt="featureicon2" />
                  <p className="mb-0 ms-4">
                    Solve hard and complex problems faster with 24*7 support.
                  </p>
                </div>
                <div className="d-flex align-items-center  mt-3">
                  <img src={featureicon3} className="img-fluid icon-img" alt="featureicon3" />
                  <p className="mb-0 ms-4">
                    Find easily understandable solutions to all your queries from experts
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Article />
      </div>
    </>
  )
}

export default TeacherCoolPage
