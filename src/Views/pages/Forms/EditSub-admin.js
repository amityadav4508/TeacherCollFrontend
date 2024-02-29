import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { manageSingleIDApiAsync } from 'src/store/features/ManageAdminSlice'
import BackButton from 'src/Views/widgets/BackButton'
import { editAdminAsync, postAdminAsync } from '../../../store/features/PostAdminSlice'

const EditSubadmin = () => {
  let { id } = useParams()
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [userData, setUserData] = useState(false)
  const [err, setErr] = useState('')

  const [addAdmin, setAddAdmin] = useState({
    id: id,
    name: '',
    email: '',
    contact: '',
    address: '',
  })
  const { postAdmin } = useSelector((state) => state.postadminData)
  const { singleID } = useSelector((state) => state.Singlesubadmin)
  const { editAdmin } = useSelector((state) => state.postadminData)

  useEffect(() => {
    setAddAdmin(singleID?.data)
  }, [singleID])

  useEffect(() => {
    dispatch(manageSingleIDApiAsync(id))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name == 'contact') {
      const regex = /^\d{0,14}$/
      if (value == '' || regex.test(value)) {
        setAddAdmin({ ...addAdmin, [name]: value })
      }
    } else {
      setAddAdmin({ ...addAdmin, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErr(validate(addAdmin))
    setUserData(true)
  }

  const validate = (val) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const phoneRegex = /^\d{7,14}$/
    const errors = {}
    if (!val.name) {
      errors.name = 'Name is Required'
    }
    if (!val.email) {
      errors.email = 'Email is Required'
    } else if (!regex.test(val.email)) {
      errors.email = 'Please enter a valid Email '
    }

    if (!val.contact) {
      errors.contact = 'Contact is Required'
    } else if (!phoneRegex.test(val.contact)) {
      errors.contact = 'Please enter a valid Contact'
    }
    if (!val.address) {
      errors.address = 'Address is Required'
    }
    return errors
  }

  useEffect(() => {
    if (Object.keys(err).length === 0 && userData) dispatch(editAdminAsync(addAdmin))
  }, [err, userData])


  useEffect(() => {
    if (editAdmin?.status == 200) {
      toast.success('Successfully Added')
    }
  }, [editAdmin])

  return (
    <>
      <BackButton />
      <div className="edit-subs-card mt-3">
        <h5 className="d-flex d-flex my-2">ADD SUB-ADMIN</h5>
        <div className=" d-flex justify-content-center pt-4">
          <div className="w-100">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      className="email-input"
                      name="name"
                      maxLength={15}
                      placeholder="Enter Name"
                      type="text"
                      value={addAdmin?.name}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{err?.name}</span>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="email-input"
                      name="email"
                      placeholder="Enter email"
                      type="email"
                      value={addAdmin?.email}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{err?.email}</span>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      className="email-input"
                      name="contact"
                      placeholder="Enter contact"
                      type="text"
                      value={addAdmin?.contact}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{err?.contact}</span>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="email-input"
                      name="address"
                      type="text"
                      placeholder="Enter Address"
                      value={addAdmin?.address}
                      onChange={handleChange}
                    />
                    <span className="text-danger">{err?.address}</span>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                className="d-flex  button-custom button-subscription my-3"
                variant="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditSubadmin
