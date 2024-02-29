import React, { useEffect, useState } from 'react'
import { CFormInput, CInputGroup } from '@coreui/react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {
  getSellerContentListasync,
  getSellerDeleteContentasync,
  sellerUpdateAmountAsync,
} from 'src/store/features/SellAndEarnSlice'
import dlticn from '../assets/images/landing-page/delete-icn-news.svg'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import downloadIcn from '../assets/images/download-icn-wrap.svg'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import DefaultCurrency from 'src/layout/DefaultCurrency'

const SellerContent = () => {
  const navigate = useNavigate()
  const [requestStatus, setRequestStatus] = useState('')
  const [userData, setUserData] = useState(false)
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')
  const dispatch = useDispatch()
  const [addAmount, setAddAmount] = useState(false)
  const [newAmount, setNewAmount] = useState('')
  const teachersData = useSelector((state) => state?.teacher?.teacher)
  const { getSellerContentList } = useSelector((state) => state.sellAndEarn)
  const userTeacher = teachersData?.data
  const bulkLink = process.env.REACT_APP_IMAGE_URL



  useEffect(() => {
    dispatch(getSellerContentListasync({ page: page, per_size: limit }))
  }, [page, limit])

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        toast.success('Status Updated Successfully')
      }, 500)

      setUserData(false)
    }
  }, [userData])

  const handleDeleteModal = (id) => {
    dispatch(getSellerDeleteContentasync(id))
  }

  const handleUpdateAmount = async () => {
    await dispatch(sellerUpdateAmountAsync({ id: addAmount, expected_amount: newAmount }))
    setAddAmount(false)
  }

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
        width: '220px'
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
        <>
          <div
            className={
              row?.is_approved === 2
                ? 'labelbtn-wrap approve-label'
                : row?.is_approved === 0 || row?.is_approved === 1
                ? 'labelbtn-wrap pending-label'
                : row?.is_approved === 3
                ? 'labelbtn-wrap rejected-label'
                : ''
            }
          >
            {row?.is_approved === 2
              ? 'Approved'
              : row?.is_approved === 0 || row?.is_approved === 1
              ? 'Pending'
              : row?.is_approved === 3
              ? 'Rejected'
              : ''}
          </div>
        </>
      ),

      sortable: false,
    },

    {
      name: 'REJECTED REASON',
      selector: (row) => (
        <div style={{width:"1000px"}}>
          <span className="ms-3">
            {row?.is_approved === 3
              ? row.reject_status == 2
                ? 'Highly Priced'
                : row.reject_status == 1
                ? 'Duplicate Content'
                : row.reject_status == 3
                ? row.rejection_reason
                : 'Rejected'
              : 'N/A'}
          </span>
          { row.is_approved == 3 && row.reject_status == 2 || row.reject_status == 3 ? (
            addAmount == row?.id ? (
              <div style={{width:"200px"}}>
                <div className="position-relative">
                  <span className="position-absolute" style={{ top: '7px', left: '6px' }}>
                    <FontAwesomeIcon className="fa-sm" icon={faIndianRupeeSign} />
                  </span>
                  <Form.Control
                    type="text"
                    value={newAmount}
                    onChange={(e) => {
                      const regex = /^\d{0,1000}$/
                      if (regex.test(e.target.value)) {
                        setNewAmount(e.target.value)
                      }
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center my-2">
                  <span className="condensed button-edit edit-bg px-3" onClick={handleUpdateAmount}>
                    Update
                  </span>
                </div>
              </div>
            ) : (
              <span
                className=" condensed button-edit edit-bg px-3 ms-2"
                onClick={() => {
                  setAddAmount(addAmount !== row?.id ? row?.id : '')
                }}
              >
                Change Price
              </span>
            )
          ) : (
            ''
          )}
        </div>
      ),

      sortable: false,
    },
    {
      name: 'CONTENT PRICE',
      selector: (row) => (
        <div className='position-relative'>
        <span className='position-absolute ' style={{top:"1px",left:"6px"}}>
  <DefaultCurrency/>
        </span>
        <span className="ps-3">{row.expected_amount ? row.expected_amount : 'N/A'}</span>
        </div>
      ),
      sortable: true,
    },

    {
      name: 'DOC',
      selector: (row) => (
        <span>

          <a
            className="proof_tab text-decoration-none ms-3 "
            target="_blank"
            rel="noreferrer"
            href={`${bulkLink}${row.path}`}
          >
            <img src={downloadIcn} className="size-icn-wrap" alt="react img" />
          </a>
        </span>
      ),
      sortable: false,
    },

    {
      name: 'ACTION',
      selector: (row) =>
        (
          <div className="d-flex justify-content-center">
          {row?.is_published ==1 ? ''
          :      
          <img
          src={dlticn}
          onClickCapture={() => handleDeleteModal(row.id)}
          className="img-fluid w-50 ms-2 "
          alt="react img"
          />
        }
          </div>
        ) || 'N/A',
      sortable: false,
      // cell:()=><span ></span>
    },
  ]

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }

  let str = 'Join our community of freelance developers'

  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="share" onClick={() => navigate('/seller/dashboard')}>
          <span className="">Back</span>
          <a>
            <FontAwesomeIcon className="fa-xs me-2 " icon={faArrowLeft} />
          </a>
        </div>
      </div>

      <div>
        <Col className="mt-3">
          <Card className="Recent-Users card-bt">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <Row>
                <Col>
                  <Card.Title as="h5">SELLER CONTENT</Card.Title>
                </Col>
                <Col sm="12" lg="3">
                  <Form.Select
                    value={requestStatus}
                    aria-label="Default select example"
                    // onChange={handleToggle}
                    className=""
                  >
                    <option className="text-muted" value="">
                      {' '}
                      All
                    </option>
                    {userTeacher?.teacher_request_status?.map((ele, index) => {
                      return (
                        <option key={index} value={ele?.value}>
                          {' '}
                          {ele?.name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Col>
                <Col>
                  <div className="d-flex justify-content-end">
                    <Link className="button-custom text-decoration-none" to="/seller/add/content">
                      Add
                    </Link>
                  </div>
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
                paginationTotalRows={getSellerContentList?.data?.total}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                onChangePage={Tablepagination}
              />
            </Card.Body>
          </Card>
        </Col>
      </div>
    </>
  )
}

export default SellerContent
