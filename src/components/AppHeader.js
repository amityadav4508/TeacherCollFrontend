import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderDivider, CHeaderNav,  CNavItem } from '@coreui/react'
import { AppHeaderDropdown } from './header/index'
import lefterrow from '../assets/images/backerrow.svg'
import NotifiyDropdown from './header/NotifiyDropdown'
import navetogglemenu from '../assets/images/togglemenu.svg'
import { sidebarShowget, sidebarShowtoggle } from 'src/store/features/SidebarSlice'
import CryptoJS from 'crypto-js'
import { useMediaPredicate } from 'react-media-hook'

const AppHeader = () => {
  const dispatch = useDispatch()
  const [data1, setData1] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)
  const secretPass = 'XkhZG4fW2t2W'
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS.AES.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
    }
  }, [checkType])

  const sideBarShow = () => {
    setShowSidebar(false)
  }

  const closeSideBar = () => {
    setShowSidebar(true)
  }

  useEffect(() => {
    if (showSidebar === true) {
      dispatch(sidebarShowget(showSidebar))
    } else if (showSidebar === false) {
      dispatch(sidebarShowget(showSidebar))
    }
  }, [showSidebar])


  const lessThan786 = useMediaPredicate('(max-width: 768px)')
  const greterThan = useMediaPredicate('(min-width: 769px)')

  const handleShow = () => {
    dispatch(sidebarShowtoggle(true))
  }

  return (
    <>
      <CHeader position="sticky" className="header-border mb-3 pt-3 border-0">
        <CContainer fluid>
          <CHeaderNav className=" d-md-flex me-auto">
            <div className="d-flex align-items-center">
              {lessThan786 ? (
                <span className="p-2">
                  <img src={navetogglemenu} onClick={handleShow} alt="togglebtn" />
                </span>
              ) : greterThan ? (
                <div className="position-relative">
                  {showSidebar ? (
                    <img src={navetogglemenu} onClick={sideBarShow} alt="sidebarbtn" />
                  ) : (
                    <img src={lefterrow} onClick={closeSideBar} alt="leftbtn" />
                  )}
                </div>
              ) : (
                ''
              )}
              {data1 == 'super-admin' ? (
                <h5 className="ms-3  mb-0 fw-bold fs-4">Dashboard</h5>
              ) : data1 == 'teacher' ? (
                <h5 className="ms-3  mb-0 fw-bold fs-4">Teacher Dashboard</h5>
              ) : data1 == 'sub-admin' ? (
                <h5 className="ms-3  mb-0 fw-bold fs-4">Admin Dashboard</h5>
              ) :data1 == 'seller'||data1 == 'student' ? (
                <h5 className="ms-3  mb-0 fw-bold fs-4">Seller Dashboard</h5>
              ) :(
                ''
              )}
            </div>
          </CHeaderNav>
          <CHeaderNav>
            <CNavItem></CNavItem>
            <CNavItem>
              <NotifiyDropdown />
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="ms-3">
          
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
      </CHeader>
    </>
  )
}

export default AppHeader
