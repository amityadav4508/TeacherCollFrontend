  import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// react-bootstrap components
import { Card, Form, Container, Row, Col } from 'react-bootstrap'
import { adminProfileAsync } from '../../../store/features/userDataslice'
import BackButton from 'src/Views/widgets/BackButton'
import downloadIcn from '../../../assets/images/download-icn-wrap.svg'
import { CButton, CModal, CModalBody, CModalFooter } from '@coreui/react'
import { toast } from 'react-toastify'
import userframe from '../../../assets/images/user-frame.svg'

import { postTeacherRequestAsync } from 'src/store/features/TeacherRequestSlice'
function User() {
  let { id } = useParams()
  const dispatch = useDispatch()
  const { userProfile } = useSelector((state) => state?.userSingleId)
  const [resubmittedData, setResubmittedData] = useState('')
  const [subjectList, setSubjectList] = useState('')


  useEffect(() => {
    if (userProfile && userProfile?.data?.user) {
      setResubmittedData(JSON.parse(userProfile?.data?.user[0]?.resubmit_data))
      setSubjectList(userProfile?.data?.subjects)
    }
  }, [userProfile])

  const [profileValue, setProfileValue] = useState('')

  const [lastName, setLastName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [contact, setContact] = useState('')
  const [dialCode, setDialCode] = useState('')
  const [qualification, setQualification] = useState('')
  const [age, setAge] = useState('')
  const [income, setIncome] = useState('')
  const [expirence, setExpirence] = useState('')
  const [userType, setUserType] = useState('')
  const [city, setCity] = useState('')
  const [profile, setProfile] = useState('')
  const [document, setDocument] = useState('')
  const [idProff, setIdProff] = useState('')
  const [expirenceLetter, setExpirenceLetter] = useState('')
  const [country, setCountry] = useState('')
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('')
  const [hours, setHours] = useState('')
  const [preferred_currency, setPreferred_currency] = useState('')
  const [state, setState] = useState('')
  const [subscription, setSubscription] = useState('')
  const [teacherStatus, setTeacherStatus] = useState('')
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [rejectData, setRejectData] = useState('')
  const [idData, setIdData] = useState('')
  const [teacherReq, setTeacherReq] = useState({})
  const [userData, setUserData] = useState(false)

console.log(userProfile,'userProfile')
  useEffect(() => {
    if (userProfile && userProfile?.data?.user) {
      setFirstName(userProfile?.data?.user[0]?.name)
      setLastName(userProfile?.data?.user[0]?.last_name)
      setEmail(userProfile?.data?.user[0]?.email)
      setGender(userProfile?.data?.user[0]?.gender)
      setContact(userProfile?.data?.user[0]?.contact)
      setDialCode(userProfile?.data?.user[0]?.phone_code)
      setQualification(userProfile?.data?.user[0]?.qualification)
      setAge(userProfile?.data?.user[0]?.age)
      setIncome(userProfile?.data?.user[0]?.expected_income)
      setUserType(userProfile?.data?.user[0]?.user_type)
      setCity(userProfile?.data?.user[0]?.city)
      setCountry(userProfile?.data?.user[0]?.country)
      setState(userProfile?.data?.user[0]?.state)
      setSubscription(userProfile?.data?.user[0]?.subscription_name)
      setProfile(userProfile?.data?.user[0]?.profile_path)
      setDocument(userProfile?.data?.user[0]?.document_path)
      setIdProff(userProfile?.data?.user[0]?.id_proof)
      setExpirenceLetter(userProfile?.data?.user[0]?.experience_letter)
      setSubject(userProfile?.data?.user[0]?.subject_name)
      setHours(userProfile?.data?.user[0]?.working_hours)
      setCategory(userProfile?.data?.user[0]?.category)
      setTeacherStatus(userProfile?.data?.user[0]?.teacher_status)
      setExpirence(userProfile?.data?.user[0]?.experience)
      setPreferred_currency(userProfile?.data?.user[0]?.currency?userProfile?.data?.user[0]?.currency:userProfile?.data?.user[0]?.currency)
    }
  }, [userProfile])

  useEffect(() => {
    {
      userProfile?.data?.profile_status?.map((ele) => {
        if (ele.value == userProfile?.data?.user[0]?.teacher_status) {
          setProfileValue(ele?.name)
        }
      })
    }
  }, [userProfile])

  const IdProff = (e) => {
    var idName = e.target.files[0].name
    document.getElementById('id_name').innerText = idName
  }
  let documentdata = []
  if (userType == 1 || userType ==4) {
    documentdata['document'] = document?.split('/')[1]
    documentdata['idProof'] = idProff?.split('/')[1]
  }
  if (expirenceLetter) {
    documentdata['expirenceLetter'] = expirenceLetter?.split('/')[1]
  }

  const BtnStatus = (e) => {
    e.preventDefault()
    let data = {
      id: userProfile.data?.user[0]?.id ? userProfile.data?.user[0]?.id : rejectData,
      status: e?.target?.id,
    }
    setTeacherReq(data)
    setUserData(true)
  }

  const acceptData = (item, index) => {
    setVisible(!visible)
    setIdData(userProfile?.data[0]?.id)
  }
  const RejectData = (item, index) => {
    setModalVisible(!modalVisible)
    setRejectData(userProfile?.data[0]?.id)
  }

  useEffect(() => {
    dispatch(adminProfileAsync(id))
  }, [id])

  useEffect(() => {
    if (Object.keys(teacherReq).length != 0) {
const updateStatus=async()=>{

  await dispatch(postTeacherRequestAsync(teacherReq))
  dispatch(adminProfileAsync(id))
}
updateStatus()
    }
  }, [teacherReq])

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        toast.success('Status Updated Successfully')
      }, 500)

      setUserData(false)
    }
  }, [userData])



  return (
    <>
      <div>
        <>
          <CModal
            className="modal-outer"
            visible={visible}
            onClose={() => setVisible(false)}
            centered
          >
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn-close"
                data-coreui-dismiss="modal"
                aria-label="Close"
                onClick={() => setVisible(false)}
              ></button>
            </div>
            <CModalBody className="d-flex justify-content-center fw-bold fs-5">
              Are you sure you want to accept?
            </CModalBody>
            <CModalFooter className="d-flex justify-content-center border-0">
              <CButton
                id="2"
                className="button-custom"
                onClick={(e) => {
                  BtnStatus(e)
                  setVisible(false)
                  setIdData('')
                }}
              >
                Yes
              </CButton>
              <CButton
                className="button-custom cancel-button"
                color="primary"
                onClick={(e) => {
                  setVisible(false)
                }}
              >
                No
              </CButton>
            </CModalFooter>
          </CModal>

          {/* Reject Modal */}
          <CModal
            centered
            className="modal-outer"
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          >
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn-close"
                data-coreui-dismiss="modal"
                aria-label="Close"
                onClick={() => setModalVisible(false)}
              ></button>
            </div>
            <CModalBody className="d-flex justify-content-center fw-bold fs-5">
              Are you sure you want to reject?
            </CModalBody>
            <CModalFooter className="d-flex justify-content-center border-0">
              <CButton
                id="3"
                onClick={(e) => {
                  BtnStatus(e)
                  setModalVisible(false)
                  setRejectData('')
                }}
                className="d-flex justify-content-center button-custom"
              >
                Yes
              </CButton>
              <CButton
                className="button-custom cancel-button"
                color="primary"
                onClick={() => setModalVisible(false)}
              >
                No
              </CButton>
            </CModalFooter>
          </CModal>
        </>
        <BackButton />
        <Card className="border-0 card-personal-info pt-5 mt-3 ">
          <div className="d-flex justify-content-between">
            <h4 className="d-flex justify-content-start mb-4">Detail Info</h4>
            {userType == 1||userType==4? (
              <h6 className="fs-6 ">
                {' '}
                <strong className="dot"> </strong>
                <span className="mx-3 text-black">New Values</span>
              </h6>
            ) : (
              ''
            )}
          </div>
          <Container fluid>
            <Row>
              <Col md="6">
                <div className="avatar-upload mb-3">
                  <div className="avatar-preview ">
                    <div id="imagePreview">
                      <img
                        src={
                          profile
                            ? `${process.env.REACT_APP_API_URL}public/storage/${profile}`
                            : userframe
                        }
                        alt="react img" 
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      {' '}
                      First Name <span className="star-icn">*</span>
                    </label>
                    <Form.Control
                      required
                      className="email-input  bg-none "
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value)
                      }}
                      placeholder=""
                      name="email"
                      disabled
                    />
                    <span className="highlighted-text-wrap">{resubmittedData?.first_name}</span>
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      {' '}
                      Last Name <span className="star-icn">*</span>
                    </label>
                    <Form.Control
                      required
                      className="email-input  bg-none "
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value)
                      }}
                      placeholder=""
                      name="email"
                      disabled
                    />
                    <span className="highlighted-text-wrap">{resubmittedData?.last_name}</span>
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      {' '}
                      Email <span className="star-icn">*</span>
                    </label>
                    <Form.Control
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      className="email-input  bg-none "
                      placeholder=""
                      name="email"
                      disabled
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1">
                      {' '}
                      Contact Number <span className="star-icn">*</span>
                    </label>
                    <Form.Control
                      required
                      value={dialCode? dialCode +'-'+ contact:contact}
                      onChange={(e) => {
                        setContact(e.target.value)
                      }}
                      className="email-input bg-none "
                      placeholder=""
                      name="email"
                      disabled
                    />
                    
                    <span className="highlighted-text-wrap">
                      {resubmittedData?.phone_code ? resubmittedData?.phone_code : '' }{ resubmittedData?.contact ? '-'+resubmittedData?.contact : ''}
                    </span>
                    
                    
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Age</label>
                    <Form.Control
                      required
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value)
                      }}
                      className="email-input bg-none "
                      placeholder=""
                      name="email"
                      disabled
                    />
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Gender</label>

                    <Form.Control
                      required
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value)
                      }}
                      className="email-input  bg-none text-capitalize"
                      placeholder=""
                      name="email"
                      disabled
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Type</label>
                    <Form.Control
                      required
                      value={userType === 1  ? 'Teacher' : userType === 2 ? 'Student' :userType === 4 ?'Both':""}
                      onChange={(e) => {
                        setUserType(e.target.value)
                      }}
                      className="email-input  bg-none "
                      placeholder=""
                      name="email"
                      disabled
                    />
                  </div>
                </div>
              </Col>
              {userType == 1 || userType == 4 && (
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1"> Status</label>
                      <Form.Control
                        required
                        value={profileValue}
                        onChange={(e) => {
                          setUserType(e.target.value)
                        }}
                        className="email-input  bg-none "
                        placeholder=""
                        name="email"
                        disabled
                      />
                    </div>
                  </div>
                </Col>
              )}
              {userType === 1 || userType == 4 ? (
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100 d-flex flex-column">
                      <label className="fs-6 fw-normal my-1"> ID Proof</label>
                      <a
                        className="proof_tab text-decoration-none "
                        target="_blank"
                        rel="noreferrer"
                        href={`${process.env.REACT_APP_API_URL}public/storage/${idProff}`}
                      >
                        {userType == 1  || userType == 4? (
                          idProff ? (
                            <span
                              className="text-black mx-1 d-flex"
                              id="idProff"
                              onChange={IdProff}
                            >
                              {' '}
                              <img src={downloadIcn} title="" className="size-icn-wrap mb-3" alt="react img" />
                              <p
                                className="px-3 fs-6 fw-normal"
                                style={{ color: 'rgb(44 56 74 / 95%)' }}
                              >
                                {documentdata['idProof']}
                              </p>
                            </span>
                          ) : (
                            <span style={{ color: 'rgb(44 56 74 / 95%)' }}>N/A</span>
                          )
                        ) : (
                          <span style={{ color: 'rgb(44 56 74 / 95%)' }}>N/A</span>
                        )}
                      </a>
                    </div>
                    {userType === 1 || userType == 4 && resubmittedData?.id_proof ?
               
               <div className=" justify-content-between tabs-inner-content mb-3">
                 <div className="me-2 w-100 d-flex flex-column">
                   <a
                     className="proof_tab text-decoration-none "
                     target="_blank"
                     rel="noreferrer"
                     href={`${process.env.REACT_APP_API_URL}public/storage/${resubmittedData?.id_proof}`}
                     >
                         <span className="text-black d-flex mx-1">
                           {' '}
                           <img src={downloadIcn} title="" className="size-icn-wrap mb-4" alt="react img" />
                           <p
                             className="highlighted-text-wrap "
                             // style={{ color: 'rgb(44 56 74 / 95%)' }}
                             >
                             {resubmittedData?.id_proof}
                           </p>
                         </span>
                    
                   </a>
                 </div>
               </div>
             :""
             }
                  </div>
                  
                </Col>
              ) : (
                ''
              )}



              {userType === 1 || userType == 4 ? (
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100 d-flex flex-column">
                      <label className="fs-6 fw-normal my-1">Education Document</label>
                      <a
                        className="proof_tab text-decoration-none "
                        target="_blank"
                        rel="noreferrer"
                        href={`${process.env.REACT_APP_API_URL}public/storage/${document}`}
                      >
                        {userType == 1  || userType == 4? (
                          document ? (
                            <span className="text-black d-flex mx-1">
                              {' '}
                              <img src={downloadIcn} title="" className="size-icn-wrap mb-4" alt="react img" />
                              <p
                                className="px-3 fs-6 fw-normal"
                                style={{ color: 'rgb(44 56 74 / 95%)' }}
                              >
                               
                                {documentdata['document']}
                              </p>
                            </span>
                          ) : (
                            <span style={{ color: 'rgb(44 56 74 / 95%)' }}>N/A</span>
                          )
                        ) : (
                          <span style={{ color: 'rgb(44 56 74 / 95%)' }}>N/A</span>
                        )}
                      </a>
                    </div>
                    {userType === 1 || userType == 4 && resubmittedData?.document_path ? (
               
               <div className=" justify-content-between tabs-inner-content mb-3">
                 <div className="me-2 w-100 d-flex flex-column">
                  
                   <a
                     className="proof_tab text-decoration-none "
                     target="_blank"
                     rel="noreferrer"
                     href={`${process.env.REACT_APP_API_URL}public/storage/${resubmittedData?.document_path}`}
                   >
                     <span className="text-black d-flex mx-1">
                       {' '}
                       <img src={downloadIcn} title="" className="size-icn-wrap mb-4" alt="react img" />
                       <p className="highlighted-text-wrap ">{resubmittedData?.document_path}</p>
                     </span>
                   </a>
                 </div>
               </div>
             
           ) : (
             ''
           )}
                  </div>
                </Col>
              ) : (
                ''
              )}
             
            </Row>
          </Container>
        </Card>
      </div>
        <div className="my-4">
        {userType === 1  || userType == 4? (
          <Card className="border-0 card-personal-info pt-5">
            <h4 className="mb-4">Professional Details</h4>
            <Container fluid>
              <Row>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        {' '}
                        Category <span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        disabled
                        value={category == 0 ? 'BOTH' : category == 1 ? 'IT' : 'NON-IT'}
                        placeholder="Category"
                      />
                      <span className="highlighted-text-wrap">
                        {resubmittedData?.category == 0
                          ? 'BOTH'
                          : resubmittedData?.category == 1
                          ? 'IT'
                          : resubmittedData?.category == 2
                          ? 'NON-IT'
                          : ''}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        {' '}
                        Subject Specialization<span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        disabled
                        value={subject}
                        placeholder="Subject Specialization"
                      />

                      <span className="highlighted-text-wrap">
                        {subjectList?.map((ele, index) => {
                          return ele.id == resubmittedData?.subject_id ? ele.subject_name : ''
                        })}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        {' '}
                        Highest Qualification <span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        value={qualification}
                        onChange={(e) => {
                          setQualification(e.target.value)
                        }}
                        className="email-input  bg-none "
                        placeholder="Qualification"
                        name="email"
                        autoComplete="username"
                        disabled
                      />
                      <span className="highlighted-text-wrap">
                        {resubmittedData?.qualification}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        {' '}
                        Experience <span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        className="email-input  bg-none "
                        // placeholder="expirence"
                        value={expirence}
                        onChange={(e) => {
                          setExpirence(e.target.value)
                        }}
                        disabled
                      />
                      <span className="highlighted-text-wrap">{resubmittedData?.experience}</span>
                    </div>
                  </div>
                </Col>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100 d-flex flex-column">
                      <label className="fs-6 fw-normal my-1">Experience Letter</label>
                      <a
                        className="proof_tab text-decoration-none "
                        target="_blank"
                        rel="noreferrer"
                        href={`${process.env.REACT_APP_API_URL}public/storage/${expirenceLetter}`}
                      >
                        {userType == 1  || userType == 4 ? (
                          expirenceLetter ? (
                            <span className="text-black mx-1 d-flex">
                              {' '}
                              <img src={downloadIcn} title="" className="size-icn-wrap mb-3" alt="react img"  />
                              <p
                                className="px-3 fs-6 fw-normal"
                                style={{ color: 'rgb(44 56 74 / 95%)' }}
                              >
                                {documentdata['expirenceLetter']}
                              </p>
                            </span>
                          ) : (
                            <span style={{ color: 'rgb(44 56 74 / 95%)' }}>N/A</span>
                          )
                        ) : (
                          <span style={{ color: 'rgb(44 56 74 / 95%)' }}>N/A</span>
                        )}
                      </a>
                      <span className="highlighted-text-wrap">{resubmittedData?.expirenceLetter}</span>
                    </div>
                  </div>
                </Col>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        {' '}
                        Available Working Hours<span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        disabled
                        value={hours}
                        // placeholder="Available Working Hours"
                      />
                      <span className="highlighted-text-wrap">
                        {resubmittedData?.working_hours}
                      </span>
                    </div>
                  </div>
                </Col>

                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        {' '}
                        Currency <span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        className="email-input  bg-none "
                        // placeholder="Income"
                        name="email"
                        value={preferred_currency}
                        onChange={(e) => {
                          setPreferred_currency(e.target.value)
                        }}
                        disabled
                      />
                      <span className="highlighted-text-wrap">
                        {resubmittedData?.currency}
                      </span>
                    </div>
                  </div>
                </Col>

                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        {' '}
                        Expected Income <span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        className="email-input  bg-none "
                        // placeholder="Income"
                        name="email"
                        value={income}
                        onChange={(e) => {
                          setIncome(e.target.value)
                        }}
                        disabled
                      />
                      <span className="highlighted-text-wrap">
                        {resubmittedData?.expected_income}
                      </span>
                    </div>
                  </div>
                </Col>

                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        City <span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value)
                        }}
                        className="email-input  bg-none "
                        placeholder="City"
                        name="email"
                        autoComplete="username"
                        disabled
                      />
                    </div>
                  </div>
                </Col>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        {' '}
                        State <span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        value={state}
                        onChange={(e) => {
                          setState(e.target.value)
                        }}
                        className="email-input  bg-none "
                        placeholder="State"
                        name="email"
                        autoComplete="username"
                        disabled
                      />
                    </div>
                  </div>
                </Col>
                <Col md="6" lg="4">
                  <div className=" justify-content-between tabs-inner-content mb-3">
                    <div className="me-2 w-100">
                      <label className="fs-6 fw-normal my-1">
                        Country <span className="star-icn">*</span>
                      </label>
                      <Form.Control
                        required
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value)
                        }}
                        className="email-input  bg-none "
                        placeholder="Country"
                        name="email"
                        autoComplete="username"
                        disabled
                      />
                      <span className="highlighted-text-wrap">{resubmittedData?.country}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              {teacherStatus === 1 || teacherStatus === 4 ? (
                <span className="d-flex justify-content-end mt-5">
                  <div>
                    <span
                      id="1"
                      onClick={() => acceptData()}
                      href=""
                      className="button-custom mx-2"
                    >
                      Accept
                    </span>

                    <span
                      id="2"
                      onClick={() => RejectData()}
                      href=""
                      className="button-custom cancel-button  "
                    >
                      Reject
                    </span>
                  </div>
                </span>
              ) : (
                ''
              )}
            </Container>

          </Card>
          ) : "" }
            {
            userType === 2 ? (
              <Card className="border-0 card-personal-info pt-5 mt-3 ">

              <Row>
              <Col md="6" lg="4">
                 <div className=" justify-content-between tabs-inner-content mb-3">
                   <div className="me-2 w-100">
                     <label className="fs-6 fw-normal my-1">
                       {' '}
                       Qualification <span className="star-icn">*</span>
                     </label>
                     <Form.Control
                       required
                       value={qualification}
                       onChange={(e) => {
                         setState(e.target.value)
                        }}
                       className="email-input  bg-none "
                       placeholder="Qualification"
                       name="Qualification"
                       autoComplete="username"
                       disabled
                     />
                   </div>
                 </div>
               </Col>
               <Col md="6" lg="4">
                 <div className=" justify-content-between tabs-inner-content mb-3">
                   <div className="me-2 w-100">
                     <label className="fs-6 fw-normal my-1">
                       {' '}
                       Subscription <span className="star-icn">*</span>
                     </label>
                     <Form.Control
                       required
                       value={subscription}
                       onChange={(e) => {
                         setState(e.target.value)
                        }}
                       className="email-input  bg-none "
                       placeholder="Subscription"
                       name="Subscription"
                       autoComplete="username"
                       disabled
                     />
                   </div>
                 </div>
               </Col>
               <Col md="6" lg="4">
                 <div className=" justify-content-between tabs-inner-content mb-3">
                   <div className="me-2 w-100">
                     <label className="fs-6 fw-normal my-1">
                       {' '}
                       Country <span className="star-icn">*</span>
                     </label>
                     <Form.Control
                       required
                       value={country}
                       onChange={(e) => {
                         setState(e.target.value)
                       }}
                       className="email-input  bg-none "
                       placeholder="Country"
                       name="Country"
                       autoComplete="username"
                       disabled
                       />
                   </div> 
                 </div>
               </Col>
           </Row>
            </Card>
            )
           : ""}
           
        </div>
    </>
  )
}

export default User
