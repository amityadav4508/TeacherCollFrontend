import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";

import { addBiilingInfoasync, getSellerBillingInfoasync } from 'src/store/features/SellAndEarnSlice'

const SellerBillingInfo = () => {
  const dispatch = useDispatch()
const navigate=useNavigate()
  const {getSellerBilling, verifyEmailMsg } = useSelector((state) => state.sellAndEarn)
  const [formErr, setFormErr] = useState('')
  const [billingData, setBillingData] = useState({
    account_holder_name: null,
    bank_name: null,
    account_number: null,
    ifsc_code: null,
    firm_name: null,
    gst_number: null,
  })

  useEffect(()=>{
dispatch(getSellerBillingInfoasync())
  },[])

  useEffect(() => {
    if (getSellerBilling) {
      setBillingData({
        account_holder_name: getSellerBilling?.data?.account_holder_name,
        bank_name: getSellerBilling?.data?.bank_name,
        account_number: getSellerBilling?.data?.account_number,
        ifsc_code: getSellerBilling?.data?.ifsc_code,
        firm_name: getSellerBilling?.data?.firm_name,
        gst_number: getSellerBilling?.data?.gst_number,
      })
    }
  }, [getSellerBilling])

  const handleUpdateDetails = (e) => {
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

  const handleUpdate = async () => {
    setFormErr(validate(billingData))
    if (Object.keys(validate(billingData)).length == 0) {
      await dispatch(addBiilingInfoasync(billingData))
      dispatch(getSellerBillingInfoasync())
    }
  }

  const validate = (val) => {
    const accRegex = /^\d{9,18}$/
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    const errors = {}
    if (!val.account_holder_name) {
      errors.account_holder_name = 'Name Is Required'
    }
    if (!val.bank_name) {
      errors.bank_name = 'Branch Name Is Required'
    }
    if (!val.account_number) {
      errors.account_number = 'Account Number Is Required'
    } else if (!accRegex.test(val.account_number)) {
      errors.account_number = 'Please Enter A Valid Account Number'
    }
    if (!val.ifsc_code) {
      errors.ifsc_code = 'IFSC Code Is Required'
    } else if (!ifscRegex.test(val.ifsc_code)) {
      errors.ifsc_code = 'Enter A Valid IFSC Code'
    }
    // if (!val.firm_name) {
    //   errors.firm_name = 'Firm Name Is Required'
    // }
    // if (!val.gst_number) {
    //   errors.gst_number = 'GST Number Is Required'
    // } else
     if (!gstRegex.test(val.gst_number)) {
      errors.gst_number = 'Please Enter A Valid GST Number'
    }
    return errors
  }

  return (
    <div>
            <div className="d-flex justify-content-end mb-4">
        <div className="share" onClick={() => navigate('/seller/dashboard')}>
          <span className="">Back</span>
          <a>
            <FontAwesomeIcon className="fa-xs me-2 " icon={faArrowLeft} />
          </a>
        </div>
      </div>
      <Card className="border-0 shadow-lg  p-4">
        <Card.Title className="text-center mb-4">Billing Info</Card.Title>
        <Row>
          <Col>
            <Form.Label>Account Holder Name</Form.Label>
            <Form.Control
              required
              name="account_holder_name"
              value={billingData?.account_holder_name}
              className="email-input  bg-none "
              onChange={handleUpdateDetails}
            />
            <p className="text-danger">{formErr.account_holder_name}</p>
          </Col>
          <Col>
            <Form.Label>Branch Name*</Form.Label>
            <Form.Control
              required
              name="bank_name"
              value={billingData?.bank_name}
              className="email-input  bg-none "
              onChange={handleUpdateDetails}
            />
            <p className="text-danger">{formErr.bank_name}</p>
          </Col>
          <Col>
            <Form.Label>Account Number*</Form.Label>
            <Form.Control
              required
              name="account_number"
              value={billingData?.account_number}
              className="email-input  bg-none "
              onChange={handleUpdateDetails}
            />
            <p className="text-danger">{formErr.account_number}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>IFSC code*</Form.Label>
            <Form.Control
              required
              name="ifsc_code"
              value={billingData?.ifsc_code}
              className="email-input  bg-none "
              onChange={handleUpdateDetails}
            />
            <p className="text-danger">{formErr.ifsc_code}</p>
          </Col>
          <Col>
            <Form.Label>Firm Name</Form.Label>
            <Form.Control
              required
              name="firm_name"
              value={billingData?.firm_name}
              className="email-input  bg-none "
              onChange={handleUpdateDetails}
            />
            <p className="text-danger">{formErr.firm_name}</p>
          </Col>
          <Col>
            <Form.Label>GST Number</Form.Label>
            <Form.Control
              required
              name="gst_number"
              value={billingData?.gst_number}
              className="email-input  bg-none "
              onChange={handleUpdateDetails}
            />
            <p className="text-danger">{formErr.gst_number}</p>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mb-4 mt-4">
          <Button className="button-custom" onClick={handleUpdate}>
            {getSellerBilling?.data?.id ? 'Update' : 'Add'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SellerBillingInfo
