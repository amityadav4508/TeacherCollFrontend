import React from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Loader from 'src/Views/Loader/Loader'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const { loading } = useSelector((state) => state.auth)
  const { userloading } = useSelector((state) => state.tabledata)
  const { manageAdminloading } = useSelector((state) => state.adminData)
  const { adminloading } = useSelector((state) => state.adminList)
  const { addAdminloading } = useSelector((state) => state.postadminData)
  const { teacherReqLoading } = useSelector((state) => state.teacher)
  const { subscriptionloading } = useSelector((state) => state.getSubscription)
  const { mainContentloading } = useSelector((state) => state.mainPageContent)
  const { paymentloading } = useSelector((state) => state.paymentSlice)
  const { manageSubjectLoading } = useSelector((state) => state.getSubjects)
  const { NotifyLoading } = useSelector((state) => state.Notification)
  const { teacherProfileloading } = useSelector((state) => state.editTeacherProfile)
  const { newsLoading } = useSelector((state) => state.NewsLetter)
  const { editLoading } = useSelector((state) => state.deleteSubject)
  const { assignbidloading } = useSelector((state) => state.AssignmentbyId)
  const { addhoursAssignmentLoading } = useSelector((state) => state.acceptAssignment)
  const { orderloading } = useSelector((state) => state.getorderdetails)
  const { Assignmentloading } = useSelector((state) => state.Teacherassignment)
  const {jobLoading}=useSelector((state)=>state.getJobs)
  const {meetingLoading}=useSelector((state)=>state.meeting)
  const { Zoomloading } = useSelector((state) => state.zoomData)
  const {sellerloading}=useSelector((state)=>state.sellAndEarn)
  const {contentLoading}=useSelector((state)=>state.getContentdetails)
  const { orderReLoading } = useSelector((state) => state?.AssignmentbyId)
  const { editSubAdminloading } = useSelector((state) => state.editSubAdminProfile)
  return (
    <div>
      <AppSidebar sm="12rem" lg="20rem" xl="24rem" />

      <div
        className={
          orderloading ||
          jobLoading||
          assignbidloading ||
          contentLoading||
          addhoursAssignmentLoading ||
          newsLoading ||
          meetingLoading||
          teacherProfileloading ||
          NotifyLoading ||
          manageSubjectLoading ||
          paymentloading ||
          mainContentloading ||
          subscriptionloading ||
          editSubAdminloading||
          addAdminloading ||
          adminloading ||
          manageAdminloading ||
          userloading ||
          loading ||
          Assignmentloading ||
          Zoomloading||
          sellerloading||
          orderReLoading||
          teacherReqLoading === true
            ? 'wrapper d-flex flex-column min-vh-100 blur-scroll-wrap'
            : 'wrapper d-flex flex-column min-vh-100 '
        }
      >
        <AppHeader />
        
        {newsLoading ||
        jobLoading||
        Assignmentloading ||
        meetingLoading||
        contentLoading||
        orderloading ||
        assignbidloading ||
        editSubAdminloading||
        addhoursAssignmentLoading ||
        teacherProfileloading ||
        NotifyLoading ||
        manageSubjectLoading ||
        editLoading ||
        paymentloading ||
        mainContentloading ||
        subscriptionloading ||
        addAdminloading ||
        adminloading ||
        manageAdminloading ||
        userloading ||
        loading ||
        Zoomloading||
        sellerloading||
        orderReLoading||
        teacherReqLoading === true ? (
          <div className=" d-flex justify-content-center zIndex ">
            <Loader />
          </div>
        ) : (
          ''
        )}
        {/* <ToastContainer
         limit={1}
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          type={'type'}
        /> */}
        <div className="body flex-grow-1 px-3 " style={{ background: '#F5F5F5' }}>
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
