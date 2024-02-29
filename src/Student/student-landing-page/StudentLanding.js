import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import virtual from '../../assets/images/landing-page/virtual-learning.svg'
import meaningful from '../../assets/images/landing-page/meaning-ful.svg'
import onlinecicum from '../../assets/images/landing-page/online-ciculm.svg'
import socialinter from '../../assets/images/landing-page/social-interaction.svg'
import Programming from '../../assets/images/landing-page/programming.svg'
import Research from '../../assets/images/landing-page/Research.svg'
import Coursework from '../../assets/images/landing-page/coursework.svg'
import Referencing from '../../assets/images/landing-page/Referencing.svg'
import Thesis from '../../assets/images/landing-page/Thesis.svg'
import Academic from '../../assets/images/landing-page/academic.svg'
import assignment from '../../assets/images/landing-page/assignment-1.svg'
import Dissertation from '../../assets/images/landing-page/Dissertation.svg'
import CaseStudy from '../../assets/images/landing-page/casestudy.svg'
import Homework from '../../assets/images/landing-page/Homework.svg'
import essay from '../../assets/images/landing-page/essay.svg'
import expertst from '../../assets/images/st-landing/studentclientimg.png'
import referfriend from '../../assets/images/st-landing/refer-friend-st.png'
import { Accordion } from 'react-bootstrap'
import Footer from '../../layout/Footer'
import NavTopBar from 'src/layout/NavTopBar'
import { clearAllState } from 'src/store/features/TeacherStatsinfo'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import uploadIcon from '../../assets/images/uploadicon.svg'
import {
  postQuestionAsync,
  clearAllStateQuestion,
  refferAFriendAsync,
} from 'src/store/features/PostQuestionSlice'
import CryptoJS from 'crypto-js'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import plus from '../../assets/images/st-landing/plus.svg'
import minus from '../../assets/images/st-landing/minus.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { searchMainPageContentAsync } from 'src/store/features/MainPageContentSlice'
import Loader from 'src/Views/Loader/Loader'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'
import { getStudentManageSearchAsync } from 'src/store/features/Studentsubscriptionslice'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import videoLanding from '../../assets/images/st-landing/landingPagevideo.mp4'
import director from '../../assets/images/st-landing/Ambrish.png'
import managingDirector from '../../assets/images/st-landing/Dr Abhinav.png'
import Solution from 'src/layout/OrderLists/Solution'

const StudentLanding = () => {
  const dispatch = useDispatch()
  const [experShow, setExpertShow] = useState(false)
  const [started, setStarted] = useState(false)
  const [description, setDiscription] = useState('')
  const [UploadDocs, setUploadDocs] = useState([])
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const { status } = useSelector((state) => state?.TeacherStats)
  const [date, setDate] = useState('')
  const [data1, setData1] = useState('')
  const [page, setPage] = useState(1)
  const [visible, setVisible] = useState(false)
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const [pageCount, setPageCount] = useState(250)
  const [docError, setDocError] = useState('')
  const [quota, setQuota] = useState('')
  const [quoteErr, setQouteErr] = useState('')
  const [disabled, setDisabled] = useState(false)
  const {
    postData,
    referState,
    serviceCheck,
    getstartedcheck,
    triggerQuestion,
    loading,
    refferalData,
    successMsg,
  } = useSelector((state) => state.postQuestionResponse)
  const subjectList = useSelector((state) => state.subject.subjectData)
  const [copied, setCopied] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [postQuestionData, setPostQuestionData] = useState({
    category: '',
    subject_id: '',
    question: '',
    category_other: '',
    description: '',
    due_date: '',
    assignment_attachment: '',
    word_count: '',
  })

  useEffect(() => {
    if (referState?.referCheck == true) {
      const div = document.getElementsByClassName('refer-friend-st')
      div[0].scrollIntoView()
    }
  }, [referState])

  useEffect(() => {
    if (triggerQuestion?.trigger == true) {
      setExpertShow(true)
    }
  }, [triggerQuestion])

  useEffect(() => {
    if (serviceCheck?.serviceCheck == true) {
      const div = document.getElementsByClassName('about-st-cool')
      console.log(div,'divdiv')
      div[0].scrollIntoView()
    }
  }, [serviceCheck])

  useEffect(() => {
    if (getstartedcheck?.stuck == true) {
      const div = document.getElementsByClassName('order-with-us-st')
      div[0].scrollIntoView()
    }
  }, [getstartedcheck])

  useEffect(() => {
    if (postData?.data?.data?.proceed_to_payment == 1) {
      navigate(`/checkout?assignment_id=${postData?.data?.data.data.id}&order_type=2`)
    }
  }, [postData])

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  useEffect(() => {
    dispatch(getSubjectList())
  }, [])

  useEffect(() => {
    if (successMsg) {
      toast.success(successMsg)
      dispatch(clearAllStateQuestion())
    }
  }, [successMsg])

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

  const blockedStudent = () => {
    if (status == 500) {
      toast.error('Un-authroised access')
      localStorage.removeItem('teacherAuth')
      localStorage.removeItem('checkType')
      dispatch(clearAllState())
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }

  useEffect(() => {
    blockedStudent()
  }, [status])

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await navigate(`/content/${keyword}`)
      dispatch(searchMainPageContentAsync(event.target.value))
      dispatch(getStudentManageSearchAsync({ keyword: event.target.value }))
    }
  }

  const uploadDocsinfo = (e) => {
    setDocError('')
    if (e.target.files[0].size >= 2000000) {
      toast.error('File size must be less then 2MB')
      setDocError('')
    }
    if (
      e.target.files[0].type == 'application/pdf' ||
      e.target.files[0].type == 'application/doc' ||
      e.target.files[0].type ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      e.target.files[0].type == 'application/docx' ||
      e.target.files[0].type == 'application/msword'||
      e.target.files[0].type == 'application/x-zip-compressed'||
      e.target.files[0].type=='image/apng'||
      e.target.files[0].type=='image/avif'||
      e.target.files[0].type=='image/jpeg'||
      e.target.files[0].type=='image/jpg'||
      e.target.files[0].type=='image/png'||
      e.target.files[0].type=='image/webp'||
      e.target.files[0].type=='image/tiff'
    ) {
      setUploadDocs(e.target.files)
      var fileName = e.target.files[0].name
      document.getElementById('file_name').innerText = fileName
    } else {
      setDocError('Unsupported file extension')

      setUploadDocs('')
      document.getElementById('file_name').innerHTML =
        ' Upload <span className="fw-bold ms-1"> Educational  Docs</span>'
    }
  }

  const handleChange = (e) => {
    setErr('')
    setSubmit(false)
    const { name, value } = e.target
    setPostQuestionData({ ...postQuestionData, [name]: value })
  }

  const data = {
    category: postQuestionData?.category ? postQuestionData?.category : '1',
    subject_id: postQuestionData?.subject_id,
    question: postQuestionData?.question,
    category_other: postQuestionData?.category_other,
    description: description,
    due_date: date ? moment(new Date(date)).format('YYYY-MM-DD') : '',
    assignment_attachment: UploadDocs,
    word_count: pageCount,
    time_zone: timezone,
  }

  const handleSubmit = () => {
    setErr(validate(data))
    setSubmit(true)
  }

  const validate = (val) => {
    const err = {}

    if (!val.category) {
      err.category = ' Category is Required'
    }
    if (val.category != 4) {
      if (!val.subject_id) {
        err.subject_id = ' Subject is Required'
      }
    }
    if (!val.question) {
      err.question = ' Question is Required'
    }
    if (val.category == 4) {
      if (!val.category_other) {
        err.category_other = ' Other Category is Required'
      }
    }
    if (!val.description) {
      err.description = ' Description is Required'
    }
    if (!val.due_date) {
      err.due_date = ' Deadline is Required'
    }
    if (val.category != 1) {
      if (!val.word_count) {
        err.word_count = ' WordCount is Required'
      }
      if (val.word_count <= 0) {
        err.word_count = 'Invalid Wordcount'
      }
    }

    return err
  }

  useEffect(() => {
    if (Object.keys(err).length == 0 && submit && docError === '') {
      const sendQuestion = async () => {
        const formData = new FormData()
        formData.append('category', postQuestionData?.category ? postQuestionData?.category : '1')
        formData.append('subject_id', postQuestionData?.subject_id)
        formData.append('question', postQuestionData?.question)
        formData.append('category_other', postQuestionData?.category_other)
        formData.append('description', description)
        formData.append('due_date', date ? moment(new Date(date)).format('YYYY-MM-DD') : '')
        formData.append('assignment_attachment', UploadDocs[0])
        formData.append('word_count', pageCount)
        formData.append('time_zone', timezone)
        await dispatch(postQuestionAsync(formData))
        await setSubmit(false)
        await setExpertShow(false)
        setPageCount(0)
        setSelectedDate('')
        setPostQuestionData('')
      }
      sendQuestion()
    }
  }, [err, submit])

  const handleDate = (val) => {
    setSelectedDate(val)

    setDate(val)
  }

  const handlePageCountPlus = () => {
    // if (pageCount <= 1999) {
      setPage(Number.parseInt(page) + 1)
      setPageCount(Number.parseInt(pageCount) + 250)
    // }
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

  const handleQuotaMessage = (e) => {
    setQouteErr('')
    setQuota(e.target.value)
  }

  const Quota = () => {
    if (quota) {
      navigate('/')
    } else {
      setQouteErr('Please fill this first')
    }
  }
  useEffect(() => {
    if (quoteErr !== 'Please fill this first' && quoteErr !== '') {
      toast.success(quoteErr)
      setTimeout(() => {
        setQuota('')
      }, 1000)
    }
  }, [quoteErr])

  function importData() {
    let input = document.createElement('input')
    input.type = 'file'
    input.onchange = (_) => {
      let files = Array.from(input.files)
      setDocError('')
      if (
        files[0].type == 'application/pdf' ||
        files[0].type == 'application/doc' ||
        files[0].type ==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        files[0].type == 'application/docx' ||
        files[0].type == 'application/msword'||
        files[0].type == 'application/x-zip-compressed'
      ) {
        setUploadDocs(files)
        var fileName = files[0].name
        document.getElementById('file_name').innerText = fileName
      } else {
        setDocError('Unsupported file extension')

        setUploadDocs('')
        document.getElementById('file_name').innerHTML =
          ' Upload <span className="fw-bold ms-1"> Educational  Docs</span>'
      }
    }
    input.click()
  }

  const handleClick = (page) => {
    navigate('/')
    toast.info(
      `Looking for ${page} assistance ? Please fill up the form below and we will contact you shorty `,
    )
  }

  return (
    <>
      <Modal
        className="modal-wrap-st-expert"
        size="lg"
        show={experShow}
        centered
        onHide={() => setExpertShow(false)}
      >
        <div className="d-flex justify-content-end p-3 position-relative">
          <button
            type="button"
            className="btn-close position-absolute btn-close-modal"
            data-coreui-dismiss="modal"
            aria-label="Close"
            onClick={() => setExpertShow(false)}
          ></button>
        </div>
        <Modal.Body className="px-5 pb-5">
          <div className="d-flex justify-content-center">
            <div>
              <h5 className="text-center modal-inner-heading mb-2 pb-4">Get Expert Help</h5>
            </div>
          </div>
          <div className=" justify-content-between tabs-inner-content mb-4">
            <div className="me-2 w-100">
              <label className="label-expert-st  mb-2 ">
                Feeling stuck with a subject that you do not like?
              </label>
              <Form.Select
                required
                aria-label="Default select example"
                name="category"
                onChange={handleChange}
              >
                <option disabled={postQuestionData.category == 1 ? true : false}>Category</option>
                <option value="1">IT Coding</option>
                <option value="3">IT</option>
                <option value="2">Non-IT</option>
                <option value="4">Others</option>
              </Form.Select>
              <p className="text-danger">{err.category}</p>
            </div>
          </div>
          {parseInt(postQuestionData.category) == 4 ? (
            <div className="mb-4">
              <label className="label-expert-st  mb-2 ">Other Category</label>
              <Form.Control
                as="textarea"
                name="category_other"
                onChange={handleChange}
                placeholder="Describe"
              />
              <p className="text-danger">{err.category_other}</p>
            </div>
          ) : (
            ''
          )}

          <Row>
            {parseInt(postQuestionData?.category) == 4 ? (
              ''
            ) : (
              <Col>
                <div className=" justify-content-between tabs-inner-content ">
                  <label className="label-expert-st  mb-2  ">
                    Which subject would you like to discuss?
                  </label>
                  <Form.Select
                    required
                    aria-label="Default select example"
                    value={postQuestionData?.subject_id}
                    name="subject_id"
                    onChange={handleChange}
                  >
                    <option disabled={disabled == true ? true : false}>Subjects</option>
                    {subjectList?.data?.data?.all_subjects?.map((ele, index) => {
                      if (parseInt(postQuestionData.category) == parseInt(ele.category_id)) {
                        return <option key={index}>{ele.subject_name}</option>
                      }
                    })}
                  </Form.Select>

                  <p className="text-danger">{err.subject_id}</p>
                </div>
              </Col>
            )}
            {parseInt(postQuestionData?.category) === 1 ? (
              ''
            ) : (
              <Col
                className={parseInt(postQuestionData?.category) == 4 ? 'w-100' : ' '}
                xs={12}
                md={6}
              >
                <Form.Label className="label-expert-st  mb-2">No. of Word Count</Form.Label>
                <div
                  //  style={{}}
                  className="border rounded d-flex align-items-center justify-content-between"
                  style={{ height: '37px', marginTop: '29px' }}
                >
                  <Form.Control
                    className="border-0 h-75"
                    name="word_count"
                    value={page + ': page' + ' ' + pageCount + ': count'}
                    onChange={(e) => {
                      let numberRegex = /^\d{0,1000}$/
                      if (numberRegex.test(e.target.value) && e.target.value <= 2000) {
                        setPageCount(e.target.value)
                      }
                    }}
                    type="text"
                    style={{ width: '80%' }}
                  />

                  <span className="my-1  d-flex">
                    <Button className="bg-transparent border-0" onClick={handlePageCountMinus}>
                      <img src={minus} alt="react img" />
                    </Button>
                    <Button className="bg-transparent border-0 " onClick={handlePageCountPlus}>
                      <img src={plus} alt="react img" />
                    </Button>
                  </span>
                </div>
                <p className="text-danger">{err.word_count}</p>
              </Col>
            )}
          </Row>
          <Row>
            <Col xs={12} md={6} className="w-100">
              <div className=" justify-content-between tabs-inner-content mb-4">
                <div className="me-2 w-100">
                  <label className="label-expert-st  mb-2 placeholder-custom ">Question?</label>
                  <Form.Control
                    type="text"
                    name="question"
                    onChange={handleChange}
                    placeholder="how can we help you?"
                  />
                  <p className="text-danger">{err.question}</p>
                </div>
              </div>
            </Col>
          </Row>

          <div className="me-2 w-100">
            <label className="label-expert-st  mb-2">Description</label>
            <CKEditor
              editor={ClassicEditor}
              config={{
                removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed', 'Table'],
              }}
              onChange={(e, editor) => setDiscription(editor?.getData())}
              data=""
            />
          </div>
          <p className="text-danger">{err.description}</p>
          <Row>
            <Col className="my-2" xs={6}>
              <Form.Label className="label-expert-st  mb-2 placeholder-custom">Docs</Form.Label>
              <div className="me-2 w-100   border rounded position-relative d-flex align-items-center ">
                <h6
                  id="file_name"
                  className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide"
                >
                  Upload<span className="fw-bold ms-1 ">Docs</span>
                </h6>
                <Form.Control
                  className="input_file_type opacity-0"
                  type="file"
                  accept="application/msword, application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint,
                              text/plain, application/pdf, application/x-zip-compressed, image/*"
                  onChange={uploadDocsinfo}
                />
                <div className="d-flex justify-content-end pb-3">
                  <img
                    className="me-2 position-absolute"
                    src={uploadIcon}
                    alt="react img"
                    onClick={importData}
                  />
                </div>
              </div>
              <p className="text-secondary  " style={{ fontSize: '12px' }}>
                Only doc,docx,msword,zip and pdf file type allowed
              </p>
              <p className="text-danger">{docError}</p>
            </Col>
            <Col className="my-2" xs={6}>
              <Form.Label className="label-expert-st mb-2 placeholder-custom">Deadline</Form.Label>

              <div className='w-100'>
                <DatePicker
                  className="date-pick form-control w-100"
                  selected={selectedDate}
                  minDate={moment().toDate()}
                  placeholderText={'End Date'}
                  onChange={(date) => handleDate(date)}
                  selectsEnd
                  endDate={selectedDate}
                  dateFormat="yyyy-MM-dd"
                />
              </div>
              <p className="text-danger">{err.due_date}</p>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="button-custom mt-2 my-3 expert-st-btn"
              onClick={handleSubmit}
            >
              Send to Expert
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>Woohoo, youre reading this text in a modal!</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>

      <Modal size="lg" show={started} centered onHide={() => setStarted(false)}>
        <div className="d-flex justify-content-end p-3">
          <button
            type="button"
            className="btn-close"
            data-coreui-dismiss="modal"
            aria-label="Close"
            onClick={() => setStarted(false)}
          ></button>
        </div>
        <Modal.Body className="pt-0">
          <div className="d-flex justify-content-center">
            <div>
              <h5 className="text-center">Refer a Friend</h5>
            </div>
          </div>
          <div className=" tabs-inner-content mb-3">
            <div className="me-2 w-100 ">
              <div className="text-center">
                <label className="fs-6 fw-normal my-1 mb-3 ">
                  Share this reffral code with your friends
                </label>
              </div>
              <div className="d-flex justify-content-center ">
                <div
                  className={
                    copied
                      ? 'discount-code discount-applied d-flex align-items-center  '
                      : 'discount-code d-flex align-items-center'
                  }
                >
                  <div className="black-code bg-light p-2 rounded  ">
                    {refferalData?.data?.data}
                  </div>
                  {copied ? (
                    <button className="discount-copied ms-2 bg-light rounded bg-transparent ">
                      Copied!
                    </button>
                  ) : (
                    <CopyToClipboard text={refferalData?.data?.data} onCopy={() => setCopied(true)}>
                      <button className="copy mx-2 text-white btn btn-sm btn-success fs-6 ">
                        Copy
                      </button>
                    </CopyToClipboard>
                  )}
                </div>
              </div>
              {/* <p className='m-2 '>{refferalData.data.data}</p> */}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="ful-sec-st">
        <NavTopBar />
        <section className="study-support ">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h4 className="bannre-heading">Study Support Available</h4>
                <div className="banner-form-section">
                  <div className="form-wrapper">
                    <input
                      type="text"
                      value={keyword}
                      onKeyDown={handleKeyDown}
                      placeholder="Find Books, Solutions & more..."
                      onChange={(e) => setKeyword(e.target.value)}
                      className="form-control"
                    />
                    {/* <Button
                      className=" button-custom st-search-custom"
                      variant="primary"
                      onClick={handleSearch}
                    >
                      Search
                    </Button> */}
                  </div>

                  <Button
                    className=" button-custom pq-st-btn d-block mt-4 "
                    variant="primary"
                    onClick={() => {
                      if (data1 == 'student' && Token) {
                        setExpertShow(true)
                        setPostQuestionData('')
                      } else {
                        navigate('/')
                      }
                    }}
                  >
                    POST QUESTION
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="new-way-learning pb-5 ">
          <Container>
            <Row className="g-0 g-md-5 g-lg-5 align-items-center text-mb-center">
              <Col xs={12} md={4}>
                <h2 className="lh-base">Get Experts Help</h2>
                <h5> Feeling stuck with a subject that you do not like?</h5>
                <p>
                  Our experts are known for simplifying complex topics and making learning fun.
                  Study with the best!
                </p>
                <Link to="/register">
                <button
                  type="button"
                  onClick={() => {
                    if (data1 == 'student' && Token) {
                      setExpertShow(true)
                      setPostQuestionData('')
                    }
                  }}
                  className="button-custom mt-2 mb-5 expert-st-btn"
                  >
                  Try Teacher cool
                </button>
                  </Link>
              </Col>
              <Col xs={12} md={8}>
                <img src={expertst} className="client-img ms-0 ms-md-5 img-fluid" alt="react img" />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about-st-cool assignment-sec-wrap py-5 pt-3" id="services">
          <Container>
            <h3 className="text-center mb-4 fw-bold">Services</h3>
            <Row
              xs={1}
              md={2}
              lg={2}
              xl={4}
              className="g-0 g-md-5 g-lg-5 align-items-stretch mb-4 mt-2 mb-lg-5 text-mb-center"
            >
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Assignment')}
                >
                  <div className="card  h-100">
                    <div className="card-body p-4">
                      <img src={assignment} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Assignment</h4>
                      <p className="fs-5 fw-light m-0 text-white">Assignment Writing Support </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Essay')}
                >
                  <div className="card  h-100">
                    <div className="card-body p-4">
                      <img src={essay} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Essay</h4>
                      <p className="fs-5 fw-light m-0 text-white">Essay Writing Support </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Dissertation Help')}
                >
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img src={Dissertation} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Dissertation Help</h4>
                      <p className="fs-5 fw-light m-0 text-white">Dissertation Writing Support </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Case Study')}
                >
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img src={CaseStudy} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Case Study</h4>
                      <p className="fs-5 fw-light m-0 text-white">Case Study Writing Support </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row
              xs={1}
              md={2}
              lg={2}
              xl={4}
              className="g-0 g-md-5 g-lg-5 align-items-stretch mb-4 mb-lg-5 text-mb-center"
            >
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Homework')}
                >
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img src={Homework} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Homework</h4>
                      <p className="fs-5 fw-light m-0 text-white">Homework Writing Support </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Programming Help')}
                >
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img src={Programming} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Programming Help</h4>
                      <p className="fs-5 fw-light m-0 text-white">
                        Python Programming Assignment Help
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Research')}
                >
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img src={Research} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Research</h4>
                      <p className="fs-5 fw-light m-0 text-white">
                        Research Paper Writing Support{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Coursework Help')}
                >
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img src={Coursework} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Coursework Help</h4>
                      <p className="fs-5 fw-light m-0 text-white">Do My Coursework </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row
              xs={1}
              md={2}
              lg={2}
              xl={4}
              className="g-0 g-md-5 g-lg-5 align-items-stretch mb-4 mb-lg-5 text-mb-center"
            >
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Referencing')}
                >
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img src={Referencing} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Referencing</h4>
                      <p className="fs-5 fw-light m-0 text-white">UTS Referencing</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Thesis')}
                >
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img src={Thesis} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Thesis</h4>
                      <p className="fs-5 fw-light m-0 text-white">Thesis Writing Support</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div
                  className="text-decoration-none pointer h-100"
                  onClick={() => handleClick('Academic')}
                >
                  <div className="card h-100">
                    <div className="card-body p-4">
                      <img src={Academic} className="img-fluid mb-4 " alt="assignment" />
                      <h4 className="fs-4 fw-bold my-1 text-white">Academic</h4>
                      <p className="fs-5 fw-light m-0 text-white">Writing Tools </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="order-with-us-st pb-5 ">
          <Container>
            <Row className="">
              <div className="p-5 order-inner-wrap">
                <h2 className="mb-3">How to Order with Us?</h2>
                <p className="mb-4">
                  From assignment requests and lecture notes to books and assignment correction, our
                  experts and the Teacher Cool community can help you with pretty much everything!
                  We also have ready-to-use assignment documents on the common and highly in-demand
                  topics that get the job done in just one click. Head to our Order Us page to place
                  an order, and we will guide you every step of the easy process if required.{' '}
                </p>

                <div className="bg-img-st-video position-relative">
                  <iframe
                    className="w-100 "
                    width="200"
                    height="500"
                    src={videoLanding}
                    title="W3Schools Free Online Web Tutorials"
                  ></iframe>
                </div>
              </div>
            </Row>
          </Container>
        </section>

        <section className="refer-friend-st py-5">
          <Container>
            <Row className=" ">
              <div className="refer-inner-st p-5 ">
                <Col xs={12} md={12} lg={4}>
                  <img src={referfriend} className="img-fluid width-custom-st  " alt="react img" />
                </Col>
                <Col xs={12} md={12} lg={4} id="1">
                  <h4 className="mt-2 fw-bold">Refer A Friend</h4>
                  <div className="border-st">
                    <ul className="list-none mt-5 ps-0">
                      <li>
                        <span>1</span>Invite your friends
                      </li>
                      <li>
                        <span>2</span>You friends subscribe.
                      </li>
                      <li>
                        <span>3</span>You get rewarded.
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        if (Token) {
                          setStarted(true)
                          dispatch(refferAFriendAsync())
                        } else {
                          navigate('/login')
                        }
                      }}
                      className="button-custom mt-2 my-3 expert-st-btn"
                    >
                      Get Started
                    </button>
                  </div>
                </Col>
                <Col xs={12} md={12} lg={4} className="mt-5">
                  <p className="mt-5 ">
                    The primary motive behind Teacher Cool is to establish a community that helps
                    students by providing them with expert help and high-quality educational
                    resources. Help us grow this community and get rewarded.{' '}
                  </p>
                </Col>
              </div>
            </Row>
          </Container>
        </section>

        <section className="about-st-cool py-4 pb-5">
          <Container>
            <Row
              xs={1}
              md={1}
              className="g-0 g-md-5 g-lg-5 align-items-center mb-4 mb-lg-5 text-mb-center"
            >
              <Col>
                <h3 className="text-center fw-bold mb-4"> SELL & EARN </h3>
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

                <div className="form-sectionn pt-5">
                  <h4 className="text-center mb-4">Get Your Quote</h4>
                  <form className="form-wrapperr">
                    <input
                      type="text"
                      placeholder="Enter ISBN separated by comma’s eg: 1234rrff"
                      className="form-control"
                      value={quota}
                      onChange={handleQuotaMessage}
                    />
                    <Button className="button-custom" onClick={Quota}>
                      {' '}
                      GO
                    </Button>
                  </form>
                  <p className="text-danger ps-3">
                    {quoteErr == 'Your quote has been submitted successfully' ? '' : quoteErr}
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs></Col>
            </Row>
          </Container>
        </section>

        <section className="pt-4">
          {/* <Container>
            <Row>
              <div className="pb-5 main-acc-wrapper">
                <h2 className="mb-5 fw-bold text-center ">Top Solutions</h2>
                <Accordion>
                  <Accordion.Item eventKey="0" className="mb-3">
                    <Accordion.Header>Q1- What is data-structure??</Accordion.Header>

                    <Accordion.Body>
                      <p>
                        Data structure is a way of defining, storing & retriving of data in a
                        structural & systemetic way. A data structure may contain different type of
                        data items.
                      </p>

                      <a className="text-white ms-2 text-decoration-none" href="#">
                        View Answer
                        <span className="ms-1">
                          <svg
                            width="19"
                            height="16"
                            viewBox="0 0 19 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289L12.3431 0.928932C11.9526 0.538408 11.3195 0.538408 10.9289 0.928932C10.5384 1.31946 10.5384 1.95262 10.9289 2.34315L16.5858 8L10.9289 13.6569C10.5384 14.0474 10.5384 14.6805 10.9289 15.0711C11.3195 15.4616 11.9526 15.4616 12.3431 15.0711L18.7071 8.70711ZM0 9L18 9V7L0 7L0 9Z"
                              fill="white"
                            />
                          </svg>
                        </span>{' '}
                      </a>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1" className="mb-3">
                    <Accordion.Header>
                      Q2- What are various data-structures available??
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>
                        Data structure availability may vary by programming languages. Commonly
                        available data structures are list, arrays, stack, queues, graph, tree etc.
                      </p>

                      <a className="text-white ms-2 text-decoration-none" href="#">
                        View Answer
                        <span className="ms-1">
                          <svg
                            width="19"
                            height="16"
                            viewBox="0 0 19 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289L12.3431 0.928932C11.9526 0.538408 11.3195 0.538408 10.9289 0.928932C10.5384 1.31946 10.5384 1.95262 10.9289 2.34315L16.5858 8L10.9289 13.6569C10.5384 14.0474 10.5384 14.6805 10.9289 15.0711C11.3195 15.4616 11.9526 15.4616 12.3431 15.0711L18.7071 8.70711ZM0 9L18 9V7L0 7L0 9Z"
                              fill="white"
                            />
                          </svg>
                        </span>{' '}
                      </a>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" className="mb-3">
                    <Accordion.Header>
                      Q3- What are the criteria of algorithm analysis?
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>
                        An algorithm are generally analyzed on two factors − time and space. That
                        is, how much execution time and how much extra space required by the
                        algorithm.
                      </p>

                      <a className="text-white ms-2 text-decoration-none" href="#">
                        View Answer
                        <span className="ms-1">
                          <svg
                            width="19"
                            height="16"
                            viewBox="0 0 19 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289L12.3431 0.928932C11.9526 0.538408 11.3195 0.538408 10.9289 0.928932C10.5384 1.31946 10.5384 1.95262 10.9289 2.34315L16.5858 8L10.9289 13.6569C10.5384 14.0474 10.5384 14.6805 10.9289 15.0711C11.3195 15.4616 11.9526 15.4616 12.3431 15.0711L18.7071 8.70711ZM0 9L18 9V7L0 7L0 9Z"
                              fill="white"
                            />
                          </svg>
                        </span>{' '}
                      </a>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3" className="mb-3">
                    <Accordion.Header>Q4- What does DNA stand for?</Accordion.Header>
                    <Accordion.Body>
                      <p>
                        Deoxyribonucleic acid is a polymer composed of two polynucleotide chains
                        that coil around each other to form a double helix. The polymer carries
                        genetic instructions for the development, functioning, growth and
                        reproduction of all known organisms and many viruses.
                      </p>

                      <a className="text-white ms-2 text-decoration-none" href="#">
                        View Answer
                        <span className="ms-1">
                          <svg
                            width="19"
                            height="16"
                            viewBox="0 0 19 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289L12.3431 0.928932C11.9526 0.538408 11.3195 0.538408 10.9289 0.928932C10.5384 1.31946 10.5384 1.95262 10.9289 2.34315L16.5858 8L10.9289 13.6569C10.5384 14.0474 10.5384 14.6805 10.9289 15.0711C11.3195 15.4616 11.9526 15.4616 12.3431 15.0711L18.7071 8.70711ZM0 9L18 9V7L0 7L0 9Z"
                              fill="white"
                            />
                          </svg>
                        </span>{' '}
                      </a>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>
                      Q5- What is the only active volcano on mainland Europe called?
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>
                        Located in southern Italy near the coastal city of Naples, the 4,203-ft tall
                        Vesuvius is the only active volcano in mainland Europe. Vesuvius has been
                        classified as a complex volcano (also called a compound volcano), one that
                        consists of a complex of two or more vents.
                      </p>

                      <a className="text-white ms-2 text-decoration-none" href="#">
                        View Answer
                        <span className="ms-1">
                          <svg
                            width="19"
                            height="16"
                            viewBox="0 0 19 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289L12.3431 0.928932C11.9526 0.538408 11.3195 0.538408 10.9289 0.928932C10.5384 1.31946 10.5384 1.95262 10.9289 2.34315L16.5858 8L10.9289 13.6569C10.5384 14.0474 10.5384 14.6805 10.9289 15.0711C11.3195 15.4616 11.9526 15.4616 12.3431 15.0711L18.7071 8.70711ZM0 9L18 9V7L0 7L0 9Z"
                              fill="white"
                            />
                          </svg>
                        </span>{' '}
                      </a>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Row>
          </Container> */}
          <Solution/>
        </section>

        <section className=" expert-help-st pt-5">
          <Container>
            <Row className="justify-content-md-center">
              <Col xs>
                <div className="form-notification">
                  <h4 className="heading mb-3">Expert Help?</h4>
                  <p className="subtitle">
                    Our tutors have several years’ experience making difficult subjects easy and
                    fun!
                  </p>
                  <Row>
                    <Col xs={12} md={12} lg={12} xxl={10} className="mx-auto">
                      <Row>
                        <Col xs={12} md={6}>
                          <div className=" bg-white h-100 p-4">
                            <div className="left-st-user d-flex align-items-center me-5">
                              <div className="user-p-img-st">
                                <img
                                  src={director}
                                  className="rounded-circle"
                                  width="100px"
                                  height="100px"
                                  alt="react img"
                                />
                              </div>
                              <div className="usre-info-st text-start">
                                <h5>Mr. Ambrish</h5>
                                <p className="ps-3">Director</p>
                              </div>
                            </div>
                            <div className="text-start pt-3">
                              <p>
                                Ambrish is an adept technology leader with a vision and passion to
                                apply pioneering technologies in various business domains. Also he
                                is an avid technology enthusiast with more than fifteen years of
                                industry experience.
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} md={6}>
                          <div className=" bg-white h-100 p-4">
                            <div className="left-st-user d-flex align-items-center me-5">
                              <div className="user-p-img-st">
                                <img
                                  src={managingDirector}
                                  width="100px"
                                  height="100px"
                                  className="rounded-circle"
                                  alt="react img"
                                />
                              </div>
                              <div className="usre-info-st text-start">
                                <h5>Dr. Abhinav</h5>
                                <p className=" ps-3">Managing Director</p>
                              </div>
                            </div>
                            <div className=" text-start pt-3">
                              <p>
                                Dr. Abhinav is a skilled technology leader with the vision and drive
                                to implement cutting-edge technologies across multiple content
                                domains. Additionally, he has more than ten years of industry
                                experience and is an avid technology enthusiast.
                              </p>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Footer />

        {loading === true ? (
          <div className="d-flex justify-content-center zIndex load-custom">
            <Loader />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default StudentLanding
