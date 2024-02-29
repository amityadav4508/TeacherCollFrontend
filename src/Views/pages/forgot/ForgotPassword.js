import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { forgetPassAdminAsync } from 'src/store/features/ForgetPasswordSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'src/Views/Loader/Loader'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState({
    email: '',
  })
  const [emailData, setEmailData] = useState('')
  const [err, setErr] = useState('')
  const [submit, setSubmit] = useState(false)
  const {forgetPassloading}=useSelector((state)=>state.forgetPass)
  const handleChange = (e) => {
    const { name, value } = e.target
    setEmail({ ...email, [name]: value })
  }
  const handleSubmit = () => {
    setErr(validate(email))
    setEmailData(email)
    setSubmit(true)
  }

  function validate(val) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    let err = {}
    if (!val.email) {
      err.email = 'Email is Required'
    } else if (!regex.test(val.email)) {
      err.email = 'This is not a valid email format!'
    }
    return err
  }

  useEffect(() => {
    if (submit && Object.keys(err).length === 0) {
      dispatch(forgetPassAdminAsync(emailData))
    }
  }, [submit, err])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center mb-5 ">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2 className="text-login mt-4">Forgot Password</h2>
                    <p className="text-medium-emphasis text-login">
                    Enter the email address associated with your TeacherCool account.

                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <span className="text-danger">{err.email}</span>
                    <CRow>
                      <div className="clm-btn">
                        <CButton
                          color="primary"
                          className=" my-3 button-custom "
                          onClick={handleSubmit}
                        >
                          Send Email
                        </CButton>
                        <Link to="/admin/login" className="text-login  h6 text-primary">
                           Go Back Login
                        </Link>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      {forgetPassloading===true?
      <div className='d-flex justify-content-center zIndex load-custom'>
      <Loader />
      </div>:""}
    </div>
  )
}

export default ForgotPassword
