import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import sciencemac from '../../assets/images/landing-page/science-machine.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CButton, CModal, CModalBody, CModalHeader } from '@coreui/react'
import { getStudentManageSearchAsync } from 'src/store/features/Studentsubscriptionslice'
import { buyNowContentAsync, clearAllState } from 'src/store/features/MainPageContentSlice'

const Document = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [visible, setVisible] = useState(false)
  const { searchedList } = useSelector((state) => state.mainPageContent)
  const { studentPlan } = useSelector((state) => state?.getStudentPlans)
  const { content_buy } = useSelector((state) => state.mainPageContent)
  const { name } = useParams()
  const [doc, setDoc] = useState('')
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))

  useEffect(() => {
    setDoc(studentPlan?.data?.data)
  }, [studentPlan])

  const [id, setId] = useState()
  const handleDocSearch = async (e) => {
    setId(e)
    setVisible(!visible)
  }

  useEffect(() => {
    if (name && id) {
      dispatch(getStudentManageSearchAsync({ id: id, keyword: name }))
    }
  }, [id, name,dispatch])

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



  return (
    <Container>
      <Row xs={1} xl={3} className="g-5 text-mb-center align-items-stretch">
        {searchedList?.data?.data?.content?.map((ele, index) => {
          
          return (
            <Col className="border-0" key={index}>
              <Card className="border-0 p-3 h-100">
                <Card.Img variant="top" src={sciencemac} className="img-fluid mb-2 " />
                <Card.Body className='position-relative'>
                  <h5 className="mb-2">{ele.name}</h5>
                  <Button
                    onClick={(e) => {
                      handleDocSearch(ele?.id)
                    }}
                    className="button-custom w-100 position-absolute card-custom-position"
                  >
                    <span className='' >Preview</span>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
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
            <h6 className="mb-2 searchfont">{doc?.name}</h6>
        <p className="text-center" dangerouslySetInnerHTML={{ __html: doc?.description +"..." }  }></p>
          </div>
        </CModalBody>
        <div className="d-flex justify-content-center p-2">
          <CButton className="button-custom " onClick={() =>{Token? buyNow(doc.id):navigate('/login')}}>
            Buy Now
          </CButton>
        </div>
      </CModal>
    </Container>
  )
}

export default Document
