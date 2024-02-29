import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentAsync, manageEditPaymentAsync } from 'src/store/features/PaymentSlice'
import BackButton from 'src/Views/widgets/BackButton'

const PaymentSettings = () => {
  const paymentData = useSelector((state) => state.paymentSlice.getPaymentData?.data)
  const dispatch = useDispatch()
  const [err, setErr] = useState('')
  const [payment, setPayment] = useState({
    teacher_cool_weightage: '',
    rate_per_assignment: '',
    discount: '',
    word_per_assignment: '',
    hourly_rate_it_coding: '',
    actual_word_present: '',
    word_conversion_rate: '',
  })

  useEffect(() => {
    setPayment({
      teacher_cool_weightage: paymentData?.teacher_cool_weightage,
      rate_per_assignment: paymentData?.rate_per_assignment,
      discount: paymentData?.discount,
      word_per_assignment: paymentData?.word_per_assignment,
      hourly_rate_it_coding: paymentData?.hourly_rate_it_coding,
      actual_word_present: paymentData?.actual_word_present,
      word_conversion_rate: paymentData?.word_conversion_rate,
    })
  }, [paymentData])

  const handleChange = (e) => {
    const { name, value } = e.target
    const regex = /^\d{0,1000}$/
    if (name == 'teacher_cool_weightage' && value <= 100) {
      setPayment({ ...payment, [name]: value })
    } else if (name == 'rate_per_assignment' || name == 'discount') {
      setPayment({ ...payment, [name]: value })
    } else if (name == 'word_per_assignment') {
      if (regex.test(value)) {
        setPayment({ ...payment, [name]: value })
      }
    } else if (name == 'hourly_rate_it_coding') {
      if (regex.test(value)) {
        setPayment({ ...payment, [name]: value })
      }
    } else if (name == 'actual_word_present') {
      if (regex.test(value)) {
        setPayment({ ...payment, [name]: value })
      }
    } else if (name == 'word_conversion_rate') {
      if (regex.test(value)) {
        setPayment({ ...payment, [name]: value })
      }
    }
  }

  const handleSubmit = () => {
    setErr(validation())
    if (Object.keys(validation()).length === 0 ) {
      dispatch(manageEditPaymentAsync(payment))
    }

  }

  function validation() {
    let error = {}
    if (!payment.teacher_cool_weightage) {
      error.teacher_cool_weightage = 'Teacher cool weightage is required!'
    }
    if (payment?.teacher_cool_weightage <= 0) {
      error.teacher_cool_weightage = 'Teacher cool weightage has Invalid value!'
    }

    if (!payment.rate_per_assignment) {
      error.rate_per_assignment = 'Rate per assignment is required!'
    }

    if (payment?.rate_per_assignment <= 0) {
      error.rate_per_assignment = 'Rate per assignment has Invalid value!'
    }

    if (payment?.discount < 0 || payment?.discount > 100) {
      error.discount = 'Discount has Invalid value!'
    }

    if (payment?.hourly_rate_it_coding <= 0) {
      error.hourly_rate_it_coding = 'Hourly Rate has Invalid value!'
    }

    if (!payment?.word_per_assignment) {
      error.word_per_assignment = 'Word Per Assignment is Required'
    } else if (payment?.word_per_assignment <= 0) {
      error.word_per_assignment = 'Word Per Assignment has Invalid value!'
    }

    if (!payment?.actual_word_present) {
      error.actual_word_present = 'Actual Word Present is Required'
    } else if (payment?.actual_word_present <= 0) {
      error.actual_word_present = 'Actual Word Present has Invalid value!'
    }
    if (!payment?.word_conversion_rate) {
      error.word_conversion_rate = 'Word Conversion Rate is Required'
    } else if (payment?.word_conversion_rate <= 0) {
      error.word_conversion_rate = 'Word Conversion Rate has Invalid value!'
    }
    return error
  }


  /* 
  Get the value from API on Page Load
  */
  useEffect(() => {
    dispatch(getPaymentAsync())
  }, [])

  return (
    <>
      <BackButton />

      <div className=" edit-subs-card d-flex justify-content-center pt-4 mt-3">
        <Card className="w-100  border-0 ">
          <h5 className="d-flex d-flex mt-2 mb-3">PAYMENT SETTINGS</h5>
          <Container fluid className=" mt-4">
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Label>
                    Teacher Cool Weightage <span>(%)</span>
                  </Form.Label>

                  <Form.Control
                    className="email-input"
                    name="teacher_cool_weightage"
                    type="number"
                    min="0"
                    max="100"
                    value={payment?.teacher_cool_weightage ? payment?.teacher_cool_weightage : ''}
                    placeholder="Teacher Cool Weightage"
                    onChange={handleChange}
                  />
                  <span className="text-danger">{err?.teacher_cool_weightage}</span>
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Teacher Weightage <span>(%)</span>
                  </Form.Label>

                  <Form.Control
                    disabled
                    className="email-input"
                    name="teacher_weightage"
                    value={100 - payment?.teacher_cool_weightage}
                    type="number"
                    placeholder="Teacher's Weightage"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Label>Rate Per Assignment </Form.Label>
                  <div className="position-relative">
                    <span
                      className="position-absolute ps-2 py-1 text-muted"
                      style={{ marginTop: '1px' }}
                    >
                      <svg
                        fill="#000000"
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12px"
                        height="12px"
                        viewBox="0 0 447.185 447.185"
                      >
                        <g>
                          <path
                            d="M358.204,96.283h-33.437c-2.211-19.379-8.961-37.519-19.672-51.56h53.108c12.721,0,23.022-9.499,23.022-22.216
		c0-12.723-10.302-22.484-23.022-22.484H178.118c-0.659,0-1.294-0.023-1.971-0.023c-0.438,0-0.877,0.023-1.315,0.023H88.981
		c-12.72,0-23.022,9.768-23.022,22.484s10.302,22.216,23.022,22.216h102.097c32.243,2.347,66.017,14.821,74.913,51.56H88.981
		c-12.72,0-23.022,10.309-23.022,23.031c0,12.717,10.302,23.031,23.022,23.031h174.716c-10.87,29.034-40.728,46.742-82.225,46.742
		h-45.788h-0.133h-26.699c-12.401,0-22.455,10.054-22.455,22.455c0,12.404,10.054,22.458,22.455,22.458h26.382
		c0.109,0.012,0.207,0.065,0.316,0.065h41.665c45.268,1.72,65.402,21.35,76.946,75.055c9.032,39.892,15.682,65.875,20.912,81.438
		c3.919,14.398,11.674,36.091,25.127,49.048c5.261,5.059,12.046,7.577,18.808,7.577c7.117,0,14.233-2.784,19.559-8.322
		c9.76-10.144,9.937-25.842,0.993-36.334c-0.041-0.124-0.023-0.26-0.088-0.384c-8.258-15.32-18.247-56.412-30.435-108.533
		c-9.688-42.381-27.787-68.778-55.213-80.499c34.437-13.22,58.127-38.506,67.412-70.772h36.966
		c12.721,0,23.022-10.314,23.022-23.031S370.925,96.283,358.204,96.283z"
                          />
                        </g>
                      </svg>
                    </span>
                    <Form.Control
                      className="email-input ps-4"
                      name="rate_per_assignment"
                      type="number"
                      value={payment ? payment.rate_per_assignment : ''}
                      onChange={handleChange}
                      placeholder="Rate Per Assignment"
                    />
                  </div>
                  <span className="text-danger">{err?.rate_per_assignment}</span>
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Label>
                    Discount Percentage <span>(%)</span>
                  </Form.Label>

                  <Form.Control
                    className="email-input"
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={payment?.discount ? payment?.discount : ''}
                    onChange={handleChange}
                    placeholder="Discount Percentage"
                  />
                  <span className="text-danger">{err?.discount}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Label>Max word per assignment</Form.Label>
                  <Form.Control
                    className="email-input"
                    name="word_per_assignment"
                    type="number"
                    min="0"
                    max="100"
                    value={payment?.word_per_assignment ? payment?.word_per_assignment : ''}
                    onChange={handleChange}
                    placeholder="Max Word Per Assignment"
                  />
                  <span className="text-danger">{err?.word_per_assignment}</span>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Label>Hourly Rate (IT CODING)</Form.Label>
                  <Form.Control
                    className="email-input"
                    name="hourly_rate_it_coding"
                    type="number"
                    min="0"
                    max="100"
                    value={payment?.hourly_rate_it_coding ? payment?.hourly_rate_it_coding : ''}
                    onChange={handleChange}
                    placeholder="Hourly Rate"
                  />
                  <span className="text-danger">{err?.hourly_rate_it_coding}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Label>Actual Word Present</Form.Label>
                  <Form.Control
                    className="email-input"
                    name="actual_word_present"
                    type="number"
                    min="0"
                    max="100"
                    value={payment?.actual_word_present ? payment?.actual_word_present : ''}
                    onChange={handleChange}
                    placeholder="Actual Word Present"
                  />
                  <span className="text-danger">{err?.actual_word_present}</span>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Label>Word Conversion Rate</Form.Label>
                  <Form.Control
                    className="email-input"
                    name="word_conversion_rate"
                    type="number"
                    min="0"
                    max="100"
                    value={payment?.word_conversion_rate ? payment?.word_conversion_rate : ''}
                    onChange={handleChange}
                    placeholder="Word Conversion Rate"
                  />
                  <span className="text-danger">{err?.word_conversion_rate}</span>
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <div className="d-flex justify-content-center">
            <Button
              className="d-flex  button-custom button-subscription my-3"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </Card>
      </div>
    </>
  )
}

export default PaymentSettings
