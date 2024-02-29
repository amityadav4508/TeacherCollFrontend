import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import React from 'react'
import { Button } from 'react-bootstrap'
import BackButton from 'src/Views/widgets/BackButton'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotifyAsync } from 'src/store/features/NotificationSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Notificationview = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('')
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState('')
  const [submit, setSubmit] = useState(false)
  const navigate=useNavigate()
  const { NotifyMsg } = useSelector((state) => state.Notification)


  const Notify = (e) => {
    setFilter(e.target.value)
  }
  const notifyType = (e) => {
    setType(e.target.value)
  }

  const data = {
    notify_to: filter,
    notification_type: type,
    title: title,
    message:message
  }

  const handleSubmit = async () => {
    await setErrors(Validate(data))
    await setSubmit(true)
  }
  const Validate = (val) => {
    let error = {}
    if (!val.notify_to) {
      error.notify_to = 'Notification is Required'
    }
    if (!val.notification_type) {
      error.notification_type = 'Type is Required'
    }
    if (!val.title) {
      error.title = 'Title is Required'
    }
    if (!val?.message) {
      error.message = 'Message is Required'
    }
    return error
  }

  useEffect(() => {
    if (NotifyMsg && NotifyMsg.status == 200) {
      toast.success(NotifyMsg?.data?.data)
    }
  }, [NotifyMsg])

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submit) {
      const updateNotifiaction=async()=>{

        await dispatch(NotifyAsync(data))
        navigate(-1)
        // await navigate('./systemsetting/notificationSetting')

      }
      updateNotifiaction()
    }
  }, [submit, errors])

  return (
    <div className="">
      <BackButton />
      <div className="d-flex">
        <div className="fw-bold">Notify :</div>

        <div className="  justify-content-evenly form-check-wrap-notify" onChange={Notify}>
          <div className="form-check ">
            <Form.Check id='all' type="radio" aria-label="radio 1" value="1" checked={filter === '1'} />
            <label className="form-check-label" htmlFor="all">
              All Users
            </label>
          </div>
          <div className="form-check">
            <Form.Check  id='teacher'type="radio" aria-label="radio 1" value="2" checked={filter === '2'} />
            <label className="form-check-label" htmlFor="teacher">
              Teachers
            </label>
          </div>
          <div className="form-check">
            <Form.Check id='student' type="radio" aria-label="radio 1" value="3" checked={filter === '3'} />
            <label className="form-check-label" htmlFor="student">
              Students
            </label>
          </div>
        </div>
        <span className="text-danger">{errors.notify_to}</span>
      </div>

      <Form.Label className="mt-5">Type</Form.Label>
      <Form.Select onChange={notifyType}>
        <option value="" className="text-muted">Select</option>
        <option value="1">System Notification</option>
        <option value="2">Email</option>
      </Form.Select>
      <span className="text-danger">{errors.notification_type}</span>

      <CForm className="mt-5">
        <CFormInput
          type="text"
          id="exampleFormControlInput1"
          label="Title/Summary"
          placeholder=""
          onChange={(e) => setTitle(e.target.value)}
        />
      </CForm>
      <span className="text-danger">{errors.title}</span>

      <div className="my-5">
        <CFormLabel htmlFor="exampleInputEmail1">Description</CFormLabel>
        <CKEditor
          className="ck-editor__editable_inline"
          editor={ClassicEditor}
          config={{
            removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed', 'Table'],
          }}
          data=""
          onChange={(e, editor) => setMessage(editor?.getData())}
        />
        <span className="text-danger">{errors.message}</span>
      </div>

      <div className="d-flex justify-content-end mt-3 mb-5">
        <Button className="button-custom mx-3" onClick={handleSubmit}>
          Post
        </Button>
        <Button className="button-custom cancel-button">Decline</Button>
      </div>
    </div>
  )
}

export default Notificationview
