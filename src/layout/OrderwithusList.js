import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Pagination,Form } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import sciencemac from '../assets/images/landing-page/science-machine.png'
import Content from '../assets/images/landing-page/article-3.png'
import { CButton, CModal, CModalBody, CModalHeader } from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getStudentContentAsync,
  getStudentManageSearchAsync,
  getContentListAsync,
} from 'src/store/features/Studentsubscriptionslice'
import { useNavigate } from 'react-router-dom'
import { buyNowContentAsync } from 'src/store/features/MainPageContentSlice'
import { clearAllState } from 'src/store/features/MainPageContentSlice'
import NavTopBar from './NavTopBar'
import BackButton from 'src/Views/widgets/BackButton'

const OrderwithusList = () => {
  const navigate = useNavigate()
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const { studentContent } = useSelector((state) => state.getStudentPlans)
  const [bookPurchase, setBookPurchase] = useState('')
  const [doc, setDoc] = useState('')
  const { content_buy } = useSelector((state) => state.mainPageContent)
  const {studentPlan} = useSelector((state) => state?.getStudentPlans)
  const { ContentlistStats } = useSelector((state) => state?.getStudentPlans)

  const [id, setId] = useState('')


  // useEffect(() => {
  //   setDoc(studentPlan?.data?.data)
  // }, [studentPlan])
  const [visible, setVisible] = useState(false)
  const [limit, setLimit] = useState(6)
  const [page, setPage] = useState(1)
  let index = [0, 1, 2]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStudentContentAsync())
  }, [dispatch])

  useEffect(() => {
    dispatch(getContentListAsync({
      page_size: limit,
      page: page,
    }))
  }, [limit,page])

  useEffect(() => {
    if (studentContent) {
      let arr = []
      studentContent?.data?.data?.content?.length > 0 &&
        studentContent?.data?.data?.content?.filter((ele, ind) => {
          return index?.map((ele1) => {
            if (ele1 == ind) {
              arr.push(ele)
              setBookPurchase(arr)
            }
          })
        })
    }
  }, [studentContent])

  useEffect(() => {
    if (id) {
      dispatch(getStudentManageSearchAsync({ id: id }))
    }
  }, [id, dispatch])

  const buyNow = (id) => {
    dispatch(buyNowContentAsync({ content_id: id }))
  }

  useEffect(() => {
    if (content_buy && content_buy?.data?.data?.proceed_to_payment == 1) {
      navigate(`/checkout?content_id=${content_buy?.data?.data?.content_id}&order_type=3`)
    } else if (content_buy && content_buy?.data?.data?.proceed_to_payment != 1) {
      window.open(process.env.REACT_APP_REDIRECT_URI + content_buy?.data?.data?.url)
      dispatch(clearAllState())
    }
  }, [content_buy])

  const handlePrev = () => {
    setPage(page - 1)
  }
  const handleNext = () => {
    setPage(page + 1)
  }
  const pageSize = [6, 9, 12, 15, 18]


  return (
    <>
      <NavTopBar />
      <p className="text-white">...</p>
      <BackButton />
      <div className="books-outer-practice container">
        <p className="d-none"></p>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader className="border-0" onClose={() => setVisible(false)}></CModalHeader>
          <CModalBody>
            <div className="p-3  bg-white">
              <Card.Img
                style={{ width: '70%', marginLeft: '80px' }}
                variant="top"
                src={sciencemac}
                className="img-fluid mb-2 "
              />
              <h6 className="mb-2 searchfont">{studentPlan?.data?.data?.name}</h6>
              <p
                className="text-center"
                dangerouslySetInnerHTML={{ __html: studentPlan?.data?.data?.description + '...' }}
              ></p>
            </div>
          </CModalBody>
          <div className="d-flex justify-content-center p-2">
            <CButton
              className="button-custom "
              onClick={() => {
                Token ? buyNow(studentPlan?.data?.data.id) : navigate('/login')
              }}
            >
              Buy Now
            </CButton>
          </div>
        </CModal>
        <div className="inner-news-wrap">
          <h2 className="fw-bold py-5"> Content List</h2>

          <Container>
            <Row xs={12} md={3} lg={12} className="align-items-stretch">
              {ContentlistStats?.data?.length > 0 &&
                ContentlistStats?.data?.map((ele, index) => {
                  return (
                    <Col className="border-0 mb-5" key={index}>
                      <Card className="border-0 p-3 h-100">
                        <Card.Img variant="top" src={Content} className="img-fluid mb-2 " />
                        <Card.Body className="position-relative">
                          <h5 className="mb-3 fs-5 spacing-custom-height">{ele.name}</h5>

                          <Button
                            className="button-custom w-100 order-custom-position content-btn-wrap"
                            onClick={(e) => {
                              setId(ele.id)
                              setVisible(true)
                            }}
                          >
                            Preview
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })}
            </Row>
          </Container>
        </div>
       
      </div>
      <div className="d-flex justify-content-end mb-4">
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
          <div className="d-flex justify-content-end">
            <div style={{ marginTop: '7px' }}>
            {ContentlistStats?.from}-{ContentlistStats?.to} of {ContentlistStats?.total}
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
            {page < ContentlistStats?.last_page ? (
              <Pagination.Next onClick={handleNext} />
            ) : (
              <Pagination.Next disabled onClick={handleNext} />
            )}

            {ContentlistStats?.last_page > page ? (
              <Pagination.Last onClick={() => setPage(ContentlistStats?.last_page)} />
            ) : (
              <Pagination.Last disabled />
            )}
          </Pagination>
        </div>
      </div>
    </>
  )
}

export default OrderwithusList
