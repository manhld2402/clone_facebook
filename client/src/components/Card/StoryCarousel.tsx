// import React, { useEffect, useState } from "react";
// import Carousel from "react-bootstrap/Carousel";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import axios from "axios";
// import { storage } from "../../../../../firebase";
// import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
// import { ToastContainer, toast } from "react-toastify";

// function StoryCarousel(props) {
//   const user = props.user;
//   // MODAL ĐĂNG ẢNH STORY
//   const [showCreateStory, setShowCreateStory] = useState(false);
//   const handleCloseCreateStory = () => setShowCreateStory(false);
//   const handleShowCreateStory = () => setShowCreateStory(true);

//   const saveFlag = JSON.parse(localStorage.getItem("saveFlag"));

//   const [stories, setStories] = useState([]);
//   const loadStories = async () => {
//     const result = await axios.get(`http://localhost:5000/api/v1/stories`);
//     setStories(result.data.data);
//   };

//   useEffect(() => {
//     loadStories();
//   }, []);

//   // State upload ảnh lên
//   const [ImgPreview, setImgPreview] = useState(null);
//   const [ImgUpload, setImgUpload] = useState(null);

//   // State lấy url ảnh về
//   const [ImgUrls, setImgUrls] = useState([]);

//   // Tạo storage lưu trữ từ dịch vụ của firebase
//   const ImgsListRef = ref(
//     storage,
//     `users/${saveFlag.surName}-${saveFlag.firstName}/photos/stories`
//   );

//   //Hàm đọc ảnh input bg

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImgUpload(file);
//       const reader = new FileReader();
//       reader.addEventListener("load", () => {
//         setImgPreview(reader.result);
//       });
//       reader.readAsDataURL(file);
//     }
//   };

//   // Lấy thời gian hiện tại
//   const today = new Date();
//   const date =
//     today.getFullYear() +
//     "" +
//     (today.getMonth() < 10
//       ? "0" + (today.getMonth() + 1).toString()
//       : today.getMonth() + 1) +
//     "" +
//     (today.getDate() < 10 ? "0" + today.getDate().toString() : today.getDate());
//   const time =
//     (today.getHours() < 10
//       ? "0" + today.getHours().toString()
//       : today.getHours()) +
//     "" +
//     (today.getMinutes() < 10
//       ? "0" + today.getMinutes().toString()
//       : today.getMinutes()) +
//     "" +
//     (today.getSeconds() < 10
//       ? "0" + today.getSeconds().toString()
//       : today.getSeconds());
//   const dateTime = Number(date + time);

//   // Viết hàm upload bg
//   const handleUploadImage = () => {
//     if (ImgUpload == null) {
//       toast.warning("Ảnh chưa được chọn", {
//         position: toast.POSITION.BOTTOM_LEFT,
//       });
//       return;
//     }

//     const ImgListRef = ref(
//       storage,
//       `users/${saveFlag.surName}-${saveFlag.firstName}/photos/stories/${dateTime}_${ImgUpload.name}`
//     );

//     uploadBytes(ImgListRef, ImgUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImgUrls((prev) => [...prev, url]);
//       });
//     });
//     toast.success("Ảnh đang được tải lên", {
//       position: toast.POSITION.BOTTOM_CENTER,
//       className: "foo-bar",
//     });
//   };

//   // Lấy dữ liệu trả về từ firebase
//   useEffect(() => {
//     listAll(ImgsListRef).then((res) => {
//       res.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//           setImgUrls((prev) => [...prev, url]);
//         });
//       });
//     });
//   }, []);

//   const storyImage = ImgUrls[ImgUrls.length - 1];
//   const createStoryValue = {
//     author: saveFlag.userId,
//     storyImage: storyImage,
//   };

//   const handleCreateStory = async () => {
//     if (createStoryValue.storyImage === "") {
//       toast.warning("Bạn chưa thêm ảnh", {
//         position: toast.POSITION.BOTTOM_LEFT,
//       });
//       return;
//     }

//     toast.success("Thêm story thành công!", {
//       position: toast.POSITION.BOTTOM_LEFT,
//     });

//     await axios.post("http://localhost:5000/api/v1/stories", createStoryValue);
//     setTimeout(() => {
//       window.location.reload();
//     }, 2500);
//   };

//   return (
//     <>
//       <div className="story-big-container">
//         <div className="news-reels-container">
//           <div className="story-news-active">
//             <i className="fa-sharp fa-solid fa-book-open"></i> Tin
//           </div>
//           <div className="story-reels">
//             <i className="fa-sharp fa-solid fa-circle-play"></i> Reels
//           </div>
//         </div>
//         <div className="Carousel-container">
//           <Carousel>
//             <Carousel.Item>
//               <div className="story-container">
//                 {/* STORY BLOCK */}
//                 <div
//                   onClick={handleShowCreateStory}
//                   className="d-block w-25 add-story"
//                 >
//                   <img
//                     className="img-avatar"
//                     src={saveFlag.avatarDefault}
//                     alt="First slide"
//                   />
//                   <i className="fa-solid fa-circle-plus"></i>
//                   <div className="create-story">Tạo tin</div>
//                 </div>
//                 {/* STORY BLOCK END*/}

//                 {/* STORY BLOCK */}
//                 {stories.length >= 1 ? (
//                   <>
//                     {stories
//                       .sort((a, b) => b.storyId - a.storyId)
//                       .slice(0, 3)
//                       ?.map((story, i) => (
//                         <>
//                           <div className="d-block w-25 story-img-container">
//                             <img
//                               className="img"
//                               src={story.storyImage}
//                               alt="First slide"
//                             />
//                           </div>
//                           <div className="story-avatar-active">
//                             <img
//                               className="story-avatar"
//                               src={story.avatarDefault}
//                               alt=""
//                             />
//                             <i className="fa-sharp fa-solid fa-circle"></i>
//                           </div>
//                         </>
//                       ))}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//                 {/* STORY BLOCK END*/}
//               </div>
//             </Carousel.Item>
//             <Carousel.Item>
//               <div className="story-container">
//                 {/* STORY BLOCK */}
//                 {stories.length >= 5 ? (
//                   <>
//                     {stories
//                       .sort((a, b) => b.storyId - a.storyId)
//                       .slice(4, 8)
//                       ?.map((story, i) => (
//                         <>
//                           <div className="d-block w-25 story-img-container">
//                             <img
//                               className="img"
//                               src={story.storyImage}
//                               alt="First slide"
//                             />
//                           </div>
//                           <div className="story-avatar-active">
//                             <img
//                               className="story-avatar"
//                               src={story.avatarDefault}
//                               alt=""
//                             />
//                             <i className="fa-sharp fa-solid fa-circle"></i>
//                           </div>
//                         </>
//                       ))}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//                 {/* STORY BLOCK END*/}
//               </div>
//             </Carousel.Item>
//           </Carousel>
//         </div>
//       </div>
//       <Modal show={showCreateStory} onHide={handleCloseCreateStory}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {" "}
//           <div className="Dragger">
//             <input type="file" name="postImage" onChange={handleImageChange} />
//             <div className="img-upload">
//               <img src={ImgPreview} alt="" />
//               <Button variant="primary" onClick={handleUploadImage}>
//                 Tải ảnh lên
//               </Button>{" "}
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="primary" onClick={handleCreateStory}>
//             Đăng ảnh
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <ToastContainer autoClose={2500} />
//     </>
//   );
// }

// export default StoryCarousel;
