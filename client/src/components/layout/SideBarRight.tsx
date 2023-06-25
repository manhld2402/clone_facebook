import React from "react";
import "../../css/sideBarRight.css";
function SideBarRight() {
  return (
    <>
      <div className="home-right">
        <div className="home-right-one">
          {/* FRIEND REQUEST */}
          <div className="home-right-title">
            <div className="home-right-text">Lời mời kết bạn</div>
            <div className="home-right-edit">Xem tất cả</div>
          </div>
          <div className="friend-request-block">
            <div className="friend-request-avartar">
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/56/Bia_truyen_Tho_bay_mau%2C_2022.webp/200px-Bia_truyen_Tho_bay_mau%2C_2022.webp.png"
                alt=""
              />
            </div>
            <div className="friend-request-info">
              <div className="friend-request-name-date">
                <div className="friend-request-name">Trần Ngọc</div>
                <div className="friend-request-date">6 ngày</div>
              </div>
              <div className="friend-request-same-one">
                <div>
                  <img
                    className="img-one"
                    src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-1e97f.appspot.com/o/users%2FB%E1%BA%A3y%20M%C3%A0u-Th%E1%BB%8F%2Fphotos%2Favatar%2F20230611122632_channels4_profile.jpg?alt=media&token=3d92e18b-2300-4d39-997a-2cd5d4bbf673"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="img-two"
                    src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-1e97f.appspot.com/o/users%2FMartinez-David%20%2Fphotos%2Favatar%2F20230611113831_david-.png?alt=media&token=6ff233c0-2ff9-4047-838b-0b13b649f798"
                    alt=""
                  />
                </div>
                <div className="same-one-text">117 bạn chung</div>
              </div>
              <div className="friend-request-accept-reject">
                <div className="friend-request-accept">
                  <div className="accept">Xác nhận</div>
                </div>
                <div className="friend-request-reject">
                  <div className="reject">Xóa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FRIEND REQUEST END*/}
        {/* BIRTHDAY  */}
        <div className="home-right-two">
          <div className="home-right-title">
            <div className="home-right-text">Sinh nhật</div>
          </div>
          <div className="birthday-container">
            <div className="birthday-container-gift">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-1e97f.appspot.com/o/facebook-icon%2Fgift.png?alt=media&token=87e5666f-215b-4d0a-bdac-aaa9c6b97623"
                alt=""
              />
            </div>
            <div>
              Hôm nay là sinh nhật của<span> Thúy Nga </span>và
              <span> Sinh Truong </span>
            </div>
          </div>
        </div>
        {/* BIRTHDAY END */}

        {/* CONTACT */}
        <div className="home-right-three">
          <div className="home-right-title">
            <div className="home-right-text">Người liên hệ</div>
            <div className="home-right-icon">
              <div className="home-right-small-icon">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-1e97f.appspot.com/o/facebook-icon%2Fvideo.png?alt=media&token=137c0e90-dc36-4072-9c16-ba0a989257eb"
                  alt=""
                />
              </div>
              <div className="home-right-small-icon">
                <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
              </div>
              <div className="home-right-small-icon">
                <div className="dot">
                  <div>...</div>
                </div>
              </div>
            </div>
          </div>
          {/* CONTACT USER*/}
          <div className="home-right-user">
            <div className="home-right-avatar-container">
              <div className="home-right-avatar">
                <img
                  src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-1/165567076_2820496928261214_5651026651800192589_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=utqwnKmLXmEAX9UbbtW&_nc_ht=scontent.fhan3-1.fna&oh=00_AfBrsybjkQQcFxw1vDog4eKdH3JDCGEPuTaj-TlTVsDjCg&oe=64951D4E"
                  alt=""
                />
              </div>
              <div className="home-right-avatar-circle">
                <i className="fa-sharp fa-solid fa-circle"></i>
              </div>
            </div>
            <div className="home-right-name">Anh Thân Ngọc</div>
          </div>
          {/* CONTACT USER END*/}
          {/* CONTACT USER*/}
          <div className="home-right-user">
            <div className="home-right-avatar-container">
              <div className="home-right-avatar">
                <img
                  src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-1/165567076_2820496928261214_5651026651800192589_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=utqwnKmLXmEAX9UbbtW&_nc_ht=scontent.fhan3-1.fna&oh=00_AfBrsybjkQQcFxw1vDog4eKdH3JDCGEPuTaj-TlTVsDjCg&oe=64951D4E"
                  alt=""
                />
              </div>
              <div className="home-right-avatar-circle">
                <i className="fa-sharp fa-solid fa-circle"></i>
              </div>
            </div>
            <div className="home-right-name">Anh Thân Ngọc</div>
          </div>
          {/* CONTACT USER END*/}
        </div>
        {/* CONTACT END */}

        {/* GROUP CONTACT */}
        <div className="home-right-four">
          <div className="home-right-title">
            <div className="home-right-text">Cuộc trò chuyện nhóm</div>
          </div>
        </div>
        {/* CONTACT USER*/}
        <div className="home-right-user">
          <div className="home-right-avatar-container">
            <div className="home-right-avatar">
              <img
                src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-1/165567076_2820496928261214_5651026651800192589_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=utqwnKmLXmEAX9UbbtW&_nc_ht=scontent.fhan3-1.fna&oh=00_AfBrsybjkQQcFxw1vDog4eKdH3JDCGEPuTaj-TlTVsDjCg&oe=64951D4E"
                alt=""
              />
            </div>
            <div className="home-right-avatar-circle">
              <i className="fa-sharp fa-solid fa-circle"></i>
            </div>
          </div>
          <div className="home-right-name">Anh Thân Ngọc</div>
        </div>
        {/* CONTACT USER END*/}
        {/* CONTACT USER*/}
        <div className="home-right-user">
          <div className="home-right-avatar-container">
            <div className="home-right-avatar">
              <img
                src="https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-1/165567076_2820496928261214_5651026651800192589_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=utqwnKmLXmEAX9UbbtW&_nc_ht=scontent.fhan3-1.fna&oh=00_AfBrsybjkQQcFxw1vDog4eKdH3JDCGEPuTaj-TlTVsDjCg&oe=64951D4E"
                alt=""
              />
            </div>
            <div className="home-right-avatar-circle">
              <i className="fa-sharp fa-solid fa-circle"></i>
            </div>
          </div>
          <div className="home-right-name">Anh Thân Ngọc</div>
        </div>
        {/* CONTACT USER END*/}
        <div className="home-right-user">
          <div className="home-right-show-more">
            <div>+</div>
          </div>
          <div className="left-top-text">Tạo nhóm mới</div>
        </div>
        {/* GROUP CONTACT END */}
      </div>
    </>
  );
}

export default SideBarRight;
