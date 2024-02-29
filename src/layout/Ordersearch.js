import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import Footer from './Footer'
import Header from './Header'
import Buynow from '../assets/images/orderwith-us/buy-now-wrap.png'
const Ordersearch = () => {
    return (
        <>
            <Header />
            <section className='subscription-outer-wrap py-4 py-md-5'>
                <Container >
                    <Row xs={12} md={12} lg={12}>

                        <div className='d-block d-md-flex'>
                            <h1 className='fw-bold '>Science and Machine Learning </h1>

                            <Button className="apply-btn-wrap button-custom button-subscription my-0 my-lg-3 mb-2 mb-lg-3">
                                Apply Coupon
                            </Button>

                        </div>

                    </Row>


                    <Row>
                        <Col md={12}>

                            <div className='subs-inner-wrap'>
                                <div className='wrap-ist'> <img src={Buynow} className="img-fluid buy-now-img-wrap" alt="buynow" /></div>
                                <div className='wrap-sec'>

                                    <h3 className='mt-2 mt-md-2'>Buy Now</h3>
                                    <div className='border-grey'>
                                        <h5>Price: Rs. 1400 </h5>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus.
                                        </p>
                                        <h6>ISBN-8748474847484</h6>
                                    </div>


                                </div>
                                <div className='wrap-third text-start text-lg-end mt-3'>

                                    <p className='mt-2 mt-md-5'>PRICE : Rs1400</p>
                                    <p>COUPON APPLIED: XBJy5</p>
                                    <p>SAVINGS : Rs200</p>
                                    <p>TOTAL PROCE : Rs 1400</p>
                                    <Button className="  button-custom button-subscription mt-4">
                                        Pay Now
                                    </Button>

                                </div>

                            </div>


                            <div className='book-details pt-4'>
                                <h3 className=''>Book Details
                                </h3>
                                <div className='book-detail-inner-wrap'>


                                    <div>
                                        <ul className='p-0'>
                                            <li><span>Full Title :</span> Lorem ispum (with Videos: Office Hours Printed Access Card)</li>
                                            <li><span>Edition :</span> 11th edition</li>
                                            <li><span>ISBN-13 :</span> 978-1133189701 </li>
                                            <li> <span>Format :</span> Paperback/softback</li>
                                        </ul>

                                    </div>
                                    <div>
                                        <ul className='p-0'>
                                            <li><span>Publisher : </span>CENGAGE Learning (4/1/2013)</li>
                                            <li><span>Copyright :</span> 2014 </li>
                                            <li><span>Dimensions :</span> 8.2 x 9.7 x 0.7 inches</li>
                                            <li><span>Weight :</span>  2.3lbs
                                            </li>
                                        </ul>
                                    </div>
                                </div>




                            </div>
                            <div className='more-info-wrap pt-4'>

                                <h3>
                                    More Info
                                </h3>
                                <p className='description-text-info'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. </p>


                            </div>
                            <div className='publish-info-wrap pt-4'>

                                <h3>
                                Publisher Info
                                </h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo magna et tortor dignissim cursus. </p>


                            </div>
                        </Col>


                    </Row>
                </Container>
            </section>



            <Footer />
        </>


    )
}

export default Ordersearch