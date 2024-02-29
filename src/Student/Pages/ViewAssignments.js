import React, { useEffect, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { CCard } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearAllState,
  // getAssignmentbyIdAsync,
  getUserAssignmentbyIdAsync,
  resubmitAssignmentById,
} from '../../store/features/getAssignmentbyId'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import NavTopBar from 'src/layout/NavTopBar'
import BackButton from 'src/Views/widgets/BackButton'
import { toast } from 'react-toastify'
import Loader from 'src/Views/Loader/Loader'

const ViewAssignments = () => {
  let { id } = useParams()
  const dispatch = useDispatch()
  const { getAssignmentID } = useSelector((state) => state?.AssignmentbyId)
  const assignmentStatus = getAssignmentID?.data?.data?.data
  const currentDate = new Date()
  const mergeDateAndTime = new Date(
    assignmentStatus?.answered_on_date + ' ' + assignmentStatus?.answered_on_time,
  )
  const [readMore, setReadMore] = useState(false)

  const data = moment().diff(mergeDateAndTime, 'hours')
  const { resubmitMessage } = useSelector((state) => state.AssignmentbyId)
  // const { orderReLoading } = useSelector((state) => state.AssignmentbyId)

  useEffect(() => {
    dispatch(getUserAssignmentbyIdAsync(id))
  }, [id])

  const handleResubmit = async (id) => {
    await dispatch(resubmitAssignmentById({ assignment_id: id }))
    await dispatch(clearAllState())
    await dispatch(getUserAssignmentbyIdAsync(id))
  }
  useEffect(() => {
    if (resubmitMessage) {
      toast.success(resubmitMessage?.data?.data)
    }
  }, [resubmitMessage])

  return (
    <>
      {/* {orderReLoading ? (
        <div className=" d-flex justify-content-center zIndex load-custom ">
          <Loader />
        </div>
      ) : (
        ''
      )} */}
      <NavTopBar />
      <div>
        <CCard className="border-0 p-5 mt-3 answer-history-wrapper">
          <div className="">
            <BackButton />
          </div>
          <div className="">
            <h6 className="fw-bold fs-5">{assignmentStatus?.assignment_id}</h6>
          </div>
          <Row className="my-3 inner-wrap-sizes">
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2"> Due Date:</span>
                {assignmentStatus?.due_date == null
                  ? 'Pending'
                  : moment(new Date(assignmentStatus?.due_date + ' UTC').toString()).format(
                      'YYYY-MM-DD hh:mm:a',
                    )}
              </h3>
            </Col>
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2">Completed on:</span>
                {assignmentStatus?.answered_on_date == null
                  ? 'Pending'
                  : moment(
                      new Date(
                        assignmentStatus?.answered_on_date +
                          ` ${assignmentStatus?.answered_on_time}` +
                          ' UTC',
                      ).toString(),
                    ).format('MM-DD-YYYY hh:mm:a')}
              </h3>
            </Col>
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2">Submitted By:</span>
                {assignmentStatus?.teacher_name ? assignmentStatus?.teacher_name : 'Pending'}
              </h3>
            </Col>
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2">Status:</span>{' '}
                {getAssignmentID?.data?.data?.all_assignment_status?.map((ele) => {
                  if (ele.value == assignmentStatus?.assignment_status) {
                    return ele.name
                  }
                })}
              </h3>
            </Col>
          </Row>
          <Row className="my-3 inner-wrap-sizes">
            {assignmentStatus?.category == 1 ? (
              ''
            ) : (
              <Col xs={12} md={6} lg={6} xl={3}>
                <h3>
                  <span className="me-2">Number of Words:</span> {assignmentStatus?.word_count}
                </h3>
              </Col>
            )}
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2"> Category:</span>
                {getAssignmentID?.data?.data?.category_status.map((ele) => {
                  if (ele.value == assignmentStatus?.category) {
                    return ele.name
                  }
                })}
              </h3>
            </Col>
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2"> Download Assignment:</span>
                <Link to={`${process.env.REACT_APP_ARTICLE_URL+getAssignmentID?.data?.data?.data?.assignment_answer_path}`}target='_blank'><Button className='download-btn'>Download</Button></Link>
              </h3>
            </Col> 
            {console.log(getAssignmentID?.data?.data,"dhvhg")}  

            {assignmentStatus?.category == 4 ? (
              <Col xs={12} md={6} lg={6} xl={3}>
                <h3>
                  <span className="me-2">Other Category:</span>{' '}
                  {assignmentStatus?.category_other ? assignmentStatus?.category_other : ''}
                </h3>
              </Col>
            ) : (
              ''
            )}
          </Row>
          <div className=" main-btn-wrap">
            <h5>Q:{assignmentStatus?.question}</h5>
            <span>
              <span className="me-1 h6">{'Description:'}</span>
              <div
                className={!readMore ? 'me-1 h6 read-more' : 'me-1 h6'}
                dangerouslySetInnerHTML={{
                  __html: assignmentStatus?.question_description,
                }}
              />
              <button
                className="bg-transparent text-primary border-0"
                onClick={() => {
                  setReadMore(!readMore)
                }}
              >
                {!readMore ? '...ReadMore' : '...ReadLess'}
              </button>
            </span>
            <Row className="my-3">
              <Col xs={12} md={6}>
                <p>
                  <span className="h6 me-1">{'Answer: '}</span>
                  {assignmentStatus?.assignment_status === 3 ||
                  assignmentStatus?.assignment_status === 6 ? (
                    <div
                      className="me-1 h6"
                      dangerouslySetInnerHTML={{
                        __html: assignmentStatus?.assignment_answer,
                      }}
                    />
                  ) : (
                    ''
                  )}
                </p>
              </Col>
            </Row>

            {moment(currentDate).format('DD-MM-YYYY') >
            moment(assignmentStatus?.status_changed_on).add(7, 'days').format('DD-MM-YYYY') ? (
              ''
            ) : (
              <div className="d-flex justify-content-end">
                {assignmentStatus?.assignment_status == 3 ||
                assignmentStatus?.assignment_status == 6 ? (
                  <div>
                    <Button
                      className="button-custom text-white"
                      onClick={() => handleResubmit(assignmentStatus?.id)}
                    >
                      Re-Work
                    </Button>
                    <p className="my-1 ms-5 ">{assignmentStatus?.resubmit_request} out of 3</p>
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        </CCard>
      </div>
    </>
  )
}

export default ViewAssignments
