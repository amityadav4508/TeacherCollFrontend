import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Container, Row, Tab, Tabs } from 'react-bootstrap'
import Solution from './OrderLists/Solution'
import Instructors from './OrderLists/Instructorcontent'

const OrderWithUs = () => {
  const [key, setKey] = useState('home')
  return (
    <>
      <Header />

       <section className="books-purchases pt-5 ">
        <Container fluid>
          <Row xs={12} md={12} lg={12}>
            <div className=" order-us-wrapper pt-5 justify-content-center">
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Tab eventKey="home" title="All">
                  <Solution />
                  <Instructors />

                </Tab>
                <Tab eventKey="Document" title="Content">
                   <Instructors />
                </Tab>
                <Tab eventKey="contact" title="Solution">
                   <Instructors />
                </Tab>
              
              </Tabs>
            </div>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default OrderWithUs
