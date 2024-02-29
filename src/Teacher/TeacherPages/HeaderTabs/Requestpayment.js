import { CCard } from '@coreui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DefaultCurrency from 'src/layout/DefaultCurrency'
import { getWalletAsync } from 'src/store/features/sosEmailSlice'


const RequestPayment = () => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [perPage, setPerPage] = useState('')
  const [page, setPage] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const { wallet } = useSelector((state) => state?.sosEmail)

  const PaymentSelectedData = {
    page: page,
    page_size: perPage,
    keyword: keyword,
    start_date: startDate ? moment(new Date(startDate)).format('YYYY-MM-DD') : null,
    end_date: endDate ? moment(new Date(endDate)).format('YYYY-MM-DD') : null,
  }





  useEffect(() => {
    dispatch(getWalletAsync(PaymentSelectedData))
  }, [])
  return (
    <div>
      <CCard className="p-5 pt-3 border-0 outer-card-lms">
        <Col className="my-4">
          <Col xs={12} md={3}>
            <div className="p-3 wallet-wraper mb-4">
              <h5 className="mb-0">
                <span className="me-2">Wallet :</span>
                <DefaultCurrency/>{parseFloat( wallet?.data?.wallet* wallet?.data?.exchange_rate).toFixed(2)}
                {/* <DefaultCurrency/>{wallet?.data?.wallet* wallet?.data?.exchange_rate} */}
              </h5>
            </div>
          </Col>

          <h6 className="mb-4 pt-2">PAYMENT GUIDELINES</h6>
          <Row>
            <Col xs={12} md={6}>
              <p>
                <span className="fw-bold">1)</span> Commission Structure: TeacherCool typically
                charges a commission fee from vendors for each order placed through their platform.
                The commission structure may vary depending on factors such as the type of cuisine,
                location, and partnership agreements. The specific commission rates should be
                communicated to you by TeacherCool during the onboarding process.
              </p>
            </Col>
            <Col xs={12} md={6}>
              <p>
                <span className="fw-bold">2)</span> Payment Settlements: TeacherCool usually settles
                payments with Teachers on a daily basis, which may vary based on the region or
                partnership agreement. The settlement period could be daily, weekly, or monthly. The
                payment settlements include the total order value minus the applicable commission
                and any other charges or deductions.
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <p>
                <span className="fw-bold">3)</span> Payment Modes: TeacherCool may offer multiple
                payment options for settling vendor payments. This could include bank transfers,
                online payment gateways, or digital wallets. The specific payment methods available
                to you may depend on your location and the partnership agreement with TeacherCool.
              </p>
            </Col>
            <Col xs={12} md={6}>
              <p>
                <span className="fw-bold">4)</span>Payment Disputes: In case of any payment
                discrepancies or disputes, it is important to reach out to {"TeacherCool's "}support
                team. They will typically have a dedicated support channel for vendors to address
                any payment-related issues or concerns.
              </p>
            </Col>
          </Row>
        </Col>
        {/* <div className="d-flex btn-tab-lms">
          <Button className="button-custom ">Request for payment</Button>
        </div> */}
      </CCard>
    </div>
  )
}

export default RequestPayment
