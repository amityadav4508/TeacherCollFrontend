import React, { useState, useEffect } from 'react'
import { Card, Form } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import BackButton from 'src/Views/widgets/BackButton'
import { PaymentInfoAsync} from 'src/store/features/ManagepaymentSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Paymentinfo = () => {
  let { id } = useParams()
  const [paymentStatus, setPaymentStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [sorting, setSorting] = useState('')
  const dispatch = useDispatch()
  const paymentinfo = useSelector((state) => state?.paymentInfo?.getPaymentInfo?.data?.data)
  const assignmentStatus = useSelector((state) => state?.paymentInfo?.getPaymentInfo?.data?.all_assignment_status,
  )
  const categoryStatus = useSelector(
    (state) => state?.paymentInfo?.getPaymentInfo?.data?.category_status,
  )


  const handleSortData = (e) => {
    setSorting(e.target.value)
  }

  const columns = [
    {
      name: 'ASSIGNMENT ID',
      selector: (row) => row.assignment_id || 'N/A',
      sortable: true,
    },
    {
      name: 'TEACHER',
      selector: (row) => <span> {row.teacher_name}</span> || 'N/A',
      sortable: true,
    },
    {
      name: 'STUDENT NAME',
      selector: (row) => row.student_name || 'N/A',
      sortable: true,
    },
    {
      name: 'TITLE',
      selector: (row) => <span> {row.title}</span> || 'N/A',
      sortable: true,
    },
    {
      name: 'SUBMITTED ON',
      selector: (row) => <span> {row.answered_on_date}</span> || 'N/A',
      sortable: true,
    },
    {
      name: 'TIME',
      selector: (row) =>
        <span> {moment(row.answered_on_time, 'HH:mm:ss').format('hh:mm A')}</span> || 'N/A',
      sortable: true,
    },
    {
      name: 'ASSIGNMENT STATUS',
      selector: (row) => (
        <span title={row.assignment_status}>
          {assignmentStatus?.map((ele, index) => {
            if (row.assignment_status == ele.value) {
              return ele.name
            }
          })}
        </span>
      ),
      sortable: true,
    },
    {
      name: 'CATEGORY',
      selector: (row) =>
        (
          <span title={row.assignment_status}>
            {categoryStatus?.map((ele, index) => {
              if (row.category == ele.value) {
                return ele.name
              }
            })}
          </span>
        ) || 'N/A',
      sortable: true,
    },
    {
      name: 'AMOUNT',
      selector: (row) => row.amount || 'N/A',
      sortable: true,
    },
    {
      name: 'PAYMENT STATUS',
      selector: (row) =>
        row.is_paid_to_teacher === 0
          ? 'Pending'
          : row.is_paid_to_teacher === 1
          ? 'Paid'
          : '' || 'N/A',
      sortable: false,
    },
  ]
   const PaymentSelectedData = {
    
    teacher_id: id,
    is_paid_to_teacher: paymentStatus,
    start_date: startDate? moment(new Date(startDate)).format('YYYY-MM-DD'):null,
    end_date: endDate?moment(new Date(endDate)).format('YYYY-MM-DD'):null,
  }


  useEffect(() => {
    if (startDate || endDate) {
      dispatch(PaymentInfoAsync(PaymentSelectedData))
    }
  }, [startDate, endDate])

  useEffect(() => {
    dispatch(
      PaymentInfoAsync({
        teacher_id: id,
        sort : sorting,
      }),
    )
  }, [id,sorting])

  const hanldleDatePrev = (val) => {

    setStartDate(val)
    setEndDate('');
  }
  const hanldleDateCurrent = (val) => {
  
    setEndDate(val)
  }

  return (
    <div>
      <BackButton />

      <Col md={50} xl={50}>
        <Card className="Recent-Users card-bt mt-3">
          <Card.Header style={{ backgroundColor: '#fff' }}>
            <div className="d-flex justify-content-between">
              <Card.Title className='mt-1' as="h5">PAYMENT DETAILS</Card.Title>
              <Row>
              <Col className="d-flex">
                    <div className='position-relative pe-4'>

                      <DatePicker
                        className="form-control ps-5"
                        selected={startDate}
                        onChange={(date) => hanldleDatePrev(date)}
                        selectsStart
                        startDate={startDate}
                        placeholderText={'Start Date'}
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                      />
                       <div className='date-pick-icn position-absolute'>
                      <i className="date-icon fa fa-calendar mt-0 " aria-hidden="true"></i>


                      </div>
                    </div>
                    <div className='position-relative'>

                      <DatePicker
                        className="date-pick form-control ps-5"

                        selected={endDate}
                        minDate={startDate}
                        placeholderText={'End Date'}
                        onChange={(date) => hanldleDateCurrent(date)}
                        selectsEnd
                        endDate={endDate}
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                       
                      />
                      <div className='date-pick-icn position-absolute'>
                      <i className="date-icon fa fa-calendar mt-0 " aria-hidden="true"></i>


                      </div>
                      
                    </div>
                  </Col>
             
                  <Col>
                
                      <Form.Select
                        value={sorting}
                        className="mx-4 w-50"
                        aria-label="Default select example"
                        onChange={handleSortData}
                      >
                        <option className="text-muted"> Date</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Decending</option>
                      </Form.Select>
            
                  </Col>
            
              </Row>
            </div>
          </Card.Header>
          <Card.Body className="px-0·py-2 ">
            <DataTable
              columns={columns}
              data={paymentinfo?.data}
              pagination
              paginationServer
              paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
            />
          </Card.Body>
        </Card>
      </Col>
    </div>
  )
}

export default Paymentinfo
