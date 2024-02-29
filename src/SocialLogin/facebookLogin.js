  import React from 'react'
  import { useEffect } from 'react'
  import { useState } from 'react'
  import { Button, Form, Modal } from 'react-bootstrap'
  import FacebookLogin from 'react-facebook-login'
  import { useDispatch, useSelector } from 'react-redux'
  import { toast } from 'react-toastify'
  import { fbCheckAsync, fbResponse, registerSocial } from 'src/store/features/AuthSlice'
  import { clearAllState } from 'src/store/features/AuthSlice'
  import facebook from '../assets/images/facebook.svg'

  export default function FacebookLoginCustom(props) {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('')
    const { checkEmail } = useSelector((state) => state.auth)
    const { fbstatus } = useSelector((state) => state.auth)
    const { fbResponseData } = useSelector((state) => state.auth)
    const [responseData, setResponseData] = useState('')
    const [sendData, setSendData] = useState(false)
    const data1 = props


    const dispatch = useDispatch()

    const responseFacebook = (response) => {
        setResponseData(response)
        dispatch(fbResponse(response))
    }

    const handleSubmit = async () => {
      setSendData(true)
    }

    // // call api on entring email Id

    useEffect(() => {
      if (sendData) {
        setShow(false)
        dispatch(
          registerSocial({
            email: email,
            name: fbResponseData?.name,
            user_type: data1?.userType,
            social_type: 'facebook',
            facebook_id: fbResponseData?.id,
          }),
        )
        dispatch(clearAllState())
      }
    }, [sendData])

    useEffect(() => {
      if (responseData && responseData.email) {
        // call api on we got email Id from FB api
        dispatch(
          registerSocial({
            email: responseData?.email,
            name: responseData?.name,
            user_type: data1?.userType,
            social_type: 'facebook',
            facebook_id: responseData?.id,
          }),
        )
      }
       else if (responseData && !responseData.email) {
        dispatch(fbCheckAsync(responseData?.id))
      }
    }, [responseData])

    const handleChange = (e) => {
      setEmail(e.target.value)
    }

    useEffect(() => {
      if (checkEmail?.data?.email && fbstatus == 200) {
        console.log(checkEmail,"datatttt")
        // call api on we got email Id from database api
        dispatch(
          registerSocial({
            email: checkEmail?.data?.email,
            name: checkEmail?.data?.name,
            user_type: data1?.userType,
            social_type: checkEmail?.data?.social_type,
            facebook_id: checkEmail?.data?.facebook_id,
          }),
        )
        dispatch(clearAllState())
      }
      else if (fbstatus === 500 ) {
        setShow(true)
        if(!fbResponseData?.id){
          setShow(false)
        }
        toast.error('Your Email is not exist, Please enter your email')
        dispatch(clearAllState())
      }
    }, [checkEmail, fbstatus , fbResponse])


    return (
      <>
        <Modal centered show={show} onHide={() => setShow(false)}>
          <div className="d-flex justify-content-between p-3">
            <h6 className="text-center">Please Enter Your Email</h6>
            <button
              type="button"
              className="btn-close"
              data-coreui-dismiss="modal"
              aria-label="Close"
              onClick={() => setShow(false)}
            ></button>
          </div>
          <Modal.Body>
            <div className="d-flex justify-content-center">
              <div>
                <Form.Control
                  className="my-3"
                  type="email"
                  onChange={handleChange}
                  placeholder="Enter email"
                />
                <div className="d-flex justify-content-center">
                  <Button className="button-custom" onClick={handleSubmit}>
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <FacebookLogin
          scope="public_profile,email"
          appId="221534943711653"
          autoLoad={false}
          fields="name,email"
          callback={responseFacebook}
          icon={facebook}
          textButton=""
          cssClass="facebook_icon"
        />
      
      </>
    )
  }
