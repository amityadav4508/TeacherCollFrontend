import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { toast } from 'react-toastify'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '../../../store/features/AuthSlice'
import { Form } from 'react-bootstrap'
import CryptoJS from 'crypto-js'
import Loader from 'src/Views/Loader/Loader'
import  backgroundImage from '../../../assets/images/login-page-background.png'

const AdminLogin = () => {
  const [err, setErr] = useState('')
  const [formErr, setFormErr] = useState({})
  const [submit, setSubmit] = useState(false)
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const {loading}=useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [data1, setData1] = useState('')

  const checkType = JSON.parse(localStorage.getItem('checkType'))

  useEffect(() => {
    if (checkType) {
      const handleLogin = async () => {
        const secretPass = 'XkhZG4fW2t2W'
        var bytes = CryptoJS.AES.decrypt(checkType, secretPass)
        setData1(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
      }
      handleLogin()
    }
  }, [checkType])


  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginAsync(loginData))
    setSubmit(true)
  }


  const Token = JSON.parse(localStorage.getItem('userAuth'))
  

  useEffect(() => {
     if (user?.code == 200 && data1 == 'sub-admin' && Token) {
      navigate('/admin/dashboard')
    }else if(Token && data1=='sub-admin'){
      navigate('/admin/dashboard')
    }
    if (user?.code == 200 && data1 == 'super-admin' && Token) {
      navigate('/dashboard')
    }else if(Token && data1=='super-admin'){
      navigate('/dashboard')
    }
    if (user?.code == 200 && data1 == 'sub-admin' && Token) {
      navigate('/admin/dashboard')
    }else if(data1=='sub-admin'){
      navigate('/admin/dashboard')
    }
    if (user) {
      setErr(user?.error)
    }
    toast.error(user?.msg)
  }, [user,data1,Token])






  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center ">
          <CCol md="10">
            <CCardGroup>
              <CCard className="text-white py-5 login-img" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2 className="mb-5">ENJOY LEARNING</h2>
                    <img
                      className="login-img"
                      src={backgroundImage}
                      alt="react img" 
                    />
                  </div>
                </CCardBody>
              </CCard>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1 className="text-login mt-4">Login</h1>
                    <p className="text-medium-emphasis text-login">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        className="text-black"
                        placeholder="Username"
                        name="email"
                        autoComplete="username"
                        value={loginData.email}
                        onChange={handleChange}
               
                      />
                    </CInputGroup>
                    <p className="text-danger">{formErr.email ? formErr.email : err?.email}</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        className="text-black"
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="current-password"
                        value={loginData.password}
                        onChange={handleChange}
           
                      />
                    </CInputGroup>
                    <p className="text-danger">{formErr.email ? formErr.email : err?.password}</p>
                    <div className="d-flex justify-content-between my-4">
                      <Form.Check className="rounded " type="checkbox" id="" label="Remember Me" />

                      <Link to="/admin/forgotpassword" className="link-color fs-6 fw-normal ">
                        Forgot Password
                      </Link>
                    </div>
                    <CRow>
                      <div className="clm-btn">
                        <CButton style={{ background: '#037fd8' }} type="submit">
                          Login
                        </CButton>
                      </div>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      {loading===true?
      <div className='d-flex justify-content-center zIndex load-custom'>
      <Loader />
      </div>:""}
    </div>
  )
}

export default AdminLogin
