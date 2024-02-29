import React, { useEffect, useState } from 'react'
import { Col, Pagination, Form } from 'react-bootstrap'
import { CFormInput, CInputGroup } from '@coreui/react'
import searchicnwrap from '../../assets/images/search-new.svg'
import { useNavigate } from 'react-router-dom'
import NavTopBar from 'src/layout/NavTopBar'
import BackButton from 'src/Views/widgets/BackButton'
import { useDispatch, useSelector } from 'react-redux'
import { getCarrerAsync } from 'src/store/features/sosEmailSlice'
import { clearAllState } from 'src/store/features/Job&InternshipSlice'
import Footer from 'src/layout/Footer'

const Careers = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { getCarrer } = useSelector((state) => state?.sosEmail)
  const [keyword, setKeyword] = useState('')
  const [limit, setLimit] = useState(8)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (keyword.length >= 3 || keyword.length == 0) {
      dispatch(
        getCarrerAsync({
          keyword: keyword,
          page_size: limit,
          page: page,
        }),
        dispatch(clearAllState()),
      )
    }
  }, [keyword, limit, page])
  const handlePrev = () => {
    setPage(page - 1)
  }
  const handleNext = () => {
    setPage(page + 1)
  }
  const pageSize = [8, 12, 16, 20, 24]
  return (
    <>
      <NavTopBar />
      <div className="p-3">
        <BackButton />
        <div className="my-4 bg-custom-job p-3">
          <div className="d-flex justify-content-center fw-bold   py-3">
            <h6 className="fs-3 ">Careers</h6>
          </div>

          <div className="row d-flex justify-content-end">
            <Col md={4} xl={3}>
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
          <div className="row align-items-stretch">
            {getCarrer?.data?.data != 0 ? (
              getCarrer?.data?.data.map((ele, ind) => {
                return (
                  <Col className="mb-5" md={4} xl={3} key={ind}>
                    <div className="card-inner-jobs my-5 h-100 position-relative">
                      <div className="d-flex justify-content-between">
                        <div className="">
                          <h2 className="fs-6 text-wrap">{ele.department}</h2>
                          <p className="mb-1 text-wrap"> Skills: {ele.skills}</p>
                        </div>
                      </div>
                      <div className="d-flex  justify-content-between">
                        <p className='text-wrap'>
                          Salary: {ele.salary} {ele?.currency}
                        </p>
                      </div>
                      <div>
                        <p className='text-wrap'>Experience: {ele.experience} Years</p>
                        <p className='text-wrap'>{ele?.recruiter_email}</p>
                      </div>

                      <p
                        className="text-end pointer fw-bold position-absolute"
                        style={{ bottom: '25px' }}
                        onClick={() => navigate(`/career/details/${ele.id}`)}
                      >
                        View Details
                      </p>
                    </div>
                  </Col>
                )
              })
            ) : (
              <div>No Data Found</div>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mb-4">
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
              {getCarrer?.data?.from}-{getCarrer?.data?.to} of {getCarrer?.data?.total}
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
            {page < getCarrer?.data?.last_page ? (
              <Pagination.Next onClick={handleNext} />
            ) : (
              <Pagination.Next disabled onClick={handleNext} />
            )}

            {getCarrer?.data?.last_page > page ? (
              <Pagination.Last onClick={() => setPage(getCarrer?.data?.last_page)} />
            ) : (
              <Pagination.Last disabled />
            )}
          </Pagination>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Careers
