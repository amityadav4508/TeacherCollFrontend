import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { manageAdminAsync } from 'src/store/features/ManageAdminSlice'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import DataTable from 'react-data-table-component'
import userframe from '../../../assets/images/user-frame.svg'
import editicn from '../../../assets/images/landing-page/pen-to-square.svg'

const ManageAdmin = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')

  const dashboardData = useSelector((state) => state?.adminData?.admin)

  const manageAdmin = dashboardData?.data?.data

  function handleClick() {
    navigate('/pages/addstudents')
  }

  useEffect(() => {
    dispatch(manageAdminAsync({ page_size: limit, page: page }))
  }, [limit, page])

  const customStyles = {
    rows: {
      style: {},
    },
    headCells: {
      style: {
        fontSize: '13px',
        fontWeight: '700',
      },
    },
    cells: {
      style: {
        width: '10px',
      },
    },
  }
  const columns = useMemo(() => [
    {
      name: <span className="fw-bold">PROFILE</span>,
      selector: (row) =>
        (
          <img
            src={userframe}
            className="size-icn-wrap"
            alt="react img"
            style={{ marginLeft: '10px' }}
          />
        ) || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold"> NAME</span>,
      selector: (row) => row.name || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold"> Email</span>,
      selector: (row) => row.email || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">CONTACT</span>,
      selector: (row) => row?.contact,
      sortable: true,
    },
    {
      name: <span className="fw-bold">ADDRESS</span>,
      selector: (row) => row.address,

      sortable: false,
    },
    {
      name: <span className="fw-bold">ACTION</span>,
      selector: (row) => (
        <div>
          <img
            src={editicn}
            className="img-fluid edit-size-img  mx-3"
            alt="react img"
            onClick={() => {
              navigate(`/pages/editsubadmin/${row?.id}`)
            }}
          />
        </div>
      ),

      sortable: false,
    },
  ])

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }

  return (
    <>
      <BackDashboard />
      <Card className="Recent-Users card-bt mt-3 subject-management-detail">
        <Card.Header style={{ backgroundColor: '#fff' }}>
          <div className="d-flex justify-content-between">
            <Card.Title as="h5">MANAGE ADMIN</Card.Title>
            <div className="Add">
              <button type="button" className="button-custom " onClick={handleClick}>
                <span className="text-white">Add</span>
              </button>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="px-0·py-2 ">
          <DataTable
            columns={columns}
            customStyles={customStyles}
            data={manageAdmin}
            pagination
            // progressPending={loading}
            paginationServer
            paginationTotalRows={dashboardData?.data?.total}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
            onChangePage={Tablepagination}
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default ManageAdmin
