import React, { useEffect, useMemo, useState } from 'react'
import { Col, Card, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { usersBlockAsync, usersStudentFilterDataAsync } from 'src/store/features/userDataslice'
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
import moment from 'moment'

const ManageSeller = () => {
  let navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState('')
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [teacherId, setTeacherId] = useState([])
  const [perPage, setPerPage] = useState('')
  const [count, setCount] = useState('')
  const [users, setUsers] = useState('')
  const [totalData, setTotalData] = useState('')

  const dispatch = useDispatch()
  const filterData = useSelector((state) => state?.studentFilterdata?.student?.data?.data)
  const { student } = useSelector((state) => state.studentFilterdata)

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
        minWidth: '400px',
      },
    },
  }

  const date = new Date()
  const currentDate = date.toISOString().substring(0, 10)
  
  const columns = useMemo(() => [
    {
      name: 'PROFILE',
      selector: (row) => (
        <div className={row?.profile_path ? 'imagePreview row_profile ' : ' w-100 ms-2 '}>
          <img
            src={
              row?.profile_path
                ? `${process.env.REACT_APP_API_URL}public/storage/${row?.profile_path}`
                : userframe
            }
            alt="react img" 
            style={{ marginLeft: '10px' }}
          />
        </div>
      ),
    },
    {
      name: 'NAME',
      selector: (row) => row.name || 'N/A',
      sortable: true,
    },
    {
      name: 'EMAIL',
      selector: (row) =>
        (
          <div className="text-decoration-none" title={row.email}>
            {row.email}
          </div>
        ) || 'N/A',
      sortable: false,
      // cell: row => <div><OverlayTrigger overlay={row.email}>{row.email}...</OverlayTrigger></div>
    },
    {
      name: 'SUBSCRIPTION',
      selector: (row) => row?.subscription_name || 'N/A',
      sortable: false,
    },
    {
      name: 'QUALIFICATION',
      selector: (row) => row?.qualification || "N/A",

      sortable: false,
    },
    // {
    //   name: 'REMAINING DAYS',
    //   selector: (row) =>
    //     <span>{row?.subscription_expire_date ?moment(row?.subscription_expire_date).diff(currentDate, 'days')+ ' Days' : 'N/A' } </span>,

    //   sortable: false,
    // },
    {
      name: 'ACTION',
      selector: (row) =>
        (
          <span className="d-flex">
            <span
              title="view"
              onClick={() => {
                navigate(`/viewuser/${row?.id}`)
              }}
            >
              <img src={eyeIcnframe} className="size-icn-wrap" alt="react img"  />
            </span>
            <span className="d-flex mx-2">
              <CFormSwitch
                className="switch-custom"
                id={row.is_active}
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
          </span>
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
          usersStudentFilterDataAsync({
            keyword: keyword,
            page_size: count,
            page: page,
            user_type: '3',
            is_subscribe: users,
          }),
        )
      }, 300)

      return () => clearTimeout(timer)
    } else {
      dispatch(
        usersStudentFilterDataAsync({
          keyword: keyword,
          page_size: perPage,
          page: page,
          user_type: '3',
          is_subscribe: users,
        }),
      )
    }
  }, [keyword, page, perPage, users])

  const Tablepagination = (page) => {
    setPage(page)
  }

  useEffect(() => {
    if (filterData) {
      setTotalData(filterData)
    }
  }, [filterData])

  const handlePerRowsChange = async (per_page, page) => {
    setPerPage(per_page)
  }



  return (
    <div>
      <BackDashboard />
      <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalBody className="d-flex justify-content-center fw-bold fs-5">
            Are you sure you want to Unblock?
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
                    usersStudentFilterDataAsync({
                      keyword: keyword,
                      page_size: perPage,
                      page: page,
                      user_type: '2',
                      is_subscribe: users,
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
                    usersStudentFilterDataAsync({
                      keyword: keyword,
                      page_size: perPage,
                      page: page,
                      user_type: '2',
                      is_subscribe: users,
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
              onClick={() => setModalVisible(false)}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>
        <div>
          <Col className="mt-3">
            <Card className="Recent-Users card-bt">
              <Card.Header style={{ backgroundColor: '#fff' }}>
                <Row>
                  <Col sm="12" lg="6">
                    {' '}
                    <Card.Title as="h5">STUDENT MANAGEMENT</Card.Title>
                  </Col>
                  <Col sm="12" lg="3">
                    {' '}
                    <Form.Select
                      value={users}
                      aria-label="Default select example"
                      onChange={handleToggle}
                      className=" mb-3 mb-lg-0"
                    >
                      <option value=""> All</option>
                      <option value="1">Pending</option>
                      <option value="2">In Process</option>
                      <option value="3">Resolved</option>
                    </Form.Select>
                  </Col>
                  <Col sm="12" lg="3">
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
              <Card.Body className="px-0·py-2 ">
                <DataTable
                  className="table-head"
                  columns={columns}
                  wrap
                  customStyles={customStyles}
                  data={filterData}
                  pagination
                  // progressPending={loading}
                  paginationServer
                  paginationTotalRows={student?.data?.total}
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
  )
}

export default ManageSeller

