import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CRow } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { paymentMessage } from 'src/store/features/PaymentSlice'
import Loader from 'src/Views/Loader/Loader'


const PaymentMessage = () => {
  const [searchParams] = useSearchParams()
  const session = searchParams.get('session_id')
  const cancel = searchParams.get('canceled')
  const {paymentMessageRes}=useSelector((state)=>state.paymentSlice)
  const {paymentloading}=useSelector((state)=>state.paymentSlice)

  console.log(paymentMessageRes,"oooo")

  const dispatch = useDispatch()
  useEffect(() => {
    if (session) {
      dispatch(paymentMessage({ session_id: session }))
    }
  }, [session])


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
       {paymentloading  ? (
        <div className=" d-flex justify-content-center zIndex ">
          <Loader />
        </div>
      ) : (
        ''
      )}
      <CContainer>
        <CRow className="justify-content-center mb-5 ">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {cancel || paymentMessageRes?.error? (
                    <div className='mb-4 text-center'>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="50"
                        height="50"
                        viewBox="0,0,256,256"
                        style={{fill:'#000000'}}
                      >
                        <g
                          fill="#ff0000"
                          fillRule="nonzero"
                          stroke="none"
                          strokeWidth="1"
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          strokeMiterlimit="10"
                          strokeDasharray=""
                          strokeDashoffset="0"
                          fontFamily="none"
                          fontWeight="none"
                          fontSize="none"
                          textAnchor="none"
                        >
                          <g transform="scale(5.12,5.12)">
                            <path d="M43.171,10.925l-19.086,22.521l-9.667,-9.015l1.363,-1.463l8.134,7.585l17.946,-21.175c-4.204,-4.534 -10.205,-7.378 -16.861,-7.378c-12.683,0 -23,10.317 -23,23c0,12.683 10.317,23 23,23c12.683,0 23,-10.317 23,-23c0,-5.299 -1.806,-10.182 -4.829,-14.075z"></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                  ) :
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
                  }
                  <CForm>

                    <h3 className="text-login mt-4">
                      {cancel ? 'Payment Canceled' :paymentMessageRes?.error?paymentMessageRes?.error: 'Payment Successful'}{' '}
                    </h3>
                    <p className="text-medium-emphasis text-login"></p>
                    <CRow>
                      {
                        paymentMessageRes?.data?.url ?

                        <div className="clm-btn d-flex justify-content-center ">
                      <a className='text-decoration-none text-center' href={process.env.REACT_APP_IMAGE_URL+paymentMessageRes?.data?.url}>
                         Download
                      </a>
                    </div> : ""
                    }
                    </CRow>

                    <CRow>
                      <div className="clm-btn">
                        <Link to="/home" className="text-login  h6 text-primary">
                          <CButton color="primary" className=" my-3 button-custom ">
                            HomePage
                          </CButton>
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
    </div>
  )
}

export default PaymentMessage
