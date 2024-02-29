import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Card, Table, Row } from 'react-bootstrap'
import { getSubscriptionAsync } from 'src/store/features/SubscriptionSlice'
import editicn from '../../../assets/images/landing-page/pen-to-square.svg'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import DataTable from 'react-data-table-component'

const Subscription = () => {
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const dashboardData = useSelector((state) => state?.getSubscription?.getSubscriptionList)

  useEffect(() => {
    dispatch(getSubscriptionAsync())
  }, [dispatch])

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
      name: <span className="fw-bold">Name</span>,
      selector: (row) => row.name || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">SUBSCRIPTION TYPE</span>,
      selector: (row) =>
        row?.subscription_id === 1
          ? 'Platinum'
          : row?.subscription_id === 2
          ? 'Gold'
          : row?.subscription_id === 3
          ? 'Silver'
          : row?.subscription_id === 4
          ? 'Diamond'
          : '' || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">DURATION</span>,
      selector: (row) => row.duration || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">ASSIGNMENT REQUEST</span>,
      selector: (row) => row?.assignment_request,
      sortable: true,
    },
    {
      name: <span className="fw-bold">FILE DOWNLOAD</span>,
      selector: (row) => row.file_download,
      sortable: false,
    },
    {
      name: <span className="fw-bold">ACTION</span>,
      selector: (row) => (
        <div className="d-flex ">
          <img
            src={editicn}
            className="img-fluid edit-size-img  mx-2"
            alt="react img"
            onClick={() => {
              navigate(`/pages/editsubscription/${row?.id}`)
            }}
          />
        </div>
      ),
      sortable: false,
    },
  ])

  return (
    <div>
      <>
        <BackDashboard />

        <Col md={50} xl={50}>
          <Card className="Recent-Users card-bt mt-4">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <Row>
                <Col sm="12" lg="9">
                  <Card.Title as="h5">MANAGE SUBSCRIPTION</Card.Title>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="px-0·py-2 data-custom ">
              <DataTable columns={columns} customStyles={customStyles} data={dashboardData?.data} />
            </Card.Body>
          </Card>
        </Col>
      </>
    </div>
  )
}

export default Subscription
