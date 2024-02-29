import React, { useState } from 'react'
import { Button, Card, Col, Form, Pagination, Row } from 'react-bootstrap'
import { CCard } from '@coreui/react'
import greentick from '../../../assets/images/green-tick.svg'
import yellowtick from '../../../assets/images/yellow-tick.svg'
import redtick from '../../../assets/images/red-tick.svg'
import TeacherOrder from '../TeacherOrder'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherResubmitRequestAsync } from 'src/store/features/TeacherRequestSlice'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { resubmitAssignmentbyIdAsync } from 'src/store/features/TeachermanageorderSlice'
import { toast } from 'react-toastify'

const ResubmissionRequest = () => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState(false)
  const [assignmentId, setAssigmnetId] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(4)
  const [errorAnswer, setErrorAnswer] = useState('')
  const [wordCount, setWordCount] = useState('')
  const dynamicCount = assignmentId.word_count

  const [description, setDiscription] = useState('')
  const [resubmitAnswer, setResubmitAnswer] = useState()
  //teacher
  const { resubmitData } = useSelector((state) => state.teacher)
  const { resubmitAssignmentmessage } = useSelector((state) => state.Teacherassignment)


  const SelectedData = {
    page: page,
    page_size: limit,
    category: category,
    start_date: startDate ? moment(new Date(startDate)).format('YYYY-MM-DD') : null,
    end_date: endDate ? moment(new Date(endDate)).format('YYYY-MM-DD') : null,
    keyword: keyword,
  }

  // const handleSearch = () => {
  //   dispatch(getTeacherResubmitRequestAsync(SelectedData))
  //   if (keyword.length == 0) {
  //     dispatch(
  //       getTeacherResubmitRequestAsync({
  //         keyword: keyword,
  //       }),
  //     )
  //   }
  // }
  useEffect(() => {
    if (startDate || endDate || category || page || limit || keyword) {
      dispatch(getTeacherResubmitRequestAsync(SelectedData))
    }
  }, [page, limit, category, startDate, endDate, keyword, dispatch])

  useEffect(() => {
    if (search || keyword.length == 0) {
      dispatch(
        getTeacherResubmitRequestAsync({
          keyword: keyword,
        }),
      )
      setSearch(false)
    } else {
      dispatch(getTeacherResubmitRequestAsync())
    }
  }, [search, keyword])

  const hanldleDatePrev = (val) => {
    setStartDate(val)
    setEndDate('')
  }

  const hanldleDateCurrent = (val) => {
    setEndDate(val)
  }
  useEffect(() => {
    dispatch(getTeacherResubmitRequestAsync())
  }, [])

  const handlePrev = () => {
    setPage(page - 1)
  }
  const handleNext = () => {
    setPage(page + 1)
  }

  const [disErr, setDisErr] = useState('')

  const handleDiscription = (e) => {
    const arr = e.split(' ')
    setWordCount(arr.filter((word) => word !== '').length)
    if (arr.filter((word) => word !== '').length <= dynamicCount) {
      setDiscription(e)
      setDisErr('')
    } else {
      setDisErr('Word Count Limit exceeded')
    }
  }

  const pageSize = [4, 8, 12, 16, 20]

  const nextPage = (data) => {
    setAssigmnetId(data)
    setResubmitAnswer(true)
  }
 
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const handleShow = async (id) => {
    if (description && id) {
      await dispatch(
        resubmitAssignmentbyIdAsync({
          assignment_id: id,
          assignment_answer: description,
          time_zone: timezone,
        }),
        setTimeout( async() => {
          await setResubmitAnswer(false)
          await window.location.reload(false);
        }, 1000),
      )
    } else {
      setErrorAnswer('Answer is Required')
    }
  }

  useEffect(() => {
    if (resubmitAssignmentmessage) {
      toast.success(resubmitAssignmentmessage?.data)
    }
  }, [resubmitAssignmentmessage])

  return (
    <>
      <TeacherOrder />
      <div>
        {resubmitAnswer ? (
          <div className="start-ans-wrap-inner">
            <CCard className="border-0 p-5">
              <div className="d-flex justify-content-end ">
                <div className="share" onClick={() => setResubmitAnswer(false)}>
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

                    {resubmitData?.data?.data?.category_status?.map((ele, ind) => {
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

              <div className="my-4">
                <CKEditor
                  config={{
                    removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed', 'Table'],
                  }}
                  editor={ClassicEditor}
                  onChange={(e, editor) => handleDiscription(editor.getData())}
                  data=""
                />
                <p className="text-danger">{disErr}</p>
                <p>Word:{wordCount}</p>
                <span className="text-danger">{errorAnswer}</span>
              </div>
              <div className="d-flex main-btn-wrap">
                {wordCount <= dynamicCount ? (
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
        ) : (
          <div>
            <div className="answer-history-wrapper">
              <Card className="border-0 p-4 mb-4">
                <div>
                  <h6>My Answer History</h6>
                  <Row className="my-4">
                    <Col sm="12" md="12" lg="2">
                      <div className="me-2 w-100 tabs-inner-content">
                        <label className="fs-6 fw-normal my-1"> Category</label>
                        <Form.Select
                          className="w-100"
                          aria-label="Default select example"
                          name="subject"
                          onChange={(e) => setCategory(e?.target?.value)}
                        >
                          <option value="">All</option>
                          {resubmitData?.data?.data?.category_status?.map((item, ind) => {
                            return (
                              <option key={ind} className="" value={item?.value}>
                                {item?.name}
                              </option>
                            )
                          })}
                        </Form.Select>
                      </div>
                    </Col>
                    <Col sm="12" md="12" lg="2" xl="3" xxl="2">
                      <div className="me-2 w-100 tabs-inner-wrap">
                        <label className="fs-6 fw-normal my-1">Due From</label>
                        <div className="position-relative pe-4">
                          <DatePicker
                            className="form-control ps-5 marginTop"
                            selected={startDate}
                            onChange={(date) => hanldleDatePrev(date)}
                            selectsStart
                            startDate={startDate}
                            placeholderText={'Start Date'}
                            maxDate={new Date()}
                            dateFormat="yyyy-MM-dd"
                          />
                          <div className="date-pick-icn position-absolute">
                            <i className="date-icon fa fa-calendar  " aria-hidden="true"></i>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm="12" md="12" lg="2" xl="3" xxl="2">
                      <div className="me-2 w-100 tabs-inner-wrap">
                        <label className="fs-6 fw-normal my-1">Due To</label>
                        <div className="position-relative">
                          <DatePicker
                            className="date-pick form-control ps-5"
                            selected={endDate}
                            minDate={moment().toDate()}
                            placeholderText={' End Date'}
                            onChange={(date) => hanldleDateCurrent(date)}
                            selectsEnd
                            endDate={endDate}
                            dateFormat="yyyy-MM-dd"
                          />
                          <div className="date-pick-icn position-absolute">
                            <i className="date-icon fa fa-calendar  " aria-hidden="true"></i>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="12" md="4" className="mt-2">
                      <label></label>
                      <Form.Control
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Search"
                      />
                    </Col>
                    <Col sm="12" md="2">
                      <div className="mt-4">
                        {/* <Button onClick={handleSearch} className="button-custom mt-2">
                          Search
                        </Button> */}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col
                      sm="12"
                      md="6"
                      lg="3"
                      className="d-flex justify-content-between align-items-center ans-box-wrapper py-2 mx-2 mb-3 mb-xl-0"
                    >
                      <h6>Resubmit Answered</h6>
                      <h2 className="">{resubmitData?.data?.data?.resubmit_answered}</h2>
                    </Col>
                    {/* <Col
                      sm="12"
                      md="6"
                      lg="3"
                      className="d-flex justify-content-between align-items-center ans-box-wrapper py-2 mx-2 mb-3 mb-xl-0"
                    >
                      <h6>Skipped</h6>
                      <h2 className="">56</h2>
                    </Col> */}
                    <Col
                      sm="12"
                      md="6"
                      lg="3"
                      className="d-flex justify-content-between align-items-center ans-box-wrapper py-2 mx-2 mb-3 mb-xl-0"
                    >
                      <h6>Total</h6>
                      <h2 className="">102</h2>
                    </Col>
                    <Col></Col>
                  </Row>
                  {resubmitData?.data?.data?.data?.data?.map((ele, index) => {
                    return (
                      <div key={index} className="my-4 inner-wrap-sizes">
                        <h6>{ele?.assignment_id}</h6>
                        <div className="green-wrap-outer justify-content-between align-items-center">
                          <p className="bold-text mb-0 mt-1">{ele?.question}</p>
                          {ele?.assignment_status === 3 ? (
                            <div className="icn-green-wrap">
                              <h6 className="heading-wrap me-3 mb-0">Answered</h6>
                              <img className="" src={greentick} alt="React Image" />
                            </div>
                          ) : ele?.assignment_status === 4 ? (
                            <div className="icn-green-wrap">
                              <h6 className="heading-wrap text-danger me-3 mb-0">Rejected</h6>
                              <img className="" src={redtick} alt="React Image" />
                            </div>
                          ) : (
                            <div className="icn-green-wrap">
                              {resubmitData?.data?.data?.all_assignment_status?.map(
                                (item, index) => (
                                  <span key={index}>
                                    {item.value == ele.assignment_status ? (
                                      <h6
                                        className="heading-wrap me-3 mb-0"
                                        style={{ color: '#FAB005' }}
                                      >
                                        {' '}
                                        {item.name}
                                      </h6>
                                    ) : (
                                      ''
                                    )}
                                  </span>
                                ),
                              )}
                              <img className="" src={yellowtick} alt="React Image" />
                            </div>
                          )}
                        </div>
                        <Row className="my-3">
                          <Col xs={12} md={6} lg={4}>
                            <h3>
                              <span className="me-2"> Due Date:</span>
                              {moment(new Date(ele?.due_date + ' UTC').toString()).format(
                                'YYYY-MM-DD hh:mm:a',
                              )}
                            </h3>
                          </Col>
                          <Col xs={12} md={6} lg={4}>
                            <h3>
                              <span className="me-2">Category:</span>{' '}
                              {ele?.category == 1
                                ? 'IT Coding'
                                : ele?.category == 2
                                ? 'Non-IT'
                                : ele?.category == 3
                                ? 'IT'
                                : ele?.category == 4
                                ? 'Others'
                                : ''}
                            </h3>
                          </Col>
                          <Col xs={12} md={6} lg={4}>
                            <h3>
                              <span className="me-2">Number of pages/words:</span>
                              {ele?.word_count ? ele?.word_count : 250}
                            </h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="para-text-bg">
                              <p
                                className="me-1 h6"
                                dangerouslySetInnerHTML={{ __html: ele?.question_description }}
                              />
                            </div>
                          </Col>
                        </Row>
                        <div className="d-flex justify-content-end main-btn-wrap my-4">
                          <Row>
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
                          </Row>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          
            {/*  */}
            <div className="d-flex justify-content-end mb-4">
          <div className="d-flex text-align-center">
            <span className="d-flex text-align-center ">
              <p className="text-secondary  entries space-pegination-wrap" style={{marginTop:"10px"}}>
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
          <div style={{marginTop:"7px"}}>
          {resubmitData?.data?.data?.data?.from}-{resubmitData?.data?.data?.data?.to} of{' '}
              {resubmitData?.data?.data?.data?.total}
          {/* {resubmitData?.data?.data?.data?.per_page} of {resubmitData?.data?.data?.data?.total} */}
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
              {page < resubmitData?.data?.data?.data?.last_page ? (
                <Pagination.Next onClick={handleNext} />
              ) : (
                <Pagination.Next disabled onClick={handleNext} />
              )}

              {resubmitData?.data?.data?.data?.last_page > page ? (
                <Pagination.Last onClick={() => setPage(resubmitData?.data?.data?.data?.last_page)} />
              ) : (
                <Pagination.Last disabled />
              )}
            </Pagination>
          </div>
        </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ResubmissionRequest
