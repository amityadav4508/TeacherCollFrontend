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
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { Col, Card, Table, Row, Button, Container } from 'react-bootstrap'
import '../../../node_modules/font-awesome/scss/font-awesome.scss'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import { toast } from 'react-toastify'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { useDispatch, useSelector } from 'react-redux'
import {
  teacherRequestAsync,
} from 'src/store/features/TeacherRequestSlice'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import eyeIcnframe from '../../assets/images/eye-icn-fr.svg'


const Dashboard = () => {
  const [teacherReq, setTeacherReq] = useState({})
  const [userData, setUserData] = useState(false)
  const { loading } = useSelector((state) => state.postteacher)
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [idData, setIdData] = useState('')
  const [rejectData, setRejectData] = useState('')
  const dispatch = useDispatch()
  const teachersData = useSelector((state) => state?.teacher?.teacher)
  const userTeacher = teachersData?.data?.data

  const getadminStats = useSelector((state) => state?.AdminStats?.adminStats)
  let admin_Stats = getadminStats?.data?.graph_stats

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(
      teacherRequestAsync({
        keyword: '',
        teacher_status: '',
        page_size: '',
        page: '',
      }),
    )
  }, [])

 
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  const BtnStatus = (e) => {
    e.preventDefault()
    let data = {
      id: idData ? idData : rejectData,
      status: e?.target?.id,
    }
    setTeacherReq(data)
    setUserData(true)
  }

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        toast.success('Status Updated Successfully')
      }, 500)

      setUserData(false)
    }
  }, [userData])


  return (
    <>


      <WidgetsDropdown />

      <>
        <CModal
          className="modal-outer"
          visible={visible}
          onClose={() => setVisible(false)}
          centered
        >
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
            Are you Sure you want to Accept!
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton
              id="2"
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
              onClick={(e) => {
                setVisible(false)
              }}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Reject Modal */}
        <CModal
          centered
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
              id="3"
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
                {/* <CCol sm={7} className=" d-md-block">
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
                </CCol> */}
              </CRow>
              <CChartLine
                style={{ height: '300px', marginTop: '40px' }}
                data={{
                  // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  labels: admin_Stats?.map((ele)=>
                    ele.label
                  ),
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                      borderColor: getStyle('--cui-info'),
                      borderWidth: 2,
                      // data: [random(50, 200), random(50, 200)],
                      fill: true,
                    },
                    {
                      // label: 'My Second dataset',
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-success'),
                      pointHoverBackgroundColor: getStyle('--cui-success'),
                      borderWidth: 2,
                      // data: [
                      //   random(50, 200),
                      //   random(50, 200),
                      //   random(50, 200),
                      //   random(50, 200),
                      //   random(50, 200),
                      //   random(50, 200),
                      //   random(50, 200),
                      // ],
                      data: admin_Stats?.map((ele)=>
                      ele.y
                      )
                    },
                    // {
                    //   label: 'My Third dataset',
                    //   backgroundColor: 'transparent',
                    //   borderColor: getStyle('--cui-danger'),
                    //   pointHoverBackgroundColor: getStyle('--cui-danger'),
                    //   borderWidth: 1,
                    //   borderDash: [8, 5],
                    //   data: [65, 65, 65, 65, 65, 65, 65],
                    // },
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
              <Card.Title as="h5" className="bg-white meeting-request">
                TEACHER REQUESTS
              </Card.Title>
            </Card.Header>
            
              <Card.Body className="px-0·py-2 ">
              <Table responsive hover>
                <tbody className="table-main-wrap">
                  <tr className="table-bg">
                    <th>Name</th>
                    <th className="mx-5">Email</th>
                    <th>Created At</th>
                    <th className="ps-5 d-block">Action</th>
                  </tr>

                  {userTeacher?.map((item, index) => {
                    return (
                      <>
                        <tr className="unread" key={index}>
                          <td>
                            <h6 className="mb-1 ">{item?.name}</h6>
                          </td>
                          <td>
                            <h6 className="text-muted ">{item?.email}</h6>
                          </td>
                          <td>
                            <h6 className="mb-1 ">
                              {' '}
                              {moment(item?.created_at).format('MMM Do YY')}
                            </h6>
                          </td>
                          <td className="spacing-font mt-1 p-1">
                            <span
                              className="ms-5 cursor"
                              onClick={() => {
                                navigate(`/viewuser/${item?.id}`)
                              }}
                            >
                              <img src={eyeIcnframe} className="size-icn-wrap" alt="react img" />
                            </span>

                            {/* <span
                              id="2"
                              onClick={() => RejectData(item, index)}
                              href=""
                              className="condensed button-edit delete-bg ms-2"
                            >
                              Reject
                            </span> */}
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
    </>
  )
}

export default Dashboard
