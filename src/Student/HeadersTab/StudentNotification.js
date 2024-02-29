import React from 'react'
import '../../App.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TeacherNotifyAsync } from 'src/store/features/NotificationSlice'
import BackButton from 'src/Views/widgets/BackButton'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import NavTopBar from 'src/layout/NavTopBar'

const StudentNotification = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { TeacherNotify } = useSelector((state) => state?.Notification)
  const { status } = useSelector((state) => state.Notification)

  useEffect(() => {
    if (status == 401) {
      toast.error('Un-authroised access')
      localStorage.removeItem('teacherAuth')
      localStorage.removeItem('checkType')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [status,navigate])

  useEffect(() => {
    dispatch(TeacherNotifyAsync())
  }, [dispatch])
  return (
    <>
    <NavTopBar/>
    <p className='text-white'>...</p>
      <BackButton />
      <section className="section-50">
        <div className="container">
          <h3 className="m-b-50 heading-line">Notifications</h3>

          <div className="notification-ui_dd-content">
            {TeacherNotify?.data?.map((ele, index) => {
              const classes = ele?.read_at
                ? 'notification-list '
                : 'notification-list notification-list--unread'
              return (
                <div key={index} className={classes}>
                  <div className="notification-list_content">
                    <div className="notification-list_detail">
                      <b>{ele?.data?.title}</b>
                      <div
                      className="me-1 h6"
                      dangerouslySetInnerHTML={{
                        __html:ele?.data?.message ,
                      }}
                    />
                      {/* <p className="text-muted"  dangerouslySetInnerHTML={{ __html: ele?.data?.message }}> </p> */}
                      <div className="d-flex">
                        <p>
                          {' '}
                          <small>{moment(ele?.created_at).format('MMMM Do YYYY, h:mm a')}</small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default StudentNotification
