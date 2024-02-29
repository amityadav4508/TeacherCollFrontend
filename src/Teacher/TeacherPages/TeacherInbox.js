import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import clientimg from '../../assets/images/avatars/Avatar0.jpg'
import { chatUserList, postMessageListAsync } from 'src/store/features/ChatSlice'
import Loader from 'src/Views/Loader/Loader'
import SendIcon from '../../assets/images/send.png'
import { useRef } from 'react'

export default function App() {
  const dispatch = useDispatch()
  const getUserData = useSelector((state) => state)

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState([])
  // const [typingText, setTypingText] = useState('')
  const [reciverId, setReciverId] = useState('')
  const [senderId, setSenderId] = useState([])
  const [name, setName] = useState('')
  const [userList, setUserList] = useState([])
  const { chatList } = useSelector((state) => state?.chats)
  const { messageList } = useSelector((state) => state?.chats)
  const { loading } = useSelector((state) => state?.chats)
  const [teacherZoomId, setTeacherZoomId] = useState('')
  const [threaId, setThreadId] = useState('')
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

  const userChat = (e, name, receiverId) => {
    setThreadId(e)
    setName(name)
    setTeacherZoomId(receiverId)
    setReciverId(receiverId)
  }

  useEffect(() => {
    if (reciverId) {
      dispatch(postMessageListAsync({ receiver_id: reciverId }))
    }
  }, [reciverId])

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

  useEffect(()=>{
    if(scrollPosition){
      scrollPosition?.current?.scrollIntoView(true, {
        behaviour: "auto",
    });
    }
      },[messages])

  return (
    <>
      {loading === true ? (
        <div className=" d-flex justify-content-center zIndex">
          <Loader />
        </div>
      ) : (
        ''
      )}
      <Container className="mt-3" fluid>
        <Row className="gy-5 p-3">
          <Col xs={12} md={12} xl={3} className="user-list-wrap user-wrap-list-teacher">
            <div className="user-list">
              {userList?.map((ele, index) => {
                return (
                  <div
                    key={index}
                    onClick={(e) => userChat(ele.thread_id, ele.name, ele?.receiver_id)}
                  >
                    <div className="main-inbox-wrap mb-3 p-1">
                      <img className="me-3 w-25" src={clientimg} alt="react img" />
                      <div>
                        <h3 className="mb-0 pointer">{ele?.receiver_id}</h3>
                        <input type="hidden" value={ele.receiver_id}></input>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Col>

          <Col
            xs={12}
            md={12}
            xl={9}
            style={{ borderRadius: '5px', height: 'calc(100vh - 220px)' }}
          >
            {teacherZoomId ? (
              <div className="d-flex text-input-wrap mb-3 ">
                <div className="chat-outer w-100 " id="chat1">
                  <div className="card-header d-flex justify-content-start align-items-center p-3 text-white outre-chat-inbox ">
                    <img src={clientimg} width={50} className="cursor-pointer" />
                    {/* {chatList?.data?.data?.map((item, indexn) => {
                      return ( */}
                    <p className="mb-0 fw-bold text-black mx-3">{reciverId}</p>
                    {/* )
                    })} */}
                  </div>
                  <div className="chat-background chat-spacing-custom-clr border-0 utre-chaot-inbox mt-3">
                    <div className="chat-section chat-sec-teacher">
                      {messages.map((ele, index) => {
                        if (messageList?.data?.logged_user === ele?.sender_id) {
                          return (
                            <div key={index} className="d-flex justify-content-end">
                              <div className="sender chat-sender-color bg-white" ref={scrollPosition}>
                                <p className="mb-0">{ele.message}</p>
                              </div>
                            </div>
                          )
                        } else {
                          return (
                            <div key={index} className="receiver">
                              <div className="d-flex align-items-center">
                                <div className=" mx-2 chat-receiver-color" ref={scrollPosition}>
                                  <p className="mb-0 ">{ele.message}</p>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      })}
                    </div>
                    <div className="form-outline d-flex align-items-center">
                      <input
                        type="text"
                        placeholder="Type here..."
                        onChange={(e) => setMessage(e.target.value)}
                        // onKeyDown={handleTyping}
                        // onKeyUp={handleStopTyping}
                        className="textfieldchat fieldbg-color"
                        value={message}
                        onKeyPress={(event) => (event.key === 'Enter' ? sendData() : null)}
                      />
                      <div className="file-send">
                        <div className="send" onClick={sendData}>
                          <img src={SendIcon} />
                        </div>
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
    </>
  )
}
