import React, { useEffect } from 'react'

import { Col, Card, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { assignmentStatusAsync, getAssignmentlistAsync } from 'src/store/features/OrderListSlice'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { useState } from 'react'
import BackDashboard from 'src/Views/widgets/BackDashboard'



const ManageAssignment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const getsorders = useSelector(
    (state) => state?.getorderdetails?.getAssignments?.all_assignment_status,
  )
 
  const [orderSearchData, setOrderSearchData] = useState('')
  const [action, setAction] = useState('')

  const columns = [
   
    {
      name: 'ASSIGNMENT ID',
      selector: (row) => row.assignment_id || 'N/A',
      sortable: true,
    },
    {
      name: 'CREATED ON',
      selector: (row) => moment(new Date(row.created_at + ' UTC').toString()).format(
        'YYYY-MM-DD hh:mm:a',
      ) || 'N/A',
      sortable: true,
    },
    {
      name: 'TITLE',
      selector: (row) => row.title || '',
      sortable: true,
    },
   
    {
      name: 'ANSWERED BY',
      selector: (row) => row.teacher_name || 'N/A',
      sortable: false,
    },
    {
      name: 'DUE BY',
      selector: (row) => moment(new Date(row.due_date + ' UTC').toString()).format(
        'YYYY-MM-DD hh:mm:a',
      ) || 'N/A',

      sortable: false,
    },
    {
      name: 'CATEGORY',
      selector: (row) => row.category || 'N/A',

      sortable: false,
    },
    {
      name: 'STATUS',
      selector: (row) =>
        row?.assignment_status === 1
          ? 'Submitted'
          : row?.assignment_status === 0
          ? 'Pending'
          : row?.assignment_status === 2
          ? 'Aprroved'
          : '' || 'N/A',

      sortable: false,
    },
    {
      name: 'ACTION',
      selector: (row) =>
        (
          <span
            onClick={() => {
              navigate(`/viewteacher/${row?.id}`)
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </span>
        ) || 'N/A',
      sortable: false,
    },
  ]

  useEffect(() => {
    dispatch(getAssignmentlistAsync())
  }, [])

  useEffect(() => {
    if (action) {
      dispatch(getAssignmentlistAsync({ assignment_status: action, keyword: orderSearchData }))
    }
    if (orderSearchData) {
      const timer = setTimeout(() => {
        dispatch(getAssignmentlistAsync({ assignment_status: action, keyword: orderSearchData }))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [action, orderSearchData])

  const handleFilterData = (e) => {
    setAction(e.target.value)
  }

  const orderSearch = (e) => {
    setOrderSearchData(e.target.value)
  }

  const [checked, setChecked] = useState([])

  const handleChange = (row) => {
    let checkedRows = []
    let rowIndex = row.selectedRows.lastIndex
    let rowId = row?.selectedRows.map((ele) => {
      checkedRows.push({ rowIndex: ele.id })
    })
    setChecked(checkedRows)
  }


  const handleMakedApproved = async (e) => {
    let arr = []
    checked.map((ele) => {

      arr.push(ele.rowIndex)
    })
    const data = {
      assignment_status: e.target.value,
      id: arr,
    }

    await dispatch(assignmentStatusAsync(data))
    await dispatch(getAssignmentlistAsync())
  }

  return (
    <div>
      <>
      <BackDashboard />
        <Col md={50} xl={50}>
          <Card className="Recent-Users card-bt">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <div className="d-flex justify-content-between">
                <Card.Title as="h5">ManaVCXCge Assignment</Card.Title>
                <Row>
                  <Col></Col>
                </Row>

                <Row>
                  <Col>
                    <div className="d-flex">
                      <Form.Select
                        className="mx-4"
                        aria-label="Default select example"
                        onChange={handleMakedApproved}
                      >
                        <option>Actions</option>
                        <option value="0">Mark As Pending</option>
                        <option value="1">Mark As Submitted</option>
                        <option value="2">Mark as Approved</option>
                      </Form.Select>

                      <Form.Select aria-label="Default select example" onClick={handleFilterData}>
                        <option>Assignment Status</option>
                        {/* <option >All</option> */}
                        {getsorders?.map((ele, index) => (
                          <option key={index} value={ele.value}>
                            {ele.name}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </Col>
                  <Col>
                    <Form.Control placeholder="By Title, Keywords,Subject" onChange={orderSearch} />
                  </Col>
                </Row>
              </div>
            </Card.Header>

            <Card.Body className="px-0·py-2 ">
              <DataTable
                columns={columns}
                // data={getAssignment?.data?.data}
                // selectableRows
                // onSelectedRowsChange={handleChange}
                // pagination
                // paginationServer
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
