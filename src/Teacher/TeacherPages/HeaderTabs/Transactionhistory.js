import React, { useEffect, useState } from 'react'
import { Col, Card, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import { getWalletAsync } from 'src/store/features/sosEmailSlice'
import DatePicker from 'react-datepicker'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faIndianRupeeSign,
  faDollarSign,
  faEuroSign,
  faSterlingSign,
} from '@fortawesome/free-solid-svg-icons'
import DefaultCurrency from 'src/layout/DefaultCurrency'

const TransactionHistory = () => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [perPage, setPerPage] = useState('')
  const [page, setPage] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const { wallet } = useSelector((state) => state?.sosEmail)

  // useEffect(() => {
  //   dispatch(
  //     getWalletAsync(PaymentSelectedData),
  //   )
  // }, [keyword, perPage, page])

  useEffect(() => {
    if (startDate || endDate || keyword || perPage || page) {
      dispatch(getWalletAsync(PaymentSelectedData))
    } else if (keyword.length == 0) {
      dispatch(getWalletAsync(PaymentSelectedData))
    }
  }, [startDate, endDate, keyword, perPage, page])

  const PaymentSelectedData = {
    page: page,
    page_size: perPage,
    keyword: keyword,
    start_date: startDate ? moment(new Date(startDate)).format('YYYY-MM-DD') : null,
    end_date: endDate ? moment(new Date(endDate)).format('YYYY-MM-DD') : null,
  }
  const handlePerRowsChange = async (per_page, page) => {
    setPerPage(per_page)
  }

  const Tablepagination = (page) => {
    setPage(page)
  }

  const hanldleDatePrev = (val) => {
    setStartDate(val)
    setEndDate('')
  }
  const hanldleDateCurrent = (val) => {
    setEndDate(val)
  }

  // const currency = wallet?.data?.currency

  const columns = [
    {
      name: 'AMOUNT',
      // selector: (row) => row?.amount || 'N/A',
      selector: (row) =>
      <span>
        <DefaultCurrency/>{" " +parseFloat(row?.amount * wallet?.data?.exchange_rate ).toFixed(2) || '-'}
      </span>,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (row?.remit == 0 ? 'Pending' : 'Paid' || 'N/A'),
      sortable: true,
    },
    {
      name: 'CREATED AT',
      selector: (row) =>
        <span>{moment(row?.description?.created_at).format(' Do MMMM YYYY')}</span> || 'N/A',
      sortable: true,
    },
  ]


  return (
    <div>
      <>
        <Col md={50} xl={50}>
          <Card className="Recent-Users card-bt">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <div className="d-flex justify-content-between">
                <Row>
                  <Col sm="12" md="12" lg="3">
                    <label className="fs-6 fw-normal my-1">From</label>
                    <div className="position-relative pe-4">
                      <DatePicker
                        className="form-control ps-5"
                        selected={startDate}
                        onChange={(date) => hanldleDatePrev(date)}
                        selectsStart
                        startDate={startDate}
                        placeholderText={'Start Date'}
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        // endDate={endDate}
                      />
                      <div className="date-pick-icn position-absolute">
                        <i className="date-icon fa fa-calendar mt-0 " aria-hidden="true"></i>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="3">
                    <div className="me-2 w-100 tabs-inner-wrap">
                      <label className="fs-6 fw-normal my-1">To Date</label>
                      <div className="position-relative">
                        <DatePicker
                          className="date-pick form-control ps-5"
                          selected={endDate}
                          minDate={moment().toDate()}
                          placeholderText={'End Date'}
                          onChange={(date) => hanldleDateCurrent(date)}
                          selectsEnd
                          endDate={endDate}
                          dateFormat="yyyy-MM-dd"
                        />
                        <div className="date-pick-icn position-absolute">
                          <i className="date-icon fa fa-calendar mt-0 " aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="12" lg="3" className="pt-3">
                    <Form.Control
                      className="search  mt-3"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Search"
                      // onChange={orderSearch}
                    />
                  </Col>
                </Row>
              </div>
            </Card.Header>

            <Card.Body className="px-0·py-2 ">
              <DataTable
                columns={columns}
                data={wallet?.data?.transection?.data ? wallet?.data?.transection?.data : []}
                pagination
                // progressPending={loading}
                paginationServer
                paginationTotalRows={wallet?.data?.transection?.total}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                onChangePage={Tablepagination}
              />
            </Card.Body>
          </Card>
        </Col>
      </>
    </div>
  )
}

export default TransactionHistory
