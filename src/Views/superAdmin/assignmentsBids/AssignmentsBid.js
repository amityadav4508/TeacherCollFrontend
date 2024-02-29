import React, { useEffect, useMemo, useState } from 'react'
import { Col, Card,  Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CFormInput, CInputGroup } from '@coreui/react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import eyeIcnframe from '../../../assets/images/eye-icn-fr.svg'
import searchicnwrap from '../../../assets/images/search-new.svg'
import { getBidAssignmentsAsync } from 'src/store/features/getAssignmentbyId'

const AssignmentsBid = () => {
  let navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState('')
  const [count, setCount] = useState('')
  const [users, setUsers] = useState('')
    const [limit, setLimit] = useState('')

  const dispatch = useDispatch()
  const filterData = useSelector((state) => state?.filterData?.filter)
  const { getBidAssignmentsList } = useSelector((state) => state.AssignmentbyId)

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
        width: '10px',
      },
    },
  }
  const columns = useMemo(() => [
    {
      name: <span className="fw-bold">ASSIGNMENT ID</span>,
      selector: (row) => row.assignment_id || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">Student Email</span>,
      selector: (row) => row.student_email || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">QUESTION</span>,
      selector: (row) => row?.question,
      sortable: true,
    },
    {
      name: <span className="fw-bold">CATEGORY</span>,
      selector: (row) => (row?.category == 0 ? 'BOTH' : row?.category == 1 ? 'IT' : 'NON-IT'),

      sortable: false,
    },

    {
      name: <span className="fw-bold">ACTION</span>,
      selector: (row) =>
        (
          <>
            <div className="d-flex">
              <span
                title="view"
                onClick={() => {
                  navigate(`/viewbidsassignments/${row?.id}`)
                }}
              >
                <img src={eyeIcnframe} className="size-icn-wrap cursor" alt="react img" />
              </span>
            </div>
          </>
        ) || 'N/A',
      sortable: false,
    },
  ])

  function handleToggle(e) {
    setUsers(e.target.value)
  }

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }

  useEffect(() => {
    if (keyword) {
      const timer = setTimeout(() => {
        dispatch(
          getBidAssignmentsAsync({
            keyword: keyword,
            page_size: limit,
            page: page,
          }),
        )
      }, 300)

      return () => clearTimeout(timer)
    } else {
      dispatch(
        getBidAssignmentsAsync({
          keyword: keyword,
          page_size: limit,
          page: page,
        }),
      )
    }
  }, [keyword, page, limit, users])

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
                      <Card.Title as="h5">MANAGE ASSIGNMENT BIDS</Card.Title>
                    </Col>
                    {/* <Col sm="12" lg="3">
                      <Form.Select
                        value={users}
                        aria-label="Default select example"
                        onChange={handleToggle}
                        className="mb-3 mb-lg-0"
                      >
                        <option value=""> All</option>
                        {filterData?.teacher_request?.map((ele, index) => {
                         
                          return (
                            <option key={index} value={ele?.value}>
                              {ele?.name}
                            </option>
                          )
                        })}
                      </Form.Select>
                    </Col> */}
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
                <Card.Body className="px-0·py-2 data-custom ">
                  <DataTable
                    columns={columns}
                    customStyles={customStyles}
                    data={getBidAssignmentsList?.data?.data}
                    pagination
                    // progressPending={loading}
                    paginationServer
                    paginationTotalRows={getBidAssignmentsList?.data?.total}
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

export default AssignmentsBid
