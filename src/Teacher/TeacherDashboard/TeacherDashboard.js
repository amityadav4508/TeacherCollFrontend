import React, { useState } from 'react'
import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { Col, Card, Table, Row, Button } from 'react-bootstrap'
import '../../../node_modules/font-awesome/scss/font-awesome.scss'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import TeacherWidget from 'src/Views/widgets/TeacherWidget'
import { useMemo } from 'react'
import DataTable from 'react-data-table-component'
import { useEffect } from 'react'
import { getMeetingRequestTeach } from 'src/store/features/MeetingSheduleSlice'

const TeacherDashboard = () => {
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('')
  const [count, setCount] = useState('')
  const dispatch = useDispatch()
  const { getMeetingRequestTeacher } = useSelector((state) => state.meeting)
  const teachersData = useSelector((state) => state?.teacher?.teacher)
  const userTeacher = teachersData?.data?.data?.data
  const checkRole = JSON.parse(localStorage.getItem('checkType'))
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  
  const { teacherStats } = useSelector((state) => state?.TeacherStats)
  const teacher_stats=teacherStats?.data?.data?.graph_stats


  useEffect(() => {
    if (keyword) {
      const timer = setTimeout(() => {
        dispatch(
          getMeetingRequestTeach({
            keyword: keyword,
            page_size: count,
            page:page
          }),
        )
      }, 300)
      
      return () => clearTimeout(timer)
    } else {
      dispatch(
        getMeetingRequestTeach({
          keyword: keyword,
          page_size:limit,
          page:page
        }),
      )
    }
  }, [keyword, page, limit])

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }


  // const acceptData = (item, index) => {
  //   setVisible(!visible)
  // }
  // const RejectData = (item, index) => {
  //   setModalVisible(!modalVisible)
  // }

  

  const customStyles = {
    rows: {
      style: {},
    },
    headCells: {
      style: {
        fontSize: '13px',
        fontWeight: '700',
      },
    },
    cells: {
      style: {
        width: '150px',
      },
    },
  }

  const columns = useMemo(() => [
    {
      name: <span className="fw-bold">Topic</span>,
      selector: (row) => row.topic || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">Schedule Time</span>,
      selector: (row) => moment(row?.schedule_time).format('YYYY-MM-DD  h:mm a') || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">Meeting Pass Code</span>,
      selector: (row) => row?.pass_code,
      sortable: true,
    },
    {
      name: <span className="fw-bold">Meeting Pass</span>,
      selector: (row) =>row.status==2?<span className='condensed button-edit delete-bg px-3'>Rejected</span>: <a className=' text-decoration-none condensed button-edit edit-bg px-3'  rel="noreferrer" target={"_blank"} href={row.join_link}>Join Now</a>,
      sortable: true,
    },
  ])


  return (
    <>

      <TeacherWidget />

      <Row>
        <Col md={12} xl={6}>
          <CCard className="mb-4 border-0">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0 meeting-request">
                    My Earnings{' '}
                  </h4>
                  <div className="small text-medium-emphasis">January - July 2021</div>
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
                  labels: teacher_stats?.map((ele)=>
                  ele?.label
                  ),
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                      borderColor: getStyle('--cui-info'),
                      borderWidth: 2,
                      fill: true,
                    },
                    {
                      backgroundColor: 'transparent',
                      borderColor: getStyle('--cui-success'),
                      pointHoverBackgroundColor: getStyle('--cui-success'),
                      borderWidth: 2,
                      data: teacher_stats?.map((ele)=>
                      ele?.y
                      ),
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
              {checkRole == 'super-admin' ? (
                <Card.Title as="h5" className="bg-white meeting-request">
                  Teacher Requests
                </Card.Title>
              ) : (
                <Card.Title as="h5" className="bg-white meeting-request">
                  Student’s Meeting Requests
                </Card.Title>
              )}
            </Card.Header>

            <Card.Body className="px-0·py-2">
              <DataTable
                columns={columns}
                customStyles={customStyles}
                data={getMeetingRequestTeacher?.data?.data?.data}
                pagination
                // progressPending={loading}
                paginationServer
                paginationTotalRows={getMeetingRequestTeacher?.data?.total}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions={[5]}
                onChangePage={Tablepagination}
              />
            </Card.Body>

            {/* <Card.Body className="px-0·py-2 ">
              <Table responsive hover>
                <tbody>
                  <tr>
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
                            <h6 className="mb-1">{item?.name}</h6>
                          </td>
                          <td>
                            <h6 className="text-muted">{item?.email}</h6>
                          </td>
                          <td>
                            <h6 className="mb-1">
                              {' '}
                              {moment(item?.created_at).format('MMM Do YY')}
                            </h6>
                          </td>
                          <td>
                            <span
                              id="2"
                              onClick={() => acceptData(item, index)}
                              href=""
                              className="reject-btn"
                            >
                              Accept
                            </span>
                            <span
                              id="3"
                              onClick={() => RejectData(item, index)}
                              href=""
                              className="accept-btn"
                            >
                              Reject
                            </span>
                          </td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </Table>
            </Card.Body> */}
          </Card>
        </Col>
      </Row>
      <div>
      
      </div>
    </>
  )
}

export default TeacherDashboard
