import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import axios from "axios";
import { Socket, io } from "socket.io-client";
// import io  from "socket.io"
// import { storage } from "../../../../firebase";
// import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "../../css/main.css";
import axios from "axios";
const host = "http://localhost:4000";
export default function Main() {
  // let accessToken = JSON.parse(localStorage.getItem("accessToken"));
  // useEffect(()=>{
  //   axios.get(`http://localhost:8000/api/v1/user`,{headers:{Authentication:accessToken}})
  //   .then((data)=>{
  //     dispath({type:"LOAD_DATA_USER",payload:data.data.data})
  //     console.log(data.data.data)})
  //   .catch((err)=>console.log(err))
  // },[])

  const [test, setTest] = useState(1);
  useEffect(() => {
    // Kết nối tới máy chủ Socket.IO
    let roomChat = "hihihi";
    //roomChat lấy từ db
    const socket = io(host);

    // Xử lý sự kiện nhận tin nhắn từ máy chủ
    socket.on("user_id", (room) => {
      roomChat = room;
      console.log("Received message from server Room:", room);
    });
    //Nhận tin nhắn thông qua roomChat server trả về
    socket.on(roomChat, (message) => {
      console.log("Received message from server Room:", message);
    });

    // Gửi tin nhắn tới máy chủ
    //gửi tới server id của friend
    socket.emit("friend_id", "user_id2");
    //gửi tới server id của room
    socket.emit("joinroom", roomChat);
    //gửi tới server message
    socket.emit("message", { room: roomChat, message: "Hello Quy!" });

    // Xử lý việc đóng kết nối
    return () => {
      socket.disconnect();
    };
  }, [test]);
  return (
    <div>
      <div className="home-middle">
        {/* <StoryCarousel user={user} /> */}
        {/* NEWFEED INPUT */}
        <div className="create-newfeed-container">
          <div className="create-newfeed-input-container">
            <div className="create-newfeed-avatar">
              {/* <img src={user.avatarDefault} alt="" /> */}
            </div>
            <div
              //   onClick={handleShowCreatePost}
              className="create-newfeed-input"
            >
              {/* {user.surName} */} ơi, bạn đang nghĩ gì thế?
            </div>
          </div>
          <div className="create-newfeed-videos-images">
            <div className="create-newfeed-videos">
              <i className="fa-sharp fa-solid fa-video"></i> Video trực tiếp
            </div>
            <div
              //   onClick={handleShowCreatePost}
              className="create-newfeed-images"
            >
              <i className="fa-sharp fa-solid fa-images"></i> Ảnh/video
            </div>
            <div className="create-newfeed-smile">
              <i className="fa-sharp fa-solid fa-face-laugh"></i> Cảm xúc/hoạt
              động
            </div>
          </div>
        </div>
        {/* NEWFEED INPUT END */}
        {/* NEWFEED BLOCK */}

        {/* {posts
          ?.sort((a, b) => b.postId - a.postId)
          .map((post, postIndex) => (
            <UserHomePost post={post} />
          ))} */}

        {/* NEWFEED BLOCK END*/}

        {/* CREATE POSTS MODAL */}
        <Modal
          className="create-post-modal-container"
          //   show={showCreatePost}
          //   onHide={handleCloseCreatePost}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="create-post-modal-title">Tạo bài viết</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="create-post-modal-input">
              <div className="create-post-modal-head">
                <div className="create-post-modal-avatar">
                  {/* <img src={saveFlag.avatarDefault} alt="" /> */}
                </div>
                <div>
                  <div className="create-post-modal-username">
                    {/* {saveFlag.firstName} {saveFlag.surName} */}
                  </div>
                  <div style={{ padding: "3px 0 0 13px" }}>
                    {" "}
                    <Form.Select
                      //   onChange={(e) => setPostStatus(e.target.value)}
                      size="sm"
                      //   value={postStatus}
                    >
                      <option value="">Chọn quyền riêng tư</option>
                      <option value={0}>🌏 Công khai</option>
                      <option value={1}>👥 Bạn bè</option>
                      <option value={2}>🔒 Riêng tư</option>
                    </Form.Select>
                  </div>
                </div>
              </div>
              <div className="create-post-modal-middle">
                <div className="modal-middle-input">
                  <textarea
                    name="postContent"
                    // type="text"
                    // onChange={(e) => setPostContent([e.target.value])}
                    // value={postContent}
                    // placeholder={`${saveFlag.surName} ơi, bạn đang nghĩ gì thế?`}
                  ></textarea>

                  {/* <i onClick={handleShowIcons} className="far fa-smile"></i> */}

                  <div /* className={postIconStyle} */>
                    <p>Mặt cười & hình người</p>{" "}
                    {/* {postIcon?.map((icon, iconIndex) => (
                      <>
                        <span
                          key={iconIndex}
                          //   onClick={() => handleAddPostIcon(icon)}
                        >
                          {icon}
                        </span>
                      </>
                    ))} */}
                  </div>
                </div>
              </div>
              <div className="Dragger">
                <input
                  type="file"
                  name="postImage"
                  //   onChange={handlePostImageChange}
                />
                <div className="img-upload">
                  {/* <img src={postImgPreview} alt="" /> */}
                  <Button
                    variant="primary" /* onClick={handleUploadPostImage} */
                  >
                    Tải ảnh lên
                  </Button>{" "}
                </div>
              </div>
              <div className="create-post-modal-bottom">
                <div>Thêm vào bài viết của bạn</div>
                <div>
                  <i className="fas fa-user-tag"></i>
                </div>
              </div>
            </div>
            <div
              /* onClick={handleAddPost} */ className="create-post-modal-submit"
            >
              Đăng
            </div>
          </Modal.Body>
        </Modal>
        {/* CREATE POSTS MODAL END*/}
        <button onClick={() => setTest(test)}>TEST</button>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
}
