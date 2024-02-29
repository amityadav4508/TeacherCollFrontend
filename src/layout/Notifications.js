import React from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import { useDispatch } from 'react-redux'
import { getStarted } from 'src/store/features/PostQuestionSlice'
import { useNavigate } from 'react-router'

const Notifications = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs>
          <div className="form-notification">
            <h4 className="heading mb-3">Feeling stuck?</h4>
            <p className="subtitle">
              Whether you are looking for lecture notes and personalized study or verified practice
              tests, we have got you covered.
            </p>
            <div className="form-section">
              <form className="form-wrapper">
                <input
                  type="text"
                  placeholder="What subject can we help you with?"
                  className="form-control"
                />
                <Button
                  variant="primary"
                  className="btn-submit"
                  onClick={() => {
                    dispatch(getStarted({ stuck: true }))
                    navigate('/home')
                    setTimeout(()=>{
                      dispatch(getStarted({ stuck: false }))
                    },1000)
                  }}
                >
                  {' '}
                  Get Started
                </Button>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Notifications
