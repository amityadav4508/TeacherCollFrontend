import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrency,
  getPaymentAsync,
  manageCurrency,
  manageEditPaymentAsync,
} from 'src/store/features/PaymentSlice'
import BackButton from 'src/Views/widgets/BackButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faIndianRupeeSign,
  faDollarSign,
  faEuroSign,
  faSterlingSign,
} from '@fortawesome/free-solid-svg-icons'

const CurrencySetting = () => {
  const dispatch = useDispatch()
  const [err, setErr] = useState('')
  const { currencydata } = useSelector((state) => state.paymentSlice)
  const [indCurrency, setIndCurrency] = useState({
    currency: 'INR',
    exchange_rate: '1',
  })
  const [usdCurrency, setUsdCurrency] = useState({
    currency: 'USD',
    exchange_rate: '',
  })
  const [eurCurrency, setEurCurrency] = useState({
    currency: 'EUR',
    exchange_rate: '',
  })
  const [gbpCurrency, setGbpCurrency] = useState({
    currency: 'GBP',
    exchange_rate: '',
  })

  useEffect(() => {
    if (currencydata) {
      currencydata?.data?.map((ele) => {
        // if (ele.currency == 'USD') {
        //   setIndCurrency({ currency: 'IND', exchange_rate:  })
        // }
        if (ele.currency == 'USD') {
          setUsdCurrency({ currency: usdCurrency.currency, exchange_rate: ele?.exchange_rate })
        }
        if (ele.currency == 'EUR') {
          setEurCurrency({ currency: eurCurrency.currency, exchange_rate: ele?.exchange_rate })
        }
        if (ele.currency == 'GBP') {
          setGbpCurrency({ currency: gbpCurrency.currency, exchange_rate: ele?.exchange_rate })
        }
      })
    }
  }, [currencydata])

  useEffect(() => {
    dispatch(getCurrency())
  }, [])

  const handleSubmit = () => {
    setErr(validation())
    if (Object.keys(validation()).length === 0) {
      dispatch(manageCurrency([indCurrency, usdCurrency, eurCurrency, gbpCurrency]))
    }
  }

  function validation() {
    let err = {}

    if (!usdCurrency.exchange_rate) {
      err.USD = 'Dollar is required'
    }
    if (!eurCurrency.exchange_rate) {
      err.EUR = 'Euro is required'
    }
    if (!gbpCurrency.exchange_rate) {
      err.GBP = 'Pound is required'
    }

    return err
  }

  return (
    <>
      <BackButton />

      <div className=" edit-subs-card d-flex justify-content-center pt-4 mt-3">
        <Card className="w-100  border-0 ">
          <h5 className="d-flex d-flex mt-2 mb-3 ms-2">CURRENCY SETTINGS</h5>
          <Container fluid className=" mt-4">
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <span
                    className="position-absolute ps-2 py-1 text-muted"
                    style={{ marginTop: '4px' }}
                  >
                    <FontAwesomeIcon className="fa-sm" icon={faIndianRupeeSign} />
                  </span>
                  <Form.Control
                    className="email-input ps-4"
                    name="teacher_cool_weightage"
                    value="INR"
                    disabled
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 position-relative">
                  <Form.Control
                    className="email-input"
                    type="number"
                    name="INR"
                    disabled
                    value={indCurrency.exchange_rate}
                    onChange={(e) => {
                      setIndCurrency({ currency: 'USD', exchange_rate: '1' })
                    }}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3">
                  <span
                    className="position-absolute ps-2 py-1 text-muted"
                    style={{ marginTop: '4px' }}
                  >
                    <FontAwesomeIcon className="fa-sm" icon={faDollarSign} />
                  </span>
                  <Form.Control
                    disabled
                    className="email-input ps-4"
                    name="teacher_weightage"
                    value="USD"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Control
                    className="email-input"
                    name="USD"
                    type="number"
                    min="0"
                    max="100"
                    value={usdCurrency.exchange_rate}
                    onChange={(e) => {
                      setErr('')
                      setUsdCurrency({ currency: 'USD', exchange_rate: e.target.value })
                    }}
                  />
                  <p className="text-danger">{err.USD}</p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <div className="position-relative">
                    <span
                      className="position-absolute ps-2 py-1 text-muted"
                      style={{ marginTop: '4px' }}
                    >
                      <FontAwesomeIcon className="fa-sm" icon={faEuroSign} />
                    </span>
                    <Form.Control
                      className="email-input ps-4"
                      name="rate_per_assignment"
                      disabled
                      value="EUR"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Control
                    className="email-input "
                    name="EUR"
                    type="number"
                    min="0"
                    max="100"
                    value={eurCurrency.exchange_rate}
                    onChange={(e) => {
                      setErr('')

                      setEurCurrency({ currency: 'EUR', exchange_rate: e.target.value })
                    }}
                  />
                  <span className="text-danger">{err.EUR}</span>
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <span
                    className="position-absolute ps-2 py-1 text-muted"
                    style={{ marginTop: '4px' }}
                  >
                    <FontAwesomeIcon className="fa-sm" icon={faSterlingSign} />
                  </span>
                  <Form.Control className="email-input ps-4" name="discount" disabled value="GBP" />
                </Form.Group>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <Form.Group className="mb-3 ">
                  <Form.Control
                    className="email-input"
                    name="GBP"
                    type="number"
                    min="0"
                    max="100"
                    value={gbpCurrency.exchange_rate}
                    onChange={(e) => {
                      setErr('')

                      setGbpCurrency({ currency: 'GBP', exchange_rate: e.target.value })
                    }}
                  />
                  <span className="text-danger">{err.GBP}</span>
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

export default CurrencySetting
