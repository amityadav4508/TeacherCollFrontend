import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import BackButton from 'src/Views/widgets/BackButton'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearMeetingState, meetingSheduleAsync } from 'src/store/features/MeetingSheduleSlice'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import moment from 'moment'
import NavTopBar from 'src/layout/NavTopBar'
import Footer from 'src/layout/Footer'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'

const Meeting = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [topic, setTopic] = useState('')
  const [date, setDate] = useState('')
  const [topicErr, setTopicErr] = useState('')
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const { meetingShedule } = useSelector((state) => state.meeting)

  useEffect(() => {
    if (meetingShedule?.data?.data) {
      const meeting = async () => {
        await toast.success(meetingShedule?.data?.data)
        clearMeetingState()
      }
      meeting()
    }
  }, [meetingShedule])

  const data = {
    topic: topic,
    schedule_time: date,
    time_zone: timezone,
    teacher_id: id,
  }
const [scheduleErr,setSheduleErr]=useState('')
  const handleSubmit = async () => {
    if (data?.topic && data.schedule_time) {
      await dispatch(meetingSheduleAsync(data))
      setTopic('')
      setDate('')
      setSheduleErr('')
    } else if(!data?.topic){
      setTopicErr('Topic Is Required')
    }else if(!data.schedule_time){
      setSheduleErr('Date is Required')
    }
  }

 
const handleDateTime=(current)=>{ 
  const today = moment(new Date()).add(30, 'm').toDate();
  today.setHours(0, 0, 0, 0);
  console.log(current >= today,'current >= today')
  return current >= today;
}

  return (
    <>
      <NavTopBar />
      <div className="bg-light py-5 meeting-height-wrap-st h-auto">
        <div className="mt-2 shadow-sm boder-0 p-4 bg-white container">
          <BackButton />
          <div>
            <Row>
            <label className="fs-6 fw-normal my-1"> Schedule Time</label>
              <Datetime
                selected={date}
                input={false}
                initialViewDate={moment(new Date()).add(30, 'm').toDate()}
                isValidDate={handleDateTime}
                onChange={(date) => setDate(moment(date).format('HH:mm DD-MMMM-YYYY'))}
                placeholder="Please select a date"
              />
                     <p className="text-danger">{scheduleErr}</p>
              
             
            </Row>
            <Col>
              <div className=" justify-content-between tabs-inner-content mb-3 py-4">
                <label className="fs-6 fw-normal my-1"> Topic</label>
                <div className="me-2 w-100 ">
                  <Form.Control
                    className="border-1 w-100  "
                    value={topic ? topic : ''}
                    onChange={(e) =>{setTopicErr('')
                     setTopic(e.target.value)}}
                  />
                  <p className="text-danger">{topicErr}</p>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Button className="button-custom" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Col>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Meeting
