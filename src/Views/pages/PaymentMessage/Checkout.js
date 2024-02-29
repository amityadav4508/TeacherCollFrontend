import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CheckoutPaymentAsync, getCheckoutPlansAsync } from 'src/store/features/Checkoutplanslice'
import { Button, Form } from 'react-bootstrap'
import { getSubjectList } from 'src/store/features/GetSubjectLsitSlice'
import Loader from 'src/Views/Loader/Loader'
import DefaultCurrency from 'src/layout/DefaultCurrency'

const Checkout = () => {
  const [searchParams] = useSearchParams()
  const order_type = parseInt(searchParams.get('order_type'))
  const assignment_id = parseInt(searchParams.get('assignment_id'))
  const id = parseInt(searchParams.get('subscription_id'))
  const content_id = parseInt(searchParams.get('content_id'))
  const order_id = parseInt(searchParams.get('order_id'))

  const dispatch = useDispatch()
  const { checkoutdetails } = useSelector((state) => state?.CheckoutPlans)
  const { checkoutpayment } = useSelector((state) => state?.CheckoutPlans)
  const { errorMsg } = useSelector((state) => state.CheckoutPlans)
  const { checkplanloading } = useSelector((state) => state.CheckoutPlans)
  const [check, setCheck] = useState(false)
  const [gst,setGst]=useState('')

  useEffect(() => {
    dispatch(getSubjectList())
  }, [])

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg)
    }
  }, [errorMsg])

  useEffect(() => {
    const buyPlan = {
      subscription_id: id,
      order_type: order_type,
      order_id: order_id,
      gst_claim:gst
    }
    const buySingleAsignment = {
      assignment_id: assignment_id,
      order_type: order_type,
      order_id: order_id,
      gst_claim:gst
    }
    const buyContent = {
      content_id: content_id,
      order_type: order_type,
      order_id: order_id,
      gst_claim:gst
    }
    let data = {}
    if (order_type == 1) {
      data = buyPlan
    } else if (order_type == 2) {
      data = buySingleAsignment
    } else if (order_type == 3) {
      data = buyContent
    }

    dispatch(getCheckoutPlansAsync(data))
  }, [])

  const [status, setStatus] = useState(false)

  const Payment = () => {
    const buyPlan = {
      subscription_id: id,
      order_type: order_type,
      rewards: check ? checkoutdetails?.data?.rewards : 0,
      order_id: order_id,
      gst_claim:gst
    }
    const buySingleAsignment = {
      assignment_id: assignment_id,
      order_type: order_type,
      rewards: check ? checkoutdetails?.data?.rewards : 0,
      order_id: order_id,
      gst_claim:gst
    }
    const buyContentAsignment = {
      content_id: content_id,
      order_type: order_type,
      rewards: check ? checkoutdetails?.data?.rewards : 0,
      order_id: order_id,
      gst_claim:gst
    }

    dispatch(
      CheckoutPaymentAsync(
        order_type == 1
          ? buyPlan
          : order_type == 2
          ? buySingleAsignment
          : order_type == 3
          ? buyContentAsignment
          : '',
      ),
    )
    setStatus(true)
  }

  useEffect(() => {
    if (checkoutpayment?.data?.url && status) {
      window.open(checkoutpayment?.data?.url)
    }
  }, [checkoutpayment])
  return (
    <section className="order-cec-outer-st">
      {checkplanloading ? (
        <div className=" d-flex justify-content-center zIndex load-custom ">
          <Loader />
        </div>
      ) : (
        ''
      )}
      <div className="container rounded bg-white">
        <div className="oerder-inner-check py-5">
          <div className="row d-flex justify-content-center pb-5 order-now-price">
            <div className="col-sm-12 col-md-5 ml-1">
              <div className="py-4 d-flex flex-row">
                <h5>
                  {checkoutdetails?.data?.assignment_id ? (
                    <span>{checkoutdetails?.data?.assignment_id}</span>
                  ) : (
                    ''
                  )}
                  {''}
                </h5>
              </div>

              <h4
                className={
                  checkoutdetails?.data?.plan_type == 'Gold'
                    ? 'gold'
                    : checkoutdetails?.data?.plan_type == 'Diamond'
                    ? 'diamond11'
                    : checkoutdetails?.data?.plan_type == 'Silver'
                    ? 'silver'
                    : checkoutdetails?.data?.plan_type == 'Platinum'
                    ? 'platinum'
                    : ''
                }
              >
                <DefaultCurrency />{' '}
                {check
                        ? (parseFloat(checkoutdetails?.data?.total_amount) + parseFloat(checkoutdetails?.data?.tax) - parseFloat(checkoutdetails?.data?.rewards)).toFixed(2)
                        : (parseFloat(checkoutdetails?.data?.total_amount) + parseFloat(checkoutdetails?.data?.tax)).toFixed(2)}
              </h4>
              <h4>{checkoutdetails?.data?.plan_type}</h4>
              <div>
                {checkoutdetails?.data?.services?.map((ele, ind) => {
                  return (
                    <div key={ind}>
                      <p>
                        <b>{ele}</b>
                      </p>
                    </div>
                  )
                })}
              </div>
              <hr />
              {checkoutdetails?.data?.question ? (
                <div className="d-flex">
                  <span className="fs-6 fw-bold">Question:</span>
                  <span className="pl-2 px-1">{checkoutdetails?.data?.question}</span>
                </div>
              ) : (
                ''
              )}
              {checkoutdetails?.data?.word_count ? (
                <div className="d-flex">
                  <span className="fs-6 fw-bold">Word Count :</span>
                  <span className="pl-2 px-1">{checkoutdetails?.data?.word_count}</span>
                </div>
              ) : (
                ''
              )}
              {checkoutdetails?.data?.per_word_rate ? (
                <div className="d-flex">
                  <span className="fs-6 fw-bold">Per Word Rate :</span>
                  <span className="pl-2 px-1">{checkoutdetails?.data?.per_word_rate}</span>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="col-sm-12 col-md-4 offset-md-1 mobile">
              <div className="py-4 d-flex ">
                <h6 className="return-st-cancel">
                  <a className="text-decoration-none text-white" href={process.env.REACT_APP_SERVER_URL}>
                    {' '}
                    <Button className="button-custom">Back</Button>
                  </a>
                  {/* <BackButton /> */}
                  {/* <Link to="/home">Cancel and return to website</Link> */}
                </h6>
              </div>
              <div className="bg-light rounded d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center p-2 ml-3">
                  <h4>Order Recap</h4>
                  <div className="d-flex ">
                    <Form.Check type="checkbox" onClick={() => setCheck(!check)} />
                    <h6 className="ms-1 mt-1 mb-0">Apply Rewards</h6>
                  </div>
                </div>

                <div className="p-2 d-flex">
                  <div className="col-8">Price</div>
                  <div className="ml-auto d-flex align-items-center">
                    <DefaultCurrency />
                    {checkoutdetails?.data?.price || checkoutdetails?.data?.total_amount}
                  </div>
                </div>

                <div className="p-2 d-flex align-items-center">
                  <div className="col-8">Tax (18%)</div>
                  <DefaultCurrency />
                  <div className="ml-auto"> {checkoutdetails?.data?.tax}</div>
                </div>
                <div className="p-2 d-flex align-items-center">
                  <div className="col-8">GST Number</div>
                  <div className="ml-auto"><Form.Control className='ps-3' type="text" onChange={(e)=>{setGst(e.target.value)}}/></div>
                </div>
                {check ? (
                  <div className="p-2 d-flex align-items-center">
                    <div className="col-8">Discount</div>
                    <DefaultCurrency />
                    <div className="ml-auto"> {checkoutdetails?.data?.rewards}</div>
                  </div>
                ) : (
                  ''
                )}
                <div className="p-2 d-flex pt-3">
                  <div className="col-8">
                    <b> Order Total</b>
                  </div>
                  <div className="ml-auto">
                    <DefaultCurrency />
                    <b
                      className={
                        checkoutdetails?.data?.plan_type == 'Gold'
                          ? 'gold'
                          : checkoutdetails?.data?.plan_type == 'Diamond'
                          ? 'diamond11'
                          : checkoutdetails?.data?.plan_type == 'Silver'
                          ? 'silver'
                          : checkoutdetails?.data?.plan_type == 'Platinum'
                          ? 'platinum'
                          : ''
                      }
                    >
                      {check
                        ? (parseFloat(checkoutdetails?.data?.total_amount) + parseFloat(checkoutdetails?.data?.tax) - parseFloat(checkoutdetails?.data?.rewards)).toFixed(2)
                        : (parseFloat(checkoutdetails?.data?.total_amount) + parseFloat(checkoutdetails?.data?.tax)).toFixed(2)}
                    </b>
                    {/* <b className='green'>{checkoutdetails?.data?.price}</b> */}
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            <div className="cart-payment">
              <input
                type="button"
                onClick={Payment}
                value="Proceed to payment"
                className="button-custom mt-5 "
              />
            </div>
          </div>
          {/* {checkplanloading === true ? (
            <div className="d-flex justify-content-center zIndex load-custom">
              <Loader />
            </div>
          ) : (
            ''
          )} */}
        </div>
      </div>
    </section>
  )
}

export default Checkout
