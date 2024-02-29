import { configureStore } from "@reduxjs/toolkit";
import authSlice  from './features/AuthSlice';
import registerSlice from './features/AuthSlice';
import teacherloginSlice from './features/AuthSlice'
import userdataSlice from './features/userDataslice';
import userSingleIdSlice from './features/userDataslice';
import userFilterDataSlice from './features/userDataslice';
import userStudentFilterDataSlice from './features/userDataslice';
import manageAdminSlice from "./features/ManageAdminSlice";
import adminListSlice from './features/AdminListSlice';
import postAdminSlice from './features/PostAdminSlice';
import teacherRequestSlice from "./features/TeacherRequestSlice";
import postTeacherRequestSlice  from "./features/TeacherRequestSlice";
import editAdminSlice from './features/PostAdminSlice'
import singleIDSlice from './features/ManageAdminSlice'
import deleteSlice from './features/ManageAdminSlice'
import getSubscriptionSlice from './features/SubscriptionSlice'
import postSubscriptionSlice from './features/SubscriptionSlice'
import editSubscriptionSlice from './features/SubscriptionSlice'
import singleSubscriptionSlice from './features/SubscriptionSlice'
import getAssignmentListSlice from './features/OrderListSlice'
import getcheckAssignmentSlice from './features/OrderListSlice'
import getContentListSlice from './features/ContentListSlice'
import getContentIdSlice from './features/ContentListSlice'
import getManageSubjectSlice from './features/ManageSubjectSlice'
import getSingleSubjectSlice from './features/ManageSubjectSlice'
import postManageSubjectSlice from './features/ManageSubjectSlice'
import EditManageSubjectSlice from './features/ManageSubjectSlice'
import DeleteSubjectSlice from './features/editSubjectSlice'
import getSingleContentIdSlice from './features/ContentListSlice'
import adminPaymentSlice from './features/PaymentSlice'
import getPaymentSlice from './features/ManagepaymentSlice'
import MainPageContentSlice from "./features/MainPageContentSlice"; 
import paymentInfoSlice from "./features/ManagepaymentSlice"
import postBlockApiSlice from "./features/BlockApiSlice"
import changePassAdminSlice from './features/ForgetPasswordSlice'
import sideBarReducer from "../store/features/SidebarSlice"
import  getSubjectListSlice from "./features/GetSubjectLsitSlice"; 
import verifyEmailSlice from "../store/features/verifyEmailSlice";
import editSubAdminSlice from "../store/features/EditsubadminSlice"
import forgetPasswordSlice from "./features/ForgetPasswordSlice";
import teacherSettingsSlice from './features/TeacherSettingsSlice';
import editTeacherProfileSlice from './features/TeacherEditProfileSlice';
import NotifySlice from './features/NotificationSlice'
import NewsLetterSliceReducer from './features/NewsLetterSlice'
import AssignmentByIdSlice from './features/getAssignmentbyId'
import TeacherStatsinfoSlice from "./features/TeacherStatsinfo";
import AdminStatsinfoSlice from './features/AdminStatsSlice'
import Studentsubscriptionslice from "./features/Studentsubscriptionslice";
import Checkoutslice from "./features/Checkoutplanslice";
import  OrderStatsSlice  from "./features/StudentordersSlice";
import postQuestionSlice from './features/PostQuestionSlice'
import TeacherManageOrderSlice from './features/TeachermanageorderSlice'
import JobStatsSlice  from "./features/Job&InternshipSlice";
import AcceptAssignmentslice from "./features/AcceptAssignmentslice";
import sosEmailSlice from "./features/sosEmailSlice";
import MeetingSheduleSlice from "./features/MeetingSheduleSlice";
import ChatSlice from "./features/ChatSlice";
import  sellAndEarnSlice  from "./features/SellAndEarnSlice";
import  zoomSlice  from "./features/ZoomSlice";

export default configureStore(
  {
    reducer: {
      auth: authSlice,
      authregister: authSlice,
      teacherauth: teacherloginSlice,
      logout: registerSlice,
      tabledata: userdataSlice,
      userSingleId:userSingleIdSlice,
      filterData:userFilterDataSlice,
      adminData : manageAdminSlice,
      adminList: adminListSlice,
      postadminData: postAdminSlice,
      editAdmin: editAdminSlice,
      teacher: teacherRequestSlice,
      postteacher: postTeacherRequestSlice,
      Singlesubadmin:singleIDSlice,
      deleteadmin:deleteSlice,
      getSubscription:getSubscriptionSlice,
      postSubscription:postSubscriptionSlice,
      editSubscription:editSubscriptionSlice,
      subscriptionIdAdmin:singleSubscriptionSlice,
      getorderdetails:getAssignmentListSlice,
      getcheckAssignment:getcheckAssignmentSlice,
      sideBar:sideBarReducer,
      getContentdetails:getContentListSlice,
      singleContentId:getContentIdSlice,
      studentFilterdata:userStudentFilterDataSlice,
      getSubjects:getManageSubjectSlice,
      getSingleSubject:getSingleSubjectSlice,
      postSubject:postManageSubjectSlice,
      editSubject:EditManageSubjectSlice,
      deleteSubject:DeleteSubjectSlice,
      getSingleContentId:getSingleContentIdSlice,
      paymentSlice:adminPaymentSlice,
      paymentInfo:paymentInfoSlice,
      managePayment:getPaymentSlice,
      mainPageContent:MainPageContentSlice,
      blockStatus:postBlockApiSlice,
      forgetPass:changePassAdminSlice,
      subject:getSubjectListSlice,
      verifyEmail:verifyEmailSlice,
      editSubAdminProfile:editSubAdminSlice,
      changepassword:forgetPasswordSlice,
      teacherSettings: teacherSettingsSlice,
      editTeacherProfile: editTeacherProfileSlice,
      Notification:NotifySlice,
      NewsLetter:NewsLetterSliceReducer,
      AssignmentbyId:AssignmentByIdSlice,
      TeacherStats:TeacherStatsinfoSlice,
      AdminStats:AdminStatsinfoSlice,
      getStudentPlans:Studentsubscriptionslice,
      CheckoutPlans:Checkoutslice,
      StudentOrders:OrderStatsSlice,
      postQuestionResponse:postQuestionSlice,
      Teacherassignment:TeacherManageOrderSlice,
      getJobs:JobStatsSlice,
      acceptAssignment : AcceptAssignmentslice,
      sosEmail:sosEmailSlice,
      meeting:MeetingSheduleSlice,
      chats: ChatSlice,
      sellAndEarn:sellAndEarnSlice,
      zoomData:zoomSlice
    },
  },

);