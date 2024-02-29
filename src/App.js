import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './scss/main.css'
import ForgotPassword from './Views/pages/forgot/ForgotPassword'
import TeacherCool from './layout/TeacherCool'
import 'react-toastify/dist/ReactToastify.css'
import TeacherLogin from './Teacher/TeacherAuth/TeacherLogin'
import TeacherRegister from './Teacher/TeacherAuth/TeacherRegister'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchedContent from './layout/SearchedContent'
import SubLogin from './Views/pages/login/SubLogin'
import VerifyEmail from './Views/pages/Verify/VerifyEmail'
import 'react-multi-carousel/lib/styles.css'
import ForgetPassPage from './Views/pages/forgot/ForgetPassPage'
import OrderWithUs from './layout/OrderWithUs'
import ForgetPassUser from './Views/pages/forgot/ForgetPassUser'
import ForgetPassUserPage from './Views/pages/forgot/ForgetPassUserPage'
import ProfileReview from './layout/TeacherRequest/ProfileReview'
import Ordersearch from './layout/Ordersearch'
import { ToastContainer } from 'react-toastify'
import StudentLanding from './Student/student-landing-page/StudentLanding'
import StudentPricing from './Student/StudentPricing'
import PaymentMessage from './Views/pages/PaymentMessage/PaymentMessage'
import Checkout from './Views/pages/PaymentMessage/Checkout'
import Protected from './authorization/Protected'
import StudentChangePassword from './Student/StudentChangePassword'
import StudentProfile from './Student/StudentProfile'
import StudentOrder from './Student/StudentOrder'
import StudentViewAssignments from './Student/Pages/ViewAssignments'
import Careers from './Student/Pages/Careers'
import Home from './Student/HeadersTab/Home'
import Question from './Student/HeadersTab/Question'
import ViewCarrerDetails from './Student/Pages/ViewCarrerDetails'
import HeaderArticle from './layout/HeaderArticle'
import ReadmoreArticle from './layout/ReadmoreArticle'
import Chat from './Student/HeadersTab/Chat'
import Meeting from './Zoom/Meeting'
import StudentNotification from './Student/HeadersTab/StudentNotification'
import MeetingScheduleList from './Zoom/MeetingScheduleList'
import PaymentInvoice from './Views/superAdmin/managepayment/PaymentInvoice'
import Rewards from './Student/HeadersTab/Rewards'
import SellerRegister from './seller/SellerRegister'
import SellerLogin from './seller/SellerLogin'
import OrderwithusList from './layout/OrderwithusList'
import CopyRightPolicy from './PrivacyStatements/CopyRightPolicy'
import CopyrightTakedownRequest from './PrivacyStatements/CopyrightTakedownRequest'
import GeneralPolicies from './PrivacyStatements/GeneralPolicies'
import HonorCode from './PrivacyStatements/HonorCode'
import TeacherCoolPrivacyPolicy from './PrivacyStatements/TeacherCoolPrivacyPolicy'
import TermsOfUse from './PrivacyStatements/TermsOfUse'

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Login = React.lazy(() => import('./Views/pages/login/Login'))
const Page500 = React.lazy(() => import('./Views/pages/page500/Page500'))

const App = () => {

  return (
    <BrowserRouter basename="/">
      <ToastContainer
        limit={1}
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        type={'type'}
      />
      <Suspense>
        <Routes>
          <Route exact path="/" name="Teacher Cool" element={<TeacherCool />} />
          <Route exact path="/admin/login" name="Login Page" element={<Login />} />
          <Route exact path="/sub-admin/login" name="Login Page" element={<SubLogin />} />
          <Route exact path="/login" name="TeacherLogin" element={<TeacherLogin />} />
          <Route
            exact
            path="/login/linkedin/:type?"
            name="TeacherLogin"
            element={<TeacherLogin />}
          />
          <Route exact path="/register" name="TeacherRegister" element={<TeacherRegister />} />
          <Route exact path="/verify/:id" name="verify" element={<VerifyEmail />} />
          <Route
            exact
            path="/content/:name?"
            name="TeacherRegister"
            element={<SearchedContent />}
          />
          <Route
            exact
            path="/meetingschedulelist"
            name="TeacherRegister"
            element={<MeetingScheduleList />}
          />
          <Route
            exact
            path="admin/forgotpassword"
            name="ForgotPassword Page"
            element={<ForgotPassword />}
          />
          <Route
            exact
            path="/admin/reset-password/:id"
            name="forget pass"
            element={<ForgetPassPage />}
          />
          <Route
            exact
            path="/verify-email/:emailcode"
            name="verifyEmail"
            element={<VerifyEmail />}
          />
          <Route
            exact
            path="/forgotpassword"
            name="ForgotPassword Page"
            element={<ForgetPassUser />}
          />
          <Route
            exact
            path="/reset-password/:id"
            name="forget pass"
            element={<ForgetPassUserPage />}
          />
          <Route
            exact
            path="/teacher/profilereview"
            name="ProfileReview"
            element={<ProfileReview />}
          />
          <Route
            exact
            path="/career/details/:id"
            name="careerdetails"
            element={<ViewCarrerDetails />}
          />
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
          <Route exact path="/meeting/:id" name="Meeting" element={<Meeting />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route exact path="/orderwithus" name="Order With Us" element={<OrderWithUs />} />
          <Route
            exact
            path="/orderwithusList"
            name="Order With Us List"
            element={<OrderwithusList />}
          />
          <Route exact path="/Ordersearch" name="Order Search " element={<Ordersearch />} />
          <Route exact path="/headerarticle" name="Header Article " element={<HeaderArticle />} />
          <Route
            exact
            path="/readmorearticle/:id"
            name="Readmore Article "
            element={<ReadmoreArticle />}
          />

          <Route exact path="/seller-register" name="SellerRegister" element={<SellerRegister />} />

          <Route exact path="/seller-login" name="SellerLogin" element={<SellerLogin />} />

          <Route exact path="/home" name="home" element={<StudentLanding />} />
          <Route
            exact
            path="/payment-callback"
            name="paymentmessage  "
            element={<PaymentMessage />}
          />
          <Route path="*" name="Home" element={<DefaultLayout />} />
          <Route exact path="/pricing" name="pricing  " element={<StudentPricing />} />

          <Route exact path="/careers" name="studentcareers  " element={<Careers />} />
          <Route exact path="/checkout?" name="checkoutplan" element={<Checkout />} />
          <Route
            exact
            path="/user/changepassword"
            name="ChangePassword"
            element={<StudentChangePassword />}
          />

          <Route
            exact
            path="/user/studentprofile"
            name="studentprofile"
            element={<Protected Component={StudentProfile} />}
          />
          <Route
            exact
            path="/user/studentnotification"
            name="studentnotification"
            element={<Protected Component={StudentNotification} />}
          />
          <Route
            exact
            path="/user/student/viewassignments/:id"
            name="StudentAssignmentView"
            element={<Protected Component={StudentViewAssignments} />}
          />
          <Route
            exact
            path="/user/orders"
            name="studentorder"
            element={<Protected Component={StudentOrder} />}
          />
          <Route
            exact
            path="/studentdashboard/home"
            name="studentorderHome"
            element={<Protected Component={Home} />}
          />
          <Route
            exact
            path="/studentdashboard/chat"
            name="studentorderChat"
            element={<Protected Component={Chat} />}
          />
          <Route
            exact
            path="/managepayment/invoice"
            name="Home"
            element={<Protected Component={PaymentInvoice} />}
          />
          <Route
            exact
            path="/studentdashboard/askquestion"
            name="studentorderAskQuestion"
            element={<Protected Component={Question} />}
          />
          <Route
            exact
            path="/studentdashboard/rewards"
            name="studentorderRewards"
            element={<Protected Component={Rewards} />}
          />
          <Route
            exact
            path="/copyrightpolicy"
            name="CopyRightPolicy"
            element={<CopyRightPolicy />}
          />
          <Route
            exact
            path="/copyrighttakedownrequest"
            name="CopyrightTakedownRequest"
            element={<CopyrightTakedownRequest/>}
          />
          <Route
            exact
            path="/generalpolicies"
            name="GeneralPolicies"
            element={<GeneralPolicies/>}
          />
          <Route
            exact
            path="/honorcode"
            name="HonorCode"
            element={<HonorCode />}
          />
          <Route
            exact
            path="/teachercoolprivacypolicy"
            name="TeacherCoolPrivacyPolicy"
            element={<TeacherCoolPrivacyPolicy />}
          />
          <Route
            exact
            path="/termsofuse"
            name="TermsOfUse"
            element={<TermsOfUse/>}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
export default App
