import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import clientimg from '../../assets/images/avatars/Avatar0.jpg'
import videoImg from '../../assets/images/videoIcon.svg'
import {
  chatUserList,
  getFindUserAsync,
  postFirstMessageAsync,
  postMessageListAsync,
} from 'src/store/features/ChatSlice'
import NavTopBar from 'src/layout/NavTopBar'
import BackButton from 'src/Views/widgets/BackButton'
import {
  CButton,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
// import { useChatScroll } from './useChatScroll'

const Chat = () => {
  const dispatch = useDispatch()

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState([])
  const [textMessages, setTextMessages] = useState('')
  const [visible, setVisible] = useState(false)
  const [senderId, setSenderId] = useState([])
  const [userList, setUserList] = useState([])
  const [click, setClick] = useState(false)
  const { chatList } = useSelector((state) => state?.chats)
  const { messageList } = useSelector((state) => state?.chats)
  const { findUsers } = useSelector((state) => state?.chats)
  const [teacherZoomId, setTeacherZoomId] = useState('')
  const [name, setName] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [teacherName, setTeacherName] = useState('')
  const [threaId, setThreadId] = useState('')
  const navigate = useNavigate()
  const scrollPosition=useRef();



  const connectionOptions = {
    transports: ['websocket'],
    query: {
      username: senderId,
    },
  }
  const socket = io(process.env.REACT_APP_CHAT_SERVER, connectionOptions)


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
  useEffect(() => {
    if (teacherId) {
      dispatch(postMessageListAsync({ receiver_id: teacherId }))
    }
  }, [teacherId])

  
  const userChat = (e) => {
    setThreadId(e.treadId)
    setTeacherZoomId(e.reciverId)
    setName(e.teacherName)
  }
  const findUser = () => {
    setClick(true)
    dispatch(getFindUserAsync())
  }

  useEffect(() => {
    if (chatList) {
      setUserList(chatList?.data?.data)
      setSenderId(chatList?.data?.logged_user)
    }
  }, [chatList])

  const sendData = () => {
    if (message.length !== 0) {
      let data = {
        message: message,
        sender_id: senderId,
        receiver_id: teacherZoomId,
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

  const teacherListing = (id) => {
    setTeacherId(id)
    // setTeacherName(name)
  }

  const firstMessage = async () => {
    await dispatch(postFirstMessageAsync({ receiver_id: teacherId, message: textMessages }))
    window.location.reload(false)
    setVisible(false)
  }

 
  console.log(userList,"userList")
  useEffect(()=>{
if(scrollPosition){
  scrollPosition?.current?.scrollIntoView(true, {
    behaviour: "auto",
});
}
  },[messages])


  return (
    <>
      <NavTopBar />
      <p className="text-white mb-2">.....</p>
      {click ? (
        <div>
          <div className="d-flex justify-content-end ">
            <Button className="button-custom" onClick={(e) => setClick(false)}>
              {' '}
              Back
            </Button>
          </div>
        </div>
      ) : (
        <div className="me-4">
          <BackButton />
        </div>
      )}
      <Container className="mt-3" fluid>
        <Row className="gy-5 p-3">
          <Col xs={12} md={12} xl={3} className="user-list-wrap">
            <div className="user-list">
              {userList?.map((ele, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => {
                      teacherListing(ele.receiver_id)
                      // scrollchat()
                      userChat({
                        treadId: ele.thread_id,
                        reciverId: ele.receiver_id,
                        teacherName: ele.user,
                      })
                    }}
                    className="main-inbox-wrap mb-3"
                  >
                    <img className="me-3 rounded-pill" src={clientimg} width={50} alt="react img" />
                    <div>
                      <h3 className="mb-0 pointer">{ele.user}</h3>
                      <input type="hidden" value={ele.receiver_id}></input>
                    </div>
                  </div>
                )
              })}
            </div>
          </Col>

          <Col
            className="position-relative"
            xs={12}
            md={12}
            xl={9}
            style={{ borderRadius: '5px', height: 'calc(100vh - 220px)' }}
          >
            {teacherZoomId ? (
              <div className="d-flex text-input-wrap mb-3 ">
                <div className="chat-outer w-100 " id="chat1">
                  <div className="card-header d-flex justify-content-between align-items-center p-3 text-white outre-chat-inbox  shadow-sm">
                    <div className="profile-section d-flex align-items-center">
                      <img src={clientimg} width={50} className="cursor-pointer rounded-pill" />
                      <p className="mb-0 fw-bold text-black mx-3">{name}</p>
                    </div>
                    <div className="nav-section-chat">
                      <button
                        className="bg-transparent border-0"
                        onClick={() => navigate(`/meeting/${teacherZoomId}`)}
                      >
                        <img width="20px" src={videoImg} />
                      </button>
                    </div>
                  </div>
                  <div className="chat-background chat-spacing-custom-clr border-0 utre-chaot-inbox mt-3">
                    <div className="chat-section">
                      {messages?.map((ele, index) => {
                        if (messageList?.data?.logged_user === ele?.sender_id) {
                          return (
                            <div key={index} className="d-flex justify-content-end" >
                              <div className="sender chat-sender-color" ref={scrollPosition}>
                                <p className="mb-0">
                                  {ele.message}
                                </p>
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div key={index} className="receiver">
                              <div className=" mx-2 chat-receiver-color" ref={scrollPosition}>
                                <p className="mb-0">
                                  {ele.message}
                                </p>
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
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Container>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader className="border-0" onClose={() => setVisible(false)}>
          <CModalTitle></CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="d-flex align-items-center">
            <img src={clientimg} alt="user img" className="rounded-circle" width={30} />
            <span className="px-2 fs-6">{teacherName}</span>
          </div>
        </CModalBody>
        <CModalFooter className="border-0 ">
          <CFormTextarea
            rows={2}
            value={textMessages}
            onChange={(e) => setTextMessages(e.target.value)}
          ></CFormTextarea>
          <CButton className="my-4" color="primary button-custom" onClick={firstMessage}>
            Send
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default Chat
