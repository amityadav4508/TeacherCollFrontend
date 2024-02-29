import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from 'src/Views/widgets/BackButton'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react'
import { CCard } from '@coreui/react'
import {
  bidAssignTeacherAsync,
  getBidAssignmentsIdAsync,
} from 'src/store/features/getAssignmentbyId'
import moment from 'moment'
import DataTable from 'react-data-table-component'
import { useMemo } from 'react'
import eyeIcnframe from '../../../assets/images/eye-icn-fr.svg'
import userframe from '../../../assets/images/user-frame.svg'
import { toast } from 'react-toastify'

const ViewBidAssignments = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [visible, setVisible] = useState(false)
  const [idData, setIdData] = useState()
  const { getAssignmentId } = useSelector((state) => state.AssignmentbyId)
  const { bidAssignTeacher } = useSelector((state) => state.AssignmentbyId)
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')

  useEffect(() => {
    if (bidAssignTeacher) {
      toast.success(bidAssignTeacher.data.message)
    }
  }, [bidAssignTeacher])

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
  const columns = useMemo(() => [
    {
      name: <span className="fw-bold">ASSIGNMENT ID</span>,
      selector: (row) => row.asng_id || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">Teacher Email</span>,
      selector: (row) => row.teacher_email || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">Bid Hours</span>,
      selector: (row) => row.estimated_hours || 'N/A',
      sortable: false,
    },
    {
      name: <span className="fw-bold">ACTION</span>,
      selector: (row) =>
        (
          <>
            {row.assignment_teacher == row.teacher_id ? (
              'Assigned'
            ) : row.assignment_teacher == 0 ? (
              <div className="d-flex">
                <Button
                  className=" condensed button-edit edit-bg border-0 btn btn-primary"
                  onClick={() => {
                    setIdData({ teacher_id: row.teacher_id, assignment_id: row.assignment_id })
                    setVisible(true)
                  }}
                >
                  Accept
                </Button>
              </div>
            ) : (
              ''
            )}
          </>
        ) || 'N/A',
      sortable: false,
    },
  ])

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const Tablepagination = (e) => {
    setPage(e)
  }

  useEffect(() => {
    dispatch(getBidAssignmentsIdAsync({ id: id,  page_size: limit, page: page }))
  }, [id])

  function removeTags(str) {
    if (str === null || str === '') return false
    else str = str?.toString()

    return str?.replace(/(<([^>]+)>)/gi, '')
  }

  return (
    <>
      <div className="p-4">
        <BackButton />
      </div>
      <CModal className="modal-outer" visible={visible} onClose={() => setVisible(false)} centered>
        <CModalHeader className="border-0"></CModalHeader>
        <CModalBody className="d-flex justify-content-center fw-bold fs-5">
          Are you sure you want to Approve?
        </CModalBody>
        <CModalFooter className="d-flex justify-content-center border-0">
          <Button
            id="2"
            className="button-custom"
            onClick={async (e) => {
              setVisible(false)
              await dispatch(bidAssignTeacherAsync(idData))
              await dispatch(getBidAssignmentsIdAsync(id))
            }}
          >
            Yes
          </Button>
          <CButton
            className="button-custom cancel-button"
            color="primary"
            onClick={(e) => {
              setVisible(false)
            }}
          >
            No
          </CButton>
        </CModalFooter>
      </CModal>

      <Card>
        <Card.Body className="px-0·py-2 data-custom ">
          <DataTable
            columns={columns}
            customStyles={customStyles}
            data={getAssignmentId?.data?.data?.data}
            pagination
            // progressPending={loading}
            paginationServer
            paginationTotalRows={getAssignmentId?.data?.total}
            onChangeRowsPerPage={handlePerRowsChange}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
            onChangePage={Tablepagination}
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default ViewBidAssignments
