import React, { useEffect, useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CRow,
} from '@coreui/react'
import eyeIcnframe from '../assets/images/eye-icn-fr.svg'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { Col, Card, Table, Row } from 'react-bootstrap'
import '../../node_modules/font-awesome/scss/font-awesome.scss'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import WidgetsDropdown from 'src/Views/widgets/WidgetsDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAssignmentlistAsync } from 'src/store/features/OrderListSlice'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  // const [teacherReq, setTeacherReq] = useState({})
  // const [userData, setUserData] = useState(false)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [idData, setIdData] = useState('')
  const [limit, setLimit] = useState(5)
  const [rejectData, setRejectData] = useState('')
  const dispatch = useDispatch()
  const teachersData = useSelector((state) => state?.teacher?.teacher)
  const { adminList } = useSelector((state) => state?.getorderdetails)
  useEffect(() => {
    dispatch(getAdminAssignmentlistAsync())
  }, [])

  const checkRole = JSON.parse(localStorage.getItem('checkType'))

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const BtnStatus = (e) => {
    e.preventDefault()
    let data = {
      id: idData ? idData : rejectData,
      status: e.target.id,
    }
    // setTeacherReq(data)
    // setUserData(true)
  }

  const acceptData = (item, index) => {
    setVisible(!visible)
    setIdData(item?.id)
  }
  const RejectData = (item, index) => {
    setModalVisible(!modalVisible)

    setRejectData(item?.id)
  }
  return (
    <>
 
      <WidgetsDropdown />
      <>
        <CModal className="modal-outer" visible={visible} onClose={() => setVisible(false)}>
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
            Are you Sure you want to accept!
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton
              id="1"
              className="button-custom"
              onClick={(e) => {
                BtnStatus(e)
                setVisible(false)
                setIdData('')
              }}
            >
              Yes
            </CButton>
            <CButton
              className="button-custom cancel-button"
              color="primary"
              onClick={() => setVisible(false)}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Reject Modal */}
        <CModal
          className="modal-outer"
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              data-coreui-dismiss="modal"
              aria-label="Close"
              onClick={() => setModalVisible(false)}
            ></button>
          </div>
          <CModalBody className="d-flex justify-content-center fw-bold fs-5">
            Are you Sure you want to Reject!
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton
              id="2"
              onClick={(e) => {
                BtnStatus(e)
                setModalVisible(false)
                setRejectData('')
              }}
              className="d-flex justify-content-center button-custom"
            >
              Yes
            </CButton>
            <CButton
              className="button-custom"
              color="primary"
              onClick={() => setModalVisible(false)}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>
      </>
      <Row>
        <Col md={12} xl={6}>
          <CCard className="mb-4 border-0">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Analytics{' '}
                  </h4>
                  <div className="small text-medium-emphasis">January - July 2023</div>
                </CCol>
                <CCol sm={7} className=" d-md-block">
                  <CButton color="primary" className="float-end">
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                  <CButtonGroup className="float-end me-3">
                    {['Day', 'Month', 'Year'].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Month'}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                      borderColor: getStyle('--cui-info'),
                      borderWidth: 2,
                      data: [random(50, 200), random(50, 200)],
                      fill: true,
                    },
                    {
                      label: 'My Second dataset',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-success'),
                      pointHoverBackgroundColor: getStyle('--cui-success'),
                      borderWidth: 2,
                      data: [
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                        random(50, 200),
                      ],
                    },
                    {
                      label: 'My Third dataset',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-danger'),
                      pointHoverBackgroundColor: getStyle('--cui-danger'),
                      borderWidth: 1,
                      borderDash: [8, 5],
                      data: [65, 65, 65, 65, 65, 65, 65],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                    y: {
                      ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(250 / 5),
                        max: 250,
                      },
                    },
                  },
                  elements: {
                    line: {
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                      hoverBorderWidth: 3,
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </Col>
        <Col md={12} xl={6}>
          <Card className="Recent-Users card-bt border-0">
            <Card.Header className="bg-white">
              {checkRole == 'super-admin' ? (
                <Card.Title as="h5" className="bg-white meeting-request">
                  Teacher Requests
                </Card.Title>
              ) : (
                <Card.Title as="h5" className="bg-white meeting-request">
                  Approve Assignments
                </Card.Title>
              )}
            </Card.Header>
            <Card.Body className="px-0·py-2 ">
              <Table responsive hover>
                <tbody>
                  <tr>
                    <th style={{ fontSize: '14px' }}>ASSIGNMENT ID</th>
                    <th style={{ fontSize: '14px' }}className="mx-5">TITLE</th>
                    <th style={{ fontSize: '14px' }}>STATUS</th>
                    <th style={{ fontSize: '14px' }} className="ps-5 d-block">Action</th>
                  </tr>

                  {adminList?.data?.data?.map((item, index) => {
                    return (
                      <>
                        <tr className="unread" key={index}>
                          <td>
                            <p className="mb-1">{item?.assignment_id}</p>
                          </td>
                          <td>
                            <h6 style={{ fontSize: '14px' }} className="text-muted"> {item?.question} </h6>
                          </td>
                          <td>
                            <h6
                              className={
                                item.assignment_status == 1
                                  ? 'labelbtn-wrap pending-label '
                                  : item.assignment_status == 3
                                  ? 'ms-0 labelbtn-wrap approve-label'
                                  : item.assignment_status == 4
                                  ? 'labelbtn-wrap rejected-label'
                                  : item.assignment_status == 2
                                  ? 'labelbtn-wrap resubmit-label'
                                  : item.assignment_status == 6
                                  ? 'labelbtn-wrap resubmit-label'
                                  : ''
                              }
                            >
                              {item?.assignment_status == 1
                                ? 'Pending'
                                : item?.assignment_status == 2
                                ? 'Submitted'
                                : item?.assignment_status == 3
                                ? 'Approved'
                                : item?.assignment_status == 4
                                ? 'Rejected'
                                : item?.assignment_status == 5
                                ? 'Resubmit'
                                : 'Resubmit Answered'}
                            </h6>
                          </td>
                          <td className='' >
                            <span className='text-center d-block ms-5' style={{ fontSize: '16px' }}
                              onClick={() => {
                                navigate(`/admin/assignmentinfo/${item?.id}`)
                              }}
                            >
                              <img
                                src={eyeIcnframe}
                                className="size-icn-wrap pointer"
                                alt="react img"
                              />
                            </span>
                          </td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div></div>
    </>
  )
}

export default AdminDashboard
