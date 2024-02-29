import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from 'src/Views/widgets/BackButton'
import {
  editQuestionAnswerAsync,
  getQuestionAnswerByIdAsync,
  postQuestionAnswerAsync,
} from 'src/store/features/StudentordersSlice'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const AddQuestionAnswers = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { singleEditQandA } = useSelector((state) => state.StudentOrders)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [validated, setValidated] = useState('')

  useEffect(() => {
    if (singleEditQandA) {
      setQuestion(singleEditQandA?.data?.question)
      setAnswer(singleEditQandA?.data?.answer)
    }
  }, [singleEditQandA])

  useEffect(() => {
    if (id) {
      dispatch(getQuestionAnswerByIdAsync(id ? id : ''))
    }
  }, [id])

  const handleSubmit = async () => {
    setValidated(validate())
    if (Object.keys(validate()).length == 0) {
      if (id) {
        await dispatch(editQuestionAnswerAsync({ id: id, question: question, answer: answer }))
      } else {
        await dispatch(postQuestionAnswerAsync({ question: question, answer: answer }))
      }
      await navigate('/contentmanagement/questionanswer')
    }
  }

  const validate = () => {
    const err = {}
    if (!question) {
      err.question = 'Question is required'
    }
    if (!answer) {
      err.answer = 'Answer is required'
    }
    return err
  }

  return (
    <>
      <BackButton />
      <h3 className="d-flex  mb-3">Add Question&Answer</h3>
      <div className="form-wrapper">
        <div className="edit-subs-card p-5 w-100">
          <div>

              <Col>
                <Form.Group className="mb-3 ">
                  <Form.Label>Question</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      removePlugins: [
                        'EasyImage',
                        'ImageUpload',
                        'MediaEmbed',
                        'Table',
                        'indent,indentlist,indentblock',
                      ],
                    }}
                    onChange={(e, editor) => setQuestion(editor?.getData())}
                    data={question}
                  />

                  <p className="text-danger">{validated?.question}</p>
                </Form.Group>
              </Col>
              <Col >
                <Form.Group className="mb-3">
                  <Form.Label>Answer</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      removePlugins: [
                        'EasyImage',
                        'ImageUpload',
                        'MediaEmbed',
                        'Table',
                        'indent,indentlist,indentblock',
                      ],
                    }}
                    onChange={(e, editor) => setAnswer(editor?.getData())}
                    data={answer}
                  />

                  <p className="text-danger">{validated?.answer}</p>
                </Form.Group>
              </Col>
         

            <Button
              className="d-flex  button-custom button-subscription"
              variant="primary"
              onClick={handleSubmit}
            >
              {id ? 'Update' : 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddQuestionAnswers
