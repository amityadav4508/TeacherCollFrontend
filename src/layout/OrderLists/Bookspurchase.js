import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import { useDispatch, useSelector } from 'react-redux'
import { buyNowContentAsync } from 'src/store/features/MainPageContentSlice'
import { CButton, CModal, CModalBody, CModalHeader } from '@coreui/react'
import sciencemac from '../../assets/images/landing-page/science-machine.png'
import { clearAllState } from 'src/store/features/MainPageContentSlice'
import { getStudentManageSearchAsync } from 'src/store/features/Studentsubscriptionslice'
import { Link, useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js'

const Bookspurchase = () => {
  const navigate = useNavigate()
  const { searchedList } = useSelector((state) => state.mainPageContent)
  const { contentList } = useSelector((state) => state.mainPageContent)
  const { studentPlan } = useSelector((state) => state?.getStudentPlans)
  const { content_buy } = useSelector((state) => state.mainPageContent)
  console.log(content_buy,"kkkkkk")
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const dispatch = useDispatch()
  const [id, setId] = useState('')
  const [visible, setVisible] = useState(false)
  const [doc, setDoc] = useState('')
  const [data1, setData1] = useState('')
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const secretPass = 'XkhZG4fW2t2W'
  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS?.AES?.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes?.toString(CryptoJS?.enc?.Utf8)))
    }
  }, [checkType])

  useEffect(() => {
    setDoc(studentPlan?.data?.data)
  }, [studentPlan])

  const [bookPurchase, setBookPurchase] = useState('')
  let index = [0, 1, 2]

  useEffect(() => {
    if (id) {
      dispatch(getStudentManageSearchAsync({ id: id }))
    }
  }, [id, dispatch])

  const buyNow = (id) => {
    return dispatch(buyNowContentAsync({ content_id: id }))
  }

  useEffect(() => {
    if (contentList) {
      let arr = []
      contentList?.data?.data.length > 0 &&
        contentList?.data?.data?.filter((ele, ind) => {
          return index?.map((ele1) => {
            if (ele1 == ind) {
              arr.push(ele)
              setBookPurchase(arr)
            }
          })
        })
    }
  }, [contentList])

  useEffect(() => {
    if (searchedList) {
      let arr = []
      searchedList?.data?.data?.content?.length > 0 &&
        searchedList?.data?.data?.content?.filter((ele, ind) => {
          return index?.map((ele1) => {
            if (ele1 == ind) {
              arr.push(ele)
              setBookPurchase(arr)
            }
          })
        })
    }
  }, [searchedList])

  const handleDocSearch = async (e) => {
    setId(e)
    setVisible(!visible)
  }

  useEffect(() => {
    if (content_buy && content_buy?.data?.data?.proceed_to_payment == 1) {
      navigate(`/checkout?content_id=${content_buy?.data?.data?.content_id}&order_type=3`)
    } else if (content_buy && content_buy?.data?.data?.proceed_to_payment != 1) {
      window.open(process.env.REACT_APP_REDIRECT_URI + content_buy?.data?.data?.url)
      dispatch(clearAllState())
    }
  }, [content_buy])
  console.log(doc, 'docdocdocdoc')
  return (
    <div className="books-outer-wrap container">
      <>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader className="border-0" onClose={() => setVisible(false)}></CModalHeader>
          <CModalBody>
            <div className="p-3  bg-white ">
              <Card.Img
                style={{ width: '70%', marginLeft: '80px' }}
                variant="top"
                src={sciencemac}
                className="img-fluid mb-2 "
              />
              <h6 className="mb-2 searchfont text-wrap">{doc?.name}</h6>
              <p
                className="text-center text-wrap"
                dangerouslySetInnerHTML={{ __html: doc?.description ?  doc?.description + '...' : "Loading" }}
              ></p>
            </div>
          </CModalBody>
          <div className="d-flex justify-content-center p-2">
            <CButton
              className="button-custom"
              onClick={() => {
                console.log(doc.id,"doc77")
                Token ? buyNow(doc.id) : navigate('/login')
              }}
            >
              {doc?.already_buy == true ? 'Download' : 'Buy Now'}
            </CButton>
  
            {Token ? (
                <Button
                  className="button-custom ms-2"
                  onClick={() => {
                    if (data1 == 'teacher') {
                      const secretPass = 'XkhZG4fW2t2W'
                      const data = CryptoJS.AES.encrypt(
                        JSON.stringify('seller'),
                        secretPass,
                      ).toString()
                      localStorage.setItem('checkType', JSON.stringify(data))
                      setTimeout(() => {
                        navigate('/seller/dashboard')
                      }, 100)
                    }
                    setTimeout(() => {
                      navigate('/seller/dashboard')
                    }, 1000)
                  }}
                >
                  Exchange
                </Button>
              ) : (
                <Link className='ms-2 text-decoration-none' to="/seller-login">
                  <Button className="button-custom" onClick={''}>
                  Exchange
                  </Button>
                </Link>
              )}
      
          </div>
        </CModal>
        <h2 className="fw-bold">Books & Notes</h2>
        <div className="inner-news-wrap news-wrap-outer-custom">
          <Container>
            {searchedList ? (
              <Row xs={1} xl={3} className="g-5 text-mb-center align-items-stretch">
                {bookPurchase.length > 0 &&
                  bookPurchase?.map((ele, index) => {
                    return (
                      <Col className="border-0" key={index}>
                        <Card className="border-0 p-3 h-100">
                          <Card.Img variant="top" src={sciencemac} className="img-fluid mb-2 " />
                          <Card.Body className="position-relative">
                            <h5 className="mb-2">{ele.name}</h5>

                            <Button
                              className="button-custom w-100 position-absolute card-custom-position"
                              onClick={(e) => {
                                handleDocSearch(ele?.id)
                              }}
                            >
                              <span>Preview</span>
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })}
              </Row>
            ) : (
              <Row xs={1} xl={3} className="g-5 text-mb-center align-items-stretch">
                {bookPurchase.length > 0 &&
                  bookPurchase?.map((ele, index) => {
                    return (
                      <Col className="border-0" key={index}>
                        <Card className="border-0 p-3">
                          <Card.Img variant="top" src={sciencemac} className="img-fluid mb-2 " />
                          <Card.Body className="position-relative">
                            <h5 className="mb-2">{ele.name}</h5>

                            <Button className="button-custom w-100 position-absolute card-custom-position">
                              <span
                                onClick={(e) => {
                                  handleDocSearch(ele?.id)
                                }}
                              >
                                Preview
                              </span>
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })}
              </Row>
            )}
          </Container>
        </div>
     
      </>
    </div>
  )
}

export default Bookspurchase
