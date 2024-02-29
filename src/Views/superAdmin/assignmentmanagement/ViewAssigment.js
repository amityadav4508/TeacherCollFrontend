import React, { useEffect, useState } from 'react'
import BackButton from 'src/Views/widgets/BackButton'
import { Col, Row } from 'react-bootstrap'
import { CCard } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getAssignmentbyIdAsync } from '../../../store/features/getAssignmentbyId'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Loader from 'src/Views/Loader/Loader'
import { CButton, CModal, CModalBody, CModalFooter } from '@coreui/react'
import { assignmentStatusAsync,clearAllState} from 'src/store/features/OrderListSlice'

const ViewAssigment = () => {
  let { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [visible1, setVisible1] = useState(false)
  const [visible, setVisible] = useState(false)
  const { getAssignmentID } = useSelector((state) => state?.AssignmentbyId)
  // const { orderReLoading } = useSelector((state) => state?.AssignmentbyId)
  const {status} = useSelector((state) => state?.getorderdetails)
  const assignmentStatus = getAssignmentID?.data?.data?.data

  useEffect(() => {
    dispatch(getAssignmentbyIdAsync(id))
  }, [id])

  const [acceptUser, setAcceptUser] = useState('')
  const [rejectUser, setRejectUser] = useState('')

  const handleAccept = (e) => {
    setAcceptUser(e)
  }

  const handleReject = (id) => {
    setRejectUser(id)
  }

  useEffect(()=> {
    if(status === 200)
    navigate("/manageorder/assignment")
    // window.location.reload(false)
   
  })

  return (
    <>
      {/* {orderReLoading ? (
        <div className=" d-flex justify-content-center zIndex ">
          <Loader />
        </div>
      ) : (
        ''
      )} */}
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
              <span className="me-2">Completed on:</span>
              {assignmentStatus?.answered_on_date ? assignmentStatus?.answered_on_date : ''}
            </h3>
          </Col>
          <Col xs={12} md={6} lg={6} xl={3}>
            <h3>
              <span className="me-2">Created By:</span> {assignmentStatus?.student_email}
            </h3>
          </Col>
          <Col xs={12} md={6} lg={6} xl={3}>
            <h3>
              <span className="me-2">Submitted By:</span> {assignmentStatus?.teacher_name}
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
        </Row>

        <div className=" main-btn-wrap">
          <h5>Q:{assignmentStatus?.question}</h5>
          <div className="d-flex">
            <span className="me-2">{'Description:'}</span>
            <span
              dangerouslySetInnerHTML={{ __html: assignmentStatus?.question_description }}
            ></span>
          </div>
          <div className="d-flex">
          <span className="me-2">{'Answer:'}</span>
            
            <span dangerouslySetInnerHTML={{ __html: assignmentStatus?.assignment_answer }}></span>
          </div>
        </div>
        {assignmentStatus?.assignment_status == 2 ? (
          <div className="d-flex justify-content-end ">
            <div>
              <button
                className="button-custom"
                onClick={(e) => {
                  handleAccept(assignmentStatus?.id)
                  setVisible(true)
                }}
              >
                {' '}
                Accept{' '}
              </button>
            </div>
            <div className="mx-3">
              <button
                className="button-custom cancel-button"
                onClick={(id) => {
                  handleReject(assignmentStatus?.id)
                  setVisible1(true)
                }}
              >
                {' '}
                Reject{' '}
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </CCard>

      <CModal className="modal-outer" visible={visible} onClose={() => setVisible(false)} centered>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            data-coreui-dismiss="modal"
            aria-label="Close"
            onClick={() => setVisible(false)}
          ></button>
        </div>
        <CModalBody className="d-flex justify-content-center fw-bold fs-5">
          Are you sure you want to Approve?
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center border-0">
          <CButton
            id="2"
            className="button-custom"
            onClick={(e) => {
              setVisible(false)
              dispatch(assignmentStatusAsync({ id: [acceptUser], assignment_status: '3' }))
              dispatch(clearAllState())
            }}
          >
            Yes
          </CButton>
          <CButton
            className="button-custom cancel-button"
            color="primary"
            onClick={(e) => {
              setVisible(false)
            }}
          >
            No
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        className="modal-outer"
        visible={visible1}
        onClose={() => setVisible1(false)}
        centered
      >
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            data-coreui-dismiss="modal"
            aria-label="Close"
            onClick={() => setVisible1(false)}
          ></button>
        </div>
        <CModalBody className="d-flex justify-content-center fw-bold fs-5">
          Are you sure you want to Reject?
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center border-0">
          <CButton
            id="2"
            className="button-custom"
            onClick={(e) => {
              setVisible1(false)
              dispatch(assignmentStatusAsync({ id: [rejectUser], assignment_status: '4' }))
              dispatch(clearAllState())
            }}
          >
            Yes
          </CButton>
          <CButton
            className="button-custom cancel-button"
            color="primary"
            // onClick={(e) => {
            //   setVisible1(false)
            // }}
          >
            No
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ViewAssigment
