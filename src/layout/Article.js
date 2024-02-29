import React from 'react'
import Badge from 'react-bootstrap/Badge'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMainPageContentAsync } from 'src/store/features/MainPageContentSlice'

const Article = () => {
  const dispatch = useDispatch()
  const { contentList } = useSelector((state) => state.mainPageContent)
  const [newsLetter, setNewsLetter] = useState()
  console.log(newsLetter, "testu")

  useEffect(() => {
    if (contentList) {
      setNewsLetter(contentList?.data?.news_letters ? contentList?.data?.news_letters : '')
    }
  }, [contentList])

  useEffect(() => {
    dispatch(getMainPageContentAsync())
  }, [])


  return (
    <div className="articles-listing">
      {
        newsLetter?.length == 0 ?
          ""
          :
          <h4 className="section-heading mb-5 " id="services">
            Articles/Blogs
          </h4>
      }

      <div className="container pt-0 pt-xl-4">
        <div className="row g-0 g-md-5 g-lg-5">
          {newsLetter?.length ? (
            <div className="col-12 col-xl-6">
              {newsLetter && (
                <div >
                  <div className="article-img">
                    <img
                      src={
                        process.env.REACT_APP_API_URL +
                        '/public/storage/' +
                        newsLetter[0]?.cover_image_path
                      }
                      className="img-fluid "
                    />
                  </div>
                  <h5 className="mt-3">{newsLetter[0]?.title}</h5>
                  <p dangerouslySetInnerHTML={{ __html: newsLetter[0]?.message?.substring(0, 80) }} />

                  <Link to="/headerarticle" className="readmore">
                    Read more
                  </Link>
                </div>
              )}
            </div>
          ) : (
            ''
          )}
          <div className="col-12 col-xl-6 ">
            <ul className="article-links">
              {newsLetter?.map((val, index) => {
                if (index == 2 && index == 2 && index == 1) {
                  return
                }

                return (
                  <li key={index}>
                    <div className="img-news">
                      <img
                        src={
                          process.env.REACT_APP_API_URL + '/public/storage/' + val?.cover_image_path
                        }
                        className="img-fluid article-news-resize"
                      />
                    </div>
                    <div className="news-info">
                      <Link style={{textDecoration:"none"}} to="/headerarticle">
                      <h6 className="news-heading pointer mt-3">{val.title}</h6>
                      </Link>
                      <p
                        className="news-desc"
                        dangerouslySetInnerHTML={{ __html: val.message.substring(0, 100) }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
            {/* <ul className="article-links">
              {newsLetter?.map((val, index) => {
                  if (index == 1) {
                    return
                  }
             
                return (
                  <li key={index}>
                    <div className="img-news">
                      <img
                        src={
                          process.env.REACT_APP_API_URL + '/public/storage/' + val?.cover_image_path
                        }
                        className="img-fluid article-news-resize"
                      />
                    </div>
                    <div className="news-info">
                      <h6 className="news-heading pointer mt-3">{val.title}</h6>
                      <p
                        className="news-desc"
                        dangerouslySetInnerHTML={{ __html: val.message.substring(0, 100) }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
