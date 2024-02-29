
import React, { useState,useEffect } from 'react'
import uploadIcon from '../../../assets/images/uploadicon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// react-bootstrap components
import {  Card, Form, Container, Row, Col } from 'react-bootstrap'
import {userSingleIdAsync} from '../../../store/features/userDataslice'
import BackButton from 'src/Views/widgets/BackButton'

const  FormContent=()=> {


    const {id} = useParams();
  const dispatch = useDispatch()
  const {data} = useSelector((state) => state?.userSingleId?.singleId)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [gender,setGender] = useState('')
  const [contact,setContact] = useState('')
  const [qualification,setQualification] = useState('')
  const [age,setAge] = useState('')
  const [user_type,setUser_type] = useState('')
  const [city,setCity] = useState('')
  const [country,setCountry] = useState('')
  const [state,setState] = useState(false)




  useEffect(() => {
    dispatch(userSingleIdAsync(id))
  }, [id])

  useEffect(() => {
    if (data) {
      setName(data?.[0]?.name)
      setEmail(data?.[0]?.email)
      setGender(data?.[0]?.gender)
      setContact(data?.[0]?.contact)
      setQualification(data?.[0]?.qualification)
      setAge(data?.[0]?.age)
      setUser_type(data?.[0]?.user_type)
      setCity(data?.[0]?.city)
      setCountry(data?.[0]?.country)
      setState(data?.[0]?.state)


    }
  }, [data])

  return (
    <>
      <div>
      <BackButton/>
        <Card className="border-0 card-personal-info mt-3">
        <h4 className='d-flex mb-4'>User Details</h4>
          <Container fluid>
            <Row>
              <Col md="6">
                <div className="d-flex align-items-center">
                  <div className="mb-5 upload-pic">
                    <Form.Control className="input_file_type" type='image' />
                    <div className="d-flex position-absolute">
                      <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M37.6035 9.625H31.6993L31.0118 7.5625C30.6804 6.56104 30.0415 5.68966 29.1861 5.07246C28.3306 4.45526 27.3022 4.1237 26.2474 4.125H17.7526C16.6981 4.1242 15.6701 4.45597 14.815 5.07312C13.9598 5.69028 13.3211 6.56138 12.9896 7.5625L12.3007 9.625H6.3965C5.06516 9.62646 3.78877 10.156 2.84737 11.0974C1.90597 12.0388 1.37646 13.3152 1.375 14.6465V34.859C1.37791 36.1894 1.90807 37.4644 2.84931 38.4046C3.79055 39.3448 5.06611 39.8736 6.3965 39.875H37.609C38.9394 39.8721 40.2144 39.3419 41.1546 38.4007C42.0948 37.4594 42.6235 36.1839 42.625 34.8535V14.641C42.6221 13.3106 42.0919 12.0356 41.1507 11.0954C40.2094 10.1552 38.9339 9.62646 37.6035 9.625ZM39.875 34.8535C39.8743 35.4557 39.6347 36.0331 39.2089 36.4589C38.7831 36.8847 38.2057 37.1243 37.6035 37.125H6.3965C5.79428 37.1243 5.21694 36.8847 4.79111 36.4589C4.36528 36.0331 4.12573 35.4557 4.125 34.8535V14.641C4.12718 14.0397 4.36737 13.4638 4.79305 13.0392C5.21872 12.6145 5.79523 12.3757 6.3965 12.375H13.2921C13.5806 12.3748 13.8617 12.2838 14.0956 12.1151C14.3295 11.9463 14.5045 11.7082 14.5956 11.4345L15.598 8.42738C15.7485 7.97507 16.0377 7.58167 16.4245 7.30301C16.8112 7.02435 17.2759 6.8746 17.7526 6.875H26.2474C26.7243 6.87448 27.1892 7.02436 27.5761 7.3033C27.9629 7.58225 28.2519 7.97608 28.402 8.42875L29.4044 11.4345C29.4955 11.7082 29.6705 11.9463 29.9044 12.1151C30.1383 12.2838 30.4194 12.3748 30.7079 12.375H37.6035C38.2057 12.3757 38.7831 12.6153 39.2089 13.0411C39.6347 13.4669 39.8743 14.0443 39.875 14.6465V34.8535Z"
                          fill="#C0C0C0"
                        />
                        <path
                          d="M22 13.75C19.9604 13.75 17.9666 14.3548 16.2707 15.488C14.5748 16.6211 13.253 18.2317 12.4725 20.1161C11.692 22.0004 11.4877 24.0739 11.8857 26.0744C12.2836 28.0748 13.2657 29.9123 14.708 31.3545C16.1502 32.7968 17.9877 33.7789 19.9881 34.1768C21.9886 34.5748 24.0621 34.3705 25.9464 33.59C27.8308 32.8095 29.4414 31.4877 30.5745 29.7918C31.7077 28.0959 32.3125 26.1021 32.3125 24.0625C32.3096 21.3283 31.2222 18.707 29.2888 16.7737C27.3555 14.8403 24.7342 13.7529 22 13.75ZM22 31.625C20.5043 31.625 19.0422 31.1815 17.7985 30.3505C16.5549 29.5195 15.5856 28.3384 15.0132 26.9565C14.4408 25.5747 14.291 24.0541 14.5828 22.5871C14.8746 21.1201 15.5949 19.7726 16.6525 18.715C17.7101 17.6574 19.0577 16.9371 20.5246 16.6453C21.9916 16.3535 23.5122 16.5033 24.894 17.0757C26.2759 17.648 27.457 18.6174 28.288 19.861C29.119 21.1046 29.5625 22.5668 29.5625 24.0625C29.5603 26.0675 28.7629 27.9898 27.3451 29.4076C25.9273 30.8254 24.005 31.6228 22 31.625Z"
                          fill="#C0C0C0"
                        />
                        <path
                          d="M35.75 17.875C36.5094 17.875 37.125 17.2594 37.125 16.5C37.125 15.7406 36.5094 15.125 35.75 15.125C34.9906 15.125 34.375 15.7406 34.375 16.5C34.375 17.2594 34.9906 17.875 35.75 17.875Z"
                          fill="#C0C0C0"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="mb-5 ms-3">User Pic (Non mandatory)</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"  > Name*</label>
                    <Form.Control
                      required
                      className="email-input  bg-none "
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                      placeholder="Username"
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
                    <label className="fs-6 fw-normal my-1"> Email*</label>
                    <Form.Control
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                      className="email-input  bg-none "
                      placeholder="Robertmill@guoi.innk"
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
                    <label className="fs-6 fw-normal my-1"> Contact Number*</label>
                    <Form.Control
                      required
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value)
                      }}
                      className="email-input  bg-none "
                      placeholder="23435434534"
                      name="email"
                      autoComplete="username"
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
                    <label className="fs-6 fw-normal my-1"> Age*</label>
                    <Form.Control
                      required
                      value={age}
                      onChange={(e) => {
                        setAge(e.target.value)
                      }}
                      className="email-input  bg-none "
                      placeholder="Age"
                      name="email"
                      autoComplete="age"
                      disabled
                    />
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Gender*</label>
                    <Form.Control
                      required
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value)
                      }}
                      className="email-input  bg-none "
                      placeholder="Gender"
                      name="email"
                      autoComplete="gender"
                      disabled
                    />
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Status</label>
                    <Form.Control
                      required
                      value={user_type===1? 'Teacher' :user_type===2? 'Student':''}
                      onChange={(e) => {
                        setUser_type(e.target.value)
                      }}
                      className="email-input  bg-none "
                      placeholder="Username"
                      name="email"
                      autoComplete="username"
                      disabled
                    />
                  </div>
                </div>
              </Col> 
            </Row>
            <Row>
            <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100 d-flex flex-column">
                    <label className="fs-6 fw-normal my-1"> ID Proof</label>
                 <span>N/A</span>
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100 d-flex flex-column">
                    <label className="fs-6 fw-normal my-1">Document</label>
                  <span>N/A</span>
                  </div>
                </div>
              </Col>

            </Row>
         
          </Container>
        </Card>
      </div>

      <div className="my-4">
        
        <Card className="border-0 card-personal-info">
        <h4 className='mb-4'>Personal Details</h4>
          <Container fluid>
            <Row>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Subject Specialization*</label>
                    <Form.Select aria-label="Default select example"disabled>
                      <option >Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Expected Income*</label>
                    <Form.Control
                      required
                      className="email-input  bg-none "
                      placeholder="Income"
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
                    <label className="fs-6 fw-normal my-1"> Category*</label>
                    <Form.Select aria-label="Default select example" disabled >
                      <option>Select</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
         
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Available Working Hours*</label>
                    <Form.Select aria-label="Default select example" disabled >
                      <option>Select</option>
                      <option value="1">6</option>
                      <option value="2">7</option>
                      <option value="3">8</option>
                    </Form.Select>
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
                <div className=" justify-content-between tabs-inner-content mb-3">
                  <div className="me-2 w-100">
                    <label className="fs-6 fw-normal my-1"> Highest Qualification*</label>
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
                  </div>
                </div>
              </Col>
              <Col md="6" lg="4">
           <div className=" justify-content-between tabs-inner-content mb-3">
             <div className="me-2 w-100">
               <label className="fs-6 fw-normal my-1">City*</label>
               <Form.Control
                 required
                 value={city}
                 onChange={(e) => {
                   setCity(e.target.value)
                 }}
                 className="email-input  bg-none "
                 placeholder="Qualification"
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
                    <label className="fs-6 fw-normal my-1"> State*</label>
                    <Form.Control
                      required
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value)
                      }}
                      className="email-input  bg-none "
                      placeholder="Qualification"
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
               <label className="fs-6 fw-normal my-1">Country*</label>
               <Form.Control
                      required
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value)
                      }}
                      className="email-input  bg-none "
                      placeholder="Qualification"
                      name="email"
                      autoComplete="username"
                      disabled
                    />
             </div>
           </div>
         </Col>
            </Row>
            <Row>
       </Row>
          </Container>
        </Card>
      </div>
    </>
  )
}

export default FormContent
