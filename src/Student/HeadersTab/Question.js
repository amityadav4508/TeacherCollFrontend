import React from 'react'
import { useState } from 'react'
import { Button, Card, Col, Form, Row, Modal } from 'react-bootstrap'
import AskQuestion from './AskQuestion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import uploadIcon from '../../assets/images/uploadicon.svg'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { clearAllState } from 'src/store/features/TeacherStatsinfo'
import { postQuestionAsync } from 'src/store/features/PostQuestionSlice'
import CryptoJS from 'crypto-js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from 'src/Views/Loader/Loader'
import plus from '../../assets/images/st-landing/plus.svg'
import minus from '../../assets/images/st-landing/minus.svg'
import Studentdashboarddropdown from '../Studentdropdown'
import NavTopBar from 'src/layout/NavTopBar'
import { getStudentAssignmentListAsync } from 'src/store/features/StudentordersSlice'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'

const Question = () => {
  const dispatch = useDispatch()
  const [experShow, setExpertShow] = useState(false)
  const [description, setDiscription] = useState('')
  const [UploadDocs, setUploadDocs] = useState([])
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate()
  const [err, setErr] = useState('')
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('')
  const { status } = useSelector((state) => state?.TeacherStats)
  const [date, setDate] = useState('')
  const [data1, setData1] = useState('')
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const { loading } = useSelector((state) => state.postQuestionResponse)
  const [selectedDate, setSelectedDate] = useState('')
  const [page1, setPage1] = useState(1)
  const [pageCount, setPageCount] = useState(250)
  const [docError, setDocError] = useState('')
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const subjectList = useSelector((state) => state.subject.subjectData)
  const { postData } = useSelector((state) => state.postQuestionResponse)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (postData?.data?.data?.proceed_to_payment == 1) {
      navigate(`/checkout?assignment_id=${postData?.data?.data.data.id}&order_type=2`)
    }
  }, [postData])

  useEffect(() => {
    dispatch(getSubjectList())
  }, [])

  useEffect(() => {
    if (checkType) {
      const handleLogin = async () => {
        const secretPass = 'XkhZG4fW2t2W'
        var bytes = CryptoJS.AES.decrypt(checkType, secretPass)
        setData1(JSON.parse(bytes?.toString(CryptoJS.enc.Utf8)))
      }
      handleLogin()
    }
  }, [checkType])

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

  const uploadDocsinfo = (e) => {
    setDocError('')
    if (e.target.files[0].size >= 2000000) {
      toast.error('File size must be less then 2MB')
      setDocError('')
    }
    if (
      e.target.files[0].type == 'application/pdf' ||
      e.target.files[0].type == 'application/doc' ||
      e.target.files[0].type =='application/vnd.openxmlformats-officedocument.wordprocessingml.document'||
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
      setUploadDocs(e.target.files[0])
      var fileName = e.target.files[0].name
      document.getElementById('file_name').innerText = fileName

      // var filelength = fileName.length()
    } else {
      setDocError('Unsupported file extension')
      setUploadDocs('')
      document.getElementById('file_name').innerHTML =
        'Upload <span className="fw-bold ms-1"> Educational  Docs</span>'
    }
  }

  const handleChange = (e) => {
    setDisabled(!disabled)
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
    assignment_attachment: UploadDocs[0],
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
      if (val.word_count <=0  ) {
        err.word_count = 'Invalid Wordcount'
      }
    }

    return err
  }
  const PaymentSelectedData = {
    page: page,
    page_size: limit,
    category: category,
    start_date: startDate ? moment(new Date(startDate)).format('YYYY-MM-DD') : null,
    end_date: endDate ? moment(new Date(endDate)).format('YYYY-MM-DD') : null,
  }
  useEffect(() => {
    if (Object.keys(err)?.length === 0 && submit && docError === '') {
      const sendQuestion = async () => {
        const formData = new FormData()
        formData.append('category', postQuestionData?.category ? postQuestionData?.category : '1')
        formData.append('subject_id', postQuestionData?.subject_id)
        formData.append('question', postQuestionData?.question)
        formData.append('category_other', postQuestionData?.category_other)
        formData.append('description', description)
        formData.append('due_date', date ? moment(new Date(date)).format('YYYY-MM-DD') : '')
        formData.append('assignment_attachment', UploadDocs)
        formData.append('word_count', pageCount)
        formData.append('time_zone', timezone)
        await dispatch(postQuestionAsync(formData))
        await dispatch(clearAllState())
        await dispatch(getStudentAssignmentListAsync(PaymentSelectedData))
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
      setPage1(Number.parseInt(page1) + 1)
      setPageCount(Number.parseInt(pageCount) + 250)
    // }
  }

  const handlePageCountMinus = () => {
    if (pageCount > 250) {
      if (pageCount && page1 <= -1) {
        setPage1(Number.parseInt(page1) - 1)
        setPageCount(Number.parseInt(pageCount) - 250)
      } else if (pageCount ) {
        setPage1(Number.parseInt(page1) - 1)
        setPageCount(Number.parseInt(pageCount) - 250)
      }
    }
  }

  function open_file() {
    document.getElementById('input_file').click()
  }

  return (
    <>
      <NavTopBar />
      <div className='p-5'>
      <div className="">
        <Studentdashboarddropdown />
      </div>
      <div className="px-3 ">
        <div className="answer-history-wrapper">
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
                  <h5 className="text-center modal-inner-heading mb-4">Get Expert Help</h5>
                </div>
              </div>
              <div className=" justify-content-between tabs-inner-content mb-4">
                <div className="me-2 w-100">
                  <label className="label-expert-st  mb-2 ">
                    Which category would you like to discuss?
                  </label>
                  <Form.Select
                    required
                    aria-label="Default select example"
                    name="category"
                    onChange={handleChange}
                    >
                    <option disabled={disabled == true ? true : false}>Category</option>
                    <option value="1">IT Coding</option>
                    <option value="3">IT</option>
                    <option value="2">Non-IT</option>
                    <option value="4">Others</option>
                  </Form.Select>
                  <p className="text-danger">{err.category}</p>
                </div>
              </div>
              {postQuestionData.category == 4 ? (
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
                <Col>
                  {postQuestionData.category == 4 ? (
                    ''
                    ) : (
                      <div className="justify-content-between tabs-inner-content ">
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
                          if (postQuestionData.category == ele.category_id) {
                            return <option key={index}>{ele.subject_name}</option>
                          }
                        })}
                      </Form.Select>

                      <p className="text-danger">{err.subject_id}</p>
                    </div>
                  )}
                </Col>

                {postQuestionData.category == 1 ? (
                  ''
                  ) : (
                  <Col
                    className={postQuestionData.category == 4 ? 'w-100' : 'my-2 '}
                    xs={12}
                    md={6}
                  >
                    <Form.Label className="label-expert-st  mb-2">No. of Word Count</Form.Label>
                    <div
                      //  style={{}}
                      className="border rounded d-flex align-items-center justify-content-between"
                      style={{ height: '35px', marginTop: '28px' }}
                      >
                      <Form.Control
                        className="border-0 h-75"
                        name="word_count"
                        value={page1 + ': page' + ' ' + pageCount + ': count'}
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
                      <label className="label-expert-st  mb-2 ">Question?</label>
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
                    removePlugins: [
                      'EasyImage',
                      'ImageUpload',
                      'MediaEmbed',
                      'Table',
                      'indent,indentlist,indentblock',
                    ],
                  }}
                  onChange={(e, editor) => setDiscription(editor?.getData())}
                  data=""
                  />
              </div>
              <p className="text-danger">{err.description}</p>
              <Row>
                <Col className="my-2" xs={6}>
                  <Form.Label>Docs</Form.Label>
                  <div className="me-2 w-100  border rounded position-relative d-flex align-items-center ">
                    <h6
                      id="file_name"
                      className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide"
                      >
                      Upload<span className="fw-bold ms-1">Docs</span>
                    </h6>
                    <Form.Control
                      className="input_file_type opacity-0"
                      type="file"
                      accept="application/msword, application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint,
                      text/plain, application/pdf, application/x-zip-compressed, image/*"
                      onChange={uploadDocsinfo}
                      />
                    <div className="d-flex justify-content-end pb-3">
                      <img className="me-2 position-absolute" src={uploadIcon} alt="react img" />
                    </div>
                  </div>
                  <p className="text-secondary  " style={{ fontSize: '12px' }}>
                    {' '}
                    Only doc,docx,msword,zip and pdf file type allowed
                  </p>
                  <p className="text-danger">{docError}</p>
                </Col>

                <Col className="my-2" xs={6}>
                  <Form.Label>Deadline</Form.Label>

                  <DatePicker
                    className="date-pick form-control"
                    selected={selectedDate}
                    minDate={moment().toDate()}
                    placeholderText={'End Date'}
                    onChange={(date) => handleDate(date)}
                    selectsEnd
                    endDate={selectedDate}
                    dateFormat="yyyy-MM-dd"
                    />

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

          <Card className="border-0 main-container container">
            <div className="border-bottom mb-4">
              <h3 className="mt-3">Ask Question</h3>
            </div>
            <div className="d-flex justify-content-end align-items-center">
              <Button
                className="button-custom text-white"
                onClick={() => {
                  if (data1 == 'student' && Token) {
                    setExpertShow(true)
                    setPostQuestionData('')
                  }
                }}
                >
                Post a Question
              </Button>
            </div>
            <AskQuestion />
          </Card>
          {loading === true ? (
            <div className="d-flex justify-content-center zIndex load-custom">
              <Loader />
            </div>
          ) : (
            ''
            )}
        </div>
      </div>
            </div>
    </>
  )
}

export default Question
