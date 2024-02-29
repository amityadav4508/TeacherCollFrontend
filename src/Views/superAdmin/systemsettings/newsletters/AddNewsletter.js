import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import React from 'react'
import { Button } from 'react-bootstrap'
import BackButton from 'src/Views/widgets/BackButton'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useEffect, useState } from 'react'
import { addNewsLetterAsync, clearAllState } from 'src/store/features/NewsLetterSlice'
import { useDispatch } from 'react-redux'
import camera from 'src/assets/images/Camera.jpg'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AddNewsletter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [err, setErr] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [imageShow, setImageShow] = useState('')
  const [keyword,setKeyword]=useState('')

  const letterData = {
    title: title,
    message: message,
    cover_image: coverImage[0] ? coverImage[0] : '',
    keyword:keyword?keyword:""
  }

  const handleSubmit = () => {
    setErr(validate(letterData))
    setSubmit(true)
  }

  const validate = (val) => {
    const errors = {}
    if (!val.title) {
      errors.title = 'Title is required'
    }
    if (!val.message) {
      errors.message = 'Message is required'
    }
    if (!val.cover_image) {
      errors.cover_image = 'Cover image is required'
    }
    if(!val.keyword){
      errors.keyword="Keyword is required"
    }
    return errors
  }
  const MAX_FILE_SIZE = 524288

  useEffect(() => {
    if (Object.keys(err).length == 0 && submit) {
      dispatch(addNewsLetterAsync(letterData))
      dispatch(clearAllState())
      toast.success('Newsletter added successfully')
    }
    setTimeout(() => {
      setImageShow('')
      setMessage('')
      setTitle('')
      setCoverImage('')
    }, 1000)
  }, [err, submit])

  return (
    <>
      <BackButton />

      <div className="bg-white mt-3 p-4">
        <CForm>
          <h4>Newsletter</h4>
          <div className="my-3">
            <CFormLabel htmlFor="exampleInputEmail1">Title/Summary</CFormLabel>
            <CFormInput
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <span className="text-danger">{err.title}</span>
          </div>
          <div className="my-3">
            <CFormLabel htmlFor="exampleInputEmail1">Keyword</CFormLabel>
            <CFormInput
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
              }}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <span className="text-danger">{err.keyword}</span>
          </div>
          <div className="my-4">
            <div className="d-flex p-4 align-items-center border-dash">
              <div className="avatar-upload mb-3">
                <div className="avatar-edit book-edit-cover">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={(e) => {
                      if (
                        e.target.files[0].type == 'image/png' ||
                        e.target.files[0].type == 'image/jpg' ||
                        (e.target.files[0].type == 'image/jpeg' &&
                          e.target.files[0]?.size <= MAX_FILE_SIZE)
                      ) {
                        setCoverImage(e.target.files)
                        const image = URL?.createObjectURL(e?.target?.files[0])
                        setImageShow(image)
                      } else {
                        MAX_FILE_SIZE
                          ? toast.error('File size should be less than 512kb')
                          : toast.error('Unsupported file extension')
                      }
                    }}
                  />
                  <label
                    htmlFor="imageUpload"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </label>
                </div>

                <div className="avatar-preview w-75 border-0">
                  <div className="rounded-0" id="imagePreview">
                    <img src={imageShow ? imageShow : camera} alt="react img" />
                  </div>
                </div>
              </div>
              <div>
              <span className="image-text-bg">Image size should be 150*200</span>
              <h6 className="w-75  up-pic-mandatory">Add Cover Page </h6>
              </div>
            </div>
          </div>
          {isSuccess ? <p className="success-message"></p> : null}
          <span className="text-danger">{err.cover_image}</span>

          <div className="my-5">
            <CFormLabel htmlFor="exampleInputEmail1">Description</CFormLabel>
            <CKEditor
              editor={ClassicEditor}
              config={{
                removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed', 'Table'],
              }}
              onChange={(e, editor) => setMessage(editor.getData())}
              data={message}
            />
            <span className="text-danger">{err.message}</span>
          </div>
        </CForm>
        <div className="d-flex justify-content-end mt-3 mb-3">
          <Button
            className="button-custom mx-3"
            onClick={(e) => {
              handleSubmit(e)
            }}
          >
            Post
          </Button>
          <Button className="button-custom cancel-button" onClick={() => navigate(-1)}>
            Decline
          </Button>
        </div>
      </div>
    </>
  )
}

export default AddNewsletter
