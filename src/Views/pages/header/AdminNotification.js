import React from 'react'
import '../../../App.css'
import Camera from 'src/assets/images/Camera.jpg'
import BackButton from 'src/Views/widgets/BackButton'
const AdminNotification = () => {

  return (
    <>
    <BackButton/>
    <section className="section-50">
      <div className="container">
        <h3 className="m-b-50 heading-line">Notifications </h3>

        <div className="notification-ui_dd-content">
          <div className="notification-list notification-list--unread">
            <div className="notification-list_content">
              <div className="notification-list_img">
                <img src={Camera} alt="user" />
              </div>
              <div className="notification-list_detail">
                <p>
                  <b>John Doe</b> reacted to your post
                </p>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.
                </p>
                <p className="text-muted">
                  <small>10 mins ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="notification-list notification-list--unread">
            <div className="notification-list_content">
              <div className="notification-list_img">
                <img src={Camera} alt="user" />
              </div>
              <div className="notification-list_detail">
                <p>
                  <b>Richard Miles</b> liked your post
                </p>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.
                </p>
                <p className="text-muted">
                  <small>10 mins ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="notification-list">
            <div className="notification-list_content">
              <div className="notification-list_img">
                <img src={Camera} alt="user" />
              </div>
              <div className="notification-list_detail">
                <p>
                  <b>Brian Cumin</b> reacted to your post
                </p>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.
                </p>
                <p className="text-muted">
                  <small>10 mins ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="notification-list">
            <div className="notification-list_content">
              <div className="notification-list_img">
                <img src={Camera} alt="user" />
              </div>
              <div className="notification-list_detail">
                <p>
                  <b>Lance Bogrol</b> reacted to your post
                </p>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.
                </p>
                <p className="text-muted">
                  <small>10 mins ago</small>
                </p>
              </div>
            </div>
          </div>
          <div className="notification-list">
            <div className="notification-list_content">
              <div className="notification-list_img">
                <img src={Camera} alt="user" />
              </div>
              <div className="notification-list_detail">
                <p>
                  <b>Parsley Montana</b> reacted to your post
                </p>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorem.
                </p>
                <p className="text-muted">
                  <small>10 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a href="" className="dark-link">
            Load more activity
          </a>
        </div>
      </div>
    </section>
    </>
  )
}

export default AdminNotification
