import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Footer from './Footer'
// import blogist from '../assets/images/landing-page/blog-1.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { getHeaderCarrerAsync, getArticleByIDAsync } from 'src/store/features/Job&InternshipSlice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
// import Loader from 'src/Views/Loader/Loader'
import { Pagination, Form } from 'react-bootstrap'
import NavTopBar from './NavTopBar'
import BackButton from 'src/Views/widgets/BackButton'

const HeaderArticle = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [limit, setLimit] = useState(9)
  const [page, setPage] = useState(1)
  const { getHeaderCarrer } = useSelector((state) => state?.getJobs)
  // const { careerLoading } = useSelector((state) => state.getJobs)

  useEffect(() => {
    dispatch(
      getHeaderCarrerAsync({
        page_size: limit,
        page: page,
      }),
    )
  }, [limit, page])

  const handlePrev = () => {
    setPage(page - 1)
  }
  const handleNext = () => {
    setPage(page + 1)
  }
  const pageSize = [9, 12, 15, 18, 21]

  const handleArticle = async (e) => {
    await navigate(`/readmorearticle/${e}`)
  }

  return (
    <>
      <NavTopBar />
      <p className="text-white">...</p>
      <div className="me-3">
        <BackButton />
      </div>

      <h4 className="text-center fs-2 my-3">Articles</h4>
      <section className="py-5">
        {/* {careerLoading ? (
          <div className=" d-flex justify-content-center zIndex ">
            <Loader />
          </div>
        ) : (
          ''
        )} */}
        <Container>
          <Row className="g-4 align-items-stretch">
            {getHeaderCarrer?.data?.data?.map((item, index) => {
              return (
                <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                  <div className="card main-card-blog h-100">
                    <div className="blog-image">
                      <img
                        src={`${process.env.REACT_APP_ARTICLE_URL}${item?.cover_image_path}`}
                        className="img-fluid mb-4  article-size-blog"
                        alt="exprttech"
                      />
                    </div>
                    <div className="card-body ">
                      <p className="card-text fw-light small">
                        {moment(item?.created_at).format(' Do MMMM YYYY')}
                      </p>

                      <h5 className="card-title fw-bold">{item?.title}</h5>

                      <div
                        className="card-text fw-light ml-blogdesc"
                        dangerouslySetInnerHTML={{ __html: item?.message.substring(0, 150) }}
                      />
                      <a onClick={(e) => handleArticle(item?.id)} className="text-decoration-none">
                        Read More
                      </a>
                    </div>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Container>

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
                {getHeaderCarrer?.data?.from}-{getHeaderCarrer?.data?.to} of{' '}
                {getHeaderCarrer?.data?.total}
              </div>
            </div>
            <Pagination className="border-0 text-secondary me-4 ms-5">
              {page > 1 ? (
                <Pagination.First onClick={() => setPage(1)} />
              ) : (
                <Pagination.First diasbled />
              )}

              {page > 1 ? <Pagination.Prev onClick={handlePrev} /> : <Pagination.Prev disabled />}

              <Pagination.Item active> {page} </Pagination.Item>
              {page < getHeaderCarrer?.data?.last_page ? (
                <Pagination.Next onClick={handleNext} />
              ) : (
                <Pagination.Next disabled onClick={handleNext} />
              )}

              {getHeaderCarrer?.data?.last_page > page ? (
                <Pagination.Last onClick={() => setPage(getHeaderCarrer?.data?.last_page)} />
              ) : (
                <Pagination.Last disabled />
              )}
            </Pagination>
          </div>
        </div>

        {/*  */}
      </section>

      <Footer />
    </>
  )
}

export default HeaderArticle
