import React, { useEffect, useState } from 'react'
import { Tab, Container, Tabs, Row, Modal, Button, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import Solution from './OrderLists/Solution'
import Bookspurchase from './OrderLists/Bookspurchase'
import Instructors from './OrderLists/Instructorcontent'
import Document from './OrderLists/Document'
import plus from '../assets/images/st-landing/plus.svg'
import minus from '../assets/images/st-landing/minus.svg'
import uploadIcon from '../assets/images/uploadicon.svg'
import DatePicker from 'react-datepicker'

import Loader from 'src/Views/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast } from 'react-toastify'
import moment from 'moment'
import { postQuestionAsync } from 'src/store/features/PostQuestionSlice'
import { clearAllState } from 'src/store/features/TeacherStatsinfo'

const SearchedContent = () => {
  const dispatch = useDispatch()
  const [experShow, setExpertShow] = useState(false)
  const [docError, setDocError] = useState('')
  const [UploadDocs, setUploadDocs] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [page1, setPage1] = useState(1)
  const [disabled, setDisabled] = useState(false)
  const [err, setErr] = useState('')
  const [submit, setSubmit] = useState(false)
  const [pageCount, setPageCount] = useState(250)
  const [description, setDiscription] = useState('')
  const [date, setDate] = useState('')
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

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

  const navigate = useNavigate()
  const [key, setKey] = useState('home')
  const { searchedList } = useSelector((state) => state?.mainPageContent)
  const { loading } = useSelector((state) => state.postQuestionResponse)
  const subjectList = useSelector((state) => state.subject.subjectData)

  const token = JSON.parse(localStorage.getItem('teacherAuth'))

  const handleChange = (e) => {
    setDisabled(!disabled)
    setErr('')
    setSubmit(false)
    const { name, value } = e.target
    setPostQuestionData({ ...postQuestionData, [name]: value })
  }
  useEffect(() => {
    dispatch(getSubjectList())
  }, [])

  const handlePageCountMinus = () => {
    if (pageCount > 250) {
      if (pageCount && page1 <= -1) {
        setPage1(Number.parseInt(page1) - 1)
        setPageCount(Number.parseInt(pageCount) - 250)
      } else if (pageCount) {
        setPage1(Number.parseInt(page1) - 1)        
        setPageCount(Number.parseInt(pageCount) - 250)
      }
    }
  }

  const handlePageCountPlus = () => {
    // if (pageCount <= 1999) {
      setPage1(Number.parseInt(page1) + 1)
      setPageCount(Number.parseInt(pageCount) + 250)
    // }
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
      if (val.word_count <= 0) {
        err.word_count = 'Invalid Wordcount'
      }
    }

    return err
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

  const handleDate = (val) => {
    setSelectedDate(val)

    setDate(val)
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
        // await dispatch(getStudentAssignmentListAsync(PaymentSelectedData))
        await setSubmit(false)
        await setExpertShow(false)
        setPageCount(0)
        setSelectedDate('')
        setPostQuestionData('')
      }
      sendQuestion()
    }
  }, [err, submit])

  return (
    <>
      {loading === true ? (
        <div className="d-flex justify-content-center zIndex load-custom">
          <Loader />
        </div>
      ) : (
        ''
      )}
      <Header />
      <section className="books-purchases pt-0 ">
        <Container fluid>
          <Row xs={12} md={12} lg={12}>
            {searchedList?.data?.answer_found == false ? (
              <>
                <div className="shadow pt-3 bg-danger text-white">
                  <p className="closebtn text-center">{searchedList?.data?.message}</p>
                </div>

                <div>
                  <div className="d-flex justify-content-center mt-3">
                    {token ? (
                      <button className="button-custom" onClick={() => setExpertShow(true)}>
                        {' '}
                        Post a Question{' '}
                      </button>
                    ) : (
                      <button className="button-custom" onClick={() => navigate('/')}>
                        {' '}
                        Get Expert Help{' '}
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
            <div className=" order-us-wrapper pt-5 justify-content-center">
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3 mt-4"
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Tab eventKey="home" title="All">
                  <Solution />
                  <div className="mt-4">
                    <Bookspurchase />
           
                  </div>
                  {/* <Instructors /> */}
                </Tab>
                <Tab eventKey="Document" title="Document">
                  <Document />
                </Tab>
                <Tab eventKey="contact" title="Solutions">
                  <Solution />
                </Tab>
              </Tabs>
            </div>
          </Row>
        </Container>
      </section>
      <Footer />

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
              <Col className={postQuestionData.category == 4 ? 'w-100' : 'my-2 '} xs={12} md={6}>
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
    </>
  )
}

export default SearchedContent
