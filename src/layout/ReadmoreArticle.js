import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Header from './Header'
import Footer from './Footer'

import readist from '../assets/images/landing-page/read-more-article.jpg'

import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { getArticleByIDAsync } from 'src/store/features/Job&InternshipSlice'
const ReadmoreArticle = () => {
 const {id}=useParams()
 const dispatch=useDispatch()
  const { articleById } = useSelector((state) => state?.getJobs)
  
  
  useEffect(()=>{

    dispatch(getArticleByIDAsync(id))
  },[])
  return (
    <>
      <Header />
      <section className="py-5">
        <Container>
          <Row className="g-5">
            <Col md={12}>
              <h1 className="display-5 text_bold fw-bold">
               {articleById?.data?.title}
              </h1>
              <div className="d-flex align-items-center py-2">
                

                <p className=" m-0 small text-black m-0">{moment(articleById?.data?.created_at).format(' Do MMMM YYYY')}</p>
              </div>
              <img src={`${process.env.REACT_APP_ARTICLE_URL}${articleById?.data?.cover_image_path}`} className=" mb-4 " alt="exprttech" height="500px" width="100%" />
              <div className="blog-content mt-3">
                <p  dangerouslySetInnerHTML={{ __html: articleById?.data?.message }} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  )
}

export default ReadmoreArticle
