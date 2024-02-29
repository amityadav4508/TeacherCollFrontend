import React, { useEffect, useMemo, useState } from 'react'
import { Col, Card, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { usersBlockAsync, usersFilterDataAsync } from 'src/store/features/userDataslice'
import {
  CButton,
  CFormInput,
  CFormSwitch,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import eyeIcnframe from '../../../assets/images/eye-icn-fr.svg'
import userframe from '../../../assets/images/user-frame.svg'
import searchicnwrap from '../../../assets/images/search-new.svg'

const ManageTeacher = () => {
  let navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState('')
  const [count, setCount] = useState('')
  const [users, setUsers] = useState('')
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [teacherId, setTeacherId] = useState([])
  const dispatch = useDispatch()
  const filterData = useSelector((state) => state?.filterData?.filter)
  const [totalData, setTotalData] = useState('')

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
      style: {},
    },
  }
  const columns = useMemo(() => [
    {
      name: <span className="fw-bold">PROFILE</span>,
      selector: (row) =>
        (
          <div className=" avatar-preview" style={{ marginLeft: '10px' }}>
            <div className={row?.profile_path ? 'imagePreview row_profile ' : ' w-100 ms-2 '}>
              <img
                src={
                  row?.profile_path
                    ? `${process.env.REACT_APP_API_URL}public/storage/${row?.profile_path}`
                    : userframe
                }
                alt="react img"
              />
            </div>
          </div>
        ) ||
        // </div>
        'NA',
      sortable: false,
    },
    {
      name: <span className="fw-bold">NAME</span>,
      selector: (row) => row.name || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">EMAIL</span>,
      selector: (row) => <div title={row.email}>{row.email}</div> || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">SUBJECT</span>,
      selector: (row) => row?.subject,
      sortable: true,
    },
    {
      name: <span className="fw-bold">CATEGORY</span>,
      selector: (row) => (row?.category == 0 ? 'BOTH' : row?.category == 1 ? 'IT' : 'NON-IT'),

      sortable: false,
    },
    {
      name: <span className="fw-bold">STATUS</span>,
      selector: (row) =>
        row?.teacher_status === 1 ? (
          <div className="labelbtn-wrap pending-label ">{'Pending'}</div>
        ) : row?.teacher_status === 2 ? (
          <div className="labelbtn-wrap approve-label">{'Approved'}</div>
        ) : row?.teacher_status === 3 ? (
          <div className="labelbtn-wrap rejected-label">{'Disapproved'}</div>
        ) : row?.teacher_status === 4 ? (
          <div className="labelbtn-wrap resubmit-label">{'Resubmit'}</div>
        ) : row?.teacher_status === 5 ? (
          <div className="labelbtn-wrap resubmit-label">{'Resubmit Reject'}</div>
        ) : (
          'N/A'
        ),

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
                  navigate(`/viewuser/${row?.id}`)
                }}
              >
                <img src={eyeIcnframe} className="size-icn-wrap" alt="react img" />
              </span>
              <span className="d-flex mx-2">
                <CFormSwitch
                  className="switch-custom"
                  id={row?.id}
                  checked={row?.is_active === 1 ? true : false}
                  onChange={(e) => {
                    setTeacherId({ id: row.id, status: row.is_active })
                    if (e.target.checked === true) {
                      setVisible(true)
                    } else if (e.target.checked == false) {
                      setModalVisible(true)
                    }
                  }}
                />
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

  useEffect(() => {
    if (keyword) {
      const timer = setTimeout(() => {
        dispatch(
          usersFilterDataAsync({
            keyword: keyword,
            page_size: count,
            page: page,
            user_type: '1',
            teacher_status: users,
          }),
        )
      }, 300)

      return () => clearTimeout(timer)
    } else {
      dispatch(
        usersFilterDataAsync({
          keyword: keyword,
          page_size: perPage,
          page: page,
          user_type: '1',
          teacher_status: users,
        }),
      )
    }
  }, [keyword, page, perPage, users])
  
  useEffect(() => {
    if (filterData) {
      setTotalData(filterData?.total)
    }
  }, [filterData])
  
    const Tablepagination = (page) => {
      setPage(page)
    }

  const handlePerRowsChange = async (per_page, page) => {
    setPerPage(per_page)
  }

  return (
    <>
      <BackDashboard />
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalBody className="d-flex justify-content-center fw-bold fs-5">
          Are you sure you want to unblock?
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center border-0">
          <CButton
            id="1"
            className="button-custom"
            onClick={(e) => {
              setVisible(false)
              let callApi = async () => {
                await dispatch(
                  usersBlockAsync({
                    user_id: teacherId['id'],
                    user_status: e.target.id,
                  }),
                )
                await dispatch(
                  usersFilterDataAsync({
                    keyword: keyword,
                    page_size: count,
                    page: page,
                    user_type: '1',
                    teacher_status: users,
                  }),
                )
              }
              callApi()
              // setProfileData('')
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

      {/* UnBlock */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalBody className="d-flex justify-content-center fw-bold fs-5">
          Are you sure you want to Block?
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center border-0">
          <CButton
            id="0"
            className="button-custom"
            onClick={(e) => {
              setModalVisible(false)
              let callApi = async () => {
                await dispatch(
                  usersBlockAsync({
                    user_id: teacherId['id'],
                    user_status: e.target.id,
                  }),
                )
                await dispatch(
                  usersFilterDataAsync({
                    keyword: keyword,
                    page_size: count,
                    page: page,
                    user_type: '1',
                    teacher_status: users,
                  }),
                )
              }
              callApi()
            }}
          >
            Yes
          </CButton>
          <CButton
            className="button-custom cancel-button"
            color="primary"
            onClick={() => setModalVisible(false)}
          >
            No
          </CButton>
        </CModalFooter>
      </CModal>
      <div>
        <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
          <div>
            <Col className="mt-3">
              <Card className="Recent-Users card-bt">
                <Card.Header style={{ backgroundColor: '#fff' }}>
                  <Row>
                    <Col sm="12" lg="6">
                      <Card.Title as="h5">TEACHER MANAGEMENT</Card.Title>
                    </Col>
                    <Col sm="12" lg="3">
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
                            placeholder="By Name, Email"
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
                <Card.Body className="px-0·py-2 data-custom data-custom-wrap">
                  <DataTable
                    columns={columns}
                    customStyles={customStyles}
                    data={filterData?.data?.data}
                    pagination
                    // progressPending={loading}
                    paginationServer
                    paginationTotalRows={filterData?.data?.total}
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

export default ManageTeacher
