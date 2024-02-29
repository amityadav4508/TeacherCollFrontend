import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CryptoJS from 'crypto-js'
import { searchMainPageContentAsync } from 'src/store/features/MainPageContentSlice'
import { Button } from 'react-bootstrap'
import NavTopBar from './NavTopBar'
import { getStudentManageSearchAsync } from 'src/store/features/Studentsubscriptionslice'
import { getTeacherStatsAsync } from 'src/store/features/TeacherStatsinfo'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { name } = useParams()
  const [keyword, setKeyword] = useState(name)
  const [data1, setData1] = useState('')
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const token = JSON.parse(localStorage.getItem('teacherAuth'))


  useEffect(() => {
    if (token) {
      dispatch(getTeacherStatsAsync())
    }
  }, [token])

  useEffect(() => {
    if (checkType) {
      const handleLogin = async () => {
        const secretPass = 'XkhZG4fW2t2W'
        var bytes = CryptoJS.AES.decrypt(checkType, secretPass)
        setData1(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
      }
      handleLogin()
    }
  }, [checkType])


  const handleKeyDown = async (event) => {

    if (event.key === 'Enter') {
      await navigate(`/content/${keyword}`)
      dispatch(searchMainPageContentAsync(event.target.value))
      //  dispatch(getStudentManageSearchAsync({ keyword: event.target.value }))
    }
  }

  useEffect(()=>{
    dispatch(searchMainPageContentAsync())
  },[])

  return (
    <>
      <NavTopBar />
      <section className="study-support">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="bannre-heading">Study Support Available.</h4>
              <div className="banner-form-section">
                <div className="form-wrapper">
                  <input
                    type="text"
                    value={keyword}
                    placeholder="Find Books, Solutions & more..."
                    className="form-control"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      setKeyword(e.target.value)
                    }}
                  />

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Header
