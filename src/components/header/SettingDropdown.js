import React from 'react'
import {
  CDropdown,

} from '@coreui/react'
import { Link } from 'react-router-dom'
import settingImage from '../../assets/images/setting.svg'



const NotifiyDropdown = () => {

  return (
    <CDropdown variant="nav-item">
      <Link className='text-decoration-none' to="/setting">
      <img src={settingImage} alt="settingImage" />
      </Link>
    </CDropdown>
  )
}

export default NotifiyDropdown