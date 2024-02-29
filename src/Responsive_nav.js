import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sidebarShowtoggle } from './store/features/SidebarSlice'
import logo from './assets/images/login-logo.svg'
import CryptoJS from 'crypto-js'
import { useMediaPredicate } from 'react-media-hook'
import _Nav from './_nav'
import AdminNav from './admin/AdminNav'
import TeacherNav from './Teacher/TeacherNav'
import SellerSidebar from './seller/SellerSidebar'

const Responsive_nav = () => {
  const showCanvastogglebar = useSelector((state) => state.sideBar)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const secretPass = 'XkhZG4fW2t2W'

  const [data1, setData1] = useState('')
  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS.AES.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
    }
  }, [checkType])

  
  const greterThan = useMediaPredicate('(min-width: 769px)')
  const handleShow = () => {
    dispatch(sidebarShowtoggle(false))
  }
  const [sideBarNav, setSideBarNav] = useState('')

  useEffect(() => {
    if (data1 == 'super-admin' && _Nav) {
      setSideBarNav(_Nav)
    } else if (data1 == 'sub-admin' && AdminNav) {
      setSideBarNav(AdminNav)
    } else if (data1 == 'teacher' && TeacherNav) {
      setSideBarNav(TeacherNav)
    }else if (data1 == 'seller' && SellerSidebar) {
      setSideBarNav(SellerSidebar)
    }
  }, [_Nav, AdminNav, TeacherNav, data1,SellerSidebar])

  const [index1, setIndex1] = useState('')

  const handleToggle = (ind) => {
    setIndex1(ind)
    setOpen(!open)
  }

  return (
    <>
      <Offcanvas
        className={greterThan ? 'w-25' : 'w-100 '}
        show={showCanvastogglebar.showCanvastogglebar}
        onHide={handleShow}
      >
        <div className="d-flex justify-content-between mx-3">
          {data1 && data1 == 'super-admin' ? (
            <Link to="/dashboard">
              <img className=" me-5 mt-3 mb-2" alt="logo" src={logo} />
            </Link>
          ) : data1 == 'teacher' ? (
            <Link to="/">
              <img className=" me-5 mt-3 mb-2" alt="logo" src={logo} />
            </Link>
          ) : data1 == 'sub-admin' ? (
            <Link to="/admin/dashboard">
              <img className=" me-5 mt-3 mb-2" alt="logo" src={logo} />
            </Link>
          ) : data1 == 'student' ? (
            <Link to="/admin/dashboard">
              <img className=" me-5 mt-3 mb-2" alt="logo" src={logo} />
            </Link>
          ) : (
            ''
          )}
          <button
            type="button"
            className="btn-close mt-3  text-white"
            data-coreui-dismiss="modal"
            aria-label="Close"
            onClick={handleShow}
          ></button>
        </div>

        <Offcanvas.Body className='off-canvas-style'>
          <div className="" style={{ width: '500px' }}>
            {sideBarNav.length > 0 &&
              sideBarNav?.map((ele, index) => {
                return (
                  <span key={index} >
                    {ele.items ? (
                      <div className={index1==index?"responsiveNavLink":""}>
                        <span className= {index1==index?"d-flex text-white py-1 my-1" : " d-flex text-white py-1 my-1"} >
                          <div className="px-4">{ele.icon}</div>
                          <span className="h6 fw-bold" onClick={() => handleToggle(index)}>
                            {ele.name.props.children}
                          </span>
                        </span>
                        {index1 == index && open ? (
                          <span>
                            {ele?.items?.map((ele, index) => (
                              <div key={index} className="my-2">
                                <Link className="text-decoration-none d-flex" to={ele.to}>
                                  <span className="ms-3">{ele.name}</span>
                                </Link>
                              </div>
                            ))}
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    ) : (
                      <div className={index1==index?"responsiveNavLink py-2 px-4 ":"py-2 px-4"} onClick={()=>setIndex1(index)}>
                        <Link className="text-decoration-none d-flex align-items-center" to={ele.to}>
                          <div className="px-2">{ele.icon}</div>
                          <span>{ele.name}</span>
                        </Link>
                      </div>
                    )}
                  </span>
                )
              })}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Responsive_nav
