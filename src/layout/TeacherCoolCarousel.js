import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Col, Container } from 'react-bootstrap'
import Carousel from 'react-multi-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getMainPageContentAsync } from 'src/store/features/MainPageContentSlice'
import sciencemac from '../assets/images/landing-page/science-machine.png'

const TeacherCoolCarousel = () => {
  const dispatch = useDispatch()

  const [list, setList] = useState()

  const { contentList } = useSelector((state) => state.mainPageContent)

  useEffect(() => {
    dispatch(getMainPageContentAsync())
  }, [dispatch])

  useEffect(() => {
    if (contentList) {
      setList(contentList?.data?.data)
    }
  }, [contentList])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }

  return (
    <section className="books-purchases pt-5 slide-landing-page ">
      <h4 className="section-heading mb-5">Books & Notes</h4>

      <Container>
        <Carousel
          indicators={false}
          responsive={responsive}
          autoPlaySpeed={1000}
          infinite={true}
          ssr={true}
          showDots={true}
        >
          {list?.length > 0 &&
            list?.map((ele, index) => {
              return (
                <div key={index}>
                  <Col className="border-0 ">
                    <Card className="border-0 p-3">
                      <Card.Img variant="top" src={sciencemac} className="img-fluid mb-2 " />
                      <Card.Body>
                        <h5 className="mb-2">{ele.name}</h5>

                        <Button className="button-custom w-100">
                          <span>Buy Now</span>
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              )
            })}
        </Carousel>
      </Container>
    </section>
  )
}

export default TeacherCoolCarousel
