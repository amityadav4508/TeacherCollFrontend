import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Card, Form, Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { billingAsync, getBillingAsync } from 'src/store/features/AuthSlice'
import BackButton from 'src/Views/widgets/BackButton'

const Billinginfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [err, setErr] = useState('')

  const [billingData, setBillingData] = useState({
    account_holder_name: null,
    bank_name: null,
    account_number: null,
    ifsc_code: null,
    firm_name: null,
    gst_number: null,
    pan_card: null,
  })
  const { billing } = useSelector((state) => state.auth)
  const { status } = useSelector((state) => state.auth)

  useEffect(() => {
    if (status == 401) {
      toast.error('Un-authroised access')
      localStorage.removeItem('teacherAuth')
      localStorage.removeItem('checkType')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [status])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name == 'account_number') {
      const regex = /^\d{0,18}$/
      if (value == '' || regex.test(value)) {
        setBillingData({ ...billingData, [name]: value })
      }
    } else if (name == 'gst_number' || name == 'ifsc_code') {
      setBillingData({ ...billingData, [name]: value.toUpperCase() })
    } else {
      setBillingData({ ...billingData, [name]: value })
    }
  }

  const handleSubmit = async () => {
    await setErr(validate())
    if (
      billingData.bank_name &&
      billingData.account_holder_name &&
      billingData.account_number &&
      // billingData.firm_name &&
      // billingData.gst_number &&
      billingData.ifsc_code &&
      billingData.pan_card
    ) {
      setShow(true)
    }
  }

  // useEffect(() => {
  //   if (state && Object.keys(err).length === 0) {
  //     setShow(true)
  //   }
  // }, [state, err])

  const validate = () => {
    const accRegex = /^\d{9,18}$/
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    const errors = {}
    if (!billingData.account_holder_name) {
      errors.account_holder_name = 'Name Is Required'
    }
    if (!billingData.bank_name) {
      errors.bank_name = 'Branch Name Is Required'
    }
    if (!billingData.account_number) {
      errors.account_number = 'Account Number Is Required'
    } else if (!accRegex.test(billingData.account_number)) {
      errors.account_number = 'Please Enter A Valid Account Number'
    }
    if (!billingData.ifsc_code) {
      errors.ifsc_code = 'IFSC Code Is Required'
    } else if (!ifscRegex.test(billingData.ifsc_code)) {
      errors.ifsc_code = 'Enter A Valid IFSC Code'
    }
    // if (!billingData.firm_name) {
    //   errors.firm_name = 'Firm Name Is Required'
    // }

    // if (!billingData.gst_number) {
    //   errors.gst_number = 'GST Number Is Required'
    // } else 
    if (billingData.gst_number && !gstRegex.test(billingData.gst_number)) {
      errors.gst_number = 'Please Enter A Valid GST Number'
    }
    
    if (!billingData.pan_card) {
        errors.pan_card = 'Pan Card Is Required'
      }
    return errors
  }

  const saveBankDetail = async () => {
    if (Object.keys(err).length == 0) {
      await dispatch(billingAsync(billingData))
      dispatch(getBillingAsync())
    }
    setShow(false)
  }

  useEffect(() => {
    dispatch(getBillingAsync())
  }, [])

  useEffect(() => {
    if (billing) {
      setBillingData({
        account_holder_name: billing?.data?.account_holder_name,
        bank_name: billing?.data?.bank_name,
        account_number: billing?.data?.account_number,
        ifsc_code: billing?.data?.ifsc_code,
        firm_name: billing?.data?.firm_name,
        gst_number: billing?.data?.gst_number,
        pan_card:billing?.data?.pan_card
      })
    }
  }, [billing])

  // useEffect(() => {
  //   if (Object.keys(err).length == 0 && submit) {

  //   }
  // }, [submit])

  console.log(billingData, 'billingDatabillingData', billing)

  return (
    <>
      <BackButton />

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <div>
              {!billing?.data ? (
                <h5 className="text-center">Are you sure you want to add Bank details?</h5>
              ) : (
                <h5 className="text-center">Are you sure you want to update Bank details?</h5>
              )}
            </div>
            <div></div>
          </div>
        </Modal.Body>
        <div className="d-flex justify-content-center pb-4">
          <Button className="button-custom mx-3" onClick={saveBankDetail}>
            Yes
          </Button>
          <Button className="button-custom cancel-button" onClick={() => setShow(false)}>
            No
          </Button>
        </div>
      </Modal>
      <Card className="border-0 p-4 mt-3">
        <h5>BILLING INFO</h5>
        <Container fluid>
          <Row>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">Account Holder Name</label>
                  <Form.Control
                    required
                    name="account_holder_name"
                    value={billingData?.account_holder_name}
                    className="email-input  bg-none "
                    onChange={handleChange}
                  />
                  <span className="text-danger">{err.account_holder_name}</span>
                </div>
              </div>
            </Col>

            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">Branch Name*</label>
                  <Form.Control
                    required
                    name="bank_name"
                    value={billingData?.bank_name}
                    className="email-input  bg-none "
                    // placeholder="ICICI Bank"
                    autoComplete="lastname"
                    onChange={handleChange}
                  />
                  <span className="text-danger">{err.bank_name}</span>
                </div>
              </div>
            </Col>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1"> Account Number*</label>
                  <Form.Control
                    required
                    name="account_number"
                    value={billingData?.account_number}
                    className="email-input  bg-none "
                    // placeholder="235345654654675"
                    onChange={handleChange}
                  />
                  <span className="text-danger">{err.account_number}</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1"> IFSC code*</label>
                  <Form.Control
                    required
                    name="ifsc_code"
                    value={billingData?.ifsc_code}
                    className="email-input  bg-none "
                    // placeholder="12ESDDF"
                    onChange={handleChange}
                  />
                  <span className="text-danger">{err.ifsc_code}</span>
                </div>
              </div>
            </Col>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">Firm Name</label>
                  <Form.Control
                    required
                    name="firm_name"
                    value={billingData?.firm_name}
                    className="email-input  bg-none "
                    // placeholder="Firm Name"
                    onChange={handleChange}
                  />
                  <span className="text-danger">{err.firm_name}</span>
                </div>
              </div>
            </Col>
            <Col md="6" lg="4">
              <div className=" justify-content-between tabs-inner-content mb-3">
                <div className="me-2 w-100">
                  <label className="fs-6 fw-normal my-1">GST Number</label>
                  <Form.Control
                    required
                    name="gst_number"
                    value={billingData?.gst_number}
                    className="email-input  bg-none "
                    // placeholder="23DD456FFSS67"
                    onChange={handleChange}
                  />
                  <span className="text-danger">{err.gst_number}</span>
                </div>
              </div>
            </Col>
          </Row>
          <Col md="6" lg="4">
            <div className=" justify-content-between tabs-inner-content mb-3">
              <div className="me-2 w-100">
                <label className="fs-6 fw-normal my-1">Pan Card*</label>
                <Form.Control
                  required
                  name="pan_card"
                  value={billingData?.pan_card}
                  className="email-input  bg-none "
                  // placeholder="23DD456FFSS67"
                  onChange={handleChange}
                />
                <span className="text-danger">{err.pan_card}</span>
              </div>
            </div>
          </Col>
        </Container>
      </Card>
      <div className="profile-buttons my-5">
        {!billing?.data ? (
          <button type="submit" className="button-custom me-4" onClick={handleSubmit}>
            Add Bank Details
          </button>
        ) : (
          <button type="submit" className="button-custom me-4" onClick={handleSubmit}>
            Update Bank Details
          </button>
        )}
      </div>
    </>
  )
}

export default Billinginfo
