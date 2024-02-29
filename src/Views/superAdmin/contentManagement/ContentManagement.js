import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  contentAcceptorReject,
  downloadBulkUploadAsync,
  getContentBulkUploadAsync,
  getContentlistAsync,
  getContentRequestAsync,
  getDuplicateContentAsync,
} from 'src/store/features/ContentListSlice'
import { deleteContentByIdAsync } from 'src/store/features/ContentListSlice'
import DataTable from 'react-data-table-component'
import {
  CButton,
  CFormSwitch,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CProgress,
  CProgressBar,
} from '@coreui/react'
import { toast } from 'react-toastify'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import downloadIcn from '../../../assets/images/download-icn-wrap.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

const ContentManagement = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [teacherId, setTeacherId] = useState([])
  const [checked, setChecked] = useState([])
  const [download, setDownload] = useState(false)
  const [check, setCheck] = useState(false)
  const [idData, setIdData] = useState(false)
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')
  const [progress, setProgress] = useState(0)
  const [bulk, setBulk] = useState([])
  const [upload, setUpload] = useState(false)
  const [accept, setAccept] = useState(false)
  const [rejectStatus, setRejectStatus] = useState(false)
  const [rejected, setRejected] = useState('')
  const [other, setOther] = useState('')
  const [rejectId, setRejectId] = useState('')
  const [showDuplicate, setShowDuplicate] = useState(false)
  const [statusErr, setStatusErr] = useState('')
  const [deleteContentId, setDeleteContentId] = useState('')
  const [visibleDelete, setVisibleDelete] = useState(false)
  const getcontent = useSelector((state) => state.getContentdetails?.getcontent?.data?.data)
  const Total = useSelector((state) => state.getContentdetails?.getcontent?.data?.total)
  const { downloadBulk } = useSelector((state) => state.getContentdetails)
  const { contentAcceptorRejectStatus } = useSelector((state) => state.getContentdetails)
  const { duplicateContentList } = useSelector((state) => state.getContentdetails)
  const { bulkdata } = useSelector((state) => state.getContentdetails)

  useEffect(() => {
    if (bulkdata) {
      toast.success(bulkdata?.data?.message)
    }
  }, [bulkdata])

  // const deleteContent = (id) => {
  //   setDeleteContentId(id)
  // }
  console.log(deleteContentId, 'uuuuuuuu')

  const handleDelete = () => {
    dispatch(deleteContentByIdAsync(deleteContentId))
    setTimeout(() => {
      dispatch(
        getContentlistAsync({
          keyword: search,
          status: status,
          page_size: limit,
          page: page,
        }),
      )
    }, 1000)
  }

  const bulkLink = process.env.REACT_APP_IMAGE_URL
  const BulkZipDownload = process.env.REACT_APP_API_URL

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
      style: { width: '150px' },
    },
  }

  const columns = [
    {
      name: 'TITLE',
      selector: (row) => (
        <>
          {row.name ? (
            <div className="mt-3 ">
              <p className="text-black d-inline-block">{row.name}</p>
            </div>
          ) : (
            'N/A'
          )}
        </>
      ),
      sortable: false,
    },
    {
      name: 'Duplicate status',
      selector: (row) => (
        <span className="ms-1">
          {row.is_duplicate == 1 ? (
            <button
              className="condensed button-edit delete-bg  border-0 d-inline-block duplicate-btn-wrap"
              onClick={() => handleShowDuplicate(row.id, row.is_approved)}
            >
              {' '}
              Duplicate{' '}
            </button>
          ) : (
            'N/A'
          )}
        </span>
      ),
      sortable: false,
    },
    {
      name: 'PUBLISHED BY',
      selector: (row) => (row.uploaded_by_admin === 1 ? 'Admin' : 'Seller'),
      sortable: false,
    },
    {
      name: 'WORD COUNT',
      selector: (row) => row.word_count || 'Pending',
      sortable: true,
    },
    {
      name: 'PAGE COUNT',
      selector: (row) => row.page_count || 'Pending',
      sortable: true,
    },
    {
      name: 'CHANGE PAYMENT ',
      selector: (row) => row.page_count || 'Pending',
      sortable: true,
    },
    {
      name: 'CATEGORY',
      selector: (row) =>
        row?.content_category === 1
          ? 'IT'
          : row?.content_category === 2
          ? 'NON IT'
          : '' || 'Pending',

      sortable: true,
    },
    {
      name: 'CONTENT PRICE',
      selector: (row) => (row.expected_amount ? row.expected_amount : 'N/A'),
      sortable: true,
    },
    {
      name: 'PUBLISH STATUS',
      selector: (row) => (
        <div className="">
          <div
            className={
              row?.is_published === 1
                ? 'labelbtn-wrap approve-label'
                : 'labelbtn-wrap rejected-label'
            }
          >
            {row?.is_published === 1 ? 'Published' : 'UnPublished'}
          </div>
        </div>
      ),

      sortable: false,
    },
    {
      name: ' STATUS',
      selector: (row) => (
        <>
          {row?.is_approved === 0 || row?.is_approved === 1 ? (
            <div className="d-flex">
              <span
                id={row?.id}
                onClick={() => {
                  if (row.is_duplicate == 1) {
                    handleAcceptDuplicate(row.id, row.is_approved)
                  } else if (row.is_duplicate != 1) {
                    acceptData(row.id)
                  }
                }}
                href=""
                className="condensed button-edit edit-bg "
              >
                Accept
              </span>
              <span
                id={row?.id}
                disabled={row?.is_published === 1 ? true : false}
                onClick={() => RejectData(row.id)}
                href=""
                className="condensed button-edit delete-bg ms-1"
              >
                Reject
              </span>
            </div>
          ) : (
            <div
              className={
                row?.is_approved === 2
                  ? 'labelbtn-wrap approve-label'
                  : row?.is_approved === 3
                  ? 'labelbtn-wrap rejected-label'
                  : ''
              }
            >
              {row?.is_approved === 2 ? 'Approved' : row?.is_approved === 3 ? 'Rejected' : ''}
            </div>
          )}
        </>
      ),

      sortable: false,
    },

    {
      name: 'PUBLISH & UNPUBLISH Or DOWNLOAD',
      selector: (row, index) =>
        // console.log(row.id,"uu")
        (
          <div className="d-flex">
            <span>
              <a
                className="proof_tab text-decoration-none "
                target="_blank"
                rel="noreferrer"
                href={`${bulkLink}${row.path}`}
              >
                <img src={downloadIcn} className="size-icn-wrap" alt="react img" />{' '}
              </a>
            </span>
            <span className="d-flex mx-2 cursor">
              <CFormSwitch
                className="switch-custom cursor"
                id={row.id}
                disabled={row?.is_approved === 2 ? false : true}
                checked={row?.is_published === 1 ? true : false}
                onChange={(e) => {
                  setTeacherId({ id: row.id, status: row.is_active })
                  if (e.target.checked === true) {
                    setVisible(true)
                  } else if (e.target.checked == false) {
                    setModalVisible(true)
                  }
                }}
              />
            </span>
            <span>
              <CIcon
                icon={cilTrash}
                style={{ color: 'black', cursor: 'pointer' }}
                onClickCapture={() => {
                  setDeleteContentId(row.id)
                  setVisibleDelete(!visibleDelete)
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

  useEffect(() => {
    dispatch(
      getContentlistAsync({
        keyword: search,
        status: status,
        page_size: limit,
        page: page,
      }),
    )
  }, [search, status, limit, page])

  const Toggle = (e) => {
    setStatus(e.target.value)
  }

  const Searchbar = (e) => {
    setSearch(e.target.value)
  }

  const bulkUpload = (e) => {
    let bulkArray = []
    Object.values(e.target.files)?.map((ele, index) => {
      bulkArray[index] = ele
      setUpload(true)
    })
    setBulk(bulkArray)
  }
  const dataObj = (event) => {
    let progressInfosData = Math.round((100 * event.loaded) / event.total)
    setProgress(progressInfosData)
  }

  useEffect(() => {
    if (upload === true) {
      const updateBulk = async () => {
        await dispatch(
          getContentBulkUploadAsync({ file: bulk ? bulk : '', onUploadProgress: dataObj }),
        )
        await dispatch(
          getContentlistAsync({
            keyword: search,
            status: status,
            page_size: limit,
            page: page,
          }),
        )
        await setBulk([])
        await setUpload(false)
      }
      updateBulk()
    }
  }, [upload])

  const handleDownload = () => {
    setDownload(true)
  }

  const handleChange = (row) => {
    let checkedRows = []

    row?.selectedRows.forEach((ele) => {
      checkedRows.push(ele.id)
    })
    setChecked(checkedRows)
  }

  useEffect(() => {
    if (idData == true && checked.length != 0) {
      setTimeout(async () => {
        await dispatch(downloadBulkUploadAsync({ id: checked }))
        await setCheck(true)
        await toast.success('Downloaded Successfully')
      }, 1000)
    }
  }, [idData, checked])

  useEffect(() => {
    if (check) {
      window.location.assign(BulkZipDownload + downloadBulk?.data?.path)
      setDownload(false)
      setCheck(false)
    }
  }, [check])

  const acceptData = async (e) => {
    await dispatch(contentAcceptorReject({ id: e, status: 2 }))
    setAccept(false)
    dispatch(
      getContentlistAsync({
        keyword: search,
        status: status,
        page_size: limit,
        page: page,
      }),
    )
  }
  const [approveId, setApproveId] = useState('')
  const handleAcceptDuplicate = (id) => {
    setApproveId(id)
    setAccept(!accept)
  }
  const handleShowDuplicate = (id, approve) => {
    setApproveId(approve)
    dispatch(getDuplicateContentAsync(id))
    setAccept(false)
    setShowDuplicate(!showDuplicate)
  }

  const RejectData = async (e) => {
    setRejected('')
    setRejectId(e)
    setRejectStatus(!rejectStatus)
  }

  const rejectContent = async () => {
    if (rejected && statusErr == '') {
      await dispatch(
        contentAcceptorReject({
          id: rejectId,
          status: 3,
          reject_status: rejected,
          reject_description: other,
        }),
      )
      setRejectStatus(false)
      dispatch(
        getContentlistAsync({
          keyword: search,
          status: status,
          page_size: limit,
          page: page,
        }),
      )
    } else if (rejected == 3) {
      setStatusErr('Other is Reuired')
    } else {
      setStatusErr('Status is Required')
    }
  }

  return (
    <div>
      <>
        <BackDashboard />
        <Modal show={accept} onHide={handleAcceptDuplicate} centered>
          <Modal.Header closeButton className="border-0">
            {' '}
            Accept Status
          </Modal.Header>
          <Modal.Body>
            <p>This might be a duplicate content. Are you sure you want to approve! </p>

            <button
              className=" text-decoration-none border-0 show-duplicate condensed button-edit edit-bg px-3 "
              onClick={() => handleShowDuplicate(approveId)}
            >
              Show Duplicate Content
            </button>
          </Modal.Body>

          <div className="d-flex justify-content-center my-2">
            <div>
              <Button
                className="btn btn-primary button-custom"
                variant="primary"
                onClick={() => acceptData(approveId)}
              >
                Yes
              </Button>
              <Button
                className="mx-3 btn btn-primary button-custom cancel-button  bg-white"
                onClick={() => setAccept(false)}
              >
                No
              </Button>
            </div>
          </div>
        </Modal>
        <Modal show={showDuplicate} onHide={handleShowDuplicate} centered>
          <Modal.Header closeButton className="border-0">
            Duplicate Content
          </Modal.Header>
          <Modal.Body>
            <p>The Duplicate content we already have. </p>

            <Table striped hover>
              <thead>
                <tr>
                  <th>id</th>
                  <th>title</th>
                  <th>Download</th>
                </tr>
              </thead>
              {duplicateContentList?.data?.map((ele, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{ele.id}</td>
                      <td>{ele.name}</td>
                      <td>
                        <span>
                          <a
                            className="proof_tab text-decoration-none "
                            target="_blank"
                            rel="noreferrer"
                            href={`${bulkLink}${ele.path}`}
                          >
                            <img src={downloadIcn} className="size-icn-wrap" alt="react img" />{' '}
                          </a>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </Table>
          </Modal.Body>
        </Modal>
        <Modal show={rejectStatus} onHide={RejectData} centered>
          <Modal.Header closeButton className="border-0">
            {' '}
            Reject Status
          </Modal.Header>
          <Modal.Body>
            <Form.Select
              onChange={(e) => {
                setStatusErr('')
                setRejected(e.target.value)
              }}
              className="email-input"
              aria-label="Default select example"
            >
              <option>Status</option>
              <option value="1">Duplicate Content</option>
              <option value="2">High Amount</option>
              <option value="3">Other</option>
            </Form.Select>
            <p className="text-danger">{statusErr}</p>

            {rejected == 3 ? (
              <div className="pt-3">
                <label>Other Reason</label>
                <Form.Control
                  required
                  className="email-input  bg-none "
                  value={other}
                  onChange={(e) => {
                    setStatusErr('')
                    setOther(e.target.value)
                  }}
                />
                <p className="text-danger">{statusErr}</p>
              </div>
            ) : (
              ''
            )}
          </Modal.Body>

          <div className="d-flex justify-content-center my-3">
            <div>
              <Button
                className="btn btn-primary button-custom"
                variant="primary"
                onClick={rejectContent}
              >
                Yes
              </Button>
              <Button
                className="mx-3 btn btn-primary button-custom cancel-button  bg-white"
                onClick={RejectData}
              >
                No
              </Button>
            </div>
          </div>
        </Modal>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalBody className="d-flex justify-content-center fw-bold fs-5">
            Are you sure you want to publish the content?
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton
              id="1"
              className="button-custom"
              onClick={(e) => {
                setVisible(false)
                let callApi = async () => {
                  await dispatch(
                    getContentRequestAsync({
                      id: teacherId['id'],
                      status: e.target.id,
                    }),
                  )
                  await dispatch(getContentlistAsync({ keyword: search, status: status }))
                }
                callApi()
                // setProfileData('')
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

        {/* UnBlock */}
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalBody className="d-flex justify-content-center fw-bold fs-5">
            Are you sure you want to unpublish the content?
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton
              id="0"
              className="button-custom"
              onClick={(e) => {
                setModalVisible(false)
                let callApi = async () => {
                  await dispatch(
                    getContentRequestAsync({
                      id: teacherId['id'],
                      status: e.target.id,
                    }),
                  )
                  await dispatch(
                    getContentlistAsync({ keyword: search, uploaded_by_admin: status }),
                  )
                }
                callApi()
                // setProfileData('')
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
        {upload || download ? (
          <div className="position-relative d-flex justify-content-center p-4 ">
            <Card className=" w-50 p-4">
              {/* <h6 className="text-primary text-center">100% Complete</h6> */}
              <CProgress className="mb-3">
                <CProgressBar color="info" variant="striped" value={progress} />
              </CProgress>
            </Card>
          </div>
        ) : (
          ''
        )}

        <Col md={50} xl={50}>
          <Card className="Recent-Users card-bt mt-3">
            <Card.Header style={{ backgroundColor: '#fff' }}>
              <div className="d-flex justify-content-between">
                <Card.Title className="mt-2" as="h5">
                  MANAGE CONTENT
                </Card.Title>
                <Row>
                  <Col xs={12} md={4} lg={2}>
                    <Button className="position-absolute condensed button-edit edit-bg border-0 mt-2 ms-0 ms-lg-0 ms-xl-4">
                      BULK IMPORT
                    </Button>
                    <Form.Control
                      className="input_file_type opacity-0"
                      accept="application/pdf, application/msword,.docx "
                      onChange={(e) => {
                        if (
                          e.target.files[0].type == 'application/pdf' ||
                          e.target.files[0].type ==
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                          e.target.files[0].type == 'application/msword'
                        ) {
                          bulkUpload(e)
                        } else {
                          toast.error('Unsupported file extension')
                        }
                      }}
                      type="file"
                      multiple
                    />
                  </Col>
                  <Col xs={12} md={4} lg={2}>
                    {!checked.length == 0 ? (
                      <Button
                        className="position-absolute condensed button-edit delete-bg mt-2 border-0"
                        onClick={(e) => {
                          handleDownload(e)
                          setIdData(true)
                        }}
                        // onChange={handleMakedApproved}
                      >
                        BULK EXPORT
                      </Button>
                    ) : (
                      <Button
                        className="position-absolute condensed button-edit disabled-bg mt-2 border-0"
                        disabled
                        onClick={(e) => {
                          handleDownload(e)
                          setIdData(true)
                        }}
                        // onChange={handleMakedApproved}
                      >
                        BULK EXPORT
                      </Button>
                    )}

                    {/* <Form.Control className="input_file_type opacity-0 w-25"type="file" /> */}
                  </Col>
                  <Col xs={12} md={12} lg={4}>
                    <Form.Select
                      className="mt-5 mt-md-0 mt-lg-0 mb-3 mb-md-0 mb-lg-0"
                      value={status}
                      onChange={Toggle}
                    >
                      <option className="">All</option>
                      <option className="" value="2">
                        Published
                      </option>
                      <option value="1">UnPublished</option>
                    </Form.Select>
                  </Col>
                  <Col xs={12} md={12} lg={4}>
                    <Form.Control
                      value={search}
                      onChange={Searchbar}
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
                className=""
                columns={columns}
                customStyles={customStyles}
                data={getcontent}
                pagination
                selectableRows
                onSelectedRowsChange={handleChange}
                // progressPending={loading}
                paginationServer
                paginationTotalRows={Total}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
                onChangePage={Tablepagination}
              />
            </Card.Body>
          </Card>
        </Col>
        <CModal visible={visibleDelete} onClose={() => setVisibleDelete(false)}>
          <CModalBody>
            <p className="d-flex justify-content-center fw-bold fs-5">
              Are you sure you want to delete
            </p>
          </CModalBody>
          <CModalFooter className="d-flex justify-content-center border-0">
            <CButton className="button-custom" onClick={() =>{ handleDelete() 
             setVisibleDelete(false)
            }}>
              Yes
            </CButton>
            <CButton
              className="button-custom cancel-button"
              onClick={() => setVisibleDelete(false)}
            >
              No
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    </div>
  )
}

export default ContentManagement
