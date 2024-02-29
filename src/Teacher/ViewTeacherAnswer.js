import React, { useEffect } from 'react'
import { getAnswerbyIdAsync } from 'src/store/features/TeachermanageorderSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import BackButton from 'src/Views/widgets/BackButton'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CCard } from '@coreui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
const ViewTeacherAnswer = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { getAssignmentAnswerByID } = useSelector((state) => state?.Teacherassignment)
  useEffect(() => {
    dispatch(getAnswerbyIdAsync(id))
  }, [])
  return (
    <>
      <div>
        <CCard className="border-0 p-5 mt-3 answer-history-wrapper">
          <div className="">
            <BackButton />
          </div>
          <div className="">
            <h6 className="fw-bold fs-5"></h6>
          </div>
          <Row className="my-3 inner-wrap-sizes">
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2">Assignment ID:</span>
                {getAssignmentAnswerByID?.data?.data?.assignment_id}
              </h3>
            </Col>
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2"> Due Date:</span>
                {getAssignmentAnswerByID?.data?.data?.due_date}
              </h3>
            </Col>
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2">Answered on:</span>
                {getAssignmentAnswerByID?.data?.data?.answered_on_date}
              </h3>
            </Col>
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2">Number of Words:</span>
                {getAssignmentAnswerByID?.data?.data?.word_count}
              </h3>
            </Col>
          </Row>
          <Row className="my-3 inner-wrap-sizes">
           
            <Col xs={12} md={6} lg={6} xl={3}>
              <h3>
                <span className="me-2"> Category:</span>

                {getAssignmentAnswerByID?.data?.data?.category == 1
                  ? 'IT Coding'
                  : getAssignmentAnswerByID?.data?.data?.category == 2
                  ? 'Non-IT'
                  : getAssignmentAnswerByID?.data?.data?.category == 3
                  ? 'IT'
                  : getAssignmentAnswerByID?.data?.data?.category == 4
                  ? 'Others'
                  : ''}
              </h3>
            </Col>
            {getAssignmentAnswerByID?.data?.data?.category == 4 ? (
              <Col xs={12} md={6} lg={6} xl={3}>
                <h3>
                  <span className="me-2">Other Category:</span>{' '}
                  {getAssignmentAnswerByID?.data?.data?.category_other}
                </h3>
              </Col>
            ) : (
              ''
            )}
          </Row>
          <div className="my-4">
              <CKEditor
                config={{
                  removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed', 'Table'],
                }}
                editor={ClassicEditor}
                // onChange={(e, editor) => handleDiscription(editor.getData())}
                data= {getAssignmentAnswerByID?.data?.data?.assignment_answer ? getAssignmentAnswerByID?.data?.data?.assignment_answer :"Answer:"}
              />
            </div>
        </CCard>
      </div>
    </>
  )
}

export default ViewTeacherAnswer
