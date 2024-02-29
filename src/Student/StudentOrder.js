import React, { useEffect } from 'react'
import { Col, Card, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getStudentOrderListAsync } from 'src/store/features/StudentordersSlice'

import DataTable from 'react-data-table-component'
import { useState } from 'react'
import Loader from 'src/Views/Loader/Loader'
import NavTopBar from 'src/layout/NavTopBar'
import moment from 'moment'
import BackButton from 'src/Views/widgets/BackButton'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { getPDFByIDAsync } from 'src/store/features/ChatSlice'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'start',
  },

  right: {
    marginLeft: '280px',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  details: {
    marginTop: '35px',
    margin: 10,
    padding: 10,
  },
  border: {
    border: '10px',
    borderRadius: '1px solid red',
  },
  titleContainer: {
    flexDirection: 'row',
    marginLeft: '220px',
    letterSpacing: 4,
    fontSize: 25,
    marginTop: 24,
  },
  reportTitle: {
    fontWeight: 'bold',

    textTransform: 'uppercase',
  },
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end',
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: 'bold',
  },
  label: {
    width: 1000,
  },
  headerContainer: {
    marginTop: 36,
  },
  table: {
    marginTop: '20px',
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
  titleContainer1: {
    flexDirection: 'row',
    marginLeft: '185px',
    marginTop: 12,
  },
  reportTitle1: {
    fontSize: 12,
    marginTop: '30px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})

const StudentOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { StudentorderStats } = useSelector((state) => state.StudentOrders)
  const { pdf } = useSelector((state) => state.chats)
  const [limit, setLimit] = useState('')
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState('')
  const [payment, setPayment] = useState('')
  const [checked, setChecked] = useState('')
  const { subscription_status } = useSelector((state) => state?.mainPageContent)
  console.log(subscription_status?.data?.data?.is_platinum,'subscription_status')



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
      style: { width: '220px' },
    },
  }

  const date = new Date()
  const currentDate = date.toISOString().substring(0, 10)

  const columns = [
    {
      name: 'ORDER ID',
      selector: (row) => row.order_id || 'N/A',
      sortable: false,
    },
    {
      name: 'ORDER TYPE ',
      selector: (row) => row.order_type==1?row.subscription_name:row.order_type==2?'Assignment':row.order_type==3?'Content':"" || 'N/A',
      sortable: false,
    },
    {
      name: 'TOTAL AMOUNT',
      selector: (row) => parseFloat((row.total_amount-row.tax)-row.discount).toFixed(2)  || 'N/A',
      sortable: false,
    },
    {
      name: 'GST',
      selector: (row) => row.tax,
      sortable: false,
    },
    {
      name: 'DISCOUNT',
      selector: (row) => row.discount==0?0:row.discount || 'N/A',

      sortable: false,
    },
    {
      name: 'ORDER TOTAL',
      selector: (row) => row.total_amount || 'N/A',

      sortable: false,
    },
    {
      name: 'REMAINING DAYS',
      selector: (row) => (
        <span title={row?.user_name}>
          {row?.subscription_expire_date
            ? moment(row?.subscription_expire_date).diff(currentDate, 'days')
            : 'N/A'}
        </span>
      ),
      sortable: false,
    },
    {
      name: 'ORDER STATUS',
      selector: (row) => (
        <div className="d-flex">
          <div
            className={
              row?.payment_status === 2
                ? 'labelbtn-wrap approve-label'
                : row?.payment_status === 1
                ? 'labelbtn-wrap pending-label'
                : ''
            }
          >
            {row?.payment_status === 2
              ? 'Paid'
              : row?.payment_status === 1
              ? 'Pending'
              : '' || 'N/A'}
          </div>
          {row?.payment_status === 1 ? (
            <button
              className="border-0 condensed button-edit edit-bg ms-2"
              onClick={() => {
                let url = ''
                if (row.order_type == 1 && subscription_status?.data?.data?.is_platinum == 0) {
                  url = `/checkout?subscription_id=${row.subscription_plan_id}&order_type=${row.order_type}&order_id=${row.id}`
                } else if (row.order_type == 2 && subscription_status?.data?.data?.is_platinum == 0) {
                  url = `/checkout?assignment_id=${row.assignment_id}&order_type=${row.order_type}&order_id=${row.id}`
                } else if(subscription_status?.data?.data?.is_platinum == 0) {
                  url = `/checkout?content_id=${row.content_id}&order_type=${row.order_type}&order_id=${row.id}`
                }else {
                  toast.info('You already purchased a Plan')
                }
                navigate(url)
              }}
            >
              Pay Now
            </button>
          ) : (
            ''
          )}
        </div>
      ),

      sortable: false,
    },
    {
      name: 'DOWNLOAD',
      selector: (row) => (
        <span>
          <PDFDownloadLink
            document={
              <>
                {pdf?.data?.map((iten, ind) => {
                  return (
                    <Document key={ind}>
                      <Page style={styles?.page}>
                        <View style={styles.titleContainer}>
                          <Text style={styles.reportTitle}>INVOICE</Text>
                        </View>
                        <View style={styles.invoiceNoContainer}>
                          <Text>Invoice No: {iten?.order_id}</Text>
                        </View>
                        <View style={styles.invoiceDateContainer}>
                          <Text> Date: {moment(iten?.created_at).format('MMMM Do YYYY')}</Text>
                        </View>
                        <View style={styles.headerContainer}>
                          <Text>Customer Details:-</Text>
                          <Text>Email: {iten?.user_email}</Text>
                          <Text>Order Id: {iten?.order_id}</Text>
                          <Text>Subscription Name: {iten?.subscription_name}</Text>
                          <Text>
                            Payment Status:{' '}
                            {iten?.payment_status == 2
                              ? 'Paid'
                              : iten?.payment_status == 1
                              ? 'Pending'
                              : ''}
                          </Text>
                        </View>

                        <View style={styles.table}>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>Item</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>Net Amount</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>Discount</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>GST</Text>
                            </View>
                            
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>Total Amount</Text>
                            </View>
                          </View>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{iten?.subscription_name}</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{((parseFloat(iten?.total_amount) - parseFloat(iten?.discount)) - parseFloat(iten?.tax)).toFixed(2) }</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{iten?.discount}</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>{iten?.tax ? iten?.tax : '0'}</Text>
                            </View>
                            <View style={styles.tableCol}>
                              <Text style={styles.tableCell}>
                                {parseFloat(iten?.total_amount).toFixed(2) }
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.headerContainer}>
                          <Text>Company Details:-</Text>
                          <Text>TeacherCool</Text>
                          <Text>
                            Address:{' '}
                            {iten?.address
                              ? iten?.address
                              : 'Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016'}{' '}
                          </Text>
                          <Text>Contact: {iten?.contact ? iten?.contact : '7896541230'}</Text>
                        </View>

                        <View style={styles.titleContainer1}>
                          <Text style={styles.reportTitle1}>Thank you for your business</Text>
                        </View>
                      </Page>
                    </Document>
                  )
                })}
              </>
            }
            onClick={() => dispatch(getPDFByIDAsync(row.id))}
            fileName="Invoice"
          >
            <button className="download-btn">Download</button>
          </PDFDownloadLink>
        </span>
      ),

      sortable: false,
    },
  ]

  useEffect(() => {
    dispatch(
      getStudentOrderListAsync({
        keyword: keyword,
        page_size: limit,
        payment_status: payment,
        page: page,
      }),
    )
  }, [keyword, limit, page, payment])

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
                <div className="main-navbar-wrap justify-content-between">
                  <Card.Title as="h5">ORDER LISTING</Card.Title>
                  <Row>
                    <Col></Col>
                  </Row>

                  <Row>
                    <Col>
                      <div className="d-flex">
                        <Form.Select
                          value={payment}
                          className="mx-0 mx-lg-4"
                          aria-label="Default select example"
                          onChange={handlePaymentStatus}
                        >
                          <option value="0">All</option>
                          <option value="2">Paid</option>
                          <option value="1">Pending</option>
                          <option value="3">Failed</option>
                        </Form.Select>
                      </div>
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="By Title, Keywords"
                        value={keyword}
                        aria-label="Username"
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                    </Col>
                  </Row>
                </div>
              </Card.Header>

              <Card.Body className="px-0·py-2 ">
                <DataTable
                  columns={columns}
                  data={StudentorderStats?.data?.data}
                  customStyles={customStyles}
                  onSelectedRowsChange={handleChange}
                  paginationTotalRows={StudentorderStats?.data?.total}
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

export default StudentOrder
