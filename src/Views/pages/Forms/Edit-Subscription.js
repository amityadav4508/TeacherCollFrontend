import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import {
  editSubscriptionAsync,
  singleSubscriptionAsync,
} from '../../../store/features/SubscriptionSlice'
import { toast } from 'react-toastify'
import { Col, Container, Row } from 'react-bootstrap'
import BackButton from 'src/Views/widgets/BackButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'

function EditSubscription() {
  const singleID = useSelector((state) => state.subscriptionIdAdmin.subscriptionId)
  const wordCount = useSelector((state) => state.subscriptionIdAdmin.subscriptionId.setting)

  const [userData, setUserData] = useState(false)
  const [subscriptionCategoryName, setSubscriptionCategoryName] = useState('')
  const [err, setErr] = useState('')

  const [subData, setSubData] = useState('')
  const [editData, setEditData] = useState({
    id: '',
    name: '',
    duration: '',
    totaldays: '',
    totalwordcount: '',
    totalfiledownload: '',
    assignment_request: '',
    file_download: '',
    price: '',
    is_active: '',
  })

  useEffect(() => {
    // setSubscriptionCategory()
    if (singleID?.subscriptions_category) {
      singleID?.subscriptions_category?.forEach((ele, index) => {
        if (singleID?.data?.subscription_id == ele.id) {
          setSubscriptionCategoryName(ele.name)
        }
      })
    }
  }, [singleID])

  let { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(singleSubscriptionAsync(id))
  }, [id])

  useEffect(() => {
    setEditData({
      id: id,
      name: singleID?.data?.name ? singleID?.data?.name : '',
      duration: singleID?.data?.duration ? singleID?.data?.duration : '',
      assignment_request: singleID?.data?.assignment_request
        ? singleID?.data?.assignment_request
        : '',
      price: singleID?.data?.price ? singleID?.data?.price : '',
      file_download: singleID?.data?.file_download ? singleID?.data?.file_download : '',
      is_active: singleID?.data?.is_active ? singleID?.data?.is_active : 0,
      totaldays: singleID?.data?.duration_days ? singleID?.data?.duration_days : '',
      totalwordcount:
        singleID?.data?.assignment_request && singleID?.data?.assignment_request * wordCount?.word_per_assignment,
      totalfiledownload: singleID?.data?.file_download && singleID?.data?.file_download * wordCount?.word_per_assignment,
      // totalfiledownload:editData.totalfiledownload ? editData.totalfiledownload : "",
    })
  }, [singleID])

  function validation(values) {
    const errors = {}
    if (!values.name) {
      errors.name = 'Name is Required.'
    }

    if (!values.duration) {
      errors.duration = 'Duration is Required'
    }
    if (values?.duration <= 0) {
      errors.duration = 'Duration has Invalid value!'
    }

    if (!values.assignment_request) {
      errors.assignment_request = 'Assignment Request is Required'
    }
    if (values?.assignment_request <= 0) {
      errors.assignment_request = 'Assignment Request has Invalid value!'
    }

    if (!values.file_download) {
      errors.file_download = 'File is Required'
    }
    if (values?.file_download <= 0) {
      errors.file_download = 'File Download has Invalid value!'
    }

    if (values?.price <= 0) {
      errors.price = 'Price has Invalid value!'
    }

    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }

  const handleCalculations = (e) => {
    const { name, value } = e.target
    if (name == 'duration') {
      let totalDays = value * 30
      setEditData({ ...editData, [name]: value, ['totaldays']: totalDays })
    } else if (name == 'assignment_request') {
      let wordcount = value * wordCount?.word_per_assignment
      setEditData({ ...editData, [name]: value, ['totalwordcount']: wordcount })
    } else if (name == 'file_download') {
      let filedownloadcount = value * wordCount?.word_per_assignment
      setEditData({ ...editData, [name]: value, ['totalfiledownload']: filedownloadcount })
    }

  }

  const AdminSingleID = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setErr(validation(editData))
    setSubData(editData)
  }

  useEffect(() => {
    if (Object.keys(err).length === 0 && subData) {
      dispatch(editSubscriptionAsync(editData))
      setUserData(true)
    }
  }, [subData])

  useEffect(() => {
    if (userData) {
      toast.success('Successfully updated')
    }
  }, [userData])

  const Months = [
    { value: '1', month: '1' },
    { value: '2', month: '2 ' },
    { value: '3', month: '3 ' },
    { value: '4', month: '4 ' },
    { value: '5', month: '5 ' },
    { value: '6', month: '6 ' },
    { value: '7', month: '7 ' },
    { value: '8', month: '8 ' },
    { value: '9', month: '9 ' },
    { value: '10', month: '10 ' },
    { value: '11', month: '11 ' },
    { value: '12', month: '12 ' },
  ]


  return (
    <>
      <BackButton />

      <div className="edit-subs-card w-100 mt-3">
        <h3 className="d-flex d-flex mb-4">Edit Subscription</h3>
        <Form>
          <Container fluid>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="d-none">Id</Form.Label>
              <Form.Control
                name="id"
                className="d-none"
                required
                type="number"
                value={editData?.id}
                onChange={handleChange}
                placeholder="Enter Id"
              />
            </Form.Group>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    className="email-input"
                    required
                    type="text"
                    value={editData?.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <span className="fs-6 text-danger">{err?.name}</span>
              </Col>
              <Col xs={12} md={6}>
                <Form.Label>Select Subscription</Form.Label>

                <Form.Group>
                  <Form.Control
                    className="email-input"
                    disabled
                    type="text"
                    value={subscriptionCategoryName}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Duration (months)</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="duration"
                    value={editData?.duration}
                    onChange={handleCalculations}
                    // onClick={handleErr}
                  >
                    <option className="d-none"></option>

                    {Months?.map((ele, index) => (
                      <option key={index} value={ele.value}>
                        {ele.month}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <span className="fs-6 text-danger">{err.duration}</span>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Duration (Days)</Form.Label>
                  <Form.Control
                    name="duration"
                    className="email-input"
                    required
                    disabled
                    type="number"
                    min="0"
                    value={editData?.totaldays}
                    // onChange={handleChange}
                    placeholder="Enter Duration"
                  />
                </Form.Group>
                <span className="fs-6 text-danger">{err.duration}</span>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Assignment Request</Form.Label>
                  <Form.Control
                    name="assignment_request"
                    className="email-input"
                    required
                    type="number"
                    min="0"
                    value={editData?.assignment_request}
                    onChange={handleCalculations}
                    placeholder="Enter Request"
                  />
                </Form.Group>
                <span className="fs-6 text-danger">{err.assignment_request}</span>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Word Count</Form.Label>
                  <Form.Control
                    name="assignment_request"
                    className="email-input"
                    disabled
                    type="number"
                    min="0"
                    value={editData?.totalwordcount}
                    onChange={handleChange}
                    placeholder="Enter Request"
                  />
                </Form.Group>
                <span className="fs-6 text-danger">{err.assignment_request}</span>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>File Downloads</Form.Label>
                  <Form.Control
                    name="file_download"
                    className="email-input"
                    type="number"
                    min="0"
                    value={editData.file_download}
                    onChange={handleCalculations}
                    placeholder="Enter Download"
                  />
                </Form.Group>
                <span className="fs-6 text-danger">{err.file_download}</span>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>File word count</Form.Label>
                  <Form.Control
                    name="file_download"
                    className="email-input"
                    disabled
                    type="number"
                    min="0"
                    value={editData.totalfiledownload}
                    onChange={handleChange}
                    placeholder="Enter Download"
                  />
                </Form.Group>
                <span className="fs-6 text-danger">{err.file_download}</span>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Price</Form.Label>  
                  <div className='position-relative'>
                    <span className='position-absolute ' style={{top:"7px",left:"6px"}}>
                  <FontAwesomeIcon className='fa-sm'  icon={faIndianRupeeSign} />
                    </span>
                  <Form.Control
                  className='ps-3'
                    name="price"
                    type="number"
                    min="1"
                    value={editData?.price}
                    onChange={handleChange}
                    placeholder="Enter Price"
                    />
                    </div>
                </Form.Group>
                <span className="fs-6 text-danger">{err.price}</span>
              </Col>
            </Row>

            <Button
              className="d-flex  button-custom button-subscription"
              variant="primary"
              type="submit"
              onClick={AdminSingleID}
            >
              Update
            </Button>
          </Container>
        </Form>
      </div>
    </>
  )
}

export default EditSubscription
