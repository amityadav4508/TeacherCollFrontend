import { CForm, CFormInput, CFormLabel } from '@coreui/react'
import React from 'react'
import { Button } from 'react-bootstrap'
import BackButton from 'src/Views/widgets/BackButton'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useEffect, useState } from 'react'
import { editNewsLetterAsync, getNewsLetterDetailAsync } from 'src/store/features/NewsLetterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditNewsletter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [tempImage, setTempImage] = useState('')
  const [err, setErr] = useState('')
  const [submit, setSubmit] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { id } = useParams()
  const [keyword,setKeyword]=useState('')
  const { newsData } = useSelector((state) => state.NewsLetter)
  const [imageShow, setImageShow] = useState('')

  useEffect(() => {
    if (id) {
      dispatch(getNewsLetterDetailAsync(id))
    }
  }, [id])

  useEffect(() => {
    if (newsData?.status == 200 && id) {
      setTitle(newsData?.data?.data?.title ? newsData?.data?.data?.title : '')
      setMessage(newsData?.data?.data?.message ? newsData?.data?.data?.message : '')
      setCoverImage(newsData?.data?.data?.cover_image_path ? newsData?.data?.data?.cover_image_path : '')
      setKeyword(newsData?.data?.data?.keyword?newsData?.data?.data?.keyword:"" )
    }
  }, [newsData, id])

  const letterData = {
    id: id,
    title: title,
    message: message,
    cover_image: coverImage[0] ? coverImage[0] : '',
    keyword:keyword?keyword:""
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('message', message)
    formData.append('cover_image', tempImage)
    formData.append('keyword', keyword)


    setErrorMsg('')
    setIsSuccess(true)

    setErr(validate(letterData))
    setSubmit(true)
  }
  const validate = (val) => {
    const errors = {}
    if (!val.title) {
      errors.title = 'Title is required'
    }
    if (!val.message) {
      errors.message = 'Description is required'
    }
    if (!val.cover_image) {
      errors.cover_image = 'Title is required'
    }
    if (!val.keyword) {
      errors.keyword = 'Keyword is required'
    }
    return errors
  }

  useEffect(() => {
    const editnewsLetterData = async () => {
      if (Object.keys(err).length == 0 && submit) {
        await dispatch(editNewsLetterAsync(letterData))
        setTimeout(async () => {
          await dispatch(getNewsLetterDetailAsync(id))
        }, 1000)
        // await toast.success('Newsletter updated successfully')
      }
    }
    editnewsLetterData()
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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setKeyword(e.target.value)}
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
                    accept="image/png,image/jpg,image/jpeg"
                    id="imageUpload"
                    onChange={(e) => {
                      setCoverImage(e.target.files)
                      const image = URL?.createObjectURL(e?.target?.files[0])
                      if (
                        e.target.files[0].type == 'application/pdf' ||
                        e.target.files[0].type == 'application/msword' ||
                        e.target.files[0].type == 'image/png' ||
                        e.target.files[0].type == 'image/jpg' ||
                        e.target.files[0].type == 'image/jpeg'
                      ) {
                        setImageShow(image)
                      } else {
                        toast.error('Unsupported file extension')
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
                  <div className="rounded-0 innercover_book" id="imagePreview">
                    {imageShow || coverImage ? (
                      ''
                    ) : (
                      <span className="position-absolute image-text-bg">
                        Image size should be 150*200
                      </span>
                    )}
                    <img
                      src={
                        imageShow
                          ? imageShow
                          : `${process.env.REACT_APP_API_URL}/public/storage/${coverImage}`
                      }
                      alt="react img"
                    />
                  </div>
                </div>
              </div>
              <h6 className="w-75  up-pic-mandatory   ">Add Cover Page </h6>
            </div>
          </div>
          {isSuccess ? <p className="success-message"></p> : null}
          <p className="error-message">{errorMsg}</p>

          <div className="my-2">
            <CFormLabel htmlFor="exampleInputEmail1">Description</CFormLabel>
            <CKEditor
              editor={ClassicEditor}
              data={message}
              config={{
                removePlugins: ['EasyImage', 'ImageUpload', 'MediaEmbed', 'Table'],
              }}
              onChange={(e, editor) => setMessage(editor.getData())}
            />
            <span className="text-danger">{err.message}</span>
          </div>
        </CForm>
        <div className="d-flex justify-content-end mt-3 mb-3">
          <Button className="button-custom mx-3" onClick={handleSubmit}>
            Update
          </Button>
          <Button className="button-custom cancel-button" onClick={() => navigate(-1)}>
            Decline
          </Button>
        </div>
      </div>
    </>
  )
}

export default EditNewsletter