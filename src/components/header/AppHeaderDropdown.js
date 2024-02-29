import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilSettings, cilUser, cilAccountLogout, cilBank } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
// cilAccountLogout
import avatar8 from './../../assets/images/avatars/Avatar0.jpg'
import { useNavigate } from 'react-router-dom'
import drop from '../../assets/images/drop.svg'
import { useEffect } from 'react'
import { useState } from 'react'
import CryptoJS from 'crypto-js'
import { getTeacherStatsAsync } from '../../store/features/TeacherStatsinfo'
import { getAdminStatsAsync } from '../../store/features/AdminStatsSlice'
import { useDispatch, useSelector } from 'react-redux'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = JSON.parse(localStorage.getItem('teacherAuth'))
  const [admin, setAdmin] = useState(false)
  const [teacher, setTeacher] = useState(false)
  // teacher name
  const { teacherStats } = useSelector((state) => state?.TeacherStats)
  const { adminStats } = useSelector((state) => state?.AdminStats)

  let teacher_Name = teacherStats?.data?.data
  let admin_Name = adminStats?.data?.data

  //
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const userAuth = JSON.parse(localStorage.getItem('userAuth'))
  const teacherAuth = JSON.parse(localStorage.getItem('teacherAuth'))
  const secretPass = 'XkhZG4fW2t2W'
  const [data1, setData1] = useState('')

  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS.AES.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
    }
  }, [checkType])

  const Logout = async () => {
    if (userAuth) {
      await setAdmin(true)
      await localStorage.removeItem('userAuth')
      await localStorage.removeItem('checkType')
    }
    if (teacherAuth) {
      await setTeacher(true)
      await localStorage.removeItem('teacherAuth')
      await localStorage.removeItem('checkType')
    }
  }

  useEffect(() => {
    if (admin) {
      navigate('/admin/login')
    }
    if (teacher) {
      navigate('/login')
    }
  }, [admin, teacher])

  useEffect(() => {
    if (data1 == 'super-admin' && data1 == 'sub-admin') {
      dispatch(getAdminStatsAsync())
    }

    if (token) {
      if (data1 == 'teacher' || data1 == 'seller' || data1 == 'student') {
        dispatch(getTeacherStatsAsync())
      }
    }
  }, [data1,token])

  const user_settings = () => {
    navigate('teacher/changepassword')
  }

  const teacher_profilepage = () => {
    navigate('/teacher/profilepage')
  }

  const billinginfo = () => {
    navigate('/teacher/billinginfo')
  }
  const admin_settings = () => {
    navigate('/admin/changepassword')
  }
  const adminProfilePage = () => {
    navigate('/admin/profilepage')
  }
  const sellerProfile = () => {
    navigate('/seller/profile')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <div className="d-flex align-items-center ">
          <CAvatar className="me-2" src={avatar8} size="md" />
          {data1 == 'super-admin' ? (
            <div className="d-flex">
              <h6 className="mb-0">{admin_Name?.name ? admin_Name?.name : 'Super Admin'}</h6>{' '}
              <img className="ms-3 mt-1" src={drop} alt="drop" />
            </div>
          ) : data1 == 'teacher' ? (
            <div className="d-flex">
              <h6 className="mb-0">{teacher_Name?.name ? teacher_Name?.name : ''}</h6>{' '}
              <img className="ms-3 mt-1" src={drop} alt="drop" />
            </div>
          ) : data1 == 'sub-admin' ? (
            <div className="d-flex">
              <h6 className="mb-0">Admin</h6> <img className="ms-3 mt-1" src={drop} alt="drop" />
            </div>
          ) : data1 == 'seller' || data1 == 'student' ? (
            <div className="d-flex">
              <h6 className="mb-0">{teacher_Name?.name ? teacher_Name?.name : ''}</h6>{' '}
              <img className="ms-3 mt-1" src={drop} alt="drop" />
            </div>
          ) : (
            ''
          )}
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2 ">Settings</CDropdownHeader>

        {data1 == 'super-admin' ? (
          <CDropdownItem onClick={adminProfilePage}>
            <span className="text-decoration-none pe-auto">
              <CIcon icon={cilUser} className="me-2" />
              <span style={{ cursor: 'pointer' }}> Profile</span>
            </span>
          </CDropdownItem>
        ) : data1 == 'teacher' ? (
          <CDropdownItem onClick={teacher_profilepage}>
            <span className="text-decoration-none pe-auto">
              <CIcon icon={cilUser} className="me-2" />
              <span style={{ cursor: 'pointer' }}>Profile</span>
            </span>
          </CDropdownItem>
        ) : data1 == 'sub-admin' ? (
          <CDropdownItem onClick={adminProfilePage}>
            <span className="text-decoration-none pe-auto">
              <CIcon icon={cilUser} className="me-2" />
              <span style={{ cursor: 'pointer' }}>Admin Profile</span>
            </span>
          </CDropdownItem>
        ) : data1 == 'seller' || data1 == 'student' ? (
          <CDropdownItem onClick={sellerProfile}>
            <span className="text-decoration-none pe-auto">
              <CIcon icon={cilUser} className="me-2" />
              <span style={{ cursor: 'pointer' }}>Seller Profile</span>
            </span>
          </CDropdownItem>
        ) : (
          ''
        )}
        {data1 == 'teacher' ? (
          <CDropdownItem onClick={billinginfo}>
            <span className="text-decoration-none pe-auto">
              <CIcon icon={cilBank} className="me-2" />
              <span style={{ cursor: 'pointer' }}>Billing Info</span>
            </span>
          </CDropdownItem>
        ) : (
          ''
        )}
        <CDropdownItem
          onClick={data1 == 'super-admin' || data1 == 'sub-admin' ? admin_settings : user_settings}
        >
          <CIcon icon={cilSettings} className="me-2" />
          <span style={{ cursor: 'pointer' }}>Change Password</span>
        </CDropdownItem>

        <CDropdownItem onClick={Logout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          <span style={{ cursor: 'pointer' }}>Logout</span>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
