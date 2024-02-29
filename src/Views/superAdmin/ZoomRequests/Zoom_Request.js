import React, { useEffect, useMemo, useState } from 'react'
import { Col, Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CFormInput, CInputGroup } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import searchicnwrap from '../../../assets/images/search-new.svg'
import { getZoomRequestList, zoomRequestStatusAsync } from 'src/store/features/ZoomSlice'

const Zoom_Request = () => {
  let navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('')
  const [count, setCount] = useState('')
  const [users, setUsers] = useState('')
  const dispatch = useDispatch()
  const filterData = useSelector((state) => state?.filterData?.filter)
  const { getZoomList } = useSelector((state) => state.zoomData)

  

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
        width: '200px',
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
      name: <span className="fw-bold">Student Email</span>,
      selector: (row) => row.student.email || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">Teacher Email</span>,
      selector: (row) => row.teacher.email || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">PASS CODE</span>,
      selector: (row) => row?.pass_code,
      sortable: true,
    },
    {
      name: <span className="fw-bold">JOIN LINK</span>,
      selector: (row) => (
        <a className="text-decoration-none fw-bolder text-JoinLink " href={row?.join_link}>
          {' '}
          JOIN NOW
        </a>
      ),

      sortable: false,
    },
    {
      name: <span className="fw-bold">STATUS</span>,
      selector: (row) => (
        <>
          {row?.status === 0 ? (
            <div className="d-flex">
              <span
                id="1"
                onClick={(e) => acceptData(e.target.id, row.id)}
                href=""
                className="condensed button-edit edit-bg  px-2"
              >
                Approve
              </span>
              <span
                id="2"
                onClick={(e) => RejectData(e.target.id, row.id)}
                href=""
                className="condensed button-edit delete-bg ms-1 px-2"
              >
                Reject
              </span>
            </div>
          ) : (
            <div
              className={
                row?.status === 1
                  ? 'labelbtn-wrap approve-label'
                  : row?.status === 2
                  ? 'labelbtn-wrap rejected-label'
                  : ''
              }
            >
              {row?.status === 1 ? 'Approved' : row?.status === 2 ? 'Rejected' : ''}
            </div>
          )}
        </>
      ),
      sortable: false,
    },
  ])

  useEffect(() => {
    if (keyword) {
      const timer = setTimeout(() => {
        dispatch(
          getZoomRequestList({
            keyword: keyword,
            page_size: count,
            page:page
          }),
        )
      }, 300)

      return () => clearTimeout(timer)
    } else {
      dispatch(
        getZoomRequestList({
          keyword: keyword,
          page_size:limit,
          page:page
        }),
      )
    }
  }, [keyword, page, limit, users])

  const acceptData = async (e, id) => {
     dispatch(zoomRequestStatusAsync({ id: e, status: id }))
  }

  const RejectData = async (e, id) => {
     dispatch(zoomRequestStatusAsync({ id: e, status: id }))
  }

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }
  return (
    <>
      <BackDashboard />
      <div>
        <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
          <div>
            <Col className="mt-3">
              <Card className="Recent-Users card-bt">
                <Card.Header style={{ backgroundColor: '#fff' }}>
                  <Row>
                    <Col sm="12" lg="9">
                      <Card.Title as="h5">ZOOM REQUESTS</Card.Title>
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
                            placeholder="Search Topic"
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
                <Card.Body className="px-0·py-2 data-custom ">
                  <DataTable
                    columns={columns}
                    customStyles={customStyles}
                    data={getZoomList?.data?.data}
                    pagination
                    // progressPending={loading}
                    paginationServer
                    paginationTotalRows={getZoomList?.data?.total}
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
    </>
  )
}

export default Zoom_Request
