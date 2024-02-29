import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { usersDataAsync } from 'src/store/features/userDataslice'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CFormSwitch,
  CInputGroup,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilMagnifyingGlass,} from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const Teachers = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const dashboardData = useSelector((state) => state?.tabledata?.usersData)
  const user = dashboardData?.data?.data?.data

  function handleClick() {
    navigate('/pages/addstudents')
  }

  useEffect(() => {
    dispatch(usersDataAsync())
  },[])



  return (
    <div>
      <h4>All Users Details</h4>
      <div className="d-flex justify-content-end mx-4">
        <CDropdown>
          <CDropdownToggle color="white-50" className="bg-drop">
            All
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem href="#">All</CDropdownItem>
            <CDropdownItem href="#">Students</CDropdownItem>
            <CDropdownItem href="#">Teachers</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CInputGroup className="w-25">
          {/* <CIcon icon={cilFilter}/> */}
          <CFormInput
            placeholder="Filter by status,Subject"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </CInputGroup>
        <CForm className="d-flex w-25">
          <CFormInput type="search" className="me-2" placeholder="By ID,email id" />
          <button
            type="submit"
            style={{ background: 'black', color: '#fff', width: '180px', borderRadius: '10px' }}
          >
            Search
          </button>
        </CForm>
      </div>
      <div>
        <CTable className='mt-5'>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">NAME</CTableHeaderCell>
              <CTableHeaderCell scope="col">GENDER</CTableHeaderCell>
              <CTableHeaderCell scope="col">EMAIL</CTableHeaderCell>
              <CTableHeaderCell scope="col">SUBJECT</CTableHeaderCell>
              <CTableHeaderCell scope="col">CATEGORY</CTableHeaderCell>
              <CTableHeaderCell scope="col">STATUS</CTableHeaderCell>
              <CTableHeaderCell scope="col">ACTION</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
          {user?.map((item, index) =>(
            
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">{item?.id}</CTableHeaderCell>
              <CTableDataCell>{item?.name}</CTableDataCell>
              <CTableDataCell>{item?.gender}</CTableDataCell>
              <CTableDataCell>{item?.email}</CTableDataCell>
              <CTableDataCell>{item?.name}</CTableDataCell>
              <CTableDataCell>{item?.name}</CTableDataCell>
              <CTableDataCell>{item?.is_active}</CTableDataCell>
              <CTableDataCell>
                <div className='d-flex' style={{justifyContent:"space-between"}}>
                  <CIcon size="xl" icon={cilMagnifyingGlass} />
                  <CFormSwitch />
                </div>
              </CTableDataCell>
            </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </div>
  )
}

export default Teachers
