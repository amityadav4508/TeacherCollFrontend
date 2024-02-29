import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import BackButton from 'src/Views/widgets/BackButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { addNewContentasync } from 'src/store/features/SellAndEarnSlice'
import DefaultCurrency from 'src/layout/DefaultCurrency'

const SellerAddContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [contentErr, setContentErr] = useState('')
  const [file, setFile] = useState('')
  const [fileName, setFileName] = useState('')
  const [content, setContentDetails] = useState({
    title: '',
    name: '',
    file: '',
    content_category: '',
    expected_amount: '',
    is_exchange: '',
  })

  const [selectIncome, setSelectIncome] = useState('')
  useEffect(() => {
    if (selectIncome == 2) {
      setContentDetails({
        title: content.title,
        file: content.file,
        content_category: content.content_category,
        expected_amount: content.expected_amount,
        is_exchange: 2,
      })
    } else {
      setContentDetails({
        title: content.title,
        name: content.name,
        file: content.file,
        content_category: content.content_category,
        expected_amount: content.expected_amount,
        is_exchange: '',
      })
    }
  }, [selectIncome])

  const { verifyOtpMsg } = useSelector((state) => state.sellAndEarn)
  const Category = [
    {
      value: '1',
      label: 'It',
    },
    {
      value: '2',
      label: 'Non-It',
    },
    {
      value: '3',
      label: 'It-Without(Coding)',
    },
  ]

  useEffect(() => {
    if (file || verifyOtpMsg) {
      setContentDetails({
        title: content.title,
        file: file,
        name: fileName,
        content_category: content.content_category,
        expected_amount: content.expected_amount,
        is_exchange: content.is_exchange,
      })
    }
  }, [file, verifyOtpMsg])


  const contentUpload = (e) => {
    setContentErr('')
    const regex = /^\d{0,18}$/
    const { name, value } = e.target
    if(name=='expected_amount'){
      if(value == '' || regex.test(value)){
        setContentDetails({ ...content, [name]: value.trim() })
      }
    }else {
      setContentDetails({ ...content, [name]: value })
    }
    }

  const updateContent = async () => {
    setContentErr(validateContent())
    if (Object.keys(validateContent()).length == 0) {
      const formData = new FormData()
      formData.append('name', content.title)
      formData.append('file', content.file)
      formData.append('name', content.name)
      formData.append('content_category', content.content_category)
      formData.append('expected_amount', content.expected_amount)
      formData.append('is_exchange', content.is_exchange)
      await dispatch(addNewContentasync(formData))
      navigate('/seller/content')
      setContentDetails('')
      toast.success('Content added successfully')
    }
  }
  const validateContent = () => {
    const err = {}
    if (!content.title) {
      err.title = 'Title is required'
    }
    if (!content.file) {
      err.file = 'File is required'
    }
    if (!content.content_category) {
      err.content_category = 'Category is required'
    }
    if (!selectIncome) {
      err.select_option = 'Select option first'
    }
    if (selectIncome == 1) {
      if (!content.expected_amount) {
        err.expected_amount = 'Expected Price is required'
      } else if (Number.parseInt(content.expected_amount) < 1) {
        err.expected_amount = 'Please enter a valid price'
      }
    }
    if (selectIncome == 2) {
      if (!content.is_exchange) {
        err.is_exchange = 'Word Exchange is required'
      }
    }
    return err
  }

  const uploadDocsinfo = (e) => {
    setContentErr('')
    setFileName(e.target.files[0].name)
    if (e.target.files[0].size >= 2000000) {
      toast.error('File size must be less then 2MB')
      setFile('')
    }
    if (
      e.target.files[0].type == 'application/pdf' ||
      e.target.files[0].type ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      e.target.files[0].type == 'application/doc' ||
      e.target.files[0].type == 'application/docs' ||
      e.target.files[0].type == 'application/docx' ||
      e.target.files[0].type == 'application/msword'
      // e.target.files[0].type == 'application/x-zip-compressed'||
      // e.target.files[0].type == 'data:text/csv;charset=utf-8,'
    ) {
      setFile(e.target.files[0])

      var fileName = e.target.files[0].name
      document.getElementById('file_name').innerText = fileName
    } else {
      toast.error('This file format is not acceptable')
      setFile('')
      document.getElementById('file_name').innerHTML =
        ' Upload <span className="fw-bold ms-1"> Educational  Docs</span>'
    }
  }
  return (
    <div>
      <div className="d-flex justify-content-end">
        <BackButton />
      </div>
      <Card className="border-0 shadow-lg  p-4 mt-3">
        <Card.Title className="text-center mb-4">Add Content</Card.Title>

        <Form.Label>Title</Form.Label>
        <Form.Control
          className="w-100  "
          type="text"
          name="title"
          value={content.title}
          onChange={contentUpload}
        />
        <p className="text-danger ">{contentErr.name}</p>
        <div className="me-2 w-100">
          <label className="fs-6 fw-normal my-1">Category*</label>
          <Form.Select
            className="w-100"
            aria-label="Default select example"
            name="content_category"
            value={content.content_category}
            onChange={contentUpload}
          >
            <option className="d-none">Category</option>

            {Category?.map((ele, index) => (
              <option value={ele.value} key={index}>
                {ele.label}
              </option>
            ))}
          </Form.Select>
          <p className="text-danger ">{contentErr.content_category}</p>
        </div>

        {/* <p className="text-danger">{err.name}</p> */}

        <Col className="position-relative">
          <label className="fs-6 fw-normal my-1"> Content Upload </label>
          <div className="me-2   border rounded position-relative d-flex align-items-center ">
            <h6
              id="file_name"
              className="position-absolute d-flex align-items-center mb-0 ms-2 upload-sec overflow-hide"
            >
              <span className="fw-bold ms-1">
                {file['userPreviousDocs'] ? file['userPreviousDocs'] : 'Content Upload '}
              </span>
            </h6>
            <Form.Control
              className="w-100 opacity-0"
              type="file"
              accept="application/msword, application/doc, application/pdf,application/docx,application/docs ,application/vnd.openxmlformats-officedocument.wordprocessingml.document "
              name="file"
              onChange={uploadDocsinfo}
            />
          </div>

          <p className="text-danger ">{contentErr.file}</p>
          {
            <p className="text-secondary  " style={{ fontSize: '12px' }}>
              For Uploading new file Click on File name..
            </p>
          }
        </Col>
        <Row>
          <Col>
            <Form.Select
              onChange={(e) => {
                setContentErr('')
                setSelectIncome(e.target.value)
              }}
              className="email-input"
              aria-label="Default select example"
            >
              <option>Select </option>
              <option value="1">Expected Price</option>
              <option value="2">Word Exchange</option>
            </Form.Select>
            <p className="text-danger ">{contentErr.select_option}</p>
          </Col>
        </Row>
        <Row className="pt-3">
          {selectIncome == 1 ? (
            <Col>
              <Form.Label>Expected Price</Form.Label>
              <div className="position-relative">
                <span className="position-absolute " style={{ top: '7px', left: '6px' }}>
                  <FontAwesomeIcon className="fa-sm" icon={faIndianRupeeSign} />
                </span>
                <Form.Control
                  className="w-100 ps-3 "
                  type="text"
                  name="expected_amount"
                  value={content.expected_amount}
                  onChange={contentUpload}
                />
                <p className="text-danger ">{contentErr.expected_amount}</p>
              </div>
            </Col>
          ) : (
            ''
          )}
        </Row>
        <div className="d-flex justify-content-end mb-4 mt-4">
          <Button className="button-custom" onClick={updateContent}>
            Add
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default SellerAddContent
