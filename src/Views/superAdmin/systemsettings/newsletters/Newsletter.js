import React, { useState } from 'react'
import { Button, Col, Form, Pagination, Row } from 'react-bootstrap'
import editicn from '../../../../assets/images/landing-page/pen-to-square.svg'
import dlticn from '../../../../assets/images/landing-page/delete-icn-news.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { getNewsLetterAsync, deleteNewsLetterAsync } from 'src/store/features/NewsLetterSlice'
// import { useParams } from 'react-router'
import BackButton from 'src/Views/widgets/BackButton'

const Newsletter = () => {
  const imgurl = process.env.REACT_APP_API_URL + 'storage/app/public/'
  const { newsData } = useSelector((state) => state.NewsLetter)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(8)
  const [deleteId, setDeleteId] = useState([])

  const [delet1, setDelete1] = useState()
  const [deleteModal, setDeleteModal] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNewsLetterAsync({ page: page, page_size: limit }))
  }, [page, limit])

  const checkFunction = async () => {

    if (delet1) {
      await dispatch(deleteNewsLetterAsync(delet1))
      dispatch(getNewsLetterAsync({ page: page, page_size: limit }))
    }
  }



  let navigate = useNavigate()
  const AddNews = () => {
    navigate('/newsletterSetting/addnewsletter')
  }

  const viewLetter = (item) => {
    navigate(`/editnewsLetter/${item}`)
  }

  const handleDeleteModal = (e) => {
    setDeleteModal(true)
    setDelete1(e)
  }

  const handlePrev = () => {
    setPage(page - 1)
  }
  const handleNext = () => {
    setPage(page + 1)
  }

  const pageSize = [6, 12, 18, 24]

  return (
    <>
      <div className="news-letter-wrap">
        <BackButton />
        <div>
          <h5 className="mt-2">Newsletter Template</h5>
        </div>
        <div className="d-flex justify-content-end btn-news-size">
          <Button className="button-custom" onClick={AddNews}>
            Add
          </Button>
        </div>
        <div className="">
          <>
            <div className="inner-news-wrap">
              <Row>
                {newsData?.data?.data.length > 0 && newsData?.data?.data?.map((item, index) => {
                  return (
                    <Col key={index} md="6" lg="4" xl="4" xxl="3">
                      <div className="p-4 inner-newletter-card">
                        <img
                          className="img-fluid mt-3 main-wrap-img"
                          src={imgurl + item?.cover_image_path}
                          alt="react img"
                        />
                        <p className="my-2 fw-bold">{item.title}</p>
                        <p>{item.description}</p>

                        <div className="d-flex justify-content-between">
                          <div>
                            {' '}
                            <p className="fw-bold">{item.date}</p>
                          </div>
                          <div>
                            {' '}
                            <span onClick={(e) => viewLetter(item.id)}>
                              <img src={editicn} className="img-fluid w-25 cursor" alt="react img" />
                            </span>
                            <span>
                              <img
                                src={dlticn}
                                onClickCapture={() => handleDeleteModal(item.id)}
                                className="img-fluid w-25 ms-2 cursor"
                                alt="react img"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </>
        </div>
      </div>

      <div className="d-flex justify-content-end my-5">
        <div className="d-flex text-align-center">
          <span className="d-flex text-align-center ">
            <p
              className="text-secondary  entries space-pegination-wrap"
              style={{ marginTop: '10px' }}
            >
              Enteries per page:
            </p>
            <Form.Select
              className="h-75 ms-2    border-0"
              style={{ width: '100%' }}
              onChange={(e) => setLimit(e.target.value)}
              aria-label="Default select example"
            >
              {pageSize.map((ele, index) => (
                <option key={index} value={ele}>
                  {ele}
                </option>
              ))}
            </Form.Select>
          </span>
          <div className="d-flex justify-content-end mx-3">
            <div style={{ marginTop: '7px' }}>
              {newsData?.data?.from}-{newsData?.data?.total} of {newsData?.data?.total}
            </div>
          </div>
          <Pagination className="border-0 text-secondary me-4">
            {page > 1 ? (
              <Pagination.First onClick={() => setPage(1)} />
            ) : (
              <Pagination.First diasbled />
            )}

            {page > 1 ? <Pagination.Prev onClick={handlePrev} /> : <Pagination.Prev disabled />}

            <Pagination.Item active> {page} </Pagination.Item>
            {page < newsData?.data?.last_page ? (
              <Pagination.Next onClick={handleNext} />
            ) : (
              <Pagination.Next disabled onClick={handleNext} />
            )}

            {newsData?.data?.last_page > page ? (
              <Pagination.Last onClick={() => setPage(newsData?.data?.last_page)} />
            ) : (
              <Pagination.Last disabled />
            )}
          </Pagination>
        </div>
      </div>

      <Modal show={deleteModal} backdrop="static" keyword={false} centered>
        <Modal.Body>
          <h4 className="text-center fw-bold fs-5 mt-3"> Are you sure you want to delete ? </h4>
        </Modal.Body>
        <div className="d-flex justify-content-center mt-2 mb-4">
          <Button
            className="button-custom mx-2"
            onClick={() => {
              checkFunction()
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
    </>
  )
}

export default Newsletter
