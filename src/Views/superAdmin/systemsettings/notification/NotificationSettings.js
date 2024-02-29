import React, { useMemo, useState } from 'react'
import { Col, Card, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { CFormInput, CInputGroup } from '@coreui/react'
import Modal from 'react-bootstrap/Modal'
import DataTable from 'react-data-table-component'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getNotifyAsync } from 'src/store/features/NotificationSlice'
import moment from 'moment'
import BackDashboard from 'src/Views/widgets/BackDashboard'

const NotificationSettings = () => {
  let navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [status, setStatus] = useState('')
  const dispatch = useDispatch()
  const { NotifyMsg } = useSelector((state) => state.Notification)
  const [notifyData, setNotifyData] = useState()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getNotifyAsync({ keyword: keyword, page_size: perPage, page: page, status: status }))
    }, 1000)
    return () => clearTimeout(timer)
  }, [keyword,perPage,page,status])

  useEffect(() => {
    dispatch(getNotifyAsync())
  }, [])

  useEffect(() => {
    if (NotifyMsg) {
      setNotifyData(NotifyMsg?.data?.data)
    }
  }, [NotifyMsg])

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
      style: {},
    },
  }

  const handleSortData = (e) => {
    setStatus(e.target.value)
  }

  const columns = [
    {
      name: 'TITLE',
      selector: (row) => (JSON.parse(row?.data)?.title ? JSON.parse(row?.data)?.title : ''),
      sortable: false,
    },
    {
      name: 'MESSAGE',
      selector: (row) =>
        (
          <div className="overflow-hide text-decoration-none" style={{ width: '450px' }}>
            <p
              className="news-desc"
              dangerouslySetInnerHTML={{ __html: JSON.parse(row?.data)?.message }}
            />
          </div>
        ) || 'N/A',
      sortable: false,
    },
    {
      name: 'CREATED FOR',
      selector: (row) => row?.user_type_name || 'N/A',
      sortable: false,
    },
    {
      name: 'USER',
      selector: (row) => row?.first_name?.concat(row?.last_name) || 'N/A',
      sortable: false,
    },
    {
      name: 'DATE',
      selector: (row) =>
        <span title={row?.created_at}>{moment(row?.created_at).format('MMM Do YY')}</span> || 'N/A',
      sortable: false,
    },
    {
      name: 'STATUS',
      selector: (row) =>
        row?.read_at == null ? (
          <span className="labelbtn-wrap pending-label blk-element-st">Sent</span>
        ) : row?.read_at ? (
          <span className="labelbtn-wrap approve-label blk-element-st">Read</span>
        ) : (
          ''
        ),
      sortable: false,
    },
  ]

  const AddNortification = () => {
    navigate('/notificationSetting/notificationview/')
  }
  const Tablepagination = (page) => {
    setPage(page)
  }
  const handlePerRowsChange = async (per_page) => {
    setPerPage(per_page)
  }

  return (
    <div>
      <BackDashboard />

      <Modal show={deleteModal} backdrop="static" keyword={false} centered>
        <Modal.Body>
          <h4 className="text-center fw-bold fs-5 mt-3"> Are you sure you want to delete?</h4>
        </Modal.Body>
        <div className="d-flex justify-content-center mt-2 mb-4">
          <Button
            className="button-custom mx-2"
            onClick={() => {
              setDeleteModal(false)
            }}
          >
            Yes
          </Button>
          <Button className="button-custom cancel-button" onClick={() => setDeleteModal(false)}>
            No
          </Button>
        </div>
      </Modal>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px' }}>
        <div>
          <Col className="mt-3">
            <Card className="Recent-Users card-bt ">
              <Card.Header className="pb-2" style={{ backgroundColor: '#fff' }}>
                <Row>
                  <Col sm="12" lg="4">
                    {' '}
                    <Card.Title className="mt-1" as="h5">
                      NOTIFICATIONS{' '}
                    </Card.Title>
                  </Col>
                  <Col sm="12" lg="3">
                    {' '}
                    <Form.Select
                      value={status}
                      aria-label="Default select example"
                      onChange={handleSortData}
                      className=" mb-3 mb-lg-0"
                    >
                      <option value="" className="">
                        {' '}
                        All
                      </option>
                      <option value="1">Sent</option>
                      <option value="2">Read</option>
                    </Form.Select>
                  </Col>
                  <Col sm="12" lg="3">
                    {' '}
                    <CInputGroup className="">
                      <CFormInput
                        placeholder="Search"
                        value={keyword}
                        aria-label="Username"
                        onChange={(e) => setKeyword(e.target.value)}
                        aria-describedby="basic-addon1"
                      />
                    </CInputGroup>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-end mt-1">
                      <Button className="add-btn " onClick={AddNortification}>
                        Add
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="px-0·py-2 ">
                <div>
                  <DataTable
                    columns={columns}
                    customStyles={customStyles}
                    data={notifyData ? notifyData : ''}
                    pagination
                    paginationServer
                    paginationTotalRows={NotifyMsg?.data?.total}
                    onChangeRowsPerPage={handlePerRowsChange}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                    onChangePage={Tablepagination}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings
