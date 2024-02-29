import React, { useState } from 'react'
import { Card, Form, Container, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import BackButton from 'src/Views/widgets/BackButton'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  getSellerDetailsasync,
  sellerProfileUpdateAsync,
} from 'src/store/features/SellAndEarnSlice'
import { getList } from 'country-list-with-dial-code-and-flag'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'

const SellerProfile = () => {
  const [profile, setProfile] = useState()
  const [name, setName] = useState('')
  const [formErr, setFormErr] = useState({})
  const [contact, setContact] = useState('')
  const [gender, setGender] = useState('')
  const [country, setCountry] = useState('')
  const [profilePath, setProfilePath] = useState('')
  const [selectedFile, setSelectedFile] = useState('')
  const [imgageShow, setImgageShow] = useState('')
  const { getSellerDetails } = useSelector((state) => state.sellAndEarn)
  const [tempImage, setTempImage] = useState('')
  const [dialcode, setDialCode] = useState('')
  const [profileCurrency,setProfileCurrency]=useState('')
  const { subjectData } = useSelector((state) => state.subject)

  useEffect(() => {
    dispatch(getSubjectList())
  }, [])

  const data = getList()

  useEffect(() => {
    setProfile(getSellerDetails?.data?.user?.email)
  }, [getSellerDetails])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSellerDetailsasync())
  }, [])

  useEffect(() => {
    if (getSellerDetails) {
      setName(getSellerDetails?.data?.user?.name)
      setContact(getSellerDetails?.data?.user?.user_details?.contact)
      setGender(getSellerDetails?.data?.user?.user_details?.gender)
      setProfilePath(getSellerDetails?.data?.user?.profile_path)
      setCountry(getSellerDetails?.data?.user?.user_details?.country)
      setDialCode(getSellerDetails?.data?.user?.dial_code)
      setProfileCurrency(getSellerDetails?.data?.user?.user_details?.currency)
      setSelectedFile()
    }
  }, [getSellerDetails])

  const submitProfile = async (e) => {
    e.preventDefault()
    setFormErr(handleValidate())
    if (Object.keys(handleValidate()).length == 0) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('contact', contact)
      formData.append('gender', gender)
      formData.append('profile', tempImage)
      formData.append('country', country)
      formData.append('phone_code', dialcode)
      formData.append('currency', profileCurrency)

      await dispatch(sellerProfileUpdateAsync(formData))
      dispatch(getSellerDetailsasync())
    }
  }
  const handleValidate = () => {
    const phoneRegex = /^\d{7,14}$/
    const err = {}
    if (!name) {
      err.name = 'Name is Required'
    }
    if (!contact) {
      err.contact = 'Contact is Required'
    } else if (!phoneRegex.test(contact)) {
      err.contact = 'Invalid Contact Number'
    }
    if (!gender) {
      err.gender = 'Gender is Required'
    }

    if (!country) {
      err.country = 'Country is Required'
    }

    if (!profileCurrency) {
      err.currency = 'Currency is Required'
    }

    return err
  }

  const dialCode = (e) => {
    data?.map((ele) => {
      if (e.target.value == ele.name) {
        setDialCode(ele.dial_code)
      }
    })
  }

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
                      <p className="text-danger">{formErr.name}</p>
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
                        value={profile}
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">Country*</label>
                    <Form.Select
                      className="w-100"
                      aria-label="Default select example"
                      name="country"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value)
                        dialCode(e)
                      }}
                      // onClick={dialCode}
                      placeholder="Countries"
                    >
                      {' '}
                      <option className="text-muted" value="">
                        Countries
                      </option>
                      {data?.map((ele, index) => (
                        <option key={index}>{ele.name}</option>
                      ))}
                    </Form.Select>
                    <p className="text-danger">{formErr?.country}</p>
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
                      <p className="text-danger">{formErr.gender}</p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <label className="fs-6 fw-normal ">Contact Number*</label>
                    <div className="d-flex align-items-center">
                      <div className="me-2 w-50   phone-register-st">
                        <Form.Control
                          className=""
                          style={{ marginRight: '45px' }}
                          disabled
                          type="text"
                          placeholder="+91"
                          value={dialcode}
                        />
                      </div>
                      <div className="me-2 w-100">
                        <Form.Control
                          required
                          type="text"
                          value={contact}
                          className="email-input  bg-none addtext "
                          placeholder="9999999999"
                          name="phonenumber"
                          onChange={(e) => {
                            setContact(e.target.value)
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-secondary  " style={{ fontSize: '12px' }}>
                      {' '}
                      That number will be used for whatsapp communication..
                    </p>

                    <p className="text-danger">{formErr?.contact}</p>
                  </div>
                </Col>
                <Col>
              <div className="me-2 w-100">
                <label className="fs-6 fw-normal ">Currency*</label>
                <Form.Select
                  className="w-100"
                  aria-label="Default select example"
                  name="currency"
                  value={profileCurrency}
                  onChange={(e)=>setProfileCurrency(e.target.value)}
                  placeholder="Countries"
                >
                  {' '}
                  <option className="text-muted">Currency</option>
                  {subjectData?.data?.data?.currency?.map((ele, index) => (
                    <option key={index}>{ele.currencyCode}</option>
                  ))}
                </Form.Select>
                <p className="text-danger">{formErr?.currency}</p>
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
      </div>
    </>
  )
}

export default SellerProfile
