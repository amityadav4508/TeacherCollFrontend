import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Pagination, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import greentick from '../../../assets/images/green-tick.svg'
import {
  getAnsweredAssignmentAsync,
  getTeacherManageOrderAsync,
} from 'src/store/features/TeachermanageorderSlice'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import TeacherOrder from '../TeacherOrder'
import ReactStars from 'react-rating-stars-component'

const AnswerHistory = () => {
  const [search, setSearch] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(4)
  const [readMore, setReadMore] = useState(false)
  const [category, setCategory] = useState('')
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { answeredAssignment } = useSelector((state) => state?.Teacherassignment)
  const { getTeacherManageAssignment } = useSelector((state) => state.Teacherassignment)

  useEffect(() => {
    dispatch(getTeacherManageOrderAsync({ page: page, page_size: limit }))
  }, [])

  const SelectedData = {
    page: page,
    page_size: limit,
    category: category,
    start_date: startDate ? moment(new Date(startDate)).format('YYYY-MM-DD') : null,
    end_date: endDate ? moment(new Date(endDate)).format('YYYY-MM-DD') : null,
    keyword: keyword,
  }

  const searchData = () => {
    setSearch(true)
  }

  useEffect(() => {
    if (startDate || endDate || category || page || limit || search) {
      dispatch(getAnsweredAssignmentAsync(SelectedData))
      setSearch(false)
    }
  }, [page, limit, category, startDate, endDate, search, dispatch])

  // useEffect(() => {
  //   {
  //     dispatch(getAnswerbyIdAsync(id))
  //   }
  // }, [])

  const hanldleDatePrev = (val) => {
    setStartDate(val)
    setEndDate('')
  }

  const hanldleDateCurrent = (val) => {
    setEndDate(val)
  }

  const handlePrev = () => {
    setPage(page - 1)
  }
  const handleNext = () => {
    setPage(page + 1)
  }
  const pageSize = [4, 8, 12, 16, 20]

  const linkName = !readMore ? 'Read Less << ' : ' Read More >>'

  return (
    <>
      <TeacherOrder />
      <div className="answer-history-wrapper">
        <Card className="border-0 p-4 mb-4">
          <div>
            <h6>My Answer History</h6>
            <Row className="my-4">
              <Col sm="12" md="12" lg="2" xl="3" xxl="2">
                <div className="me-2 w-100 tabs-inner-content">
                  <label className="fs-6 fw-normal my-1"> Category</label>
                  <Form.Select
                    className="w-100"
                    aria-label="Default select example"
                    name="subject"
                    value={category}
                    onChange={(e) => setCategory(e?.target?.value)}
                  >
                    <option value="">All</option>
                    {answeredAssignment?.data?.category_status?.map((item, ind) => {
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
                  <label className="fs-6 fw-normal my-1">Start Date</label>
                  <div className="position-relative pe-4">
                    <DatePicker
                      className="form-control ps-5 marginTop"
                      selected={startDate}
                      onChange={(date) => hanldleDatePrev(date)}
                      selectsStart
                      startDate={startDate}
                      placeholderText={'Start Date'}
                      // endDate={endDate}
                      // maxDate={endDate}
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
                  <label className="fs-6 fw-normal my-1">End Date</label>
                  <div className="position-relative">
                    <DatePicker
                      className="date-pick form-control ps-5"
                      selected={endDate}
                      // minDate={moment().toDate()}
                      placeholderText={'End Date'}
                      onChange={(date) => hanldleDateCurrent(date)}
                      selectsEnd
                      // startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      // maxDate={endDate}
                      //  maxDate={startDate}
                      dateFormat="yyyy-MM-dd"
                    />
                    <div className="date-pick-icn position-absolute">
                      <i className="date-icon fa fa-calendar  " aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="12" md="4" className="mt-2">
                <label></label>
                <Form.Control
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  type="text"
                  placeholder="Search"
                />
              </Col>
              <Col sm="12" md="2">
                <div className="mt-4">
                  <Button
                    className="button-custom mt-2"
                    onChange={() => searchData('onchange')}
                    onClick={() => searchData('onclick')}
                  >
                    Search
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
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

            {answeredAssignment?.data?.data?.data?.map((ele, index) => {
              return (
                <div key={index} className="my-4 inner-wrap-sizes">
                  <h6>{ele?.assignment_id}</h6>
                  <div className="green-wrap-outer justify-content-between align-items-center">
                    <p className="bold-text mb-0 mt-1">{ele?.question}</p>
                    <div className="d-flex">
                      <Col>
                        <ReactStars
                          count={5}
                          value={ele.rating}
                          edit={false}
                          size={24}
                          activeColor="#ffd700"
                        />
                      </Col>

                      <div className="icn-green-wrap">
                        {ele.assignment_status == 2 || ele.assignment_status == 6 ? (
                          <img className="" src={greentick} alt="React Image" />
                        ) : (
                          ''
                        )}
                        <h6 className=" mx-1 heading-wrap me-3 mb-0">
                          {ele.assignment_status == 2
                            ? 'Answered'
                            : ele.assignment_status == 6
                            ? 'Resubmit Answered'
                            : ''}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button
                      className="button-custom"
                      onClick={() => navigate(`/viewTeacherAnswer/${ele.id}`)}
                    >
                      Open
                    </Button>
                  </div>
                  <Row className="my-3">
                    <Col xs={12} md={6} lg={4}>
                      <h3>
                        <span className="me-2"> Due Date:</span>
                        {moment(new Date(ele?.due_date + ' UTC').toString()).format(
                          'YYYY-MM-DD hh:mm:a',
                        )}
                        {/* {moment(ele?.due_date).format('MMMM Do YYYY, h:mm a')} */}
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
                        <h5 className="me-2">Description:</h5>
                        <p
                          className="me-1 h6"
                          onClick={() => {
                            setReadMore(readMore !== ele?.id ? ele?.id : '')
                          }}
                        >
                          {linkName}
                        </p>
                        {readMore === ele?.id ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: ele?.question_description,
                            }}
                          />
                        ) : (
                          ''
                        )}
                        <div className="d-flex justify-content-end">
                          {/* <Button
                            className="button-custom"
                            onClick={() => navigate(`/viewTeacherAnswer/${ele.id}`)}
                          >
                            Open
                          </Button> */}
                        </div>
                      </div>
                    </Col>
                  </Row>
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
              {answeredAssignment?.data?.data?.from}-{answeredAssignment?.data?.data?.to} of{' '}
              {answeredAssignment?.data?.data?.total}
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
            {page < answeredAssignment?.data?.data?.last_page ? (
              <Pagination.Next onClick={handleNext} />
            ) : (
              <Pagination.Next disabled onClick={handleNext} />
            )}

            {answeredAssignment?.data?.data?.last_page > page ? (
              <Pagination.Last onClick={() => setPage(answeredAssignment?.data?.data?.last_page)} />
            ) : (
              <Pagination.Last disabled />
            )}
          </Pagination>
        </div>
      </div>
    </>
  )
}

export default AnswerHistory
