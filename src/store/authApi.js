import axios from 'axios'
import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'

//super admin and sub admin login
export function loginApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/login`, data)

      .then(function (response) {
        if (response?.status === 200 && response?.data?.data?.type && response?.data?.data?.token) {
          localStorage.setItem('userAuth', JSON.stringify(response?.data?.data?.token))
          const secretPass = 'XkhZG4fW2t2W'
          const data = CryptoJS.AES.encrypt(
            JSON.stringify(response?.data?.data?.type),
            secretPass,
          ).toString()
          localStorage.setItem('checkType', JSON.stringify(data))
        } else {
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}
//get user list
export function userdataApi() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/users`, config, {})
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//view user profile
export function userSingleIdApi(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/profile`, config, {})
      .then(function (response) {
        resolve(response?.data)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//admin profile
export function adminProfileApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios

      .get(`${process.env.REACT_APP_API_URL}api/admin/users/${data}`, config, {})
      .then(function (response) {
        resolve(response?.data)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//user profle
export function userProfileApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/profile`, config ? config : '')
      .then(function (response) {
        // toast.success(response?.data?.message)
        resolve(response?.data)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        if (error.response.status == 401) {
          reject(error.response.status)
        } else {
          reject(error.response.data.error)
        }
      }),
  )
}
//get user Data
export function userFilterdataApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  let { keyword, page_size, teacher_status, page } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/users?page_size=${
          page_size ? page_size : 10
        }&keyword=${keyword ? keyword : ''}&user_type=${
          data?.user_type ? data?.user_type : ''
        }&page=${page ? page : 3}&teacher_status=${teacher_status ? teacher_status : ''}  `,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}
//student data list
export function userStudentFilterdataApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  let { keyword, page_size, is_subscribe, page } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/users?page_size=${
          page_size ? page_size : 10
        }&keyword=${keyword ? keyword : ''}&user_type=${data?.user_type}&page=${
          page ? page : ''
        }&is_subscribe=${is_subscribe ? is_subscribe : ''}  `,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//user content data
export function userContentdataApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/content`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// create sub admin
export function manageAdminApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/sub-admin?page=${data.page}&page_size=${data.page_size}`,
        config,
        {},
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//get sub admin detail from id
export function manageSingleIDApi(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/sub-admin?id=${id}`, config, {})
      .then(function (response) {
        resolve(response?.data)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//edit sub admin
export function editSubadminApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/edit-sub-admin`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// delete sub admin
export function deleteSubadminApi(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/admin/sub-admin?id=${id}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// create sub admin
export function manageAdminPostApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/sub-admin`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//get all admin list
export function adminListApi() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin`, config, {})
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//  Teachers Request Api's
export function teacherRequestApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  let { keyword, teacher_status } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/teacher-request?keyword=${
          keyword ? keyword : ''
        }&teacher_status=${teacher_status ? teacher_status : ''}&page_size=${
          data?.page_size ? data?.page_size : ''
        }&page=${data?.page ? data?.page : ''}`,
        config,
        {},
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// edit user profile
export function postTeacherEditProfile(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/edit-profile`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// add teacher request status
export function postTeacherRequestApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/teacher-request-status`, data, config)
      .then(function (response) {
        if (response.success) {
          toast.success(response?.data?.message)
          teacherRequestApi()
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//getTeacherResubmitRequestApi
export function getTeacherResubmitRequestApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  let { page_size, keyword, start_date, end_date, page, category } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/resubmit-requests?page_size=${
          page_size ? page_size : ''
        }&keyword=${keyword ? keyword : ''}&start_date=${start_date ? start_date : ''}&end_date=${
          end_date ? end_date : ''
        }&category=${category ? category : ''}&page=${page ? page : ''}`,
        config,
      )
      .then(function (response) {
        if (response.success) {
          toast.success(response?.data?.message)
          teacherRequestApi()
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// Subscription Api's
export function getSubscriptionApi() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/subscription`, config, {})
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//add new subcription
export function postSubscriptionApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/add-subscription`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//edit subscription details
export function editSubscriptionApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/edit-subscription`, data, config, {})
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//get subscription detail using id
export function singleSubscriptionID(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/subscription/${id}`, config, {})
      .then(function (response) {
        resolve(response?.data)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// Orders get assignment list
export function getAssignmentList(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/assignment?assignment_status=${
          data?.assignment_status ? data?.assignment_status : ''
        }&keyword=${data?.keyword ? data?.keyword : ''}&page_size=${
          data?.page_size ? data?.page_size : ''
        }&page=${data?.page ? data?.page : ''} `,
        config,
        {},
      )
      .then(function (response) {
        resolve(response?.data)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// get content list

export function getContentList(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  let { status, keyword } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/content?status=${status ? status : ''}&keyword=${
          keyword ? keyword : ''
        }&page_size=${data?.page_size ? data?.page_size : ''}&page=${
          data?.page ? data?.page : ''
        } `,
        config,
        {},
      )
      .then(function (response) {
        resolve(response?.data)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// content delete

export function deleteContentByIdApi(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/admin/content/${id}`, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}


//get content using id
export function getsingleContentID(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/content/${id}}`, config, {})
      .then(function (response) {
        resolve(response?.data)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// add content list
export function contentRequestList(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/admin/content-request`,
        data ? data : '',
        config,
        {},
      )
      .then(function (response) {
        resolve(response?.data)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//user Login
export function teacherLoginApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/login`, data)
      .then(function (response) {
        if (
          response?.status === 200 &&
          response?.data?.data?.user_type &&
          response?.data?.data?.token
        ) {
          if (
            response?.status === 200 &&
            response.data.data.profile_status !== 'pending' &&
            response.data.data.profile_status !== 'rejected' &&
            response.data.success === true
          ) {
            localStorage.setItem('teacherAuth', JSON.stringify(response?.data.data.token))
            const secretPass = 'XkhZG4fW2t2W'
            const data = CryptoJS.AES.encrypt(
              JSON.stringify(response?.data.data.user_type),
              secretPass,
            ).toString()
            localStorage.setItem('checkType', JSON.stringify(data))
          }
        } else if (response.data.code == '401') {
          reject(response.data.error)
        }
        resolve(response)
      })
      .catch(function (error) {
        reject(error.response.data.error)
      }),
  )
}

//sellerLoginApi
export function sellerLoginApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/seller/login`, data)
      .then(function (response) {
        if (
          response?.status === 200 &&
          response?.data?.data?.user?.user_type &&
          response?.data?.data?.token
        ) {
          if (response?.status === 200 && response.data.success === true) {
            localStorage.setItem('teacherAuth', JSON.stringify(response?.data.data.token))
            const secretPass = 'XkhZG4fW2t2W'
            const data = CryptoJS.AES.encrypt(JSON.stringify('seller'), secretPass).toString()
            localStorage.setItem('checkType', JSON.stringify(data))
          }
        } else if (response.data.code == '401') {
          toast.error(response.data.error)
          reject(response.data.error)
        } else if (response.data.code == '403') {
          toast.error(response.data.error)
        }
        resolve(response)
      })
      .catch(function (error) {
        reject(error.response.data.error)
      }),
  )
}

//user regitser
export function teacherRegisterApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/register`, data)
      .then(function (response) {
        if (response.data.code != undefined && response.data.code == '302') {
          if (response.data.error.email) {
            reject(response.data.error.email[0])
          }
          if (response.data.error.first_name) {
            reject(response.data.error.first_name[0])
          }
          if (response.data.error.password) {
            reject(response.data.error.password[0])
          }
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}
//sellerRegisterApi
export function sellerRegisterApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/seller/register`, data)
      .then(function (response) {
        toast.success(response?.data?.message)
        if (response.data.code != undefined || response.data.code == '302') {
          if (response.data.error.email) {
            reject(response.data.error.email[0])
            toast.error(response.data.error.email[0])
          }
          if (response.data.error.name) {
            toast.error(response.data.error.name[0])
            reject(response.data.error.name[0])
          }
          if (response.data.error.password) {
            toast.error(response.data.error.password[0])
            reject(response.data.error.password[0])
          }
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//linkedinloginApi api/v1/auth/linkedin
export function linkedinloginApi(id) {
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/auth/linkedin`)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error)
      }),
  )
}

//admin check user assignments
export function checkAssignmentApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/assignment`, data)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

// get Assignment by Id
export function getAssignmentbyId(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/assignment/${id}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//getUserAssignmentbyId
export function getUserAssignmentbyId(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/user-assignment/${id}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//resubmitAssignmentByIdApi
export function resubmitAssignmentByIdApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/resubmit-assignment`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error.response.data.error)
        reject(error.response.data.error)
      }),
  )
}

//getBid Assignments

export function getBidAssignmentsApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/assignment-bid?keyword=${
          data.keyword ? data.keyword : ''
        }&page_size=${data?.page_size ? data?.page_size : ''}&page=${data?.page ? data?.page : ''}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error.response.data.error)
        reject(error.response.data.error)
      }),
  )
}
//getBidAssignmentsIdApi  get Assignmets by id
export function getBidAssignmentsIdApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/assignment-bid/${data.id}?keyword=${
          data.keyword ? data.keyword : ''
        }&page_size=${data?.page_size ? data?.page_size : ''}&page=${data?.page ? data?.page : ''}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error.response.data.error)
        reject(error.response.data.error)
      }),
  )
}
//bid Assign to teacher

export function bidAssignTeacherApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/assign-teacher`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error.response.data.error)
        reject(error.response.data.error)
      }),
  )
}

//admin stats
export function getAdminStats() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//Teacher stats
export function getTeacherStats() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/stats-info`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.message)
      }),
  )
}
// Manage Subject
export function manageSubjectApi() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/subject`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//manage payment
export function manageEditPaymentApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/admin-payment`, data, config)
      .then(function (response) {
        toast.success(response?.data?.message)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//manageCurrencyApi
export function manageCurrencyApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  let content = { currency_data: data }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/currency-exchange`, content, config)
      .then(function (response) {
        toast.success(response?.data?.message)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//getCurrencyApi
export function getCurrencyApi() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/currency-exchange`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//get single subject by id
export function manageSingleSubjectApi(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/subject/${id}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// add subject api
export function PostManageSubjectApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/add-subject`, data, config)
      .then(function (response) {
        toast.success(response?.data?.message)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//get payment data
export function GetPaymentApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/admin-payment`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// edit subject api
export function EditManageSubjectApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/admin/subject/${data?.id ? data?.id : ''}`,
        data,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//delete subject api
export function deleteManageSubjectApi(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/admin/subject/${id}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        if (error?.response?.data?.error) {
          toast.error(error?.response?.data?.error)
        }
        reject(error?.response?.data?.error)
      }),
  )
}

//admin can manage the assignment status
export function ManageAssignmentStatusApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/assignment-status`, data, config)
      .then(function (response) {
        if (response?.data?.status == 200) {
          toast.success(' Status Updated Successfully')
        } else {
          toast.success('Status Updated Successfully')
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// get order list api
export function ManageOrderListApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/orders?is_paid=${
          data?.is_paid ? data?.is_paid : ''
        }&keyword=${data?.keyword ? data?.keyword : ''}&page=${
          data?.page ? data?.page : ''
        }&page_size=${data?.page_size ? data?.page_size : ''}
      `,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// content Bulk data upload Api

export function getContentBulkUploadList(data) {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
    onUploadProgress: data.onUploadProgress,
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/content`, { file: data.file }, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//Change admin pass api
export function changePassAdminApi(data) {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/change-password`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//forget pass admin api
export function forgetPassAdminApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/forget-password`, data)
      .then(function (response) {
        if (response.data.msg) {
          toast.success(response.data.msg)
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//forget user pass api
export function forgetPassUserApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/forget-password`, data)
      .then(function (response) {
        if (response.data.msg) {
          toast.success(response.data.msg)
        } else if (response.data.data) {
          toast.error(response.data.data)
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//reset admin pass api
export function rsesetAdminPassApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/reset-password`, data)
      .then(function (response) {
        if (response.data.msg) {
          toast.success(response.data.msg)
        }
        if (response.data.error) {
          toast.error(response.data.error)
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//reset user pass api
export function resetUserPassApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/reset-password`, data)
      .then(function (response) {
        if (response.data.msg) {
          toast.success(response.data.msg)
        }
        if (response.data.error) {
          toast.error(response.data.error)
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//verify reset password
export function verifyResetPassApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/verify-reset-token`, { token: data })
      .then(function (response) {
        if (response.data.msg) {
          // toast.success(response.data.msg)
        }
        if (response.data.error) {
          toast.error(response.data.error)
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Manage Payment list api
export function ManagePaymentApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/order-payment?keyword=${
          data?.keyword ? data?.keyword : ''
        } &page_size=${data?.page_size ? data?.page_size : ''}&page=${
          data?.page ? data?.page : ''
        }`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//  paymentInfo
export function singlePaymentOrder(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  let { teacher_id, is_paid_to_teacher, start_date, end_date, sort } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${
          process.env.REACT_APP_API_URL
        }api/admin/single-order-payment?teacher_id=${teacher_id}&is_paid_to_teacher=${
          is_paid_to_teacher ? is_paid_to_teacher : ''
        }&start_date=${start_date ? start_date : ''}&end_date=${end_date ? end_date : ''}&sort=${
          sort ? sort : ''
        }`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//get content data api
export function getContentApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/dashboard-content?keyword=${
          data?.keyword ? data?.keyword : ''
        }`,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//searchContentApi
export function searchContentApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/search?keyword=${data ? data : ''}`)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//buyNowContentApi
// export function buyNowContentApi(data) {
//   const config = {
//     headers: {
//       'Content-type': 'application/json',
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
//       responseType: "blob"
//     },
//   }
//   return new Promise(
//     (resolve, reject) =>
//       axios
//         .post(`${process.env.REACT_APP_API_URL}api/v1/buy-content`, data, config)
//         .then((response) =>    response)
//         .then((res) => {
//           // Create blob link to download

//           const blob = 'app/public/content/Data-Mining-and-Data-Visualization-1681800274.docx'

//           const url = window.URL.createObjectURL(new Blob(blob))
//           const link = document.createElement('a')
//           link.href = url
//           link.setAttribute('download', url)

//           // Append to html link element page
//           document.body.appendChild(link)

//           // Start download
//           link.click()

//           // Clean up and remove the link
//           link.parentNode.removeChild(link)
//         }),
//     // .then(function (response) {
//     //   resolve(response)
//     // })
//     // .catch(function (error) {
//     //   toast.error(error?.response?.data?.error)
//     //   // toast.error(error?.message)
//     //   reject(error?.message)
//     // }),
//   )
// }

// bulk download
export function buyNowContentApi(data) {
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/buy-content`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        // toast.error(error?.message)
        reject(error?.message)
      }),
  )
}

// Block Payment
export function postBlockApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/admin/block-order-payment`,
        data ? data : '',
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//get subjects for registeration
export function getSubjectListApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/register-info`)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//Verify Email User
export function verifyEmailApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/verify-email`, data)
      .then(function (response) {
        if (response.data.msg) {
          toast.success(response.data.msg)
        } else if (response.data.data) {
          toast.error(response.data.data)
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//zoomListApi
export function zoomListApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/all/zoom-request?page=${data.page}&page_size=${data.page_size}&keyword=${data.keyword}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//zoomRequestStatusApi
export function zoomRequestStatusApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .put(
        `${process.env.REACT_APP_API_URL}api/admin/zoom-request/change-status/${data.status}`,
        { status: data.id },
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//sellandearn api
export function sellAndEarnApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/seller/create`, data)
      .then(function (response) {
        toast.success(response.data.message)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//verifyOtpasyncApi
export function verifyOtpasyncApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/seller/verify/email?email=${data.email}&otp=${data.otp}`,
        data,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//api/v1/seller/billing/details
export function addBiilingInfoapi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/seller/billing/details`, data, config)
      .then(function (response) {
        resolve(response)
        toast.success(response?.data?.message)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//addNewContentapi
export function addNewContentapi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/seller/sell-content`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//getSellerDetailsapi v1/seller/profile
export function getSellerDetailsapi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/seller/profile`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          toast.error(error?.response?.data?.error)
          reject(error.response.status)
        } else {
          toast.error(error?.response?.data?.error)
          reject(error.response.data.error)
        }
      }),
  )
}
//getSellerBillingInfoapi
export function getSellerBillingInfoapi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/seller/billing-info`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          toast.error(error?.response?.data?.error)
          reject(error.response.status)
        } else {
          toast.error(error?.response?.data?.error)
          reject(error.response.data.error)
        }
      }),
  )
}

//getSellerContentListapi
export function getSellerContentListapi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/seller/content/list?page=${data?.page}&per_size=${data?.per_size}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          toast.error(error?.response?.data?.error)
          reject(error.response.status)
        } else {
          toast.error(error?.response?.data?.error)
          reject(error.response.data.error)
        }
      }),
  )
}
//getSellerDeleteContentapi
export function getSellerDeleteContentapi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/v1/seller/content/${data}`, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          toast.error(error?.response?.data?.error)
          reject(error.response.status)
        } else {
          toast.error(error?.response?.data?.error)
          reject(error.response.data.error)
        }
      }),
  )
}
//sellerProfileUpdateApi
export function sellerProfileUpdateApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/seller/update/profile`, data, config)
      .then(function (response) {
        toast.success(response?.data?.message)
        resolve(response)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          toast.error(error?.response?.data?.error)
          reject(error.response.status)
        } else {
          toast.error(error?.response?.data?.error)
          reject(error.response.data.error)
        }
      }),
  )
}
//sellerUpdateAmountApi
export function sellerUpdateAmountApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .put(`${process.env.REACT_APP_API_URL}api/v1/seller/update/${data.id}`, data, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          toast.error(error?.response?.data?.error)
          reject(error.response.status)
        } else {
          toast.error(error?.response?.data?.error)
          reject(error.response.data.error)
        }
      }),
  )
}

// Edit Admin Profile
export function editAdminProfile(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/edit-profile`, data, config)
      .then(function (response) {
        if (response.data.msg) {
          toast.success(response.data.msg)
        } else if (response.data.data) {
          toast.error(response.data.data)
        }
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//Change User pass
export function changePassUserApi(data) {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/change-password`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//NotificationApi
export function NotifyApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/notification`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}
//get NotificationApi getNotifyApi
export function getNotifyApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  let { keyword, page_size, page, status } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/notification?keyword=${
          keyword ? keyword : ''
        }&page_size=${page_size ? page_size : ''}&page=${page ? page : ''}&status=${
          status ? status : ''
        }`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// api/admin/user-status
export function userBlockApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/user-status`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// accountBillingApi
export function accountBillingApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/billing-info`, data, config)
      .then(function (response) {
        toast.success(response.data.message)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//getAccountBillingApi
export function getAccountBillingApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/billing-info`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          toast.error(error?.response?.data?.error)
          reject(error.response.status)
        } else {
          toast.error(error?.response?.data?.error)
          reject(error.response.data.error)
        }
      }),
  )
}

//downloadBulkUploadList
export function downloadBulkUploadListApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/content-export`, data, config)
      .then(function (response) {
        resolve(response)
  
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//contentAcceptorRejectApi
export function contentAcceptorRejectApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/content-approve`, data, config)
      .then(function (response) {
        toast.success(response.data.message)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//getDuplicateContentApi
export function getDuplicateContentApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/duplicate/content/${data}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Notification Api
export function TeacherNotificationApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/notification`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        if (error.response.status == 401) {
          toast.error(error?.response?.data?.error)
          reject(error.response.status)
        } else {
          toast.error(error?.response?.data?.error)
          reject(error.response.data.error)
        }
      }),
  )
}

// Verify Email Token Api
export function resetPassTokenApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/verify-reset-token`, { token: data }, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//addnew letter
export function addNewsLetterApi(data) {
  let letterData = data
  const formData = new FormData()
  formData.append('title', letterData.title)
  formData.append('message', letterData.message)
  formData.append('cover_image', letterData.cover_image)
  formData.append('keyword', letterData.keyword)


  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/news-letter`, formData, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//edit newsletterData
export function editNewsLetterApi(data) {
  let letterData = data
  const formData = new FormData()
  formData.append('title', letterData.title)
  formData.append('message', letterData.message)
  formData.append('cover_image', letterData.cover_image)
  formData.append('keyword', letterData.keyword)


  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/news-letter/${data.id}`, formData, config)
      .then(function (response) {
        toast.success('Newsletter updated successfully', {
          toastId: 'success1',
        })
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//getNewsLetterApi
export function getNewsLetterApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/news-letter?page=${
          data.page ? data.page : ''
        }&page_size=${data.page_size ? data.page_size : ''}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//getNewsLetterDetailApi
export function getNewsLetterDetailApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/news-letter/${data ? data : ''}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// delete newsletter
export function deleteNewsLetterApi(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/admin/news-letter/${id}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//registerSocialApi
export function registerSocialApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/social-login`, data, config)
      .then(function (response) {
        if (
          response?.status === 200 &&
          response?.data?.data?.user_type &&
          response?.data?.data?.token
        ) {
          if (
            response?.status === 200 &&
            response.data.data.profile_status !== 'pending' &&
            response.data.data.profile_status !== 'rejected' &&
            response.data.success === true
          ) {
            localStorage.setItem('teacherAuth', JSON.stringify(response?.data.data.token))
            const secretPass = 'XkhZG4fW2t2W'
            const data = CryptoJS.AES.encrypt(
              JSON.stringify(response?.data.data.user_type),
              secretPass,
            ).toString()
            localStorage.setItem('checkType', JSON.stringify(data))
          }
        } else if (response.data.code == '401') {
          reject(response.data.error)
        }
        if (response.data.message) {
          toast.success(response.data.message)
        } else if (response?.data?.data) {
          toast.success(response?.data?.data)
        }
        resolve(response)
      })
      .catch(function (error) {
        // toast.error(error?.response?.data?.error)
        reject(error.response.data.error)
      }),
  )
}

//fbCheckApi
export function fbCheckApi(id) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/fb-check`, { facebook_id: id })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        // toast.error(error?.response?.data?.error)
        // reject(error?.response?.data?.error)
        reject(error)
      }),
  )
}
//
export function paymentMessageApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/payment-callback`, data)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        // toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//linked callback
export function linkedCallbackApi(id) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/linked-callback`, { facebook_id: id })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Student Module
export function getStudentSubsciptionPlans(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/plans`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//getActiveStudentSubsciptionPlans
export function getActiveStudentSubsciptionPlans(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/logged-in-plans`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// checkout page
export function planCheckoutApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/checkout`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Proceed Payment
export function CheckoutPaymentApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/proceed-pay`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// student orders
export function StudentOrderListApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  let { keyword, page_size, page, payment_status } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/orders?page_size=${
          page_size ? page_size : 10
        }&keyword=${keyword ? keyword : ''}&page=${page ? page : ''} &payment_status=${
          payment_status ? payment_status : ''
        }`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Student dashboard home
export function StudentAssignmentApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  let { keyword, page_size, start_date, end_date, category, page } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/assignment?page_size=${
          page_size ? page_size : '4'
        }&keyword=${keyword ? keyword : ''}&start_date=${start_date ? start_date : ''}&end_date=${
          end_date ? end_date : ''
        }&category=${category ? category : ''}&page=${page ? page : ''}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Teacher Manage Order
export function teacherManageOrderApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  let { page_size, page } = data

  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/assignment-request?page_size=${
          page_size ? page_size : '4'
        }&page=${page ? page : ''}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//postQuestionApi
export function postQuestionApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/assignment`, data, config)
      .then(function (response) {
        resolve(response)
        toast.success(response.data.message)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//freeAsistanceApi
export function freeAsistanceApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/free-assistance`, data, config)
      .then(function (response) {
        resolve(response)
        toast.success(response.data.message)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//refferAFriendApi
export function refferAFriendApi() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/reffral`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//getAssignmentbyIdApi
export function getAssignmentbyIdApi(data) {


  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/answer-assignment`, data, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//teacher resubmit answer
export function resubmitAssignmentbyIdApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/answer-resubmit`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Teacher Answer History
export function teacherManageAnswersApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  let { page_size, keyword, start_date, end_date, page, category } = data

  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/my-answer-assignment?page_size=${
          page_size ? page_size : ''
        }&keyword=${keyword ? keyword : ''}&start_date=${start_date ? start_date : ''}&end_date=${
          end_date ? end_date : ''
        }&category=${category ? category : ''}&page=${page ? page : ''}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// V1 search Api
export function studentmanageSearchApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/search-single?keyword=${
          data.keyword ? data.keyword : ''
        }&id=${data.id ? data.id : ''} `,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//studentmanageSingleSearchApi
export function studentmanageSingleSearchApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/search-single-logged?keyword=${
          data.keyword ? data.keyword : ''
        }&id=${data.id ? data.id : ''} `,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//getStudentContentApi
export function getStudentContentApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/search `, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Get Job Api
export function getJobApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  let { keyword, status, page_size, page } = data
  return new Promise((resolve, reject) =>
    axios

      .get(
        `${process.env.REACT_APP_API_URL}api/admin/job-internship?keyword=${
          keyword ? keyword : ''
        }&status=${status ? status : ''}&page_size=${page_size ? page_size : ''}&page=${
          page ? page : ''
        }`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//getJobstatsIdApi
export function getJobstatsIdApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios

      .get(`${process.env.REACT_APP_API_URL}api/admin/job-internship/${data}`, config)

      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Get SingleIdJob Api
export function getSingleIDJobApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  const { id } = data
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/admin/job-internship/${id}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Post Job Api
export function postJobApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/job-internship`, data, config)
      .then(function (response) {
        toast.success(response.data.message)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//postJobEditApi
export function postJobEditApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/admin/job-internship/${data.id}`,
        data.data,
        config,
      )
      .then(function (response) {
        toast.success(response.data.message)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Post Accept Assignment
export function postAcceptAssignmentApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/accept-assignment`, data, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//bid  assignments
export function bidAssignmentApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/bid-assignment`, data, config)
      .then(function (response) {
        toast.success(response?.data?.message)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//getPreviousBidApi
export function getPreviousBidApi(id) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/previous-bid?assignment_id=${id}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject(error?.response?.data?.error)
      }),
  )
}

// SOS Api
export function postSosInfoApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/sos-Info`, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//GetquestionAanswer
export function getbulkQuestionAnswerApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  let { keyword, page_size, page } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/admin/q&a?keyword=${
          keyword ? keyword : ''
        }&page_size=${page_size ? page_size : ''}&page=${page ? page : ''}`,
        config,
      )
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//deleteQAapi
export function deleteQAapi(data) {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
    onUploadProgress: data.onUploadProgress,
  }

  return new Promise((resolve, reject) =>
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/admin/q&a/${data}`,  config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// Post Bulk Import Q%A
export function postbulkQuestionAnswerApi(data) {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
    onUploadProgress: data.onUploadProgress,
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/q&a`, { file: data.file }, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//postQuestionAnswerApi
export function postQuestionAnswerApi(data) {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
    onUploadProgress: data.onUploadProgress,
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/add-q&a`, data, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//editQuestionAnswerApi
export function getQuestionAnswerByIdApi(data) {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(
        data
          ? `${process.env.REACT_APP_API_URL}api/admin/q&a/${data ? data : ''}`
          : `${process.env.REACT_APP_API_URL}api/admin/q&a`,
        config,
      )

      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//editQuestionAnswerApi
export function editQuestionAnswerApi(data) {
  const config = {
    headers: {
      'Content-type': 'multipart/form-data',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/edit-q&a`, data, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//sosEmaiApi
export function sosEmaiApi() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/sos`, {}, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//getStudentAssignmentRatingApi
export function getStudentAssignmentRatingApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/rating`, data, config)
      .then(function (response) {
        resolve(response)
        toast.success(response.data.message)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//post StartAnswer Api
export function getAnswerByIDApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/my-answer-assignment/${data}`, config)
      .then(function (response) {
        toast.success(response?.data?.data)
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//checkSubscriptionApi api/v1/check-subscription
export function checkSubscriptionApi() {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/check-subscription`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//solutionAsyncApi
export function solutionAsyncApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/view-answer?user_id=${data.userId}&qa_id=${data.id}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//Carrer API
export function getCarrerApi(data) {
  let { keyword, page_size, page } = data

  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/careers?keyword=${
          keyword ? keyword : ''
        }&page_size=${page_size ? page_size : ''}&page=${page ? page : ''}`,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//Carrer API By ID
export function getCarrerByIDApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/careers/${data}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//Job/Internship Status
export function postJobInternshipStatusApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/admin/job-internship-status`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

// apply for carrer
export function postApplyCarrerApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/apply-career`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
// apply for carrer
export function getHeaderCarrerApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  let { page, page_size } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/article?page_size=${
          page_size ? page_size : ''
        }&page=${page ? page : ''}`,
        data,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
// ArticleByID
export function getArticleByIDApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }

  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/article/${data}`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
// ArticleByID
export function getWalletApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  let { keyword, page, page_size, start_date, end_date } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/wallet-transection?keyword=${
          keyword ? keyword : ''
        }&page_size=${page_size ? page_size : ''}&page=${page ? page : ''}&start_date=${
          start_date ? start_date : ''
        }&end_date=${end_date ? end_date : ''}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//CopyrightApi
export function CopyrightApi(data) {
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/copyright/takedown`, data)
      .then(function (response) {
        resolve(response)
        toast.success(response?.data?.message)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//meetingSheduleApi
export function meetingSheduleApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/zoom-request`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//getMeetingsSheduleApi
export function getMeetingsScheduleApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/zoom-request?page=${data.page}&page_size=${data.page_size}&keyword=${data.keyword}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//meeting Request for teacher
export function getMeetingRequestTeacherApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/zoom-request-teacher?page=${data.page}&page_size=${data.page_size}&keyword=${data.keyword}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}



//chatUserListApi
export function chatUserListApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/all-chat`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//messageUserListApi
export function postMessageListApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/all-message`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//messageUserListApi
export function getFindUserApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/find-user`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//firstmessageApi
export function postFirstMessageApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}api/v1/first-message`, data, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//fOrderPDFApi
export function getPDFbyIDApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/orders/${data}`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}
//Rewards Api
export function getRewardsApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  return new Promise((resolve, reject) =>
    axios
      .get(`${process.env.REACT_APP_API_URL}api/v1/rewards`, config)
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}

//Rewards Api
export function getContentListApi(data) {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('teacherAuth'))}`,
    },
  }
  let { page_size, page } = data
  return new Promise((resolve, reject) =>
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/v1/content/list?page_size=${
          page_size ? page_size : 6
        }&page=${page ? page : ''}`,
        config,
      )
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        toast.error(error?.response?.data?.error)
        reject(error?.response?.data?.error)
      }),
  )
}


//linkedinemail get
export function linkedinEmailApi(data){
  return new Promise((resolve, reject) =>
  axios.get( )
  .then(function(response){
    resolve(response)
  })
  .catch(function (error) {
          console.log(error)
          reject(error.response.data.error)
        }),
  )
}
