import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import logo from '../assets/images/login-logo.svg'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { userAuth } from 'src/authorization/Protected'
import navigation from '../_nav'
import teacherNavigation from '../Teacher/TeacherNav'
import { Link, useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import AdminNav from 'src/admin/AdminNav'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import queswrap from '../../src/assets/images/question-mark-icn.svg'
import Responsive_nav from '../Responsive_nav'
import SellerSidebar from 'src/seller/SellerSidebar'

const AppSidebar = () => {
  const navigate = useNavigate()
  const sidebarShow = useSelector((state) => state.sideBar)
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const { teacherStats } = useSelector((state) => state?.TeacherStats)

  const secretPass = 'XkhZG4fW2t2W'
  
  const [data1, setData1] = useState('')

  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS.AES.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
    }
  }, [checkType])

  const w = window.innerWidth
  const h = window.innerHeight
  let checkData = userAuth()?.loggedIn

  useEffect(() => {
    !checkData && navigate('/')
  }, [checkData])

  return (
    <>
      <Responsive_nav />
      {sidebarShow?.sidebarShow === false ? (
        <CSidebar position="fixed">
          <CSidebarBrand className="d-none d-md-flex">
            {data1 && data1 == 'super-admin' ? (
              <Link to="/dashboard">
                <img className=" me-5 mt-3 mb-5" alt="logo" src={logo} />
              </Link>
            ) : data1 == 'teacher' ? (
              <Link to="/">
                <img className=" me-5 mt-3 mb-5" alt="logo" src={logo} />
              </Link>
            ) : data1 == 'seller' &&  teacherStats?.data?.data?.user_type=='teacher' ? (
              <Button className='bg-transparent border-0'
                onClick={() => {
                  const secretPass = 'XkhZG4fW2t2W'
                  const data = CryptoJS.AES.encrypt(JSON.stringify('teacher'), secretPass).toString()
                  localStorage.setItem('checkType', JSON.stringify(data))
                  setTimeout(() => {
                    navigate('/')
                  }, 100)
                }}
              >
                <img className=" me-5 mt-3 mb-5" alt="logo" src={logo} />
              </Button>
            ) : data1 == 'sub-admin' ? (
              <Link to="/admin/dashboard">
                <img className=" me-5 mt-3 mb-5" alt="logo" src={logo} />
              </Link>
            ) : data1 == 'student' ? (
              <Link to="/home">
                <img className=" me-5 mt-3 mb-5" alt="logo" src={logo} />
              </Link>
            ) : data1 == 'seller' ? (
              <Link to="/seller/dashboard">
                <img className=" me-5 mt-3 mb-5" alt="logo" src={logo} />
              </Link>
            ) : (
              ''
            )}
          </CSidebarBrand>
          <CSidebarNav className="sidebar-wrap-custom ">
            <SimpleBar className="sidebar-inner-wrap h-100">
              <AppSidebarNav
                className="h-100"
                items={
                  data1 && data1 == 'super-admin'
                    ? navigation
                    : data1 && data1 == 'teacher'
                    ? teacherNavigation
                    : data1 == 'sub-admin'
                    ? AdminNav
                    : data1 == 'seller' || data1 == 'student'
                    ? SellerSidebar
                    : ''
                }
              />
            </SimpleBar>
            {data1 == 'teacher' ? (
              <div style={{ background: '#1670f8' }}>
                <div className="d-flex justify-content-center my-5 text-center ">
                  <div className="sidebar-contact rounded d-flex justify-content-center p-3 position-relative">
                    <img src={queswrap} className="ques-wrap-outer" alt="wrapper" />
                    <div>
                      <span className="d-flex pb-1 ps-2 pt-2">Need Help form </span>
                      <span className="fw-bold ">TeacherCool ?</span>
                      <div className="d-flex justify-content-center mt-2">
                        <Link to="/">
                          <Button className="fw-bold button-custom  contact-dash-btn px-4">
                            Contact Us
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </CSidebarNav>
        </CSidebar>
      ) : (
        ''
      )}
    </>
  )
}

export default React.memo(AppSidebar)
