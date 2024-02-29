import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { Accordion, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllState, solutionAsync } from 'src/store/features/MainPageContentSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Solution = () => {
  const navigate = useNavigate()
  const { searchedList } = useSelector((state) => state.mainPageContent)
  const { solutiondata } = useSelector((state) => state.mainPageContent)

  const dispatch = useDispatch()
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))

  useEffect(() => {
    if (solutiondata?.data?.is_subscribed == false && solutiondata?.message) {
      toast.error(solutiondata?.message)
      dispatch(clearAllState())
      navigate('/pricing')
    }
  }, [solutiondata])
  const [answerId, setAnswerId] = useState('')

  const handleAnswer = (id, data) => {
    setAnswerId(id)
    if (Token) {
      dispatch(solutionAsync({ id: id, userId: data }))
    } else {
      navigate('/login')
    }
  }
  //v1/view-answer?user_id=16&qa_id=1

  return (
    <Container>
      <Row>
        <div className="py-5 main-acc-wrapper">
          <h2 className="mb-4 fw-bold">Solutions </h2>
          {searchedList?.data?.data?.ques_answ ? (
            <Accordion>
              {searchedList?.data?.data?.ques_answ?.map((ele, index) => {
                return (
                  <Accordion.Item eventKey={index} className="mb-3" key={index}>
                    <Accordion.Header>
                      <p
                        dangerouslySetInnerHTML={{ __html: ele.question.substr(0, 202) }}
                        className="overflow-hidden w-100 text-truncate mt-3 text-wrap"
                        style={{ width: '120px' }}
                        title={ele.question}
                      />
                    </Accordion.Header>
                    <Accordion.Body>
                      <p
                        className="overflow-hidden w-100 text-truncate mt-3 text-wrap"
                        dangerouslySetInnerHTML={
                          answerId == ele.id && solutiondata?.data?.is_subscribed == true
                            ? { __html: solutiondata?.data?.question_answer?.answer }
                            : { __html: ele.answer }
                        }
                      ></p>

                      <button
                        className="text-white ms-2 text-decoration-none bg-transparent border-0"
                        onClick={() => {
                          handleAnswer(ele.id)
                        }}
                      >
                        View Answer
                        <span className="ms-1">
                          <svg
                            width="19"
                            height="16"
                            viewBox="0 0 19 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.7071 8.70711C19.0976 8.31658 19.0976 7.68342 18.7071 7.29289L12.3431 0.928932C11.9526 0.538408 11.3195 0.538408 10.9289 0.928932C10.5384 1.31946 10.5384 1.95262 10.9289 2.34315L16.5858 8L10.9289 13.6569C10.5384 14.0474 10.5384 14.6805 10.9289 15.0711C11.3195 15.4616 11.9526 15.4616 12.3431 15.0711L18.7071 8.70711ZM0 9L18 9V7L0 7L0 9Z"
                              fill="white"
                            />
                          </svg>
                        </span>{' '}
                      </button>
                    </Accordion.Body>
                  </Accordion.Item>
                )
              })}
            </Accordion>
          ) : (
            <p className="text-dark">No Result Found</p>
          )}
        </div>
      </Row>
    </Container>
  )
}

export default Solution
