import React, { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {
  getActiveSubscriptionDataAsync,
  getSubscriptionDataAsync,
} from 'src/store/features/Studentsubscriptionslice'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import NavTopBar from 'src/layout/NavTopBar'
import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'
import Footer from 'src/layout/Footer'
import DefaultCurrency from 'src/layout/DefaultCurrency'

const StudentPricing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const date = new Date()
  const currentDate = date.toISOString().substring(0, 10)
  const [data1, setData1] = useState('')
  const secretPass = 'XkhZG4fW2t2W'
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))

  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS?.AES?.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes?.toString(CryptoJS?.enc?.Utf8)))
    }
  }, [checkType])

  const getSubscriptionData = useSelector((state) => state?.getStudentPlans?.getSubscriptionData)

  useEffect(() => {
    if (data1 == 'student' || Token) {
      dispatch(getActiveSubscriptionDataAsync())
    } else {
      dispatch(getSubscriptionDataAsync())
    }
  }, [Token])

  const PlanCheckout = async (e) => {
    if (getSubscriptionData.can_buy_plan == 0) {
      toast.error('You already purchased a Plan')
    } else {
      data1 === 'student' && Token ? await navigate(`/checkout?subscription_id=${e}&order_type=1`) : navigate(`/login`)
    }
  }

  return (
    <div className="pricing-wrap-st">
      <NavTopBar />
      <section className="price-main-wrap">
        <Container>
          <Row xs={1} md={2} lg={2} xl={4} className="g-4 align-items-stretch">
            {getSubscriptionData?.data?.map((item, index) => {
              return (
                <Col key={index}>
                  <div className="pricing-plan p-0 h-100 position-relative">
                    {index == 2 && getSubscriptionData.can_buy_plan != 0 && getSubscriptionData?.user_subscription_plan_id != 3? (
                      <div className="recomend p-2 position-absolute w-100">Recommended</div>
                    ) : (
                      ''
                    )}
                    <div
                      className={
                        item?.subscription_id == 1
                          ? 'plan-cost plan-cost-platinum py-3'
                          : item?.subscription_id == 2
                          ? 'plan-cost plan-cost-diamond py-3'
                          : item?.subscription_id == 3
                          ? 'plan-cost plan-cost-gold py-3'
                          : item?.subscription_id == 4
                          ? 'plan-cost py-3'
                          : ''
                      }
                    >
                      <h2 className="plan-title">{item?.plan_type}</h2>
                      <hr></hr>
                      <p className="plan-price mb-0"><span><DefaultCurrency/></span>{item?.price}</p>
                      <p className="plan-type mb-0">{item?.duration} month</p>
                    </div>
                    <div className="d-flex plan-feature-outer">
                      <ul className="plan-features ">
                        {item?.services?.map((ele, ind) => {
                          return (
                            <li key={ind}>
                              <p className="mb-0 para-wrap-li"> {ele}</p>
                            </li>
                          )
                        })}
                      </ul>
                      {getSubscriptionData.can_buy_plan == 0 && getSubscriptionData?.user_subscription_plan_id == item?.subscription_plan_id ? (
                        <div>
                       
                          <Button
                            className="mx-auto d-block bg-secondary border-0 rounded-pill w-75 py-2"
                            disabled
                          >
                            Current Plan
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={(e) => {
                            PlanCheckout(item.subscription_plan_id)
                          }}
                          className={
                            item?.subscription_id == 1
                              ? 'button-custom platinum-btn  mx-auto d-block mt-4'
                              : item?.subscription_id == 2
                              ? 'button-custom diamond-btn mt-4  mx-auto d-block'
                              : item?.subscription_id == 3
                              ? 'button-custom gold-btn mt-4  mx-auto d-block'
                              : item?.subscription_id == 4
                              ? 'button-custom silver-btn mt-4  mx-auto d-block'
                              : ''
                          }
                        >
                          {' '}
                          JOIN NOW
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Container>
      </section>
      <Footer/>
    </div>
  )
}

export default StudentPricing
