import React, { useEffect } from 'react'
import BackButton from 'src/Views/widgets/BackButton'
import { Col, Row } from 'react-bootstrap'
import { CCard } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAssignmentbyIdAsync } from 'src/store/features/getAssignmentbyId'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import Loader from 'src/Views/Loader/Loader'

const TeacherOrder = () => {
  let { id } = useParams()
  const dispatch = useDispatch()
  const { getAssignmentID } = useSelector((state) => state?.AssignmentbyId)
  const { orderReLoading } = useSelector((state) => state?.AssignmentbyId)
  const assignmentStatus = getAssignmentID?.data?.data?.data

  useEffect(() => {
    dispatch(getAssignmentbyIdAsync(id))
  }, [id])

  function removeTags(str) {
    if (str === null || str === '') return false
    else str = str?.toString()

    return str?.replace(/(<([^>]+)>)/gi, '')
  }

  return (
    <>
    {orderReLoading  ? (
        <div className=" d-flex justify-content-center zIndex ">
          <Loader />
        </div>
      ) : (
        ''
      )}
      <BackButton />

      <CCard className="border-0 p-5 mt-3 answer-history-wrapper">
        <div className="">
          <h6 className="fw-bold fs-5">{assignmentStatus?.assignment_id}</h6>
        </div>
        <Row className="my-3 inner-wrap-sizes">
          <Col xs={12} md={6} lg={6} xl={3}>
            <h3>
              <span className="me-2"> Due Date:</span>
              {moment(new Date(assignmentStatus?.due_date + '  UTC').toString()).format(
                'MM-DD-YYYY hh:mm:a',
              )}
            </h3>
          </Col>
          <Col xs={12} md={6} lg={6} xl={3}>
            <h3>
              {/* <span className="me-2">Completed on:</span>{moment(new Date(assignmentStatus?.answered_on_date +' '+ assignmentStatus?.answered_on_time + ' UTC').toString()).format(
                'MM-DD-YYYY hh:mm:a', */}
                 <span className="me-2">Completed on:</span>{assignmentStatus?.answered_on_date ? assignmentStatus?.answered_on_date : ""}
             
            </h3>
          </Col>
          <Col xs={12} md={6} lg={6} xl={3}>
            <h3>
              <span className="me-2">Created By:</span> {assignmentStatus?.student_email}
            </h3>
          </Col>
          <Col xs={12} md={6} lg={6} xl={3}>
            <h3>
              <span className="me-2">Submitted By:</span> {assignmentStatus?.teacher_name }
              (teacher)
            </h3>
          </Col>{' '}
        </Row>
        <Row className="my-3 inner-wrap-sizes">
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
              <span className="me-2">Number of Words:</span> {assignmentStatus?.word_count}
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

          {/* <Col xs={12} md={6} lg={6} xl={3}>
            <h3>
              <span className="me-2">Approved on:</span>
              {''}
            </h3>
          </Col> */}
        </Row>

        <div className=" main-btn-wrap">
          <h5>Q:{assignmentStatus?.question}</h5>
          <span className="me-2">{'Description:'}</span>
          <span>{removeTags(assignmentStatus?.question_description)}</span>
          <p>
            {'Answer:'}
            {removeTags(assignmentStatus?.assignment_answer)}
          </p>
        </div>
      </CCard>
    </>
  )
}

export default TeacherOrder
