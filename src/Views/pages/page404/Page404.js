import React, { useState } from 'react'
import { CContainer } from '@coreui/react'
import CryptoJS from 'crypto-js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Page404 = () => {
  const [data1, setData1] = useState('')
  const secretPass = 'XkhZG4fW2t2W'
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const navigate = useNavigate()

  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS?.AES?.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes?.toString(CryptoJS?.enc?.Utf8)))
    }
  }, [checkType])


  useEffect(() => {
    if (data1 == 'super-admin') {
      navigate('/dashboard')
    } else if (data1 == 'teacher') {
      navigate('/teacher/dashboard')
    } else if (data1 == 'student') {
      navigate('/home')
    }
  }, [data1])

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center svg-img">
        <div>
          <CContainer className="">
            {/* <CRow className="justify-content-center">
          <CCol md={6}>
            <div className="clearfix">
            
              <h1 className="float-start display-3 me-4">404</h1>
              <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
              <p className="text-medium-emphasis float-start">
                The page you are looking for was not found.
              </p>
            </div>
            <CInputGroup className="input-prepend">
              <CInputGroupText>
                <CIcon icon={cilMagnifyingGlass} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="What are you looking for?" />
              <CButton color="info">Search</CButton>
            </CInputGroup>
          </CCol>
        </CRow> */}
          </CContainer>
        </div>
      </div>
    </>
  )
}

export default Page404
