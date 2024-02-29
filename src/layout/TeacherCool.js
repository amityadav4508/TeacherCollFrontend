import React from 'react'
import Footer from './Footer'
import Header from './Header'
import TeacherCoolPage from './TeacherCoolPage'
import SearchedContent from './SearchedContent'
import { Route,Routes } from 'react-router'

const TeacherCool = () => {

  return (
    <>
    
     <Header/>

   <Routes>
   <Route exact path="/" name="TeacherRegister" element={<TeacherCoolPage />} />
   <Route exact path="/content" name="TeacherRegister" element={<SearchedContent />} />
 
   
   </Routes>
      <Footer />
    </>
  )
}

export default TeacherCool
