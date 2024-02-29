import React, { useState } from 'react'
import { userSingleIdAsync } from '../../../store/features/userDataslice'
import { editSubAdminAsync } from 'src/store/features/EditsubadminSlice'
// react-bootstrap components
import { Card, Form, Container, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import BackButton from 'src/Views/widgets/BackButton'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from 'src/Views/Loader/Loader'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PersonalInfo = () => {
  const [profile, setProfile] = useState()
  const [name, setName] = useState('')
  const [last_name, setLastName] = useState('')
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [profilePath, setProfilePath] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [userData, setUserData] = useState(false)
  const [imgageShow, setImgageShow] = useState('')
  const { singleId } = useSelector((state) => state.userSingleId)
  // const { editSubAdminloading } = useSelector((state) => state.editSubAdminProfile)
  const [tempImage, setTempImage] = useState('')

  useEffect(() => {
    setProfile(singleId?.data)
  }, [singleId])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userSingleIdAsync())
  }, [])

  useEffect(() => {
    if (singleId) {
      setName(singleId?.data?.name)
      setLastName(singleId?.data?.last_name)
      setContact(singleId?.data?.contact)
      setGender(singleId?.data?.gender)
      setAddress(singleId?.data?.address)
      setProfilePath(singleId?.data?.profile)
      setSelectedFile()
    }
  }, [singleId])

  const submitProfile = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('lastname', last_name)
    formData.append('contact', contact)
    formData.append('gender', gender)
    formData.append('profile_path', tempImage)
    formData.append('address', address)
    dispatch(editSubAdminAsync(formData))

    setProfilePath(formData)
  }
  useEffect(() => {
    if (userData) {
      toast.success('succefully updated')
    }
  }, [userData])

  return (
    <>
      <BackButton />
      <div>
        <Form onSubmit={submitProfile}>
          <Card className="border-0 p-4 mt-3">
            <h4 className="mb-4">Personal Details </h4>
            <Container fluid>
              <Row>
                <Col md="6">
                  <div className="d-flex  p-4 align-items-center">
                    <div className="avatar-upload mb-3">
                      <div className="avatar-edit">
                        <input
                          type="file"
                          id="imageUpload"
                          accept=".png, .jpg, .jpeg"
                          onChange={(data) => {
                            setTempImage(data?.target?.files[0])
                            setImgageShow(URL.createObjectURL(data?.target?.files[0]))
                          }}
                        />
                        <label
                          htmlFor="imageUpload"
                          className="d-flex justify-content-center align-items-center"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </label>
                      </div>

                      <div className="avatar-preview">
                        <div id="imagePreview">
                          {imgageShow || profilePath ? (
                            ''
                          ) : (
                            <span className="position-absolute image-text-bg">
                              Image size should be 150*200
                            </span>
                          )}
                          <img
                            src={
                              imgageShow
                                ? imgageShow
                                : `${process.env.REACT_APP_API_URL}/public/storage/${profilePath}`
                            }
                            alt="react img"
                          />
                        </div>
                      </div>
                    </div>
                    <h6 className="w-75 ms-4 up-pic-mandatory">
                      Upload Picture <span> (Non mandatory)</span>{' '}
                    </h6>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1"> Name</label>
                      <Form.Control
                        required
                        className="email-input  bg-none "
                        placeholder="Username"
                        autoComplete="username"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                </Col>

                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1"> Email*</label>
                      <Form.Control
                        disabled
                        required
                        className="email-input  bg-none "
                        placeholder="Robertmill@guoi.innk"
                        autoComplete="username"
                        value={profile?.email}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1"> Contact Number*</label>
                      <Form.Control
                        required
                        type="tel"
                        className="email-input  bg-none "
                        placeholder="Contact"
                        autoComplete="username"
                        value={contact}
                        onChange={(e) => {
                          setContact(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1"> Gender</label>
                      <Form.Select
                        aria-label="Default select example"
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value)
                        }}
                      >
                        {' '}
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1"> Address</label>
                      <textarea
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value)
                        }}
                        className="form-control email-input"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Card>
          <div className="profile-buttons my-5">
            <button type="submit" className="button-custom me-4">
              Update
            </button>
          </div>
        </Form>
        {/* {editSubAdminloading === true ? (
          <div className="d-flex justify-content-center zIndex load-custom">
            <Loader />
          </div>
        ) : (
          ''
        )} */}
      </div>
    </>
  )
}

export default PersonalInfo
