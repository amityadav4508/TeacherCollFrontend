import React, { useEffect, useMemo, useState } from 'react'
import Footer from 'src/layout/Footer'
import NavTopBar from 'src/layout/NavTopBar'
import { Col, Card, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import eyeIcnframe from '../assets/images/eye-icn-fr.svg'
import searchicnwrap from '../assets/images/search-new.svg'
import { CFormInput, CInputGroup } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { getMeetingsScheduleAsync } from 'src/store/features/MeetingSheduleSlice'
import moment from 'moment'

const MeetingScheduleList = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('')
  const [count, setCount] = useState('')
  const dispatch = useDispatch()
  const { getMeetingSchedule } = useSelector((state) => state.meeting)

  // useEffect(() => {
  //   dispatch(getMeetingsScheduleAsync())
  // }, [])


  useEffect(() => {
    if (keyword) {
      const timer = setTimeout(() => {
        dispatch(
          getMeetingsScheduleAsync({
            keyword: keyword,
            page_size: count,
            page:page
          }),
        )
      }, 300)

      return () => clearTimeout(timer)
    } else {
      dispatch(
        getMeetingsScheduleAsync({
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
      <NavTopBar />
      <div className="p-5">
        <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
          <div>
            <Col className="mt-3">
              <Card className="Recent-Users card-bt">
                <Card.Header style={{ backgroundColor: '#fff' }}>
                  <Row>
                    <Col sm="12" lg="9">
                      <Card.Title as="h5">Meeting List</Card.Title>
                    </Col>

                    <Col sm="12" lg="3">
                      {' '}
                      <div className="position-relative">
                        <img
                          src={searchicnwrap}
                          className="search-icon-wrap position-absolute mt-2 ms-2"
                          alt="react img"
                        />

                        <CInputGroup className="">
                          <CFormInput
                            className="form-search-input"
                            placeholder="Search"
                            value={keyword}
                            aria-label="Username"
                            onChange={(e) => setKeyword(e.target.value)}
                            aria-describedby="basic-addon1"
                          />
                        </CInputGroup>
                      </div>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body className="px-0·py-2">
                  <DataTable
                    columns={columns}
                    customStyles={customStyles}
                    data={getMeetingSchedule?.data?.data?.data}
                    pagination
                    // progressPending={loading}
                    paginationServer
                    paginationTotalRows={getMeetingSchedule?.data?.total}
                    onChangeRowsPerPage={handlePerRowsChange}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                    onChangePage={Tablepagination}
                  />
                </Card.Body>
              </Card>
            </Col>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MeetingScheduleList
