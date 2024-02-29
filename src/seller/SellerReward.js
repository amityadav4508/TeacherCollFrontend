import React, { useEffect } from 'react'
import { Col, Card, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getRewardsAsync } from 'src/store/features/ChatSlice'
import DataTable from 'react-data-table-component'
import { useState } from 'react'

import BackButton from 'src/Views/widgets/BackButton'

const SellerRewards = () => {
  const dispatch = useDispatch()

  const { rewards } = useSelector((state) => state.chats)
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')
  const [checked, setChecked] = useState('')

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
      name: 'REWARDS TYPE',
      selector: (row) => (row.reward_type == 2 ? 'REFFERAL REWARD' : 'CONTENT REWARD' || 'N/A'),
      sortable: false,
    },
    {
      name: 'POINTS ',
      selector: (row) => row.points * rewards?.data?.exchange_rate || 'N/A',
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
        <div className="">
          <BackButton />
        </div>

        <div className=" pt-4">
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
                  data={rewards?.data?.data?.data}
                  customStyles={customStyles}
                  onSelectedRowsChange={handleChange}
                  paginationTotalRows={rewards?.data?.data?.total}
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

export default SellerRewards
