import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import extrauser from '../../assets/images/st-landing/extra-user.svg'
import topsell from '../../assets/images/st-landing/top-selling-img.png'
import { getStudentAssignmentListAsync } from 'src/store/features/StudentordersSlice'
import { useDispatch, useSelector } from 'react-redux'
import Studentdropdown from '../Studentdropdown'
import NavTopBar from 'src/layout/NavTopBar'
import Studentdashboarddropdown from '../Studentdropdown'

const Home = () => {
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState('')
  const dispatch = useDispatch()
  const { Studentassignments } = useSelector((state) => state?.StudentOrders)



  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        getStudentAssignmentListAsync({
          keyword: keyword,
          page_size: pageSize,
        }),
      )
    }, 1000);
    return () => clearTimeout(timer);
  
  }, [keyword, pageSize])

  return (
    <>
      <NavTopBar />
    <div className='p-4'>
      <div className="p-3 main-container container">
        <Studentdashboarddropdown />
      </div>
      <div className="px-3">
        <section className="add-document-sec">
          <div className="main-container container">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-7">
                <div className="form-sectionn ">
                  <div className="form-wrapperr">
                    <input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      type="text"
                      placeholder="Search"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
   
            </div>
          </div>
        </section>

        <section className="extra-help py-5">
          <div className="main-container container">
            <h2 className="heading-inner-extra mb-3">Expert Help</h2>
            <div className="row pt-4 bg-color-extra align-items-stretch">
              <div className="col-12 col-md-12 col-lg-4">
                <div className="outer-wrap-extra outer-bg-color-st h-100">
                  <div className="img-iner-extra">
                    <img
                      src={extrauser}
                      className="img-fluid userr-img me-5 mb-3"
                      alt="react img"
                      />
                  </div>
                  <div className="inner-para-extra">
                    <h5 className="">Study your way with expert help</h5>
                    <p>
                      Choose how you learn with expert solutions. See all the steps, get a hint, or
                      just go straight to the completed solution.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-4">
                <div className=" outer-wrap-extra outer-bg-color-st h-100">
                  <div className="img-iner-extra">
                    <img src={extrauser} className="img-fluid userr-img mb-3 " alt="react img" />
                  </div>
                  <div className="inner-para-extra">
                    <h5>Finals exam prep</h5>
                    <p>
                      Review with study materials made for your course: flashcards, practice
                      problems, quizzes, and more.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-4">
                <div className="outer-wrap-extra outer-bg-color-st h-100">
                  <div className="img-iner-extra">
                    <img src={extrauser} className="img-fluid userr-img mb-3" alt="react img" />
                  </div>
                  <div className="inner-para-extra">
                    <h5>Proofreading for finals</h5>
                    <p>
                      Strengthen your essays. Receive personalized feedback from writing experts in
                      48 hours or less.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="question-asked extra-help py-2 py-lg-5">
          <div className="main-container container">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-9 ">
                <h3 className="ques-ask mb-4">Questions Asked</h3>
                <p className="bg-light py-3 px-3 ques-ask-p">
                  To see relevant study & exam prep recommendations, add your courses{' '}
                </p>

                <div className="row">
                  {Studentassignments?.data?.data?.map((ele, index) => {
                    return (
                      <div key={index} className="col-12 col-md-12 col-lg-6">
                        <div className="outer-wrap-extra mt-2 mt-lg-5 mb-3 outer-bg-color-st">
                          <div className="img-iner-extra">
                            {/* <img src={extrauser} className="img-fluid userr-img " /> */}
                          </div>
                          <div className="inner-para-extra">
                            <h5>{ele?.title}</h5>
                            <h6>{ele?.assignment_id}</h6>
                            <p>
                              <span>Q:</span> {ele?.question}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-3">
                <h3 className="ques-ask mb-4 mt-2">Top Selling</h3>

                <div className="top-sell-inner">
                  <img src={topsell} className="img-fluid  " alt="react img" />
                  <h4 className="science-wrap mt-3">Science and Machine Learning Book</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
                    </>
  )
}

export default Home
