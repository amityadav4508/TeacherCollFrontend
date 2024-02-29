import React, { useEffect } from 'react'
import { Col, Card, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { orderListAsync } from 'src/store/features/OrderListSlice'
import DataTable from 'react-data-table-component'
import { useState } from 'react'
import Loader from 'src/Views/Loader/Loader'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import { useLocation } from 'react-router-dom'

const OrderList = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.getorderdetails)
  const { orderList } = useSelector((state) => state.getorderdetails)
  const [limit, setLimit] = useState(10)

  const [page, setPage] = useState('')
  const [orderSearchData, setOrderSearchData] = useState('')
  const [action, setAction] = useState('')

  let location = useLocation()
  const Status = location?.pathname?.split('/')[3]
  
  const [param, setParams] = useState(Status)
  console.log(param,"666666")

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
        width:'150px'
      },
    },
  }

  const columns = [
    {
      name: 'ORDER ID',
      selector: (row) => row.order_id || 'N/A',
      sortable: false,
    },
    {
      name: 'NAME',
      selector: (row) => <span title={row?.user_name}>{row.user_name}</span> || 'N/A',
      sortable: false,
    },
    {
      name: 'EMAIL',
      selector: (row) => <span title={row?.user_email}>{row.user_email}</span> || 'N/A',
      sortable: false,
    },
    {
      name: 'SUBSCRIPTION ',
      selector: (row) => row.subscription_name || 'N/A',
      sortable: false,
    },
    {
      name: 'TOTAL AMOUNT',
      selector: (row) => parseFloat((row.total_amount-row.tax)-row.discount).toFixed(2)  || 'N/A',
      sortable: false,
    },
    {
      name: 'DISCOUNT',
      selector: (row) => row.discount==0?0:row.discount || 'N/A',

      sortable: false,
    },
    {
      name: 'TAX',
      selector: (row) => row.tax || 'N/A',

      sortable: false,
    },
    {
      name: 'ORDER TOTAL',
      selector: (row) => row.total_amount ,

      sortable: false,
    },
   
    {
      name: 'STATUS',
      selector: (row) => (
        <div
          className={
            row?.payment_status === 2
              ? 'labelbtn-wrap approve-label'
              : row?.payment_status === 1
              ? 'labelbtn-wrap pending-label'
              : 'labelbtn-wrap rejected-label'
             
          }
        >
          {row?.payment_status === 2 ? 'Paid' : row?.payment_status === 1 ? 'Pending' : '' || 'N/A'}
        </div>
      ),

      sortable: false,
    },
  ]

  useEffect(() => {
    dispatch(orderListAsync())
  }, [])

  useEffect(() => {

    if (action || limit || orderSearchData||page) {
    
      if(orderSearchData.length > 3 || limit || orderSearchData || page){
      dispatch(
        orderListAsync({ is_paid: action, keyword: orderSearchData, page_size: limit, page: page }),
      )
      }
    }
    if (orderSearchData) {
      const timer = setTimeout(async () => {

        await dispatch(
          
          orderListAsync({
            is_paid: action,
            keyword: orderSearchData,
            page_size: limit,
            page: page,
          }),
        )
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [action, orderSearchData, limit, page])

  const orderSearch = (e) => {
    setOrderSearchData(e.target.value)
  }

  const [checked, setChecked] = useState([])

  const handleMakedApproved = async (e) => {
    let arr = []
    checked.map((ele) => {
      arr.push(ele.rowIndex)
    })
    const data = {
      is_paid: e.target.value,
      id: arr,
      keyword: '',
    }

    await dispatch(orderListAsync(data))
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
        <BackDashboard />
        {loading === true ? (
          <div className="position-absolute d-flex justify-content-center w-75 zIndex mt-5">
            <Loader />
          </div>
        ) : (
          ''
        )}
        <Col md={50} xl={50}>
          <Card className="Recent-Users card-bt mt-3">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <div className="main-navbar-wrap justify-content-between">
                <Card.Title as="h5">ORDER LISTING</Card.Title>
                <Row>
                  <Col></Col>
                </Row>

                <Row>
                  <Col>
                    <div className="d-flex">
                      <Form.Select
                      value={param}
                        className="mx-4"
                        aria-label="Default select example"
                        onChange={handleMakedApproved}
                      >
                        <option value="0">All</option>
                        <option value="2">Paid</option>
                        <option value="1">Pending</option>
                      </Form.Select>
                    </div>
                  </Col>
                  <Col>
                    <Form.Control placeholder="By Order Id, Name, Email" onChange={orderSearch} />
                  </Col>
                </Row>
              </div>
            </Card.Header>

            <Card.Body className="px-0·py-2 ">
              <DataTable
                columns={columns}
                data={orderList?.data?.data}
                customStyles={customStyles}
                // onSelectedRowsChange={handleChange}
                paginationTotalRows={orderList?.data?.total}
                onChangeRowsPerPage={handlePerRowsChange}
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

export default OrderList
