import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Pagination, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import greentick from '../../assets/images/green-tick.svg'
import yellowtick from '../../assets/images/yellow-tick.svg'
import clientimg from '../../assets/images/avatars/Avatar0.jpg'
import redtick from '../../assets/images/red-tick.svg'
import { getStudentAssignmentListAsync, getStudentAssignmentRatingAsync } from 'src/store/features/StudentordersSlice'
import { useDispatch, useSelector } from 'react-redux'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactStars from 'react-rating-stars-component'
import {
  chatUserList,
  postFirstMessageAsync,
  postMessageListAsync,
} from 'src/store/features/ChatSlice'
import { io } from 'socket.io-client'

const AskQuestion = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { date } = useParams()
  const [visible, setVisible] = useState(false)
  const [search, setSearch] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('')
  const [senderId, setSenderId] = useState([])
  const [messages, setMessages] = useState([])
  const [userList, setUserList] = useState([])
  const [textMessages, setTextMessages] = useState('')
  const [teacherName, setTeacherName] = useState('')
  const [teacherZoomId, setTeacherZoomId] = useState('')
  const [message, setMessage] = useState([])
  const [teacherId, setTeacherId] = useState('')
  const [reciverId, setReciverId] = useState('')
  const [name, setName] = useState('')
  const { Studentassignments } = useSelector((state) => state?.StudentOrders)
  const { chatList } = useSelector((state) => state?.chats)
  const { messageList } = useSelector((state) => state?.chats)
  const { subscription_status } = useSelector((state) => state?.mainPageContent)

  const connectionOptions = {
    transports: ['websocket'],
    query: {
      username: senderId,
    },
  }
  const socket = io(process.env.REACT_APP_CHAT_SERVER, connectionOptions)

  const PaymentSelectedData = {
    page: page,
    page_size: limit,
    category: category,
    start_date: startDate ? moment(new Date(startDate)).format('YYYY-MM-DD') : null,
    end_date: endDate ? moment(new Date(endDate)).format('YYYY-MM-DD') : null,
  }

  useEffect(() => {
    if (messageList?.data?.data) {
      setMessages(messageList?.data?.data)
    }
  }, [messageList])

  useEffect(() => {
    const data = async () => {
      await dispatch(chatUserList())
    }
    data()
  }, [])

  const userChat = (numbwer, name, id) => {
    dispatch(postMessageListAsync({ receiver_id: id }))
    setTeacherZoomId(numbwer)
    setName(name)
  }

  useEffect(() => {
    if (chatList) {
      setUserList(chatList?.data?.data)
      setSenderId(chatList?.data?.logged_user)
    }
  }, [chatList])
  console.log(userList, 'userList')

  const sendData = () => {
    if (message.length !== 0) {
      let data = {
        message: message,
        sender_id: senderId,
        receiver_id: reciverId,
      }
      socket.emit('message', data)
      setMessages([...messages, data])
      setMessage('')
    }
  }

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages([...messages, data])
    })
  }, [socket, messages])


  useEffect(() => {
    if (startDate || endDate || category || limit || page) {
      dispatch(getStudentAssignmentListAsync(PaymentSelectedData))
    }
  }, [startDate, endDate, category, limit, page])

  const searchData = async () => {
    // setSearch(true)
    await dispatch(getStudentAssignmentListAsync(PaymentSelectedData))
    await dispatch(
      getStudentAssignmentListAsync({
        keyword: keyword,
      }),
    )
  }

  useEffect(() => {
    if (search || keyword.length == 0) {
      dispatch(
        getStudentAssignmentListAsync({
          keyword: keyword,
        }),
      )
      setSearch(false)
    } else {
      dispatch(getStudentAssignmentListAsync())
    }
  }, [search, keyword])

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

  const handleChat = (e, name, reciver) => {
    setTeacherId(e)
    setTeacherName(name)
    setReciverId(reciver)
  }
  const firstMessage = async () => {
    await dispatch(postFirstMessageAsync({ receiver_id: teacherId, message: textMessages }))
    await setVisible(false)
    setTextMessages('')
  }
  const [readMore, setReadMore] = useState(false)


  const [ratingAssgnmentId, setRatingAssignmentId] = useState('')

  const ratingChanged = (e, id) => {
    dispatch(getStudentAssignmentRatingAsync({ assignment_id: id, rating: e }))
  }

  return (
    <>
      <div className="mt-3 ">
        {/* <h6>Search</h6> */}
        <div className=" p-4 shadow-sm border-color-wrap-dash mt-2">
          <Row className="my-4">
            <h3 className="mb-3">Search</h3>
            <Col sm="12" md="12" lg="2">
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
                  {Studentassignments?.category_status?.map((item, ind) => {
                    return (
                      <option key={ind} className="" value={item?.value}>
                        {item?.name}
                      </option>
                    )
                  })}
                </Form.Select>
              </div>
            </Col>
            <Col sm="12" md="12" lg="2">
              <div className="me-2 w-100 tabs-inner-wrap">
                <label className="fs-6 fw-normal my-1"> Due Date Start</label>
                <div className="position-relative pe-4">
                  <DatePicker
                    className="form-control ps-5"
                    selected={startDate}
                    onChange={(date) => hanldleDatePrev(date)}
                    selectsStart
                    startDate={startDate}
                    placeholderText={'Start Date'}
                    endDate={endDate}
                    maxDate={endDate}
                    dateFormat="yyyy-MM-dd"
                  // endDate={endDate}
                  />
                  <div className="date-pick-icn position-absolute">
                    <FontAwesomeIcon className="fa-xs me-2 " icon={faCalendarDays}/>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm="12" md="12" lg="2">
              <div className="me-2 w-100 tabs-inner-wrap">
                <label className="fs-6 fw-normal my-1">Due Date End</label>
                <div className="position-relative">
                  <DatePicker
                    className="date-pick form-control ps-5"
                    selected={endDate}
                    //  minDate={startDate}
                    placeholderText={' End Date'}
                    onChange={(date) => hanldleDateCurrent(date)}
                    selectsEnd
                    // endDate={endDate}
                    // maxDate={endDate}
                    // startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={endDate}
                    dateFormat="yyyy-MM-dd"
                  />
                  <div className="date-pick-icn position-absolute">
                    <FontAwesomeIcon className="fa-xs me-2 " icon={faCalendarDays} />
                  </div>
                </div>
              </div>
            </Col>
            <Col sm="12" md="4" style={{ marginTop: '2rem' }}>
              <Form.Control
                // style={{marginTop:"1rem"}}
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
        </div>

        {Studentassignments?.data?.data?.map((ele, index) => (

          <div
            key={index}
            className="inner-wrap-sizes mt-5 mb-4 shadow-sm p-4 color-wrap-custom-bg"
          >
              <div className="d-flex justify-content-between align-items-center" key={index}>
                <h6>{ele?.assignment_id}</h6>
                <div className='d-flex'>
               
                {ele?.assignment_status === 3 ? (
                  <div className='me-3'>
                    <ReactStars
                      count={5}
                      value={ele?.rating}
                      onChange={(e) => ratingChanged(e, ele?.id)}
                      size={24}
                      activeColor="#ffd700"
                    />
                  </div>
                ) : (
                  ''
                )}
                {subscription_status?.data?.data?.is_platinum != 0 &&
                  ele?.teacher_id != 0 &&
                  ele?.assignment_status != 2 && ele?.assignment_status != 1 ? (
                  <Button
                    className="button-custom text-white mb-2"
                    onClick={(e) => {

                      userChat(ele?.teacher_id_number, ele?.teacher_name, ele?.teacher_id)
                      handleChat(ele?.teacher_id_number, ele?.teacher_name, ele?.teacher_id)
                      setVisible(!visible)
                    }}
                  >
                    Chat
                  </Button>
                ) : (
                  ''
                )}
              </div>
              </div>
            <div className="green-wrap-outer justify-content-between align-items-center">
              <p className="bold-text mb-0 mt-1">{ele?.question}</p>
       
              {ele?.assignment_status === 3 ? (
                <div className="icn-green-wrap">
                  <h6 className="heading-wrap me-3 mb-0">Answered</h6>
                  <img className="" src={greentick} alt="React Image" />
                </div>
              ) : ele?.assignment_status == 4 ? (
                <div className="icn-green-wrap">
                  <h6 className="heading-wrap text-danger me-3 mb-0">Rejected</h6>
                  <img className="" src={redtick} alt="React Image" />
                </div>
              ) : (
                <div className="icn-green-wrap">
                  {Studentassignments?.all_assignment_status?.map((item, index) => (
                    <span key={index}>
                      {item.value == ele.assignment_status ? (
                        <h6 className="heading-wrap me-3 mb-0" style={{ color: '#FAB005' }}>
                          {' '}
                          {item.name}
                        </h6>
                      ) : (
                        ''
                      )}
                    </span>
                  ))}
                  <img className="" src={yellowtick} alt="React Image" />
                </div>
              )}
            </div>

            <Row className="my-3">
              <Col xs={12} md={6} lg={3}>
                <h3 className="bg-white">
                  <span className="me-2 lh-wrap-custom"> Due Date:</span>
                  <br></br>
                  {moment(new Date(ele?.due_date + ' UTC').toString()).format('YYYY-MM-DD hh:mm:a')}
                </h3>
              </Col>
              <Col xs={12} md={6} lg={3}>
                <h3 className="bg-white">
                  <span className="me-2 lh-wrap-custom">Category:</span>
                  <br></br>{' '}
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
              <Col xs={12} md={6} lg={3}>
                <h3 className="bg-white">
                  <span className="me-2 lh-wrap-custom" >Number of pages/words:</span> <br></br>{' '}
                  {ele?.word_count}
                </h3>
              </Col>
              {ele?.question_assingment_path == null ? (
                ''
              ) : (
                <Col xs={12} md={6} lg={3}>
                  <h3 className="bg-white pb-2">
                    <span className="me-2 lh-wrap-custom">
                      Download:
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
                    <br></br>
                  </h3>
                </Col>
              )}
            </Row>
            <Row>
              <Col>
                <div className="para-text-bg bg-white">

                  <div
                    className={!readMore ? 'me-1 h6 read-more' : 'me-1 h6'}
                    dangerouslySetInnerHTML={{ __html: ele?.question_description }}
                  />
                  {ele.question_description.split(' ').filter((word) => word !== '').length > 100 ?
                    <button
                      className="bg-transparent text-primary border-0"
                      onClick={() => setReadMore(readMore !== ele?.id ? ele?.id : '')}
                    >
                      {readMore == ele.id ? 'Read Less << ' : ' Read More >>'}
                    </button> : ""
                  }
                </div>
                <div className="d-flex justify-content-end">
                  <Button
                    className="button-custom text-white mt-4"
                    onClick={() => navigate(`/user/student/viewassignments/${ele.id}`)}
                  >
                    Open
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        ))}

        <hr className="my-5"></hr>
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
              {Studentassignments?.data?.from}-{Studentassignments?.data?.to} of{' '}
              {Studentassignments?.data?.total}
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
            {page < Studentassignments?.data?.last_page ? (
              <Pagination.Next onClick={handleNext} />
            ) : (
              <Pagination.Next disabled onClick={handleNext} />
            )}

            {Studentassignments?.data?.last_page > page ? (
              <Pagination.Last onClick={() => setPage(Studentassignments?.data?.last_page)} />
            ) : (
              <Pagination.Last disabled />
            )}
          </Pagination>
        </div>
      </div>

      {/*  */}
      <Modal size="lg" show={visible} onHide={() => setVisible(false)} centered>
        <Modal.Header className="border-0" closeButton></Modal.Header>
        <Modal.Body>
          <Col
            className="position-relative"
            xs={12}
            md={12}
            xl={12}
            style={{ borderRadius: '5px', height: 'calc(100vh - 220px)' }}
          >
            {console.log(teacherId, 'teacherId')}
            <div className="d-flex text-input-wrap mb-3 ">
              <div className="chat-outer w-100 " id="chat1">
                <div className="card-header d-flex justify-content-between align-items-center p-3 text-white outre-chat-inbox  shadow-sm">
                  <div className="profile-section d-flex align-items-center">
                    <img src={clientimg} width={50} className="cursor-pointer rounded-pill" />
                    <p className="mb-0 fw-bold text-black mx-3">{teacherId}</p>
                  </div>
                </div>
                <div className="chat-background chat-spacing-custom-clr border-0 utre-chaot-inbox mt-3">
                  <div className="chat-section">
                    {messages?.map((ele, index) => {
                      if (messageList?.data?.logged_user === ele?.sender_id) {
                        return (
                          <div key={index} className="d-flex justify-content-end">
                            <div className="sender chat-sender-color">
                              <p className="mb-0">{ele.message}</p>
                            </div>
                          </div>
                        )
                      } else {
                        return (
                          <div key={index} className="receiver">
                            <div className=" mx-2 chat-receiver-color">
                              <p className="mb-0 ">{ele.message}</p>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>

                  <div className="form-outline d-flex align-items-center text-input-section">
                    <input
                      type="text"
                      placeholder="Type here..."
                      onChange={(e) => setMessage(e.target.value)}
                      // onKeyDown={handleTyping}
                      // onKeyUp={handleStopTyping}
                      className="textfieldchat"
                      value={message}
                      onKeyPress={(event) => (event.key === 'Enter' ? sendData() : null)}
                    />
                    <div className="file-send">
                      <button className="send button-custom" onClick={sendData}>
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AskQuestion
