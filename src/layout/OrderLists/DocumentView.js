import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getStudentManageSearchAsync } from 'src/store/features/Studentsubscriptionslice'
import sciencemac from '../../assets/images/orderwith-us/Searchdocs.jpg'

const DocumentView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { studentPlan } = useSelector((state) => state?.getStudentPlans)

 

  useEffect(() => {
    dispatch(getStudentManageSearchAsync(id))
  }, [id,dispatch])
  return (
    <div>
      {studentPlan?.data?.data?.map((item, index) => {
        return (
          <div key={index} className='searchcard shadow p-3 mb-5 bg-white rounded'>
            <Card className='cardborder' >
              <Card.Body >
                <Card.Img
                  style={{ width: '70%',marginLeft:"80px" }}
                  variant="top"
                  src={sciencemac}
                  className="img-fluid mb-2 "
                />
                <Card.Subtitle className="mb-2 searchfont">{item?.name}</Card.Subtitle>
                <Card.Text><p>{item?.description}</p></Card.Text>
              </Card.Body>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default DocumentView
