import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useDispatch } from 'react-redux'
import Footer from 'src/layout/Footer'
import NavTopBar from 'src/layout/NavTopBar'
import { copyrightAsync } from 'src/store/features/sosEmailSlice'

const CopyrightTakedownRequest = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    url: '',
    email: '',
    another_url: '',
    work_infringed: '',
    first_name: '',
    last_name: '',
    title: '',
    university_email: '',
    university_name: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    property_rights: '',
    offer_materials: '',
    accurate_information: '',
    fax: '',
    country: '',
  })
  const [anotherUrl, setAnotherUrl] = useState(false)
  const [err, setErr] = useState('')

  const handleChange = (e) => {
    setErr('')
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErr(validate())
    const data = {
      url: userData.url,
      email: userData.email,
      more_url: anotherUrl ? 1 : 0,
      another_url: userData.another_url,
      work_infringed: userData.work_infringed,
      first_name: userData.first_name,
      last_name: userData.last_name,
      title: userData.title,
      university_email: userData.university_email,
      university_name: userData.university_name,
      phone: userData.phone,
      address_line_1: userData.address_line_1,
      address_line_2: userData.address_line_2,
      city: userData.city,
      state: userData.state,
      zip: userData.zip,
      country: userData.country,
      property_rights: userData.property_rights == 'on' ? 1 : 0,
      offer_materials: userData.offer_materials == 'on' ? 1 : 0,
      accurate_information: userData.accurate_information == 'on' ? 1 : 0,
      fax: userData.fax,
      country: userData.country,
    }
    if (Object.keys(validate()).length == 0) {
      dispatch(copyrightAsync(data))
    }
  }

  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const err = {}
    if (!userData.url) {
      err.url = 'Url is required'
    }
    if (!userData.email) {
      err.email = 'Email is required'
    }
    if (!regex.test(userData.email)) {
      err.email = 'This is not a valid email format!'
    }
    if (!userData.another_url) {
      err.another_url = 'Another Url is required'
    }
    if (!userData.work_infringed) {
      err.work_infringed = 'Work Infringed is required'
    }
    if (!userData.first_name) {
      err.first_name = 'First Name is required'
    }
    if (!userData.last_name) {
      err.last_name = 'Last Name is required'
    }
    if (!userData.title) {
      err.title = 'Title is required'
    }
    if (!userData.university_email) {
      err.university_email = 'University Email is required'
    }
    if (!regex.test(userData.university_email)) {
      err.university_email = 'This is not a valid email format!'
    }
    if (!userData.university_name) {
      err.university_name = 'University Name is required'
    }
    if (!userData.phone) {
      err.phone = 'Phone Number is required'
    }
    if (!userData.address_line_1) {
      err.address_line_1 = 'Address Line_1 is required'
    }
    if (!userData.address_line_2) {
      err.address_line_2 = 'Address Line_2 is required'
    }
    if (!userData.city) {
      err.city = 'City  is required'
    }
    if (!userData.state) {
      err.state = 'state  is required'
    }
    if (!userData.zip) {
      err.zip = 'Zip  is required'
    }
    if (!userData.country) {
      err.country = 'Country  is required'
    }
    if (!userData.property_rights) {
      err.property_rights = 'Property Rights  is required'
    }
    if (!userData.offer_materials) {
      err.offer_materials = 'Property Material  is required'
    }

    if (!userData.accurate_information) {
      err.accurate_information = 'Accurate Information  is required'
    }

    if (!userData.fax) {
      err.fax = 'Fax  is required'
    }

    if (!userData.country) {
      err.country = 'Country is required'
    }
    return err
  }
console.log(err,'dassssssss')
  return (
    <>
      <NavTopBar />
      <section className="py-5">
        <div className="container">
          <div className="row shadow-sm justify-content-center my-5">
            <h2 className="text-center fs-3">Copyright takedown request</h2>
            <p className="text-center">Content to be taken down</p>
            <div className="col-8">
              <Form className="mt-3" onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3 copy-right-wrap justify-content-center"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="mt-2 me-3 label-copyright">Email address</Form.Label>
                  <div className="copyright-table-form d-block">
                    <Form.Control
                      className=""
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                    />
                    <p className="text-danger">{err.email}</p>
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3 copy-right-wrap justify-content-center"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="mt-2 me-3 label-copyright">URL of the content*</Form.Label>
                  <div className="copyright-table-form d-block">
                    <Form.Control
                      className=""
                      type="email"
                      onChange={handleChange}
                      name="url"
                      placeholder="URL of the content "
                    />
                    <p className="text-danger">{err.url}</p>
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3 copy-right-wrap justify-content-center"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="mt-2 me-3 label-copyright">Work infringed</Form.Label>
                  <div className="copyright-table-form d-block">
                    <Form.Control
                      className=""
                      type="email"
                      name='work_infringed'
                      onChange={handleChange}
                      placeholder="Work infringed"
                    />
                    <p className="text-danger">{err.work_infringed}</p>
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3 copy-right-wrap justify-content-center"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="mt-2 me-3 label-copyright">
                    Add another URL?
                    <span>
                      <Form.Check
                        type="checkbox"
                        name="more_url"
                        onChange={() => {
                          setAnotherUrl(!anotherUrl)
                        }}
                      />
                    </span>
                  </Form.Label>
                  {anotherUrl ? (
                    <div className="copyright-table-form">
                      <Form.Control
                        className=""
                        type="text"
                        name="another_url"
                        onChange={handleChange}
                        placeholder="Add another URL"
                      />
                    </div>
                  ) : (
                    <div className="copyright-table-form"></div>
                  )}
                </Form.Group>
                <p className="text-danger">{err.another_url}</p>
              </Form>
            </div>
            <div className="row  justify-content-center mt-3">
              <h2 className="text-center fs-3">Requester information</h2>
              <p className="text-center w-75 mb-3">
                To submit a takedown request, you must be the owner, or an agent authorized to act
                on behalf of the owner, of certain intellectual property rights (“IP Owner”).{' '}
              </p>
              <div className="col-8">
                <Form className="mt-3">
                  <h2 className="text-center fs-3 my-4">Name of IP Owner*</h2>

                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">First Name* </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="email"
                        name="first_name"
                        onChange={handleChange}
                        placeholder="First Name"
                      />
                      <p className="text-danger">{err.first_name}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">Last Name* </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        placeholder="Last Name"
                      />
                      <p className="text-danger">{err.last_name}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">Title* </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Title"
                      />
                      <p className="text-danger">{err.title}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">
                      Company or University Email*{' '}
                    </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="email"
                        name="university_email"
                        onChange={handleChange}
                        placeholder="Company or University Email"
                      />
                      <p className="text-danger">{err.university_email}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">
                      Company or University name*
                    </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="university_name"
                        onChange={handleChange}
                        placeholder="Company or University name"
                      />
                      <p className="text-danger">{err.university_name}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">Fax (optional)</Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="fax"
                        onChange={handleChange}
                        placeholder="Fax"
                      />
                      <p className="text-danger">{err.fax}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">Phone* </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="number"
                        name="phone"
                        onChange={handleChange}
                        placeholder="Phone*"
                      />
                      <p className="text-danger">{err.phone}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">Address* </Form.Label>
                    <div className="copyright-table-form"></div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">Address Line 1 </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="address_line_1"
                        onChange={handleChange}
                        placeholder="Address Line 1 "
                      />
                      <p className="text-danger">{err.address_line_1}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">Address Line 2 </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="address_line_2"
                        onChange={handleChange}
                        placeholder="Address Line 2"
                      />
                      <p className="text-danger">{err.address_line_2}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">City </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="city"
                        onChange={handleChange}
                        placeholder="City"
                      />
                      <p className="text-danger">{err.city}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">State/Province</Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="state"
                        onChange={handleChange}
                        placeholder="State/Province"
                      />
                      <p className="text-danger">{err.state}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">ZIP / Postal   </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="zip"
                        onChange={handleChange}
                        placeholder="ZIP / Postal"
                      />
                      <p className="text-danger">{err.zip}</p>
                    </div>
                  </Form.Group>
                  <Form.Group
                    className="mb-3 copy-right-wrap justify-content-center"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="mt-2 me-3 label-copyright">Country    </Form.Label>
                    <div className="copyright-table-form d-block">
                      <Form.Control
                        className=""
                        type="text"
                        name="country"
                        onChange={handleChange}
                        placeholder="Country "
                      />
                      <p className="text-danger">{err.country}</p>
                    </div>
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div className="row  justify-content-center mt-4 mb-5">
              <p className="text-center w-75 fs-5 mb-1">
                By checking the following boxes, I, the undersigned, state under penalty of perjury
                that:{' '}
              </p>
              <div className="col-8">
                <Form className="mt-3">
                  {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                      <Form.Check
                        type={type}
                        id={`default-${type}`}
                        name="property_rights"
                        onChange={handleChange}
                        label={`I am the owner, or an agent authorized to act on behalf of the owner, of certain intellectual property rights (“IP Owner”).`}
                      />

                      <Form.Check
                        className="mt-2"
                        type={type}
                        name='offer_materials'
                        onChange={handleChange}
                        label={`I have a good faith belief that the listings identified (by link) in the addendum attached hereto offer items or contain materials that are not authorized by the IP Owner, its agent, or the law. `}
                        id={`disabled-default-${type}`}
                      />
                      <Form.Check
                        className="mt-2"
                        type={type}
                        name="accurate_information"
                        onChange={handleChange}
                        label={`The information in this notice is accurate. 

                    Signature `}
                        id={`disabled-default-${type}`}
                      />
                    </div>
                  ))}
                  <div className="d-flex justify-content-center mt-4">
                    <Button className="button-custom" onClick={handleSubmit}>
                      Submit Form{' '}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CopyrightTakedownRequest
