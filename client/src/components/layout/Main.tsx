import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
// import axios from "axios";
// import io  from "socket.io"
// import { storage } from "../../../../firebase";
// import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { ToastContainer } from "react-toastify";
import "../../css/main.css";
import StatusCard from "../Card/StatusCard";
import { useDispatch, useSelector } from "react-redux";
import privateAxios, { privateAxiosUpload } from "../../config/axios.config";
import { useNavigate } from "react-router-dom";
export default function Main() {
  let [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  let [showInputImage, setShowInputImage] = useState<boolean>(true);
  let [postActive, setPostActive] = useState<number>(3);
  let [postContent, setPostContent] = useState<string>("");
  let [file, setFile] = useState<string>("");
  let [urlFile, setUrlFile] = useState<string>();
  let [newFeed, setNewFeed] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      privateAxios.get(`/api/v1/user`).then((res) => {
        dispatch({ type: "LOAD_DATA_USER", payload: res.data.data });
      });
      privateAxios
        .get("/api/v1/post")
        .then((res) => setNewFeed(res.data.newFeed));
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log("newFeed", newFeed);

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
    setUrlFile(URL.createObjectURL(e.target.files[0]));
    setShowInputImage(false);
  };

  // const handleFile = (e: any) => {
  //   if (e.target.files) {
  //     console.log(e.target.files);
  //     // setFile(e.target.files[0]);
  //     const formData = new FormData();
  //     formData.append("file", e.target.files[0]);
  //     privateAxiosUpload
  //       .post("/api/v1/post/upload", formData)
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err));
  //     // axios({
  //     //   method: "post",
  //     //   url: "http://localhost:8000/api/v1/post/upload",
  //     //   data: formData,
  //     //   headers: { "Content-Type": "multipart/form-data" },
  //     // })
  //     //   .then(function (response) {
  //     //     //handle success
  //     //     console.log(response);
  //     //   })
  //     //   .catch(function (response) {
  //     //     //handle error
  //     //     console.log(response);
  //     //   });
  //     // //   // formData.append("postContent", JSON.stringify(postContent));
  //     //   // formData.append("postActive", JSON.stringify(postActive));
  //   }
  // };
  const handleAddPost = async (e: any) => {
    e.preventDefault();
    if (file || postContent) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("postContent", JSON.stringify(postContent));
      formData.append("postActive", JSON.stringify(postActive));
      privateAxiosUpload
        .post("/api/v1/post/upload", formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  const dataUser = useSelector((state: any) => state?.dataUser);
  return (
    <div>
      <div className="home-middle">
        {/* <StoryCarousel user={user} /> */}
        {/* NEWFEED INPUT */}
        <div className="create-newfeed-container">
          <div className="create-newfeed-input-container">
            <div className="create-newfeed-avatar">
              <img src={dataUser.user_avatar} alt="" />
            </div>
            <div
              onClick={() => {
                setShowCreatePost(true);
                setShowInputImage(false);
              }}
              className="create-newfeed-input"
            >
              {dataUser.user_lastName} ơi, bạn đang nghĩ gì thế?
            </div>
          </div>
          <div className="create-newfeed-videos-images">
            <div className="create-newfeed-videos">
              <i className="fa-sharp fa-solid fa-video"></i> Video trực tiếp
            </div>
            <div
              onClick={() => setShowCreatePost(true)}
              className="create-newfeed-images"
            >
              <i
                onClick={() => {
                  setShowCreatePost(true);
                  setShowInputImage(true);
                }}
                className="fa-sharp fa-solid fa-images"
              ></i>{" "}
              Ảnh/video
            </div>
            <div className="create-newfeed-smile">
              <i className="fa-sharp fa-solid fa-face-laugh"></i> Cảm xúc/hoạt
              động
            </div>
          </div>
        </div>
        {/* NEWFEED INPUT END */}
        {/* NEWFEED BLOCK */}
        <div className="main-container-newfeed">
          {newFeed?.map((post: any, index: number) => (
            <StatusCard key={index} post={post} />
          ))}
        </div>

        {/* NEWFEED BLOCK END*/}

        {/* CREATE POSTS MODAL */}
        <Modal
          className="create-post-modal-container"
          show={showCreatePost}
          onHide={() => setShowCreatePost(false)}
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
                  <img src={dataUser.user_avatar} alt="" />
                </div>
                <div>
                  <div className="create-post-modal-username">
                    {dataUser.user_firstName} {dataUser.user_lastName}
                  </div>
                  <div style={{ padding: "3px 0 0 13px" }}>
                    {" "}
                    <Form.Select
                      onChange={(e: any) => setPostActive(e.target.value)}
                      size="sm"
                      value={postActive}
                    >
                      <option value={3}>🌏 Công khai</option>
                      <option value={2}>👥 Bạn bè</option>
                      <option value={1}>🔒 Riêng tư</option>
                    </Form.Select>
                  </div>
                </div>
              </div>
              <div className="create-post-modal-middle">
                <div className="modal-middle-input">
                  <textarea
                    name="postContent"
                    onChange={(e) => setPostContent(e.target.value)}
                    value={postContent}
                    placeholder={`${dataUser.user_lastName} ơi, bạn đang nghĩ gì thế?`}
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
                {showInputImage && (
                  <input
                    // style={{ display: showInputImage ? "none" : "" }}
                    type="file"
                    name="file"
                    onChange={handleFile}
                  />
                )}

                <img className="create-post-modal-preview-img" src={urlFile} />
              </div>
              <div className="create-post-modal-bottom">
                <div>Thêm vào bài viết của bạn</div>
                <div>
                  <i
                    onClick={() => setShowInputImage(true)}
                    style={{ marginRight: "10px" }}
                    className="fa-solid fa-image"
                  ></i>
                  <i className="fas fa-user-tag"></i>
                </div>
              </div>
            </div>
            <div onClick={handleAddPost} className="create-post-modal-submit">
              Đăng
            </div>
          </Modal.Body>
        </Modal>
        {/* CREATE POSTS MODAL END*/}
        {/* <StatusCard /> */}
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  );
}
