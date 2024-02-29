import React, { useEffect, useState } from 'react'
import { CButton, CFormInput, CInputGroup, CModal, CModalBody, CModalFooter } from '@coreui/react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  teacherRequestAsync,
  postTeacherRequestAsync,
} from 'src/store/features/TeacherRequestSlice'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import eyeIcnframe from '../../../assets/images/eye-icn-fr.svg'
import userframe from '../../../assets/images/user-frame.svg'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import downloadIcn from '../../../assets/images/download-icn-wrap.svg'

const Dashboard = () => {
  const navigate = useNavigate()
  const [teacherReq, setTeacherReq] = useState({})
  const [keyword, setKeyword] = useState('')
  const [requestStatus, setRequestStatus] = useState('')
  const [userData, setUserData] = useState(false)
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [profileData, setProfileData] = useState('')
  const [rejectProfileData, setRejectProfileData] = useState('')
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')
  const dispatch = useDispatch()
  const teachersData = useSelector((state) => state?.teacher?.teacher)

  // const isSuccess = useSelector((state) => state?.postteacher?.postTeacher)

  const userTeacher = teachersData?.data

  useEffect(() => {
    dispatch(
      teacherRequestAsync({
        keyword: keyword,
        teacher_status: requestStatus,
        page_size: limit,
        page: page,
      }),
    )
  }, [keyword, requestStatus, limit, page])

  const BtnStatus = (e) => {
    e.preventDefault()
    let data = {
      id: profileData ? profileData : rejectProfileData,
      status: e.target.id,
    }
    setTeacherReq(data)
    setUserData(true)
  }

  useEffect(() => {
    if (teacherReq && userData) {
      dispatch(postTeacherRequestAsync(teacherReq))
    } else {
      setTimeout(() => {
        dispatch(
          teacherRequestAsync({
            keyword: keyword,
            teacher_status: requestStatus,
            page_size: limit,
            page: page,
          }),
        )
      }, 1000)
    }
  }, [teacherReq, userData])

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        toast.success('Status Updated Successfully')
      }, 500)

      setUserData(false)
    }
  }, [userData])

  const acceptData = (item, index) => {
    setVisible(!visible)
    setProfileData(item.target.id)
  }
  const RejectData = (item, index) => {
    setModalVisible(!modalVisible)
    setRejectProfileData(item.target.id)
  }

  function handleToggle(e) {
    setRequestStatus(e.target.value)
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
paddingRight:'0px',
paddingLeft:'0px',


      },
    },
  }

  const columns = [
    {
      name: 'PROFILE',
      selector: (row) =>
        (
          <div className=" avatar-preview  " style={{marginLeft:"10px"}}>
            <div className={row?.profile_path ? 'imagePreview row_profile w-100 ' : ' w-100 ms-2 '} >
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
        ) || 'NA',

      sortable: false,
    },
    {
      name: 'EMAIL',
      selector: (row) => (
        <div title={row?.email} className=" ms-3 w-75 overflow-hidden">
          {row?.email}
        </div>
      ),
      sortable: false,
    },
    {
      name: 'NAME',
      selector: (row) => <span className='ms-3'>{row.name}</span>,
      sortable: false,
    },
    {
      name: 'SUBJECT',
      selector: (row) => <span className='ms-3'>{row.subject ? row.subject : 'N/A'}</span> ,
      sortable: false,
    },
    {
      name: 'CATEGORY',
      selector: (row) => <span className='ms-3'>{(row?.category == 0 ? 'BOTH' : row?.category == 1 ? 'IT' : 'NON-IT')}</span> ,
      sortable: false,
    },
    {
      name: 'ID PROOF',
      selector: (row) =>
        row.id_proof ? (
          <a
            className="proof_tab ms-3"
            target="_blank"
            rel="noreferrer"
            href={process.env.REACT_APP_API_URL + 'public/storage/' + row.id_proof}
          >
            <img src={downloadIcn} className="size-icn-wrap" alt="react img" />
          </a>
        ) : (
          <span className='ms-3'>{'N/A'}</span>
        ),

      sortable: false,
    },
    {
      name: 'STATUS',
      selector: (row) =>
        userTeacher?.teacher_request_status?.map((ele, index) => {
          if (row?.teacher_status === ele?.value) {
            return (
              <p
                className={
                  ele.value === 1
                    ? 'labelbtn-wrap pending-label'
                    : ele.value === 0
                    ? 'labelbtn-wrap approve-label'
                    : ele.value === 2
                    ? 'labelbtn-wrap rejected-label'
                    : ele.value === 4
                    ? 'labelbtn-wrap resubmit-label'
                    : ''
                }
                key={index}
                value={ele?.value}
              >
                {ele?.name}
              </p>
            )
          }
        }) || 'N/A',

      sortable: false,
    },
    {
      name: 'ACTION',
      selector: (row) =>
        (
          <div className="d-flex justify-content-center">
        
              <span
                onClick={() => {
                  navigate(`/viewuser/${row?.id}`)
                }}
              >
                <img src={eyeIcnframe} className="size-icn-wrap me-1 cursor"alt="react img"  />
              </span>
              <span
                id={row?.id}
                onClick={(item, index) => acceptData(item, index)}
                href=""
                className="condensed button-edit edit-bg"
              >
                Accept
              </span>
              <span
                id={row?.id}
                onClick={(item, index) => RejectData(item, index)}
                href=""
                className="condensed button-edit delete-bg ms-1"
              >
                Reject
              </span>
         
          </div>
        ) || 'N/A',
      sortable: false,
      // cell:()=><span ></span>
    },
  ]

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }

  return (
    <>
      <BackDashboard />
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
            Are you sure you want to Accept?
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton
              id="2"
              className="button-custom"
              onClick={(e) => {
                BtnStatus(e)
                setVisible(false)
                setProfileData('')
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
            Are you sure you want to Reject?
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton
              id="3"
              onClick={(e) => {
                BtnStatus(e)
                setModalVisible(false)
                setRejectProfileData('')
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

      <div>
        <Col className="mt-3">
          <Card className="Recent-Users card-bt">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <Row>
                <Col sm="12" lg="6">
                  <Card.Title as="h5">PROFILE REQUEST</Card.Title>
                </Col>
                <Col sm="12" lg="3">
                  <Form.Select
                    value={requestStatus}
                    aria-label="Default select example"
                    onChange={handleToggle}
                    className=""
                  >
                    <option className="text-muted" value="">
                      {' '}
                      All
                    </option>
                    {userTeacher?.teacher_request_status?.map((ele, index) => {
                      return (
                        <option key={index} value={ele?.value}>
                          {' '}
                          {ele?.name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Col>
                <Col sm="12" lg="3">
                  <CInputGroup className="">
                    <CFormInput
                      placeholder="Search"
                      value={keyword}
                      aria-label="Username"
                      className="w-25"
                      onChange={(e) => setKeyword(e.target.value)}
                      aria-describedby="basic-addon1"
                    />
                  </CInputGroup>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="px-0·py-2 data-custom-wrap-reqst ">
              <DataTable
              className='data-wrap-new'
                columns={columns}
                customStyles={customStyles}
                data={userTeacher?.data}
                pagination
                // progressPending={loading}
                paginationServer
                paginationTotalRows={userTeacher?.total}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                onChangePage={Tablepagination}
              />
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  )
}

export default Dashboard
