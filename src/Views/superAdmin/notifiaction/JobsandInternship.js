import React, { useEffect, useState } from 'react'
import BackDashboard from 'src/Views/widgets/BackDashboard'
// import { Form, Col } from 'react-bootstrap'
import { Col, Pagination, Form } from 'react-bootstrap'

import { CFormInput, CFormSwitch, CInputGroup } from '@coreui/react'
import searchicnwrap from '../../../assets/images/search-new.svg'
import editicn from '../../../assets/images/landing-page/pen-to-square.svg'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getJobsStatsAsync,
  postJobsInternshipStatusAsync,
} from 'src/store/features/Job&InternshipSlice'
import moment from 'moment'

const JobsandInternship = () => {
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState('')
  const [limit, setLimit] = useState(8)
  const [page, setPage] = useState(1)
  const { getJobStats } = useSelector((state) => state?.getJobs)
  const navigate = useNavigate()
  const format1 = 'DD-MM-YYYY h:mm a'

  // useEffect(() => {
  //   dispatch(
  //     getJobsStatsAsync({
  //       keyword: keyword,
  //     }),
  //   )
  // }, [])

  useEffect(() => {
    if (keyword.length >= 3) {
      dispatch(
        getJobsStatsAsync({
          keyword: keyword,
          status: status,
          page_size: limit,
          page: page,
        }),
      )
    } else if (keyword.length == 0) {
      dispatch(
        getJobsStatsAsync({
          keyword: keyword,
          status: status,
          page_size: limit,
          page: page,
        }),
      )
    }
  }, [keyword, status, page,limit])

  const handleToggle = async (id, status) => {
    await dispatch(postJobsInternshipStatusAsync({ id: id, status: status }))
    await dispatch(
      getJobsStatsAsync({
        keyword: keyword,
        status: status,
        page_size: limit,
        page: page,
      }),
    )
  }

  const handleEditJobs = (items) => {
    navigate(`/editJobsinternship/${items}`)
  }

  const handlePrev = () => {
    setPage(page - 1)
  }
  const handleNext = () => {
    setPage(page + 1)
  }
  const pageSize = [8, 12, 16, 20, 24]

  const handleStatus = (e) => {
    setStatus(e.target.value)
  }

  return (
    <>
      <BackDashboard />
      <div className="my-4 bg-custom-job p-3">
        <div className="d-flex justify-content-between fw-bold    py-3">
          <h6 className="fs-5">Jobs and Internship</h6>
          <button
            type="button"
            className="add-btn"
            onClick={() => navigate('/addjobsandinternship')}
          >
            <span className="text-white"> Add</span>
          </button>
        </div>

        <div className="row d-flex justify-content-end">
          <Col md={4} xl={3}>
            <Form.Select
              className=""
              aria-label="Default select example"
              value={status}
              onChange={handleStatus}
            >
              <option value="">Status</option>
              <option value="1">Open</option>
              <option value="0">Closed</option>
            </Form.Select>
          </Col>
          <Col md={4} xl={3}>
            {' '}
            <div className="position-relative">
              <img
                src={searchicnwrap}
                className="search-icon-wrap position-absolute mt-2 ms-2"
                alt="react img"
              />
              <CInputGroup className="">
                <CFormInput
                  className="form-search-input"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Search"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </CInputGroup>
            </div>
          </Col>
        </div>
        <div className="row">
          {getJobStats?.data?.data != 0 ? (
            getJobStats?.data?.data?.map((item, index) => {
              return (
                <Col key={index} md={4} xl={3}>
                  <div className="card-inner-jobs my-5">
                    <div className="d-flex justify-content-between">
                      <div className="">
                        <p className="mb-1">
                          <b>{item?.title}</b>
                        </p>
                        <p>
                          Skills: {''} {item?.skills}
                        </p>
                      </div>

                      <div className="d-flex  ">
                        <CFormSwitch
                          className="switch-custom"
                          onClick={() => handleToggle(item?.id, item?.status)}
                        />
                      </div>
                      <div>
                        <img
                          className="pointer"
                          src={editicn}
                          width="20px"
                          onClick={() => handleEditJobs(item.id)}
                          alt="react img"
                        />
                      </div>
                    </div>

                    <div>
                      <p className="posted-text">
                        Posted on : {moment(item?.updated_at).format(format1)}
                      </p>
                    </div>
                    <p>
                      Job Status: {''} {item?.status == 1 ? 'Open' : 'Closed'}
                    </p>
                    {/* <p className="text-end  fw-bold">view details</p> */}
                  </div>
                </Col>
              )
            })
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      


        <div className="d-flex justify-content-end my-5">
          <div className="d-flex text-align-center">
            <span className="d-flex text-align-center ">
              <p
                className="text-secondary  entries space-pegination-wrap"
                style={{ marginTop: '10px' }}
              >
                Enteries per page:
              </p>
              <Form.Select
                className="h-75 ms-2    border-0"
                style={{ width: '100%' }}
                onChange={(e) => setLimit(e.target.value)}
                aria-label="Default select example"
              >
                {pageSize.map((ele, index) => (
                  <option key={index} value={ele}>
                    {ele}
                  </option>
                ))}
              </Form.Select>
            </span>
            <div className="d-flex justify-content-end">
              <div style={{ marginTop: '7px' }}>
                {getJobStats?.data?.per_page} of {getJobStats?.data?.total}
              </div>
            </div>
            <Pagination className="border-0 text-secondary me-4">
              {page > 1 ? (
                <Pagination.First onClick={() => setPage(1)} />
              ) : (
                <Pagination.First diasbled />
              )}

              {page > 1 ? <Pagination.Prev onClick={handlePrev} /> : <Pagination.Prev disabled />}

              <Pagination.Item active> {page} </Pagination.Item>
              {page < getJobStats?.data?.last_page ? (
                <Pagination.Next onClick={handleNext} />
              ) : (
                <Pagination.Next disabled onClick={handleNext} />
              )}

              {getJobStats?.data?.last_page > page ? (
                <Pagination.Last onClick={() => setPage(getJobStats?.data?.last_page)} />
              ) : (
                <Pagination.Last disabled />
              )}
            </Pagination>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobsandInternship
