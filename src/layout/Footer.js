import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/landing-page/footer-logo-new.svg'
import Facebook from '../assets/images/landing-page/fb.png'
import Behence from '../assets/images/landing-page/be.png'
import CryptoJS from 'crypto-js'
import Linkedin from '../assets/images/landing-page/linkedin.png'
import { useEffect } from 'react'
import { useState } from 'react'
const Footer = () => {
  const checkType = JSON.parse(localStorage.getItem('checkType'))
  const [data1, setData1] = useState('')
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
  return (
    <>
      <footer className="footer-site">
        <div className="main-container container">
          <div className="row justify-content-between align-items-start">
            {/* <div className="col-12 col-md-3  logo-footer">
              <Link className="navbar-brand" to={data1 == 'teacher' || 'student' ? '/' : '/home'}>
                <img src={logo} className="img-fluid " alt="logo" />
              </Link>
         
            </div> */}

            <div className="col-12 col-md-6 col-lg-3 text-center">
              <ul className="text-center text-lg-start knowledge-ul ps-0">
                <li className="mb-2">
                  <Link
                    to="/copyrightpolicy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pages"
                  >
                    Copy Right Policy
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    to="/honorcode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pages"
                  >
                    Honor Code
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-6 col-lg-3 text-center">
              <ul className="text-center text-lg-start knowledge-ul ps-0">
                <li className="mb-2">
                  <Link
                    to="/generalpolicies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pages"
                  >
                    General Policies
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    to="/termsofuse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-pages"
                  >
                    Terms Of Use
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-6 col-lg-3 text-center">
              <ul className="text-center text-lg-start knowledge-ul ps-0">
                <li className="mb-2">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to="/copyrighttakedownrequest"
                    className="link-pages"
                  >
                    Copyright Takedown Request
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to="/teachercoolprivacypolicy"
                    className="link-pages"
                  >
                    TeacherCool Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-6 col-lg-3  social">
              <a
                href="https://www.facebook.com/profile.php?id=100085517065803"
                rel="noreferrer"
                target="_blank"
                className="link-social"
              >
                <img src={Facebook} className="img-fluid" alt="facebook" />
              </a>
              <a
                href="https://twitter.com/Teachercoool "
                className="link-social"
                rel="noreferrer"
                target="_blank"
              >
                <svg
                  className="border rounded-circle bg-white mx-1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="28"
                  height="28"
                  viewBox="0,0,256,256"
                  style={{ fill: 'transparent' }}
                >
                  <g
                    fill="#1C3669"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="1"
                    strokeLinecap="butt"
                    strokeLinejoin="miter"
                    strokeMiterlimit="10"
                    strokeDasharray=""
                    strokeDashoffset="0"
                    fontFamily="none"
                    fontWeight="none"
                    fontSize="none"
                    textAnchor="none"
                    style={{ mixBlendMode: 'normal' }}
                  >
                    <g transform="scale(10.66667,10.66667)">
                      <path d="M22,3.999c-0.78,0.463 -2.345,1.094 -3.265,1.276c-0.027,0.007 -0.049,0.016 -0.075,0.023c-0.813,-0.802 -1.927,-1.299 -3.16,-1.299c-2.485,0 -4.5,2.015 -4.5,4.5c0,0.131 -0.011,0.372 0,0.5c-3.353,0 -5.905,-1.756 -7.735,-4c-0.199,0.5 -0.286,1.29 -0.286,2.032c0,1.401 1.095,2.777 2.8,3.63c-0.314,0.081 -0.66,0.139 -1.02,0.139c-0.581,0 -1.196,-0.153 -1.759,-0.617c0,0.017 0,0.033 0,0.051c0,1.958 2.078,3.291 3.926,3.662c-0.375,0.221 -1.131,0.243 -1.5,0.243c-0.26,0 -1.18,-0.119 -1.426,-0.165c0.514,1.605 2.368,2.507 4.135,2.539c-1.382,1.084 -2.341,1.486 -5.171,1.486h-0.964c1.788,1.146 4.065,2.001 6.347,2.001c7.43,0 11.653,-5.663 11.653,-11.001c0,-0.086 -0.002,-0.266 -0.005,-0.447c0,-0.018 0.005,-0.035 0.005,-0.053c0,-0.027 -0.008,-0.053 -0.008,-0.08c-0.003,-0.136 -0.006,-0.263 -0.009,-0.329c0.79,-0.57 1.475,-1.281 2.017,-2.091c-0.725,0.322 -1.503,0.538 -2.32,0.636c0.834,-0.5 2.019,-1.692 2.32,-2.636z"></path>
                    </g>
                  </g>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/teacher-cool-2552ba250/ "
                className="link-social"
                rel="noreferrer"
                target="_blank"
              >
                <img src={Linkedin} className="img-fluid ms-1" alt="linkedin" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright">
        Disclaimer: The reference papers from teachercool.com should only be used as examples for
        students, they should not be turned in exactly as they are. These documents should only be
        used for research and reference purposes.
      </div>
      <div className="copyright">Copyright © 2023 Teachercool.com. All rights reserved</div>
    </>
  )
}

export default Footer
