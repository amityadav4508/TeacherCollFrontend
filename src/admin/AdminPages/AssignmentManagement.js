import React, { useState, useEffect } from 'react'
import { Col, Card, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { assignmentStatusAsync, getAssignmentlistAsync } from 'src/store/features/OrderListSlice'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import { CButton, CModal, CModalBody, CModalFooter } from '@coreui/react'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import eyeIcnframe from '../../assets/images/eye-icn-fr.svg'
import moment from 'moment'

const ManageAssignment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [visible1, setVisible1] = useState(false)
  const [visible, setVisible] = useState(false)
  const [idData, setIdData] = useState(false)
  const [checked, setChecked] = useState([])
  const [marked, setMarkedApp] = useState('')
  const [orderSearchData, setOrderSearchData] = useState('')
  const [action, setAction] = useState('')
  const getAssignment = useSelector((state) => state?.getorderdetails?.getAssignments)
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')
  const getAssignmentStatus = useSelector(
    (state) => state?.getorderdetails?.getAssignments?.all_assignment_status,
  )
  const categoryStatus = useSelector(
    (state) => state?.getorderdetails?.getAssignments?.category_status,
  )
  const { getAssignments } = useSelector((state) => state?.getorderdetails)


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

  const columns = [

    {
      name: 'ASSIGNMENT ID',
      selector: (row) => row.assignment_id || 'N/A',
      sortable: false,
    },
    {
      name: 'CREATED ON',
      selector: (row) => moment(new Date(row.created_at + ' UTC').toString()).format(
        'YYYY-MM-DD hh:mm:a',
      )  || 'N/A',
      sortable: false,
    },
    {
      name: 'TITLE',
      selector: (row) => row.question || 'N/A',
      sortable: false,
    },
  
    
    {
      name: 'ANSWERED BY',
      selector: (row) => row.teacher_email || 'N/A',
      sortable: false,
    },
    {
      name: 'DUE BY',
      selector: (row) =>moment(new Date(row.due_date + ' UTC').toString()).format(
        'YYYY-MM-DD hh:mm:a',
      ) || 'N/A',

      sortable: false,
    },
    {
      name: 'CATEGORY',
      selector: (row) =>
        (
          <span>
            
            {categoryStatus?.map((ele, index) => {
              if (row.category == ele.value) {
                return ele.name ? ele.name : "N/A"
              }
            })}
          </span>
        ) ,
      sortable: false,
    },
    {
      name: 'STATUS',
      selector: (row) =>
        (
          <span>
            {getAssignmentStatus?.map((ele, ind) => {
              if (row.assignment_status == ele.value) {
                return (
                  <span
                    className={
                      ele.value == '1'
                        ? 'labelbtn-wrap pending-label '
                        : ele.value == '3'
                        ? 'labelbtn-wrap approve-label'
                        : ele.value == '4'
                        ? 'labelbtn-wrap rejected-label'
                        : ele.value == '2'
                        ? 'labelbtn-wrap resubmit-label'
                        : ele.value == '6'
                        ? 'labelbtn-wrap resubmit-label'
                        : ''
                    }
                    key={ind}
                  >
                    {ele.name}
                  </span>
                )
              }
            })}
          </span>
        ) || 'N/A',
      sortable: false,
    },

    {
      name: 'ACTION',
      selector: (row) =>
        (
          <span
            onClick={() => {
              navigate(`/admin/assignmentinfo/${row?.id}`)
            }}
          >
            <img src={eyeIcnframe} className="size-icn-wrap pointer" alt="react img" />
          </span>
        ) || 'N/A',
      sortable: false,
    },
  ]
  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }

  const rowDisabledCriteria = (row) => row.assignment_status !== 2

  useEffect(() => {
    if (action) {
      dispatch(
        getAssignmentlistAsync({
          assignment_status: action,
          keyword: orderSearchData ? orderSearchData : '',
          page_size: limit,
          page: page,
        }),
      )
    }
    if (orderSearchData) {
      const timer = setTimeout(() => {
        dispatch(
          getAssignmentlistAsync({
            assignment_status: action,
            keyword: orderSearchData ? orderSearchData : '',
            page_size: limit,
            page: page,
          }),
        )
      }, 1000)
      return () => clearTimeout(timer)
    } else if (orderSearchData == '') {
      dispatch(
        getAssignmentlistAsync({
          assignment_status: action,
          keyword: orderSearchData ? orderSearchData : '',
          page_size: limit,
          page: page,
        }),
      )
    }
  }, [action, orderSearchData, page, limit])

  const handleFilterData = (e) => {
    setAction(e.target.value)
  }

  const orderSearch = (e) => {
    setOrderSearchData(e.target.value)
  }

  const handleChange = (row) => {
    let checkedRows = []
    row?.selectedRows.forEach((ele) => {
      checkedRows.push({ rowIndex: ele.id })
    })

    setChecked(checkedRows)
  }

  const handleMakedApproved = async (e) => {
    if (e.target.value == 3) {
      setVisible(true)
    } else if (e.target.value == 4) {
      setVisible1(true)
    }

    let arr = []
    checked.map((ele) => {
      arr.push(ele.rowIndex)
    })
    const data = {
      assignment_status: e.target.value,
      id: arr,
    }
    setMarkedApp(data)
  }

  useEffect(() => {
    const fetch = async () => {
      if (idData && marked.id.length != 0) {
        await dispatch(assignmentStatusAsync(marked))
        await dispatch(getAssignmentlistAsync())
        await toast.success('Status Updated Successfully')
        setVisible(false)
      }
    }
    fetch()
  }, [idData, marked])

  return (
    <div>
      <>
        <BackDashboard />
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
            Are you sure you want to Approve?
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <Button
              id="2"
              className="button-custom"
              onClick={(e) => {
                setVisible(false)
                setIdData(true)
              }}
            >
              Yes
            </Button>
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
                setIdData(true)
              }}
            >
              Yes
            </CButton>
            <CButton
              className="button-custom cancel-button"
              color="primary"
              onClick={(e) => {
                setVisible1(false)
              }}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>

        <Col >
          <Card className="Recent-Users card-bt mt-3">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <div className=" row justify-content-between align-items-center">
                <Col md={4} xl={3}>
                  <Card.Title as="h5">MANAGE ASSIGNMENT</Card.Title>
                </Col>

                <Col md={4} xl={3}>
                  <div className="">
                    {!checked.length == 0 ? (
                      <Form.Select
                        className=""
                        aria-label="Default select example"
                        onChange={handleMakedApproved}
                      >
                        <option>Change Status</option>
                        <option value="3">Mark as Approved</option>
                        <option value="4">Mark As Rejected</option>
                      </Form.Select>
                    ) : (
                      ''
                    )}
                  </div>
                </Col>

                <Col md={4} xl={3}>
                  <Form.Select aria-label="Default select example" onClick={handleFilterData}>
                    {getAssignmentStatus?.map((ele, index) => (
                      <option key={index} value={ele.value}>
                        {ele.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                <Col md={4} xl={3}>
                  <Form.Control
                    placeholder="By Title, Keywords"
                    className=""
                    onChange={orderSearch}
                  />
                </Col>

              </div>
            </Card.Header>

            <Card.Body className="px-0·py-2 ">
              <DataTable
                className='asignmentstyle'
                columns={columns}
                customStyles={customStyles}
                data={getAssignment?.data?.data}
                selectableRows
                onSelectedRowsChange={handleChange}
                selectableRowDisabled={rowDisabledCriteria}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationTotalRows={getAssignments?.data?.total}
                onChangePage={Tablepagination}
                pagination
                paginationServer
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
              />
            </Card.Body>
          </Card>
        </Col>
      </>
    </div>
  )
}

export default ManageAssignment
