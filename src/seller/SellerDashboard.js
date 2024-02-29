
import React, { useEffect, useState } from 'react'
import { Col, Card, Table, Row, Button } from 'react-bootstrap'
import '../../node_modules/font-awesome/scss/font-awesome.scss'
import { useDispatch, useSelector } from 'react-redux'
import { CCardImage, CCard, CCardBody } from '@coreui/react'
import dollar from '../assets/images/dollar.svg'
import questionmark from '../assets/images/questionMark.svg'
import chatbox from '../assets/images/chatbox.svg'
import downloadIcn from '../assets/images/download-icn-wrap.svg'
import DataTable from 'react-data-table-component'
import { getSellerContentListasync } from 'src/store/features/SellAndEarnSlice'
import DefaultCurrency from 'src/layout/DefaultCurrency'


const SellerDashboard = () => {
  
const dispatch=useDispatch()
  const { teacherStats } = useSelector((state) => state?.TeacherStats)
  let teacher_Stats = teacherStats?.data?.data
  const { getSellerContentList } = useSelector((state) => state.sellAndEarn)
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')
  const bulkLink = process.env.REACT_APP_IMAGE_URL
  useEffect(() => {
    dispatch(getSellerContentListasync({page:page ,per_size:limit}))
  }, [page,limit])

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
        paddingRight: '0px',
        paddingLeft: '0px',
      },
    },
  }

  const columns = [
    {
      name: 'TITLE',
      selector: (row) => <span className="ms-3">{row.name}</span>,
      sortable: false,
    },
    {
      name: 'PUBLISH STATUS',
      selector: (row) => (
        <div
          className={
            row?.is_published === 1 ? 'labelbtn-wrap approve-label' : 'labelbtn-wrap rejected-label'
          }
        >
          {row?.is_published === 1 ? 'Published' : 'UnPublished'}
        </div>
      ),

      sortable: false,
    },
    {
      name: ' STATUS',
      selector: (row) => (
        <div
          className={
            row?.is_approved === 2
              ? 'labelbtn-wrap approve-label'
              : row?.is_published === 0 || row?.is_approved === 1
              ? 'labelbtn-wrap pending-label'
              : row?.is_approved === 3
              ? 'labelbtn-wrap rejected-label'
              : ''
          }
        >
          {row?.is_approved === 2
            ? 'Approved'
            : row?.is_published === 0 || row?.is_approved === 1
            ? 'Pending'
            : row?.is_approved === 3
            ? 'Rejected'
            : ''}
        </div>
      ),

      sortable: false,
    },

    {
      name: 'DOC',
      selector: (row) => <span>
      <a
        className="proof_tab text-decoration-none ms-3 "
        target="_blank"
        rel="noreferrer"
        href={`${bulkLink}${row.path}`}
      >
        <img src={downloadIcn} className="size-icn-wrap" alt="react img" />
      </a>
    </span>,
      sortable: false,
    },

   
  ]

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }
  return (
    <>
      <div>
      <Row className="align-items-stretch g-4">
      <Col  md={12}  xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex ">
              {/* <img className="img-size"  src={dollar} alt="react img" /> */}
              <span className=" fs-1 currency-icon rounded-circle "><DefaultCurrency/></span>
              <div className="ms-4">
                <h6 className="walllet-spacing">Total earnings</h6>
                <h2 className="price-card">{teacher_Stats?.total_earnings? parseFloat(teacher_Stats?.total_earnings * teacher_Stats?.exchange_rate).toFixed(2):'0'}</h2>
              
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col  md={12}  xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={questionmark} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Total Content Uploaded</h6>
                <h2 className="price-card">{teacher_Stats?.total_assignments}</h2>
                
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col  md={12}  xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={chatbox} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Pending Content</h6>
                <h2 className="price-card">{teacher_Stats?.assignment_answered}</h2>
                
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
        <Col  md={12}  xl={3}>
          <CCard className="border-0 h-100">
            <CCardImage orientation="top" />
            <CCardBody className="d-flex">
              <img className="img-size"  src={chatbox} alt="react img" />
              <div className="ms-4">
                <h6 className="walllet-spacing">Approved Content</h6>
                <h2 className="price-card">{teacher_Stats?.assignment_answered}</h2>
                
                {/* #F5F5F5 */}
              </div>
            </CCardBody>
          </CCard>
        </Col>
      </Row>
      <Row>
        <div className='px-3'>
      <Card className="Recent-Users card-bt mt-4 ">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <Row>
                <Col sm="12" lg="3">
                  <Card.Title as="h5">SELLER CONTENT</Card.Title>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="px-0·py-2 data-custom-wrap-reqst ">
              <DataTable
                className="data-wrap-new"
                columns={columns}
                customStyles={customStyles}
                data={getSellerContentList?.data?.data}
                pagination
                // progressPending={loading}
                paginationServer
                // paginationTotalRows={userTeacher?.total}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                onChangePage={Tablepagination}
              />
            </Card.Body>
          </Card>
        </div>

      </Row>
      </div>
    </>
  )
}

export default SellerDashboard

