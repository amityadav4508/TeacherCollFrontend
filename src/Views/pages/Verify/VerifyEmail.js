import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { verifyEmailAsync } from 'src/store/features/verifyEmailSlice'

import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CRow } from '@coreui/react'
// import { forgetPassAdminAsync } from 'src/store/features/ForgetPasswordSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'src/Views/Loader/Loader'

const VerifyEmail = () => {
  const { emailcode } = useParams()

  const dispatch = useDispatch()

  const loading = useSelector((state) => state.verifyEmail.verifyEmailloading)
  const successMessage = useSelector((state) => state.verifyEmail.verifyEmailMsg)
  const success = useSelector((state) => state.verifyEmail.success)
  const { emailCheck } = useSelector((state) => state.verifyEmail)

  useEffect(() => {
    if (emailcode && emailcode != '') {
      const test = async () => {
        await dispatch(verifyEmailAsync({ email_token: emailcode }))
      }
      test()
    } else {
      console.log('not works')
    }
  }, [])

  const IsSeller = emailCheck?.data?.data?.is_seller
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {loading ? (
        <div className="d-flex justify-content-center zIndex load-custom">
          <Loader />
        </div>
      ) : (
        <CContainer>
          <CRow className="justify-content-center mb-5 ">
            <CCol md="5">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    {success && (
                      <div className="mb-4 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="75"
                          height="75"
                          fill="currentColor"
                          className="text-success bi bi-check-circle-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </div>
                    )}
                    <CForm>
                      <h2 className="text-login mt-4">{success ? 'Thank You !' : '404'}</h2>
                      <p className="text-medium-emphasis text-login">{successMessage}</p>

                      <CRow>
                        {success ? (
                          <div className="clm-btn">
                            <Link
                              to={IsSeller ? '/seller-login' : '/login'}
                              className="text-login  h6 text-primary"
                            >
                              <CButton color="primary" className=" my-3 button-custom ">
                                Login
                              </CButton>
                            </Link>
                          </div>
                        ) : (
                          <div className="clm-btn">
                            <Link to="/" className="text-login  h6 text-primary">
                              <CButton color="primary" className=" my-3 button-custom ">
                                HomePage
                              </CButton>
                            </Link>
                          </div>
                        )}
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      )}
    </div>
  )
}

export default VerifyEmail
