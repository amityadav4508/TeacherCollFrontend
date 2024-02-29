import React, { useEffect, useState } from 'react'
import { CDropdown } from '@coreui/react'
import CryptoJS from 'crypto-js'

import { useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import bellImage from '../../assets/images/bell.svg'
import { useSelector } from 'react-redux'

const NotifiyDropdown = () => {
  const navigate = useNavigate()
  const { teacherStats } = useSelector((state) => state?.TeacherStats)
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const secretPass = 'XkhZG4fW2t2W'
  const [data1, setData1] = useState('')

  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS.AES.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
    }
  }, [checkType])

  const adminNotification = () => {
    navigate('/adminnotification')
  }
  const teacherNotification = () => {
    navigate('/teachernotification')
  }

  return (
    <CDropdown variant="nav-item">
      {/* {data1 == 'teacher' ? ( */}
        <span onClick={teacherNotification}>
          <img style={{ cursor: 'pointer' }} src={bellImage} alt="bellimage" size="md" />
          {teacherStats?.data?.data?.notification > 0 ? (
            <label htmlFor="position-relative">
              <Badge className='rounded-circle position-absolute badge-notify ' bg="danger" >{teacherStats?.data?.data?.notification}</Badge>
            </label>
          ) : (
            ''
          )}
        </span>
      {/* ) : (
        ''
      )} */}
    </CDropdown>
  )
}

export default NotifiyDropdown
