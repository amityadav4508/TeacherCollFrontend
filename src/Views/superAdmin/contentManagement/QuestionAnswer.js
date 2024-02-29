import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  postBulkQuestionAsync,
  getBulkQuestionAsync,
  clearAllStates,
  deleteQAasync,
} from 'src/store/features/StudentordersSlice'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import editicn from '../../../assets/images/landing-page/pen-to-square.svg'
import dlticn from '../../../assets/images/landing-page/delete-icn-news.svg'

const QuestionAnswer = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(false)
  const { getBulkQuestionAnswer } = useSelector((state) => state.StudentOrders)
  const [deleteId, setDeleteId] = useState('')
  const Total = useSelector((state) => state?.StudentOrders?.getBulkQuestionAnswer?.data?.total)
  const [limit, setLimit] = useState('')
  const [page, setPage] = useState('')
  const [bulk, setBulk] = useState([])
  const [upload, setUpload] = useState(false)


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

  const handleDeleteQA = async () => {
    await dispatch(deleteQAasync(deleteId))
    dispatch(
      getBulkQuestionAsync({
        keyword: keyword,
        page_size: limit,
        page: page,
      }),
    )
    setShow(false)

  }

  const columns = [
    {
      name: 'Questions',
      selector: (row) =>
        (
          <p
            dangerouslySetInnerHTML={{ __html: row.question.substr(0, 200) }}
            className="overflow-hidden w-100 text-truncate mt-3"
            style={{ width: '120px' }}
            title={row.question}
          />
        ) || 'N/A',
      sortable: false,
    },
    {
      name: 'Answers',
      selector: (row) =>
        (
          <div style={{ height: '100px', width: '350px', padding: '3px' }}>
            <div style={{ height: '95px', overflow: 'auto', background: '#fff' }}>
              <p
                dangerouslySetInnerHTML={{ __html: row.answer }}
                className="overflow-hidden w-100 text-truncate mt-3"
                title={row.answer}
              />
            </div>
          </div>
        ) || 'N/A',
      sortable: false,
    },

    {
      name: 'ACTION',
      selector: (row, index) =>
        (
          <div className="d-flex ">
            <span>
              <img
                src={editicn}
                className="size-icn-wrap cursor"
                alt="react img"
                onClick={() => navigate(`/editquestionanswer/${row.id}`)}
              />
            </span>
            <span className='ms-3'>
              <img
                src={dlticn}
                className="size-icn-wrap cursor"
                alt="react img"
                onClick={() => {
                  setShow(true)
                  setDeleteId(row.id)
                }}
              />
            </span>
          </div>
        ) || 'N/A',
      sortable: false,
    },
  ]

  useEffect(() => {
    dispatch(
      getBulkQuestionAsync({
        keyword: keyword,
        page_size: limit,
        page: page,
      }),
    )
  }, [keyword, limit, page])

  const bulkUpload = (e) => {
    let bulkArray = []
    Object.values(e)?.map((ele, index) => {
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
        await dispatch(postBulkQuestionAsync({ file: bulk ? bulk : '', onUploadProgress: dataObj }))
        await dispatch(
          getBulkQuestionAsync({
            keyword: keyword,
            page_size: limit,
          }),
        )
        await setUpload(false)
      }
      updateBulk()
    }
  }, [upload])

  const Tablepagination = (e) => {
    setPage(e)
  }

  const handlePerRowsChange = (e) => {
    setLimit(e)
  }

  const handleClose = () => {
    setShow(false)
  }
  return (
    <div>
      <BackDashboard />

      <Col md={50} xl={50}>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton className="border-0">

          </Modal.Header>
          <Modal.Body>
            <h4 className='ms-4'>Are You sure you want to delete? </h4>
          </Modal.Body>

          <div className="d-flex justify-content-center mt-3 mb-5">
            <div>
              <Button
                className="btn btn-primary button-custom"
                variant="primary"
                onClick={handleDeleteQA}
              >
                Yes
              </Button>
              <Button
                className="mx-3 btn btn-primary button-custom cancel-button  bg-white"
                onClick={handleClose}
              >
                No
              </Button>
            </div>
          </div>
        </Modal>
        <Card className="Recent-Users card-bt mt-3">
          <Card.Header style={{ backgroundColor: '#fff' }}>
            <div className="">
              <Row>
                <Col xs={12} md={4} lg={3}>
                  <Card.Title className="mt-2" as="h5">
                    Question&Answers
                  </Card.Title>
                </Col>
                <Col xs={12} md={4} lg={2}>
                  <Button className="position-absolute condensed button-edit edit-bg border-0 mt-2 ms-0 ms-lg-0 ms-xl-4 px-3">
                    BULK IMPORT
                  </Button>
                  <Form.Control
                    className="input_file_type opacity-0"
                    style={{ width: '120px' }}
                    // accept="application/pdf, application/msword,.docx "
                    type="file"
                    accept=".csv,application/vnd.ms-excel"
                    onChange={(e) => {
                      if (e.target.files[0].type == 'text/csv') {
                        bulkUpload(e.target.files)
                      } else {
                        toast.error('Unsupported file extension')
                      }
                    }}
                  />
                </Col>
                <Col xs={12} md={4} lg={3}>
                  <span>
                    <a
                      className="proof_tab text-decoration-none "
                      target="_blank"
                      rel="noreferrer"
                      href={`${process.env.REACT_APP_API_URL}public/Q&A_sample.csv`}
                    >
                      <Button className="position-absolute condensed px-3 button-edit btn-secondary  border-0 mt-2 ms-0 ms-lg-0 ms-xl-4 ">
                        Download sample file
                      </Button>
                    </a>
                  </span>
                  {/* </Button> */}

                  {/* <Form.Control className="input_file_type opacity-0 w-25"type="file" /> */}
                </Col>
                <Col>
                  <div className="d-flex">
                    <Form.Control
                      value={keyword}
                      onChange={(e) => {
                        setKeyword(e.target.value)
                      }}
                      className="me-3"
                      placeholder="Search By Keyword"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <Button
                      onClick={async () => {
                        await dispatch(clearAllStates())
                        navigate('/addquestionanswer')
                      }}
                      className="mt-1 add-btn"
                    >
                      Add
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Card.Header>
          <Card.Body className="px-0·py-2 ">
            <DataTable
              className="manage-width-content"
              columns={columns}
              customStyles={customStyles}
              data={getBulkQuestionAnswer?.data?.data}
              pagination
              //   onSelectedRowsChange={handleChange}
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
    </div>
  )
}

export default QuestionAnswer
