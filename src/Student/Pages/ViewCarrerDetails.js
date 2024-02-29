import React, { useEffect, useState } from 'react'

import { Button, Container, Form } from 'react-bootstrap'
import NavTopBar from 'src/layout/NavTopBar'
import BackButton from 'src/Views/widgets/BackButton'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useDispatch, useSelector } from 'react-redux'
import { getCarrerByIDAsync } from 'src/store/features/sosEmailSlice'
import { postApplyForCarrerAsync } from 'src/store/features/Job&InternshipSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from 'src/Views/Loader/Loader'
import { toast } from 'react-toastify'
import uploadIcon from '../../assets/images/uploadicon.svg'

function ViewCarrerDetails() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const Token = JSON.parse(localStorage.getItem('teacherAuth'))
  const { getCarrerByID } = useSelector((state) => state.sosEmail)
  // const { jobLoading } = useSelector((state) => state.getJobs)
  const { applyCarrerErr } = useSelector((state) => state.getJobs)
  const { applyCarrerstatus } = useSelector((state) => state.getJobs)
  const [resume, setResume] = useState('')
  const [resumerErr, setResumeErr] = useState('')
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    if (applyCarrerstatus == 200) {
      toast.success('Applied successfully')
    } else if (applyCarrerstatus == 500) {
      toast.error(applyCarrerErr)
    }
  }, [applyCarrerstatus, applyCarrerErr])

  useEffect(() => {
    dispatch(getCarrerByIDAsync(id))
  }, [])

  const handleChange = (e) => {
   
    if (
      e.target.files[0].type == 'application/pdf' ||
      e.target.files[0].type == 'application/doc' ||
      e.target.files[0].type == 'application/docx' ||
      e.target.files[0].type == 'application/msword'
    ) {
      setFileName(e.target.files[0].name)
      setResume(e.target.files[0])
    }else{
      toast.error('Please select msword,pdf')
    }
  }





  const handleCarrer = (e) => {
        let formData =new FormData()
    formData.append('resume', resume ? resume : null)
    formData.append('id', e ? e : null)

    if (Token && resume && resumerErr == '') {
      dispatch(
        postApplyForCarrerAsync(formData),
      )
    } else if (!resume) {
      setResumeErr('Please select doc')
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <NavTopBar />
      <div className="p-3">
        <BackButton />
      </div>

      <Container>
        {/* {jobLoading ? (
          <div className=" d-flex justify-content-center zIndex load-custom ">
            <Loader />
          </div>
        ) : (
          ''
        )} */}
        <Row>
          <Col className="mx-auto" md={6}>
            <ul className="list-unstyled p-5 career-st-form border-0 mb-5">
              <li className="fs-4 fw-bold"> {getCarrerByID?.data?.title} </li>
              <li>
                <span className="fw-bold">Skill Required : </span>
                {getCarrerByID?.data?.skills}
              </li>
              <li>
                <span className="fw-bold">Experience :</span>
                {getCarrerByID?.data?.experience} Years
              </li>
              <li>
                <span className="fw-bold">Salary :</span> {getCarrerByID?.data?.salary}
              </li>
              <li>
                <span className="fw-bold">Currency :</span> {getCarrerByID?.data?.currency}
              </li>
              <li>
                <span className="fw-bold">Contact at :</span> {getCarrerByID?.data?.recruiter_email}
              </li>
              <li>
                <span className="fw-bold mb-3 d-block"> Work Description</span>
                <span dangerouslySetInnerHTML={{ __html: getCarrerByID?.data?.description }} />
              </li>
              <li>
                <div className="me-2 w-100  border rounded position-relative d-flex align-items-center">
                  {fileName ? (
                    <h6
                      id="id_name"
                      className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide "
                    >
                      {fileName}
                    </h6>
                  ) : (
                    <h6
                      id="id_name"
                      className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide "
                    >
                      Upload<span className="fw-bold ms-1">Resume</span>
                    </h6>
                  )}

                  <Form.Control
                    className="input_file_type opacity-0"
                    accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                              text/plain, application/pdf "
                    type="file"
                    onChange={handleChange}
                  />
                  <img className="me-2" src={uploadIcon} alt="react img" />
                </div>
                <p className="text-danger fs-6">{resumerErr}</p>
              </li>
              <div className="text-center mt-5">
                <Button
                  className="button-custom "
                  onClick={(e) => handleCarrer(getCarrerByID?.data?.id)}
                >
                  Apply Now
                </Button>
              </div>
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ViewCarrerDetails
