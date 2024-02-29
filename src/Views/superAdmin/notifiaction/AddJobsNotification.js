import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import { Form, Button } from 'react-bootstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import BackButton from 'src/Views/widgets/BackButton'
import {
  clearAllState,
  getJobsStatsByIdAsync,
  postJobsStatsAsync,
  postJobsStatsEditAsync,
} from 'src/store/features/Job&InternshipSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddJobsNotification = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const [formError, setFormError] = useState({})
  const [uploadDocs, setUploadDocs] = useState('')
  const [description, setDescription] = useState('')
  const [submit, setSubmit] = useState(false)
  const [jobs, setJobs] = useState({
    title: '',
    positions_count: '',
    recruiter_email: '',
    job_category: '',
    type: '',
    status: '',
    skills: '',
    department: '',
    experience: '',
    currency: '',
    salary: '',
  })
  const { getJobStatsByid } = useSelector((state) => state.getJobs)

  useEffect(() => {
    if (getJobStatsByid) {
      setJobs({
        title: getJobStatsByid?.data?.title,
        positions_count: getJobStatsByid?.data?.positions_count,
        recruiter_email: getJobStatsByid?.data?.recruiter_email,
        job_category: getJobStatsByid?.data?.job_category,
        type: getJobStatsByid?.data?.type,
        status: getJobStatsByid?.data?.status,
        skills: getJobStatsByid?.data?.skills,
        department: getJobStatsByid?.data?.department,
        experience: getJobStatsByid?.data?.experience,
        currency: getJobStatsByid?.data?.currency,
        salary: getJobStatsByid?.data?.skills,
      })
      setDescription(getJobStatsByid?.data?.description)
      setUploadDocs(getJobStatsByid?.data?.document_path)
    }
  }, [getJobStatsByid])

  useEffect(() => {
    if (id) {
      dispatch(getJobsStatsByIdAsync(id))
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, 'dsadasdasd')


    if (name === 'salary') {
      const regex = /^\d{0,14}$/
      if (value === '' || regex.test(value)) {
        setJobs({ ...jobs, [name]: value })
      }
    }  else {
      setJobs({ ...jobs, [name]: value })
    }
  }

  const jobsData = {
    title: jobs?.title,
    positions_count: jobs?.positions_count,
    recruiter_email: jobs?.recruiter_email,
    job_category: jobs?.job_category,
    type: jobs?.type,
    status: jobs?.status,
    skills: jobs?.skills,
    department: jobs?.department,
    experience: jobs?.experience,
    currency: jobs?.currency,
    salary: jobs?.salary,
    description: description,
    document_path: uploadDocs,
  }

  const handleSubmit = () => {
    setFormError(InfoValidation(jobsData))
    setSubmit(true)
  }
  function InfoValidation(val) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const err = {}
    if (!val.recruiter_email) {
      err.recruiter_email = 'Recruiter field is required!'
    }
    if (!regex.test(val.recruiter_email)) {
      err.recruiter_email = 'Recruiter field is required!'
    }
    if (!val.positions_count) {
      err.positions_count = 'Position count is required!'
    }
    if (!val.title) {
      err.jobTitle = 'Job Title is required!'
    }
    if (!val.job_category) {
      err.job_category = 'Category is required!'
    }
    if (!val.type) {
      err.type = 'Job Type is required!'
    }
    if (!val.status) {
      err.status = 'Job Status is required!'
    }
    if (!val.skills) {
      err.skills = 'Skills is required!'
    }
    if (!val.department) {
      err.department = 'Department is required!'
    }
    if (!val.experience) {
      err.experience = 'Experience is required!'
    }
    if (!val.currency) {
      err.currency = 'Currency is required!'
    }
    if (!val.salary) {
      err.salary = 'Salary is required!'
    }
    // if (!val.document_path) {
    //   err.document_path = 'Documents is required!'
    // }
    if (!description) {
      err.description = 'Description is required!'
    }

    return err
  }

  useEffect(() => {
    if (Object.keys(formError).length == 0 && submit) {
      const formData = new FormData()
      formData.append('title', jobsData.title)
      formData.append('positions_count', jobsData.positions_count)
      formData.append('recruiter_email', jobsData.recruiter_email ? jobsData.recruiter_email : '')
      formData.append('job_category', jobsData.job_category)
      formData.append('type', jobsData.type)
      formData.append('status', jobsData.status)
      formData.append('skills', jobsData.skills ? jobsData.skills : '')
      formData.append('department', jobsData.department ? jobsData.department : '')
      formData.append('experience', jobsData.experience ? jobsData.experience : '')
      formData.append('currency', jobsData.currency ? jobsData.currency : '')
      formData.append('salary', jobsData.salary ? jobsData.salary : '')
      formData.append('description', jobsData.description ? jobsData.description : '')
      formData.append('document_path', jobsData.document_path ? jobsData.document_path : '')
      if (id) {
        const editJobs = async () => {
          await dispatch(postJobsStatsEditAsync({ data: formData, id: id }))
          await navigate('/jobsandinternship')
        }
        editJobs()
        setSubmit(false)
      } else {
        const addJobs = async () => {
          await dispatch(postJobsStatsAsync(formData))
          await navigate('/jobsandinternship')
        }
        addJobs()
        setSubmit(false)
      }

      setFormError('')
    }
  }, [formError, submit])

  const CurrencyData = [
    { id: '0', currency: ' INR' },
    { id: '1', currency: ' USD' },
    { id: '2', currency: ' JPY' },
    { id: '3', currency: ' GBP' },
    { id: '4', currency: ' CHF' },
    { id: '5', currency: ' CAD' },
    { id: '6', currency: ' AUD/NZD' },
    { id: '7', currency: ' COP' },
    { id: '8', currency: ' CRC' },
    { id: '9', currency: ' HRK' },
    { id: '10', currency: ' CUP' },
    { id: '11', currency: ' DKK' },
    { id: '12', currency: ' EGP' },
    { id: '13', currency: ' EUR' },
  ]

  const Experience = [
    { id: '0', experience: '0-1' },
    { id: '0', experience: '1-2' },
    { id: '0', experience: '2-4' },
    { id: '0', experience: '4-6' },
    { id: '0', experience: '6+' },
  ]

  const uploadDocsinfo = (e) => {
    if (e.target.files[0].size >= 2000000) {
      toast.error('File size must be less then 2MB')
    } else {
      setUploadDocs(e.target.files[0])
    }
    var documentName = e.target.files[0].name
    document.getElementById('document').innerText = documentName
  }

  return (
    <>
      <BackButton />
      <div className="mt-2">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={12}>
              <Tab.Content className="p-4 pt-1">
                <Tab.Pane eventKey="first">
                  <Row className="bg-white p-4">
                    <Row>
                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              {' '}
                              Job Title <span className="star-icn">*</span>
                            </label>
                            <Form.Control
                              required
                              value={jobs.title}
                              onChange={handleChange}
                              name="title"
                              className="email-input  bg-none "
                              placeholder="Job Title"
                              autoComplete="name"
                            />
                            <p className="text-danger">{formError?.jobTitle}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              No of positions <span className="star-icn">*</span>
                            </label>
                            <Form.Control
                              required
                              className="email-input  bg-none "
                              placeholder="Enter position"
                              autoComplete="name"
                              value={jobs.positions_count}
                              onChange={handleChange}
                              name="positions_count"
                            />
                            <p className="text-danger">{formError?.positions_count}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              Recruiter <span className="star-icn">*</span>
                            </label>
                            <Form.Control
                              required
                              className="email-input  bg-none "
                              placeholder="Enter email"
                              autoComplete="name"
                              value={jobs.recruiter_email}
                              onChange={handleChange}
                              name="recruiter_email"
                            />
                            <p className="text-danger">{formError?.recruiter_email}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              Job category <span className="star-icn">*</span>
                            </label>
                            <Form.Select
                              value={jobs.job_category}
                              aria-label="Default select example"
                              className="email-input  bg-none "
                              placeholder="type"
                              autoComplete="name"
                              onChange={handleChange}
                              name="job_category"
                            >
                              <option value=""></option>
                              <option>Full Time</option>
                              <option>Part Time</option>
                            </Form.Select>
                            <p className="text-danger">{formError?.job_category}</p>
                          </div>
                        </div>
                      </Col>

                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              Job Type <span className="star-icn">*</span>
                            </label>
                            <Form.Select
                              value={jobs.type}
                              onChange={handleChange}
                              name="type"
                              aria-label="Default select example"
                              className="email-input  bg-none "
                              placeholder=" job type"
                              autoComplete="name"
                            >
                              <option value=""></option>
                              <option>Job</option>
                              <option>Internship</option>
                            </Form.Select>
                            <p className="text-danger">{formError?.type}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              {' '}
                              Job opening status <span className="star-icn">*</span>
                            </label>
                            <Form.Select
                              value={jobs.status}
                              onChange={handleChange}
                              name="status"
                              required
                              className="email-input  bg-none "
                              placeholder=" Job opening status"
                              autoComplete="name"
                            >
                              <option value=""></option>
                              <option value="1">Open</option>
                              <option value="2">Closed</option>
                            </Form.Select>
                            <p className="text-danger">{formError?.status}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              {' '}
                              Skills <span className="star-icn">*</span>
                            </label>
                            <Form.Control
                              value={jobs.skills}
                              onChange={handleChange}
                              name="skills"
                              required
                              className="email-input  bg-none "
                              placeholder="Skills"
                              autoComplete="name"
                            />
                            <p className="text-danger">{formError?.skills}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              {' '}
                              Department <span className="star-icn">*</span>
                            </label>
                            <Form.Control
                              value={jobs.department}
                              onChange={handleChange}
                              name="department"
                              required
                              className="email-input  bg-none "
                              placeholder=" Department"
                              autoComplete="name"
                            />
                            <p className="text-danger">{formError?.department}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              {' '}
                              Work Experience <span className="star-icn">*</span>
                            </label>
                            <Form.Select
                              required
                              value={jobs.experience}
                              onChange={handleChange}
                              name="experience"
                              className="email-input  bg-none "
                              placeholder=" work Experience"
                              autoComplete="name"
                            >
                              <option disabled value="">
                                Experience
                              </option>
                              {Experience?.map((ele, ind) => {
                                return <option key={ind}>{ele?.experience}</option>
                              })}
                            </Form.Select>
                            <p className="text-danger">{formError?.experience}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              Currency <span className="star-icn">*</span>
                            </label>
                            <Form.Select
                              value={jobs.currency}
                              onChange={handleChange}
                              name="currency"
                              aria-label="Default select example"
                              className="email-input  bg-none "
                              placeholder=" job type"
                              autoComplete="name"
                            >
                              <option disabled value="">
                                Currency{' '}
                              </option>
                              {CurrencyData?.map((item, indexx) => {
                                return <option key={indexx}>{item?.currency}</option>
                              })}
                            </Form.Select>

                            <p className="text-danger">{formError?.currency}</p>
                          </div>
                        </div>
                      </Col>

                      <Col md="6" lg="4">
                        <div className=" justify-content-between tabs-inner-content mb-3">
                          <div className="me-2 w-100">
                            <label className="fs-6 fw-normal my-1">
                              {' '}
                              Salary <span className="star-icn">*</span>
                            </label>
                            <Form.Control
                              required
                              value={jobs.salary}
                              onChange={handleChange}
                              name="salary"
                              className="email-input  bg-none "
                              placeholder="Salary"
                              type="text"
                              autoComplete="name"
                            />
                            <p className="text-danger">{formError?.salary}</p>
                          </div>
                        </div>
                      </Col>
                      <Col md="6" lg="4" className="position-relative">
                        <Form.Label>Docs</Form.Label>
                        <div className="me-2   border rounded position-relative d-flex align-items-center ">
                          <h6
                            id="document"
                            className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide"
                          >
                            Upload<span className="fw-bold ms-1">Documents</span>
                          </h6>
                          <Form.Control
                            className="input_file_type opacity-0"
                            accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                              text/plain, application/pdf"
                            type="file"
                            name="document_path"
                            files={uploadDocs}
                            onChange={uploadDocsinfo}
                          />
                        </div>

                        {/* <p className="text-danger">{formError?.document_path}</p> */}
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6" lg="12">
                        <div className="me-2 w-100">
                          <label className="label-expert-st  mb-2">
                            Description <span className="star-icn">*</span>
                          </label>
                          <CKEditor
                            onChange={(e, editor) => setDescription(editor?.getData())}
                            config={{
                              removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed', 'Table'],
                            }}
                            editor={ClassicEditor}
                            data={description ? description : ''}
                          />
                        </div>
                        <p className="text-danger">{formError.description}</p>
                      </Col>
                    </Row>

                    <Row>
                      <div className="d-flex justify-content-end mt-4 ">
                        {id ? (
                          <Button className="button-custom text-white me-3" onClick={handleSubmit}>
                            Edit Submit
                          </Button>
                        ) : (
                          <Button className="button-custom text-white me-3" onClick={handleSubmit}>
                            Save
                          </Button>
                        )}
                      </div>
                    </Row>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="second"></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  )
}

export default AddJobsNotification
