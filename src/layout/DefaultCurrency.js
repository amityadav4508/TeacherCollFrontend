import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faIndianRupeeSign,
  faDollarSign,
  faEuroSign,
  faSterlingSign,
} from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherStatsAsync } from 'src/store/features/TeacherStatsinfo'

const DefaultCurrency = () => {
  const { teacherStats } = useSelector((state) => state?.TeacherStats)
  const { wallet } = useSelector((state) => state?.sosEmail)
  const token = JSON.parse(localStorage.getItem('teacherAuth'))


  const dispatch = useDispatch()

  useEffect(() => {
    if(token){
      dispatch(getTeacherStatsAsync())
    }
  }, [token])


  return (
    <>
      {teacherStats?.data?.data?.currency == 'INR' ||  wallet?.data?.currency  == 'INR' ? (
        <FontAwesomeIcon className="fa-sm" icon={faIndianRupeeSign} />
      ) : teacherStats?.data?.data?.currency == 'USD' ||  wallet?.data?.currency == 'USD' ? (
        <FontAwesomeIcon className="fa-sm" icon={faDollarSign} />
      ) : teacherStats?.data?.data?.currency  == 'EUR' || wallet?.data?.currency == 'EUR' ? (
        <FontAwesomeIcon className="fa-sm" icon={faEuroSign} />
      ) : teacherStats?.data?.data?.currency == 'GBP' ||  wallet?.data?.currency == 'GBP' ? (
        <FontAwesomeIcon className="fa-sm" icon={faSterlingSign} />
      ) : (
        <FontAwesomeIcon className="fa-sm" icon={faIndianRupeeSign} />
      )}
      
    </>
  )
}

export default DefaultCurrency
