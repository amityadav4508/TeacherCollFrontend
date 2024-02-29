import React,{useEffect} from 'react'

import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CRow } from '@coreui/react'
import {useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {teacherProfileStatus} from '../../store/features/AuthSlice'

const ProfileReview = () => {
   const navigate = useNavigate()
  const dispatch = useDispatch()

const {Teacher}=useSelector((state)=>state.auth)

  const PreviewButton = async() => {
   navigate("/")
  }

  useEffect(() => {
    dispatch(teacherProfileStatus(false))
  },[dispatch])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">

      <CContainer>
        <CRow className="justify-content-center mb-5 ">
          <CCol md="5">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <div className='text-center'>
                    <img src="https://cdn-icons-png.flaticon.com/512/660/660611.png?w=740&t=st=1676889800~exp=1676890400~hmac=291fdd6b6f3ec8811dd7b68853a2d64d3f597c9f2feab229d94b6b2c98cb7c68"
                    alt="Avatar" className="my-3 " style={{ width: '80px' }} />
                  </div>
                  <CForm>
                    <h4 className="text-login mt-3 text-center lh-base">{Teacher?.message}</h4>
                    <CRow>
                      <div className="clm-btn">
                        <div className="text-login  h6 text-primary">
                          <CButton color="primary" className=" my-3 button-custom " onClick={PreviewButton}>
                            Homepage
                          </CButton>
                        </div>
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

export default ProfileReview
