import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  manageSubjectAsync,
  postManageSubjectAsync,
} from '../../../store/features/ManageSubjectSlice'
import { Button, Card, Col, Form, Table } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import {
  EditManageSubjectAsync,
  deleteManageSubjectAsync,
} from 'src/store/features/editSubjectSlice'
import BackDashboard from 'src/Views/widgets/BackDashboard'
import editicn from '../../../assets/images/landing-page/pen-to-square.svg'
import dlticn from '../../../assets/images/landing-page/delete-icn-news.svg'
import { toast } from 'react-toastify'

const SystemSetting = () => {
  const [show, setShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [editForm, setEditForm] = useState('')
  const [category_name, setCategory_name] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [error, setError] = useState({})
  const [submit, setSubmit] = useState(false)
  const [delet1, setDelete1] = useState()

  const dispatch = useDispatch()

  // Modal Functions
  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
    setError('')
  }
  const EditClose = () => setEditShow(false)
  const [userID, setUserID] = useState('')
  const [userData, setUserData] = useState(false)
  const [dataId, setDataId] = useState('')

  const EditShow = (e) => {
    setCategory_name(e.subject_name)
    setDataId(e.id)
    setCategoryId(e.category_id)
    setEditShow(true)
  }

  const subjects = useSelector((state) => state?.getSubjects?.subjects)
  const { edit } = useSelector((state) => state?.deleteSubject)
  const errorMsg = useSelector((state) => state.deleteSubject.errorMsg)

  useEffect(() => {
    dispatch(manageSubjectAsync())
  }, [dispatch])

  // delete
  useEffect(() => {
    // declare the data fetching function
    if (deleteId) {
      const fetchData = async () => {
        await dispatch(deleteManageSubjectAsync(deleteId))
        await dispatch(manageSubjectAsync())
      }
      fetchData()
        // make sure to catch any error
        .catch(console.error)
    }
  }, [deleteId])

  // Error Message
  useEffect(() => {
    if (errorMsg == 500) {
      toast.error(errorMsg)
    }
  }, [errorMsg])

  // edit

  useEffect(() => {
    if (edit) {
      setUserID(edit?.data?.id)
      setCategory_name(edit?.data?.subject_name)
    }
  }, [edit])

  //Add
  const ediDatas = {
    id: dataId,
    subject_name: category_name,
    category_id: categoryId,
  }

  const EditSingleID = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setUserData(true)
    setSubmit(true)
    await setError(validate(ediDatas))
    await setEditForm(ediDatas)
  }

  function validate(val) {
    let err = {}
    if (!val.category_id) {
      err.category_id = 'Please Enter This Field '
    }
    if (!val.subject_name) {
      err.subject_name = 'Please Enter This Field '
    }
    return err
  }

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      const timer = setTimeout(async () => {
        await dispatch(EditManageSubjectAsync(editForm ? editForm : ''))
        await dispatch(manageSubjectAsync())
        await setEditShow(false)
      })
    }
  }, [submit, editForm])

  const handleSubmit = async (item, index) => {
    await setSubmit(true)
    if (category_name && categoryId) {
      const addSubject = await dispatch(postManageSubjectAsync(ediDatas))
      setShow(false)
      await dispatch(manageSubjectAsync())
      setCategory_name('')
      setCategoryId('')
    } else {
      setError('Please Fill This Field First')
    }
  }

  const handleDeleteModal = (e) => {
    setDeleteModal(true)
    setDelete1(e)
  }

  const changeCategory = (e) => {
    setCategoryId(e.target.value)
  }
  return (
    <>
      <Modal show={deleteModal} backdrop="static" keyword={false} centered>
        <Modal.Body>
          <h4 className="text-center fw-bold fs-5 mt-3"> Are you sure you want to delete ? </h4>
        </Modal.Body>
        <div className="d-flex justify-content-center mt-2 mb-4">
          <Button
            className="button-custom mx-2"
            onClick={() => {
              setDeleteId(delet1)
              setDeleteModal(false)
            }}
          >
            Yes
          </Button>
          <Button className="button-custom cancel-button" onClick={() => setDeleteModal(false)}>
            No
          </Button>
        </div>
      </Modal>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example" defaultValue="" onChange={changeCategory}>
              <option className="text-muted">Select Category</option>
              {subjects?.category?.map((ele, index) => (
                <option key={index} value={ele.value}>
                  {ele.name}
                </option>
              ))}
            </Form.Select>
            <span className="text-danger">{!categoryId ? error : ''}</span>
            <div className="mt-3">
              <Form.Label>Sub-Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Sub-Category"
                value={category_name}
                onChange={(e) => {
                  setCategory_name(e.target.value)
                }}
                required
              />
            </div>

            <span className="text-danger">{!category_name ? error : ''}</span>
            <div className="d-flex justify-content-center mt-3">
              <Button className="button-custom " onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
      </Modal>

      <Modal show={editShow} onHide={EditClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example" onChange={changeCategory}>
              <option className="text-muted">Select Category</option>
              {subjects?.category?.map((ele, index) => (
                <option key={index} value={ele.value} selected={ele.value == categoryId}>
                  {ele.name}
                </option>
              ))}
            </Form.Select>

            <Form.Label className="mt-3">Edit Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={category_name}
              onChange={(e) => {
                setCategory_name(e.target.value)
              }}
              required
            />
            <span className="text-danger">{error.subject_name}</span>
            <div className="d-flex justify-content-center mt-3">
              <Button variant="info" className="button-custom" onClick={EditSingleID}>
                Submit
              </Button>
            </div>
          </Form.Group>
        </Modal.Body>
      </Modal>
      <BackDashboard />

      <Col md={20} xl={20} className="">
        <Card className="Recent-Users card-bt mt-4 ">
          <Card.Header style={{ backgroundColor: '#fff' }}>
            <div className="d-flex justify-content-between">
              <Card.Title as="h5">SUBJECT MANAGEMENT</Card.Title>
              <button type="button" className="add-btn" onClick={handleShow}>
                <span className="text-white">Add</span>
              </button>
            </div>
          </Card.Header>
          <Card.Body className="px-0·py-2 ">
            <Table responsive hover>
              <tbody className=" table-main-wrap">
                <tr style={{ backgroundColor: '#eee', fontSize: '12px' }}>
                  <th>CATEGORY</th>
                  <th>SUB-CATEGORY</th>
                  <th className="">ACTION</th>
                </tr>
                {subjects?.data?.map((item, index) => {
                  return (
                    <tr className="unread" key={index}>
                      <td>
                        {subjects?.category?.map((ele, index) => {
                          if (ele.value == item.category_id) {
                            return ele.name
                          }
                        })}
                      </td>
                      <td>
                        <h6 className="mb-1">{item?.subject_name}</h6>
                      </td>

                      <td>
                        <div className="d-flex">
                          <img
                            src={editicn}
                            className="img-fluid edit-size-img  me-3"
                            onClick={() => EditShow(item)}
                            alt="react img"
                          />

                          <img
                            src={dlticn}
                            className="img-fluid del-size-img "
                            onClickCapture={() => handleDeleteModal(item.id)}
                            alt="react img"
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
//

export default SystemSetting
