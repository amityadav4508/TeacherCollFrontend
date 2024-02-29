import { CKEditor } from '@ckeditor/ckeditor5-react'
import { CButton, CCard, CModal, CModalBody, CModalFooter } from '@coreui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, Col, Form, Modal, Pagination, Row, Table } from 'react-bootstrap'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {
  clearAllState,
  getAssignmentbyIdAsync,
  getTeacherManageOrderAsync,
} from 'src/store/features/TeachermanageorderSlice'
import {
  bidAssignmentAsync,
  postAcceptAssignmentAsync,
  clearAllStateAccept,
  getPreviousBidAsync,
} from 'src/store/features/AcceptAssignmentslice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-toastify'
import { faArrowLeft, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TeacherOrder from '../TeacherOrder'
import uploadIcon from '../../../assets/images/uploadicon.svg'

const StartAnswering = () => {
  const dispatch = useDispatch()
  const { getTeacherManageAssignment } = useSelector((state) => state.Teacherassignment)
  const { successMsg } = useSelector((state) => state.Teacherassignment)
  const { previousBid } = useSelector((state) => state.acceptAssignment)
  const [readMore, setReadMore] = useState(false)
  // const { bidMessage } = useSelector((state) => state.acceptAssignment)
  const [startTest, setStartTest] = useState(true)
  const [submitPage, setSubmitPage] = useState(false)
  const [assignmentId, setAssigmnetId] = useState('')
  const [description, setDiscription] = useState('')
  const [show, setShow] = useState(false)
  const [accept, setAccept] = useState('')
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('')
  const [errorAnswer, setErrorAnswer] = useState('')
  const [wordCount, setWordCount] = useState('')
  const [UploadDocs, setUploadDocs] = useState([])
  const [docError, setDocError] = useState('')
  const dynamicCount = assignmentId.word_count

  const handleClose = () => {
    setShow(false)
    setStartTest(true)
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const handleShow = async (id) => {
    const formData = new FormData()
    formData.append('assignment_id', id ? id : null)
    formData.append('assignment_answer', description ? description : null)
    formData.append('time_zone', timezone ? timezone : null)
    formData.append('assignment_answer_attachment', UploadDocs[0] ? UploadDocs[0] : null)

    if (description && id) {
      await dispatch(getAssignmentbyIdAsync(formData))
      await setSubmitPage(false)
      setTimeout(() => {
        window.location.reload(false)
      }, 2000)
    } else {
      setErrorAnswer('Answer is Required')
    }
  }

  useEffect(() => {
    const response = async () => {
      if (status && accept) {
        await dispatch(postAcceptAssignmentAsync({ assignment_id: accept }))
        dispatch(clearAllStateAccept())
        setStatus(false)
      }
      await dispatch(getTeacherManageOrderAsync({ page: page, page_size: limit }))
    }
    response()
  }, [status, dispatch, page, limit, accept])

  const TestStart = () => {
    setStartTest(true)
  }

  const [checkCategory, setCheckCategory] = useState('')
  useEffect(() => {
    if (successMsg?.success == true) {
      setStartTest(false)
      setSubmitPage(false)
      dispatch(clearAllState())
    }
  })
  const nextPage = (data) => {
    setAssigmnetId(data)
    setCheckCategory(data.category)
    setStartTest(false)
    setSubmitPage(true)
  }

  const handlePrev = () => {
    setPage(page - 1)
  }
  const handleNext = () => {
    setPage(page + 1)
  }
  const pageSize = [4, 8, 12, 16, 20]

  const [disErr, setDisErr] = useState('')

  const handleDiscription = (e) => {
    const arr = e.split(' ')
    setWordCount(arr.filter((word) => word !== '').length)
    if (arr.filter((word) => word !== '').length <= dynamicCount) {
      setDiscription(e)
      setDisErr('')
    } else if (checkCategory == 1) {
      setDiscription(e)
      setDisErr('')
    } else {
      setDisErr('Word Count Limit exceeded')
    }
  }

  const handleAccept = (e) => {
    setVisible(!visible)
    setAccept(e)
  }
  const handleYesAccept = () => {
    setVisible(!visible)
    setStatus(true)
  }
  const [bit, setBid] = useState(false)
  const [bitId, setBidId] = useState(false)

  const [hours, setHours] = useState('')
  const [hourErr, setHourErr] = useState('')
  const handleBidClose = () => {
    setBid(false)
  }

  const handleBid = (id, teacherId) => {
    if (teacherId != 0 && teacherId != getTeacherManageAssignment?.data?.teacher) {
      toast.error('This assignment is assign to other teacher')
    } else {
      setBid(true)
      setBidId(id)
    }
  }
  const handleHours = (e) => {
    let numberRegex = /^\d{0,1000}$/
    if (numberRegex.test(e.target.value)) {
      if (e.target.value > 0) {
        setHours(e.target.value)
      }
    }
  }
  const handleSubmitHours = () => {
    if (hours) {
      dispatch(bidAssignmentAsync({ assignment_id: bitId, hours: hours }))
      setTimeout(() => {
        setBid(false)
        setHours('')
        setHourErr('')
      }, 500)
    } else {
      setHourErr('Hours Is Required')
    }
  }

  const getPreviousBid = (id) => {
    dispatch(getPreviousBidAsync(id))
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
      e.target.files[0].type == 'application/msword'
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
        files[0].type == 'application/msword'
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

  const linkName = readMore ? 'Read Less << ' : 'Read More >> '

  return (
    <>
      <TeacherOrder />

      <Modal show={bit} onHide={handleBidClose} centered>
        <Modal.Header className="border-0 d-flex justify-content-center" closeButton>
          <h5 className="text-center pb-3">Give Your Estimated Hours</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div className="fw-bold ms-2">PerHourCharge :</div>
            <div>{previousBid?.data.ratePerHour}</div>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Previous Bid</th>
              </tr>
            </thead>
            <tbody>
              {previousBid?.data?.hours.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{ele.estimated_hours}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <Form.Label>Estimated Hours</Form.Label>
          <Form.Control type="text" onChange={handleHours} />
          <p className="text-danger">{hourErr}</p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button className="button-custom" variant="primary" onClick={handleSubmitHours}>
            Add Hours
          </Button>
        </Modal.Footer>
      </Modal>
      {startTest ? (
        <div className="main-container">
          <div className="d-flex justify-content-end p-2 mb-3 ">
            <div
              className="share"
              onClick={() => {
                setSubmitPage(false)
                setStartTest(false)
              }}
            >
              <span>Back</span>
              <a>
                <FontAwesomeIcon className="fa-xs me-2 " icon={faArrowLeft} />
              </a>
            </div>
          </div>
          <Row className="ans-outer-wrap-teach mb-4">
            <Col
              sm="12"
              md="6"
              lg="3"
              className="d-flex justify-content-between align-items-center ans-box-wrapper py-2 mx-2 mb-3 mb-xl-0"
            >
              <h6>Answered</h6>
              <h2 className="">{getTeacherManageAssignment?.data?.answered_assignment}</h2>
            </Col>
            <Col
              sm="12"
              md="6"
              lg="3"
              className="d-flex justify-content-between align-items-center ans-box-wrapper py-2 mx-2 mb-3 mb-xl-0"
            >
              <h6>Approved</h6>
              <h2 className="">{getTeacherManageAssignment?.data?.approved_assignment}</h2>
            </Col>
            <Col
              sm="12"
              md="6"
              lg="3"
              className="d-flex justify-content-between align-items-center ans-box-wrapper py-2 mx-2 mb-3 mb-xl-0"
            >
              <h6>Total</h6>
              <h2 className="">{getTeacherManageAssignment?.data?.total_assignment}</h2>
            </Col>
          </Row>
          {getTeacherManageAssignment?.data?.data?.data?.map((ele, index) => {
            let newBidDate = new Date(
              moment(new Date(ele?.first_bid + ' UTC').toString())
                .add(30, 'minutes')
                .format('YYYY-MM-DD hh:mm:a'),
            )
            const bidDiff = moment(newBidDate).diff(new Date())

            return (
              <CCard key={index} className="border-0 p-3 py-5 start-ans-wrap  mb-3 shadow-sm">
                <div>
                  <h5 className="mb-3">{ele?.assignment_id}</h5>
                  <h5 className="mb-3">{ele?.question}</h5>

                  <div className="para-text-bg bg-white">
                    <div
                      className={!readMore ? 'me-1 h6 read-more' : 'me-1 h6'}
                      dangerouslySetInnerHTML={{ __html: ele?.question_description }}
                    />
                    {ele.question_description.split(' ').filter((word) => word !== '').length >
                    100 ? (
                      <button
                        className="bg-transparent text-primary border-0"
                        onClick={() => setReadMore(readMore !== ele?.id ? ele?.id : '')}
                      >
                        {readMore == ele.id ? 'Read Less << ' : ' Read More >>'}
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <Row className="my-3">
                  <Col xs={12} md={4}>
                    <h3>
                      <span className="me-2"> Due Date:</span>
                      <br></br>
                      {ele?.due_date == null
                        ? 'Pending'
                        : moment(new Date(ele?.due_date + ' UTC').toString()).format(
                            'YYYY-MM-DD hh:mm:a',
                          )}
                    </h3>
                  </Col>
                  <Col xs={12} md={4}>
                    <h3>
                      <span className="me-2">Category:</span>
                      <br></br>
                      {getTeacherManageAssignment?.data?.category_status?.map((item, ind) => {
                        if (item.value == ele?.category) {
                          return item.name
                        }
                      })}
                    </h3>
                  </Col>
                  {ele?.question_assingment_path == null ? (
                    ''
                  ) : (
                    <Col xs={12} md={4}>
                      <h3>
                        <span className="me-2">
                          Document:
                          <a
                            className="proof_tab ms-3"
                            target="_blank"
                            rel="noreferrer"
                            href={
                              process.env.REACT_APP_API_URL +
                              'public/storage/' +
                              ele?.question_assingment_path
                            }
                          >
                            <FontAwesomeIcon
                              className="fa-xs me-2 fs-4 "
                              icon={faCloudArrowDown}
                              style={{ color: '#606176' }}
                            />
                          </a>
                        </span>
                      </h3>
                    </Col>
                  )}
                  {getTeacherManageAssignment?.data?.data?.data?.category == 1 ? (
                    <Col xs={12} md={4}>
                      <h3>
                        <span className="me-2">Number of pages/words:</span>{' '}
                        {ele?.word_count ? ele?.word_count : 250}
                      </h3>
                    </Col>
                  ) : (
                    ''
                  )}
                </Row>

                <div className="d-flex main-btn-wrap my-4">
                  <Row>
                    {ele?.teacher_id == getTeacherManageAssignment?.data?.teacher ? (
                      <Col xs={12} md={4}>
                        <Button
                          className="mx-2 button-custom mb-3 mb-lg-0"
                          onClick={() =>
                            nextPage({
                              assignment_id: ele.id,
                              assignment_question: ele.question,
                              assignment_description: ele.question_description,
                              due_date: ele.due_date,
                              category: ele.category,
                              word_count: ele.word_count,
                              category_other: ele.category_other,
                            })
                          }
                        >
                          Answer
                        </Button>
                      </Col>
                    ) : ele.category === 1 ? (
                      <Col xs={12} md={4}>
                        {ele.teacher_id !== 0 &&
                        ele.teacher_id !== getTeacherManageAssignment?.data?.teacher ? (
                          <Button className="mx-2 button-custom mb-3 mb-lg-0" disabled>
                            BidForHours
                          </Button>
                        ) : (
                          <Button
                            className="mx-2 button-custom mb-3 mb-lg-0 nowrap-custom"
                            onClick={() => {
                              handleBid(ele.id, ele?.teacher_id)
                              getPreviousBid(ele.id)
                            }}
                          >
                            Bid For Hours
                          </Button>
                        )}
                      </Col>
                    ) : (
                      <Col xs={12} md={4}>
                        <Button
                          className="mx-2 button-custom mb-3 mb-lg-0 "
                          onClick={() => {
                            handleAccept(ele?.id)
                          }}
                        >
                          Accept
                        </Button>
                      </Col>
                    )}
                  </Row>
                </div>
              </CCard>
            )
          })}

          {/*  */}
          <div className="d-flex justify-content-end mb-4">
            <div className="d-flex text-align-center">
              <span className="d-flex text-align-center ">
                <p
                  className="text-secondary  entries space-pegination-wrap"
                  style={{ marginTop: '10px' }}
                >
                  Enteries per page:
                </p>
                <Form.Select
                  className="h-75 ms-2    border-0"
                  style={{ width: '100%' }}
                  onChange={(e) => setLimit(e.target.value)}
                  aria-label="Default select example"
                >
                  {pageSize.map((ele, index) => (
                    <option key={index} value={ele}>
                      {ele}
                    </option>
                  ))}
                </Form.Select>
              </span>
              <div className="d-flex justify-content-end">
                <div style={{ marginTop: '7px' }}>
                  {getTeacherManageAssignment?.data?.data?.from}-
                  {getTeacherManageAssignment?.data?.data?.to} of{' '}
                  {getTeacherManageAssignment?.data?.data?.total}
                </div>
              </div>
              <Pagination className="border-0 text-secondary me-4">
                {page > 1 ? (
                  <Pagination.First onClick={() => setPage(1)} />
                ) : (
                  <Pagination.First diasbled />
                )}

                {page > 1 ? <Pagination.Prev onClick={handlePrev} /> : <Pagination.Prev disabled />}

                <Pagination.Item active> {page} </Pagination.Item>
                {page < getTeacherManageAssignment?.data?.data?.last_page ? (
                  <Pagination.Next onClick={handleNext} />
                ) : (
                  <Pagination.Next disabled onClick={handleNext} />
                )}

                {getTeacherManageAssignment?.data?.data?.last_page > page ? (
                  <Pagination.Last
                    onClick={() => setPage(getTeacherManageAssignment?.data?.data?.last_page)}
                  />
                ) : (
                  <Pagination.Last disabled />
                )}
              </Pagination>
            </div>
          </div>
        </div>
      ) : (
        <div className="start-ans-wrap-inner">
          <Modal show={show} onHide={handleClose} centered size="">
            <Modal.Header closeButton className="border-0"></Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-center">
                <div>
                  {' '}
                  <h2 className="text-center">Thankyou</h2>
                  <p className="text-center py-2">Your answer is added successfully</p>
                </div>
              </div>
            </Modal.Body>
            <div className="d-flex justify-content-center pb-4">
              <Button className="button-custom " onClick={handleClose}>
                Close
              </Button>
            </div>
          </Modal>
          <CCard className="border-0 p-5">
            <div className="d-flex justify-content-end ">
              <div className="share" onClick={() => setStartTest(true)}>
                <span>Back</span>
                <a>
                  <FontAwesomeIcon className="fa-xs me-2 " icon={faArrowLeft} />
                </a>
              </div>
            </div>
            <div>
              <h6>{assignmentId?.assignment_question}</h6>
              <p dangerouslySetInnerHTML={{ __html: assignmentId?.assignment_description }} />
            </div>
            <Row className="my-3">
              <Col xs={12} md={4}>
                <h3 className="date-wrap">
                  <span className="me-2"> Due Date:</span>
                  {moment(new Date(assignmentId?.due_date + ' UTC').toString()).format(
                    'YYYY-MM-DD hh:mm:a',
                  )}
                </h3>
              </Col>

              <Col xs={12} md={4}>
                <h3 className="date-wrap">
                  <span className="me-2">Number of pages/words:</span> {assignmentId?.word_count}
                </h3>
              </Col>
              <Col xs={12} md={4}>
                <h3 className="date-wrap">
                  <span className="me-2">Category:</span>

                  {getTeacherManageAssignment?.data?.category_status?.map((ele, ind) => {
                    if (ele.value == assignmentId?.category) {
                      return ele.name
                    }
                  })}
                </h3>
              </Col>
            </Row>
            {assignmentId?.category == 4 ? (
              <Row>
                <Col xs={12} md={4} className="w-100">
                  <h3 className="date-wrap">
                    <span className="me-2">Other Category:</span>
                    {assignmentId?.category_other ? assignmentId?.category_other : ''}
                  </h3>
                </Col>
              </Row>
            ) : (
              ''
            )}
            {successMsg?.success == true ? (
              <div className="my-4">
                <CKEditor
                  config={{
                    removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed', 'Table'],
                  }}
                  disabled={true}
                  editor={ClassicEditor}
                  onChange={(e, editor) => handleDiscription(editor.getData())}
                  data=""
                />
                <p className="text-danger">{disErr}</p>
                <p>Word:{wordCount}</p>
                <span className="text-danger">{errorAnswer}</span>
              </div>
            ) : (
              <div className="my-4">
                <Col className="my-2" xs={6}>
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
                              text/plain, application/pdf, image/*"
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
                    Only doc,docx,msword and pdf file type allowed
                  </p>
                  <p className="text-danger">{docError}</p>
                </Col>
                <CKEditor
                  config={{
                    removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed', 'Table'],
                  }}
                  //  disabled={true}
                  editor={ClassicEditor}
                  onChange={(e, editor) => handleDiscription(editor.getData())}
                  data=""
                />
                <p className="text-danger">{disErr}</p>
                <p>Word:{wordCount}</p>
                <span className="text-danger">{errorAnswer}</span>
              </div>
            )}
            <div className="d-flex main-btn-wrap">
              {wordCount <= dynamicCount || checkCategory == 1 ? (
                <Button
                  className="button-custom"
                  onClick={() => handleShow(assignmentId.assignment_id)}
                >
                  Submit Answer
                </Button>
              ) : (
                ''
              )}
            </div>
          </CCard>
        </div>
      )}

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalBody className="d-flex justify-content-center fw-bold fs-5">
          Are you sure you want to accept?
        </CModalBody>
        <CModalFooter className="border-0 d-flex justify-content-center">
          <CButton className="button-custom" onClick={() => handleYesAccept()}>
            Yes
          </CButton>
          <CButton className="button-custom cancel-button" onClick={() => setVisible(false)}>
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default StartAnswering
