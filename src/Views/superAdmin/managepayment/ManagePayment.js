import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { managePaymentAsync } from '../../../store/features/ManagepaymentSlice'
import { postBlockAsync } from 'src/store/features/BlockApiSlice'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataTable from 'react-data-table-component'
import 'react-datepicker/dist/react-datepicker.css'
import {
  CButton,
  CFormSwitch,
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import eyeIcnframe from '../../../assets/images/eye-icn-fr.svg'

const ContentManagement = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useDispatch()
  const paymentData = useSelector((state) => state?.managePayment?.getPayment?.data)
  const [teacherId, setTeacherId] = useState('')
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')

  useEffect(() => {
    dispatch(managePaymentAsync({ keyword: keyword, page_size: limit, page: page }))
  }, [keyword,limit,page])

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

  const columns = [
    {
      name: 'Teacher ID',
      selector: (row) => row.teacher_id_number || 'N/A',
      sortable: true,
    },
    {
      name: 'NAME',
      selector: (row) => <span title={row.name}> {row.name}</span> || 'N/A',
      sortable: false,
    },
    {
      name: 'EMAIL',
      selector: (row) => row.email || 'N/A',
      sortable: true,
    },
    {
      name: 'CATEGORY',
      selector: (row) => (row.category == 1 ? 'IT' : row.category == 2 ? 'NON-IT' : ''),
      sortable: false,
    },
    {
      name: 'ASSIGNMENTS',
      selector: (row) => row.assignments_count || 'N/A',
      sortable: false,
    },
    {
      name: 'BLOCKED PAYMENT',
      selector: (row) => (row.is_payment_block == 0 ? 'NO' : 'YES' || 'N/A'),
      sortable: false,
    },
    {
      name: 'ACTION',
      selector: (row, index) =>
        (
          <div className="d-flex">
            <span
              onClick={() => {
                navigate(`/managepayment/paymentinfo/${row.teacher_id}`)
              }}
            >
              <img src={eyeIcnframe} className="size-icn-wrap cursor" alt="react img" />
            </span>
            <span className="d-flex mx-2 cursor">
              <CFormSwitch
                className="switch-manage-color cursor"
                id={row.teacher_id}
                checked={row?.is_payment_block === 1 ? true : false}
                onChange={(e) => {
                  setTeacherId(row.teacher_id)
                  if (e.target.checked === true) {
                    setVisible(true)
                  } else if (e.target.checked == false) {
                    setModalVisible(true)
                  }
                }}
              />
            </span>
          </div>
        ) || 'N/A',
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
        <BackDashboard />

        <CModal visible={visible} onClose={() => setVisible(false)} centered>
          <CModalBody className="d-flex justify-content-center fw-bold fs-5">
            Are you sure you want to block?
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton
              id="1"
              className="button-custom"
              onClick={(e) => {
                setVisible(false)
                let callApi = async () => {
                  await dispatch(
                    postBlockAsync({
                      teacher_id: teacherId,
                      block_status: e.target.id,
                    }),
                  )
                  await dispatch(managePaymentAsync({}))
                }
                callApi()
              }}
            >
              Yes
            </CButton>
            <CButton
              className="button-custom cancel-button"
              color="primary"
              onClick={() => setVisible(false)}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal visible={modalVisible} onClose={() => setModalVisible(false)} centered>
          <CModalBody className="d-flex justify-content-center fw-bold fs-5">
            Are you sure you want to unblock?
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton
              id="0"
              className="button-custom"
              onClick={(e) => {
                setModalVisible(false)
                let callApi = async () => {
                  await dispatch(
                    postBlockAsync({
                      teacher_id: teacherId,
                      block_status: e.target.id,
                    }),
                  )
                  await dispatch(managePaymentAsync({}))
                }
                callApi()
              }}
            >
              Yes
            </CButton>
            <CButton
              className="button-custom cancel-button"
              color="primary"
              onClick={() => setModalVisible(false)}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>

        <Col md={50} xl={50}>
          <Card className="Recent-Users card-bt mt-3">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <div className="d-flex justify-content-between">
                <Card.Title as="h5">MANAGE TEACHERS PAYMENT</Card.Title>
                <Row>
                  <Col>
                    <Form.Control
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Search By Keyword"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </Col>
                </Row>
              </div>
            </Card.Header>
            <Card.Body className="px-0·py-2 ">
              <DataTable
                columns={columns}
                data={paymentData?.data}
                pagination
                customStyles={customStyles}
                paginationTotalRows={paymentData?.total}
                paginationServer
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

export default ContentManagement
