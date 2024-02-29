import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Instructorimages1 from '../../assets/images/orderwith-us/buy-now-wrap.png'

const data = [
  {
    id: 1,
    title: 'Science and Machine Learning Book',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. ',
    images: 'images/orderwith-us/article-2.png',
  },
  {
    id: 2,
    title: 'Science and Machine Learning',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. ',

    date: '13-02-2022',
    stock: 68,
    brand: 'Microsoft Surface',

    images: 'images/orderwith-us/article-3.png',
  },
  {
    id: 3,
    title: 'Science and Machine Learning Book',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. ',

    images: 'images/orderwith-us/article-1.png',
  },
]

const Practicetest = () => {
  return (
    <div className="books-outer-wrap-course main-container bg-wrap">
      <>
        <div className="inner-news-wrap">
          <Container>
            <h2 className="fw-bold py-5">Practice Tests</h2>

            <Row>
              {data?.map((item, index) => {
                return (
                  <Col key={index} md="6" lg="4" xl="4" xxl="4">
                    <div className="p-4 inner-newletter-card">
                      <img
                        className="img-fluid mt-3 main-wrap-img"
                        src={Instructorimages1}
                        alt="contentimg"
                      />
                      <h3 className="my-3 fw-bold">{item.title}</h3>
                      <p className="fw-normal">{item.description}</p>
                    </div>
                  </Col>
                )
              })}
            </Row>
            <div className="d-flex justify-content-end btn-news-size my-5">
              <Button className="button-custom mb-5">View All</Button>
            </div>
          </Container>
        </div>
      </>
    </div>
  )
}

export default Practicetest
