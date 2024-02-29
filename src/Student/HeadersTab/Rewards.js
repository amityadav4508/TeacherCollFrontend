import React, { useEffect } from 'react'
import { Col, Card, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRewardsAsync } from 'src/store/features/ChatSlice'
import DataTable from 'react-data-table-component'
import { useState } from 'react'
import Loader from 'src/Views/Loader/Loader'
import NavTopBar from 'src/layout/NavTopBar'
import moment from 'moment'
import BackButton from 'src/Views/widgets/BackButton'

const Rewards = () => {
  const dispatch = useDispatch()

  const { StudentorderStats } = useSelector((state) => state.StudentOrders)
  // const { orderloading } = useSelector((state) => state.StudentOrders)
  const { rewards } = useSelector((state) => state.chats)
  const [limit, setLimit] = useState('')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState('')
  const [payment, setPayment] = useState('')
  const [checked, setChecked] = useState('')

  const handlePaymentStatus = (e) => {
    setPayment(e.target.value)
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
      style: {},
    },
  }

  const date = new Date()
  const currentDate = date.toISOString().substring(0, 10)

  const columns = [
    {
      name: 'REWARDS TYPE',
      selector: (row) => row.reward_type == 2 ? "REFFERAL REWARD" : "CONTENT REWARD" || 'N/A',
      sortable: false,
    },
    {
      name: 'POINTS ',
      selector: (row) => row.points || 'N/A',
      sortable: false,
    },

    {
      name: 'TRANSACTION TYPE',
      selector: (row) => (row.transection_type == 1 ? 'CREDIT' : 'DEBIT' || 'N/A'),

      sortable: false,
    },
  ]

  useEffect(() => {
    dispatch(getRewardsAsync())
  }, [])

  const handleChange = (row) => {
    let checkedRows = []
    let rowIndex = row.selectedRows.lastIndex
    let rowId = row?.selectedRows.map((ele) => {
      checkedRows.push({ rowIndex: ele.id })
    })
    setChecked(checkedRows)
  }

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }

  return (
    <div>
      <>
        <NavTopBar />
        <div className="px-5 pt-4">
          <BackButton />
        </div>

        <div className="p-5 pt-4">
          <Col md={12} xl={12} className="student-card-custom">
            <Card className="Recent-Users card-bt">
              <Card.Header style={{ backgroundColor: '#fff' }}>
                <div className="d-flex justify-content-between">
                  <Card.Title as="h5">REWARDS</Card.Title>
                  <Row>
                    <Col></Col>
                  </Row>
                </div>
              </Card.Header>

              <Card.Body className="px-0·py-2 ">
                <DataTable
                  columns={columns}
                  data={rewards?.data?.data}
                  customStyles={customStyles}
                  onSelectedRowsChange={handleChange}
                  paginationTotalRows={rewards?.data?.total}
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={Tablepagination}
                  pagination
                  paginationServer
                  paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                />
              </Card.Body>
            </Card>
          </Col>
        </div>
      </>
    </div>
  )
}

export default Rewards
