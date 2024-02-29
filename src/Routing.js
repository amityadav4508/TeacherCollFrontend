import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './Views/dashboard/Dashboard'
import ManageAssignment from './Views/superAdmin/assignmentmanagement/ManageAssignment'
import PersonalInfo from './Views/superAdmin/personalinfo/PersonalInfo'
import Subscription from './Views/superAdmin/subscriptionManagement/subscription'
import ManageAdmin from './Views/superAdmin/manageadmin/ManageAdmin'
import OngoingProjects from './Views/superAdmin/ongoingprojects/OngoingProjects'
import AddSubadmin from './Views/pages/Forms/Add-Subadmin'
import AddSubscription from './Views/pages/Forms/Add-subscription'
import EditSubadmin from './Views/pages/Forms/EditSub-admin'
import ViewTeacher from './Views/pages/Forms/ViewUsers'
import ContentManagement from './Views/superAdmin/contentManagement/ContentManagement'
import Protected from './authorization/Protected'
// import ChangePassword from '/Views/superAdmin/personalinfo/ChangePassword'
import EditSubscription from './Views/pages/Forms/Edit-Subscription'
import UrlProtected from '../src/authorization/Url_Protected'
import ManageSubject from './Views/superAdmin/managesubjects/Managesubject'
import Notification from './Views/superAdmin/notifiaction/JobsandInternship'
import ManageRequest from './Views/superAdmin/managerequest/ManageRequest'
import ManagePayment from './Views/superAdmin/managepayment/ManagePayment'
import ManageStudent from './Views/superAdmin/userManagement/ManageStudent'
import ManageTeacher from './Views/superAdmin/userManagement/ManageTeacher'
import OrderListing from './Views/superAdmin/manageassignment/OrderList'
import TeacherDashboard from './Teacher/TeacherDashboard/TeacherDashboard'
import Setting from './Views/pages/header/AdminNotification'
import PaymentSettings from './Views/superAdmin/systemsettings/Paymentsettings'
import Notificationview from './Views/superAdmin/systemsettings/notification/Notificationview'
import NotificationSettings from './Views/superAdmin/systemsettings/notification/NotificationSettings'
import Newsletter from './Views/superAdmin/systemsettings/newsletters/Newsletter'
import Systemsettings from './Views/superAdmin/systemsettings/Paymentsettings'
import ManageSubjectform from './Views/pages/Forms/ManageSubjectform'
import AddNewsletter from './Views/superAdmin/systemsettings/newsletters/AddNewsletter'
import AdminNotification from './Views/pages/header/AdminNotification'
//  Teachers
import TeacherProfileInfo from './Teacher/TeacherProfileInfo'
import TeacherChangepassword from './Teacher/TeacherChangepassword'
import TeacherOrder from './Teacher/TeacherPages/TeacherOrder'
import TeacherPayment from './Teacher/TeacherPages/TeacherPayment'
import TeacherInbox from './Teacher/TeacherPages/TeacherInbox'
import CryptoJS from 'crypto-js'
import FormContent from './Views/pages/Forms/FormContent'
import AdminDashboard from './admin/AdminDashboard'
import Changepassword from './admin/header/Changepassword'
import Billinginfo from './Views/pages/Forms/Billinginfo'
import TeacherNotification from './Teacher/TeacherPages/HeaderTabs/TeacherNotification'
// import AssignmentManagement from './admin/AdminPages/assignmentmanagement/AssignmentManagement'
import Page404 from './Views/pages/page404/Page404'
import AssignmentManagement from './admin/AdminPages/AssignmentManagement'
import Paymentinfo from './Views/superAdmin/managepayment/paymentinfo'
import Assignmentinfo from './admin/AdminPages/Assignmentinfo'
// import PaymentInvoice from './Views/superAdmin/managepayment/PaymentInvoice'
import { useEffect } from 'react'
import { useState } from 'react'
import EditNewsLetter from './Views/superAdmin/systemsettings/newsletters/EditNewsLetter'
import ViewAssigment from './Views/superAdmin/assignmentmanagement/ViewAssigment'
import ResubmissionRequest from './Teacher/TeacherPages/HeaderTabs/Re-submission Request'
import AddJobsNotification from './Views/superAdmin/notifiaction/AddJobsNotification'
import AnswerHistory from './Teacher/TeacherPages/HeaderTabs/AnswerHistory'
import StartAnswering from './Teacher/TeacherPages/HeaderTabs/StartAnswering'
import QuestionAnswer from './Views/superAdmin/contentManagement/QuestionAnswer'
import AddQuestionAnswers from './Views/superAdmin/contentManagement/AddQuestionAnswers'
import AssignmentsBid from './Views/superAdmin/assignmentsBids/AssignmentsBid'
import ViewBidAssignments from './Views/superAdmin/assignmentsBids/ViewBidAssignments'
import ViewTeacherAnswer from './Teacher/ViewTeacherAnswer'
import JobsandInternship from './Views/superAdmin/notifiaction/JobsandInternship'
import SellerDashboard from './seller/SellerDashboard'
import Zoom_Request from './Views/superAdmin/ZoomRequests/Zoom_Request'
import SellerProfile from './seller/SellerProfile'
import SellerBillingInfo from './seller/SellerBillingInfo'
import SellerContent from './seller/SellerContent'
import SellerAddContent from './seller/SellerAddContent'
import SellerRewards from './seller/SellerReward'
import CurrencySetting from './Views/superAdmin/systemsettings/CurrencySetting'
import ManageSeller from './Views/superAdmin/userManagement/ManageSeller'
import { useIdleTimer } from 'react-idle-timer'
import TeacherMeetingRequest from './Teacher/TeacherPages/TeacherMeetingRequest'

const Routing = () => {
  const [data1, setData1] = useState('')
  const secretPass = 'XkhZG4fW2t2W'
  const checkType = JSON.parse(localStorage.getItem('checkType'))

  useEffect(() => {
    if (checkType) {
      let bytes = CryptoJS?.AES?.decrypt(checkType, secretPass)
      setData1(JSON.parse(bytes?.toString(CryptoJS?.enc?.Utf8)))
    }
  }, [checkType])

  // const [event, setEvent] = useState('Event')

  // const [elapsed, setElapsed] = useState(0)
  // const onAction = (event) => {
  //   setEvent(event?.type ?? 'Event')
  //   setElapsed(0)
  // }

  // const { getElapsedTime } = useIdleTimer({
  //   onAction,
  //   timeout: 1000 * 60 * 20,
  //   promptBeforeIdle: 0,
  //   events: [
  //     'mousemove',
  //     'keydown',
  //     'wheel',
  //     'DOMMouseScroll',
  //     'mousewheel',
  //     'mousedown',
  //     'touchstart',
  //     'touchmove',
  //     'MSPointerDown',
  //     'MSPointerMove',
  //     'visibilitychange',
  //     'focus',
  //   ],
  //   immediateEvents: [],
  //   debounce: 0,
  //   throttle: 0,
  //   eventsThrottle: 200,
  //   element: document,
  //   startOnMount: true,
  //   startManually: false,
  //   stopOnIdle: false,
  //   crossTab: false,
  //   name: 'idle-timer',
  //   syncTimers: 0,
  //   leaderElection: false,
  // })

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setElapsed(Math.ceil(getElapsedTime() / 1000))
  //   }, 500)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // })

  // useEffect(() => {
  //   if (elapsed > 300) {
  //     setEvent('Event')
  //   }
  // }, [elapsed])

  // useEffect(() => {
  //   if (elapsed > 300 && (event == 'mousemove' || event == 'wheel' || event == 'mousedown')) {
  //     window.location.reload()
  //   }
  // }, [elapsed, event])

  return (
    <>
      {data1 == 'super-admin' ? (
        <Routes>
          <Route exact path="*" name="Page 404" element={<Page404 />} />
          <Route
            exact
            path="/dashboard"
            name="Dashboard"
            element={<Protected Component={Dashboard} />}
          />
          <Route
            exact
            path="/usermanagement/teacher"
            name="ManageTeacher"
            element={<UrlProtected Component={ManageTeacher} />}
          />
          <Route
            exact
            path="/usermanagement/student"
            name="ManageStudent"
            element={<UrlProtected Component={ManageStudent} />}
          />
          <Route
            exact
            path="/usermanagement/seller"
            name="ManageSeller"
            element={<UrlProtected Component={ManageSeller} />}
          />
          <Route
            exact
            path="/manageorder/assignment/:status"
            name="Manage Assignment Status"
            element={<UrlProtected Component={ManageAssignment} />}
          />
          <Route
            exact
            path="/manageorder/assignment"
            name="Manage Assignment"
            element={<UrlProtected Component={ManageAssignment} />}
          />

          <Route
            exact
            path="/manageorder/resubmitrequest"
            name="Manage Assignment"
            element={<UrlProtected Component={ResubmissionRequest} />}
          />
          <Route
            exact
            path="/admin/profilepage"
            name="PersonalInfo"
            element={<UrlProtected Component={PersonalInfo} />}
          />
          <Route
            exact
            path="/managesubscription"
            name="Subscription"
            element={<UrlProtected Component={Subscription} />}
          />
          <Route
            exact
            path="/systemsetting"
            name="Systemsetting"
            element={<UrlProtected Component={Systemsettings} />}
          />
          <Route
            exact
            path="/systemsetting/paymentSetting"
            name="paymentSetting"
            element={<UrlProtected Component={PaymentSettings} />}
          />
          <Route
            exact
            path="/systemsetting/currency"
            name="paymentSetting"
            element={<UrlProtected Component={CurrencySetting} />}
          />
          <Route
            exact
            path="/systemsetting/notificationSetting"
            name="notificationSetting"
            element={<UrlProtected Component={NotificationSettings} />}
          />
          <Route
            exact
            path="/systemsetting/newsletterSetting"
            name="newsletterSetting"
            element={<UrlProtected Component={Newsletter} />}
          />
          <Route
            exact
            path="/manageadmin"
            name="ManageAdmin"
            element={<UrlProtected Component={ManageAdmin} />}
          />

          <Route
            exact
            path="/manageorder/orderlisting"
            name="OrderListing"
            element={<UrlProtected Component={OrderListing} />}
          />

          <Route
            exact
            path="/manageorder/orderlisting/:ordered"
            name="OrderListingList"
            element={<UrlProtected Component={OrderListing} />}
          />

          <Route
            exact
            path="/ongoingprojects"
            name="OngoingProjects"
            element={<UrlProtected Component={OngoingProjects} />}
          />
          <Route
            exact
            path="/pages/addstudents"
            name="AddStudents"
            element={<UrlProtected Component={AddSubadmin} />}
          />
          <Route
            exact
            path="/pages/addsubscription"
            name="AddSubscription"
            element={<UrlProtected Component={AddSubscription} />}
          />
          <Route
            exact
            path="/pages/editsubscription/:id"
            name="EditSubscription"
            element={<UrlProtected Component={EditSubscription} />}
          />
          <Route
            exact
            path="/managesubjectform"
            name="ManageSubject"
            element={<UrlProtected Component={ManageSubjectform} />}
          />

          <Route
            exact
            path="/pages/editsubadmin/:id"
            name="EditSubadmin"
            element={<UrlProtected Component={EditSubadmin} />}
          />
          <Route
            exact
            path="/ongoingprojects"
            name="OngoingProjects"
            element={<UrlProtected Component={OngoingProjects} />}
          />
          <Route
            exact
            path="/viewuser/:id"
            name="UserPreview"
            element={<UrlProtected Component={ViewTeacher} />}
          />
          <Route
            exact
            path="/contentmanagement/content"
            name="ContentMangement"
            element={<UrlProtected Component={ContentManagement} />}
          />
          <Route
            exact
            path="/contentmanagement/questionanswer"
            name="questionanswers"
            element={<UrlProtected Component={QuestionAnswer} />}
          />
          <Route
            exact
            path="/addquestionanswer"
            name="addquestionanswers"
            element={<UrlProtected Component={AddQuestionAnswers} />}
          />
          <Route
            exact
            path="/editquestionanswer/:id"
            name="editquestionanswers"
            element={<UrlProtected Component={AddQuestionAnswers} />}
          />
          <Route
            exact
            path="/admin/changepassword"
            name="ChangePassword"
            element={<UrlProtected Component={Changepassword} />}
          />
          <Route
            exact
            path="/managesubject"
            name="Managesubject"
            element={<UrlProtected Component={ManageSubject} />}
          />
          <Route
            exact
            path="/jobsandinternship"
            name="JobsandInternship"
            element={<UrlProtected Component={JobsandInternship} />}
          />
          <Route
            exact
            path="/managerequest/profile"
            name="ManageRequest"
            element={<UrlProtected Component={ManageRequest} />}
          />
          <Route
            exact
            path="/managepayment"
            name="ManagePayment"
            element={<UrlProtected Component={ManagePayment} />}
          />
          <Route
            exact
            path="/setting"
            name="Setting"
            element={<UrlProtected Component={Setting} />}
          />
          <Route
            exact
            path="/managepayment/paymentinfo/:id/"
            name="Payment"
            element={<UrlProtected Component={Paymentinfo} />}
          />
          <Route
            exact
            path="/notificationSetting/notificationview"
            name="Notificationview"
            element={<UrlProtected Component={Notificationview} />}
          />
          <Route
            exact
            path="/formcontent/:id"
            name="FormContent"
            element={<UrlProtected Component={FormContent} />}
          />
          <Route
            exact
            path="/newsletterSetting/addnewsletter"
            name="AddNewsletter"
            element={<UrlProtected Component={AddNewsletter} />}
          />

          <Route
            exact
            path="/adminnotification"
            name="Adminnotification"
            element={<UrlProtected Component={AdminNotification} />}
          />
          <Route
            exact
            path="/editnewsLetter/:id"
            name="AdminViewNewsLetter"
            element={<UrlProtected Component={EditNewsLetter} />}
          />
          <Route
            exact
            path="/viewassignment/:id"
            name="AdminViewAssignments"
            element={<UrlProtected Component={ViewAssigment} />}
          />
          <Route
            exact
            path="/addjobsandinternship"
            name="AddJobsNotification"
            element={<UrlProtected Component={AddJobsNotification} />}
          />
          <Route
            exact
            path="/editJobsinternship/:id"
            name="AddJobsNotification"
            element={<UrlProtected Component={AddJobsNotification} />}
          />
          <Route
            exact
            path="/assignmentsbids"
            name="AssignmentsBids"
            element={<UrlProtected Component={AssignmentsBid} />}
          />
          <Route
            exact
            path="/viewbidsassignments/:id"
            name="ViewBidsAssignments"
            element={<UrlProtected Component={ViewBidAssignments} />}
          />
          <Route
            exact
            path="/zoom-request"
            name="ZoomRequests"
            element={<UrlProtected Component={Zoom_Request} />}
          />
        </Routes>
      ) : data1 === 'teacher' ? (
        <Routes>
          <Route exact path="*" name="Page 404" element={<Page404 />} />

          <Route
            exact
            path="/teacher/manageorder/myanswerhistory"
            name="ManageOrderHistory"
            element={<Protected Component={AnswerHistory} />}
          />
          <Route
            exact
            path="/teacher/manageorder"
            name="ManageOrderHistory"
            element={<Protected Component={TeacherOrder} />}
          />
          <Route
            exact
            path="/teacher/manageorder/resubmission"
            name="ManageOrderResubmission"
            element={<Protected Component={ResubmissionRequest} />}
          />
          <Route
            exact
            path="/teacher/dashboard"
            name="TeacherDashboard"
            element={<Protected Component={TeacherDashboard} />}
          />
          <Route
            exact
            path="/teacher/profilepage"
            name="TeacherProfile"
            element={<UrlProtected Component={TeacherProfileInfo} />}
          />
          <Route
            exact
            path="/teacher/changepassword"
            name="ChangePassword"
            element={<UrlProtected Component={TeacherChangepassword} />}
          />
          <Route
            exact
            path="/teacher/manageorder/startanswering"
            name="TeacherManageOrder"
            element={<UrlProtected Component={StartAnswering} />}
          />

          {/* <Route
            exact
            path="/teacher/manageorder/startanswering"
            name="TeacherManageOrder"
            element={<UrlProtected Component={StartAnswering} />}
          /> */}

          <Route
            exact
            path="/teacher/managepayment"
            name="TeacherManagePayment"
            element={<UrlProtected Component={TeacherPayment} />}
          />
          <Route
            exact
            path="/teacher/inbox"
            name="TeacherInbox"
            element={<UrlProtected Component={TeacherInbox} />}
          />
          <Route
            exact
            path="/teacher/meetingrequest"
            name="TeacherMeetingRequest"
            element={<UrlProtected Component={TeacherMeetingRequest} />}
          />

          <Route
            exact
            path="/teacher/billinginfo"
            name="Billinginfo"
            element={<UrlProtected Component={Billinginfo} />}
          />
          <Route
            exact
            path="/teachernotification"
            name="teachernotification"
            element={<UrlProtected Component={TeacherNotification} />}
          />
          <Route
            exact
            path="/viewTeacherAnswer/:id"
            name="viewTeacherAnswer"
            element={<UrlProtected Component={ViewTeacherAnswer} />}
          />
        </Routes>
      ) : data1 === 'sub-admin' ? (
        <Routes>
          <Route exact path="*" name="Page 404" element={<Page404 />} />
          <Route
            exact
            path="/admin/dashboard"
            name="TeacherDashboard"
            element={<Protected Component={AdminDashboard} />}
          />
          <Route
            exact
            path="/admin/changepassword"
            name="ChangePassword"
            element={<UrlProtected Component={Changepassword} />}
          />

          <Route
            exact
            path="/admin/profilepage"
            name="PersonalInfo"
            element={<UrlProtected Component={PersonalInfo} />}
          />
          <Route
            exact
            path="/admin/Assignment"
            name="Assignmentmanagement"
            element={<UrlProtected Component={AssignmentManagement} />}
          />
          <Route
            exact
            path="/admin/assignmentinfo/:id"
            name="Assignmentinfo"
            element={<UrlProtected Component={Assignmentinfo} />}
          />
        </Routes>
      ) : data1 === 'seller' || data1 === 'student' ? (
        <Routes>
          <Route
            exact
            path="/teacher/managepayment"
            name="TeacherManagePayment"
            element={<UrlProtected Component={TeacherPayment} />}
          />
          <Route
            exact
            path="/seller/rewards"
            name="studentorderRewards"
            element={<Protected Component={SellerRewards} />}
          />
          <Route
            exact
            path="/seller/dashboard"
            name="SellerDashboard"
            element={<Protected Component={SellerDashboard} />}
          />
          <Route
            exact
            path="/teacher/changepassword"
            name="ChangePassword"
            element={<UrlProtected Component={TeacherChangepassword} />}
          />
          <Route
            exact
            path="/seller/profile"
            name="SellerProfile"
            element={<UrlProtected Component={SellerProfile} />}
          />
          <Route
            exact
            path="/seller/billinginfo"
            name="SellerBillingInfo"
            element={<UrlProtected Component={SellerBillingInfo} />}
          />
          <Route
            exact
            path="/seller/add/content"
            name="SellerContent"
            element={<UrlProtected Component={SellerAddContent} />}
          />
          <Route
            exact
            path="/seller/content"
            name="SellerContent"
            element={<UrlProtected Component={SellerContent} />}
          />
        </Routes>
      ) : (
        ''
      )}
    </>
  )
}

export default Routing
