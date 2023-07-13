import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import privateAxios, { privateAxiosUpload } from "../src/config/axios.config";
import "../src/css/profilePage.css";
import { Button, Modal } from "react-bootstrap";
import Tippy from "@tippyjs/react/headless";

import StatusCard from "../src/components/Card/StatusCard";
export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataUserProfile, setDataUserProfile] = useState<any>({});
  const [dataPostProfile, setDataPostProfile] = useState<any>([]);
  let [dataFriend, setDataFriend] = useState<any>([]);
  const [myProfile, setMyProfile] = useState<boolean>(false);
  const [urlCoverPhoto, setUrlCoverPhoto] = useState<any>();
  const [urlAvatarPhoto, setUrlAvatarPhoto] = useState<any>();
  const [fileAvatarPhoto, setFileAvatarPhoto] = useState<any>();
  const [fileCoverPhoto, setFileCoverPhoto] = useState<any>();
  const [showEditBio, setShowEditBio] = useState<boolean>(false);
  const [showEditInformation, setShowEditInformation] =
    useState<boolean>(false);
  const [editBio, setEditBio] = useState<string>("");
  const [editWorkat, setEditWorkat] = useState<string>("");
  const [editStudy, setEditStudy] = useState<string>("");
  const [editLivesin, setEditLivesin] = useState<string>("");
  const [editFrom, setEditFrom] = useState<string>("");
  const [totalFollower, setTotalFollower] = useState<number>(0);
  const [showBtnCancelFriend, setShowBtnCancelFriend] =
    useState<boolean>(false);
  useEffect(() => {
    privateAxios
      .get(`/api/v1/user/profile/${id}}`)
      .then((res) => {
        res.data.checkIsMe && setMyProfile(true);
        setDataUserProfile({ ...res.data.data.dataUser });
        setUrlCoverPhoto(res.data.data.dataUser.user_cover);
        setUrlAvatarPhoto(res.data.data.dataUser.user_avatar);
        setEditBio(res.data.data.dataUser.user_bio);
        setEditWorkat(res.data.data.dataUser.user_work_at);
        setEditLivesin(res.data.data.dataUser.user_lives_in);
        setEditStudy(res.data.data.dataUser.user_study_at);
        setEditFrom(res.data.data.dataUser.user_from);
        setDataPostProfile([...res.data.data.dataPost]);
        setDataFriend([...res.data.data.dataFriends]);
        setTotalFollower(res.data.data.totalFollower);
      })
      .catch((err) => console.log(err));
  }, [id]);
  let arrPhoto = dataPostProfile.filter(
    (photo: any) => photo.post.post_urlPicture !== null
  );

  arrPhoto = arrPhoto.slice(0, 9);
  dataFriend = dataFriend.slice(0, 9);
  const handleRequest = (id: number) => {
    privateAxios
      .post("/api/v1/user/friends/request", { userId_answer: id })
      .then((res) =>
        setDataUserProfile({
          ...dataUserProfile,
          status_relationship: 1,
          awaitAccept: true,
        })
      )
      .catch((err) => console.log(err));
  };
  const handeCancelRequest = (id: number) => {
    privateAxios
      .delete(`/api/v1/user/friends/delete/${id}`)
      .then((res) =>
        setDataUserProfile({
          ...dataUserProfile,
          status_relationship: 0,
          awaitAccept: undefined,
        })
      )
      .catch((err) => console.log(err));
  };
  const handleRejectRequest = (id: number) => {
    privateAxios
      .delete(`/api/v1/user/friends/reject/${id}`)
      .then((res) =>
        setDataUserProfile({
          ...dataUserProfile,
          status_relationship: 0,
          awaitAccept: undefined,
        })
      )
      .catch((err) => console.log(err));
  };
  const handleAcceptFriend = (user_id: number) => {
    privateAxios
      .get(`/api/v1/user/friends/accept/${user_id}`)
      .then((data) =>
        setDataUserProfile({
          ...dataUserProfile,
          status_relationship: 2,
          awaitAccept: undefined,
        })
      )
      .catch((err) => console.log(err));
  };
  const handleUpdateInformation = (key: string, value: any) => {
    privateAxios
      .post(`/api/v1/user/update/information?key=${key}`, { newValue: value })
      .then(() => {
        setDataUserProfile({ ...dataUserProfile, [key]: value });
        setShowEditBio(false);
      })
      .catch((err) => console.log(err));
    console.log(dataUserProfile);
  };
  const handleChangeCoverPhoto = (e: any) => {
    console.log("hihihi");

    setFileCoverPhoto(e.target.files[0]);
    setUrlCoverPhoto(URL.createObjectURL(e.target.files[0]));
  };
  const handleChangeAvatarPhoto = (e: any) => {
    setFileAvatarPhoto(e.target.files[0]);
    setUrlAvatarPhoto(URL.createObjectURL(e.target.files[0]));
  };
  const handleUpdateUserPhoto = (key: string, file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    privateAxiosUpload
      .put(`/api/v1/user/update/photo?key=${key}`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  console.log("cover", fileCoverPhoto);

  return (
    <div className="profilePage">
      <div className="profile-header">
        <div className="profile-cover">
          <img
            className="profile-cover-image"
            src={urlCoverPhoto}
            alt="image-cover"
          />
          {myProfile && (
            <div>
              {urlCoverPhoto !== dataUserProfile.user_cover && (
                <div className="btn-handle-cover">
                  <button
                    onClick={() => {
                      setFileCoverPhoto(undefined);
                      setUrlCoverPhoto(dataUserProfile.user_cover);
                    }}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    {" "}
                    Cancel
                  </button>
                  <button
                    style={{ backgroundColor: "#4C8BF5", color: "white" }}
                  >
                    Save
                  </button>
                </div>
              )}
              <div>
                <label
                  className="btn-edit-cover-image"
                  htmlFor="changeCoverPhoto"
                >
                  <i className="fa-solid fa-camera "></i> Edit cover photo
                </label>
                <input
                  name="file"
                  style={{ display: "none" }}
                  type="file"
                  id="changeCoverPhoto"
                  onChange={(e) => handleChangeCoverPhoto(e)}
                />
                {/* <input type="file" id="changeCoverPhoto" /> */}
              </div>
            </div>
          )}
        </div>
        <div className="profile-avatar-container">
          <img className="profile-avatar" src={urlAvatarPhoto} alt="avatar" />
        </div>
        {myProfile && (
          <div>
            <label className="changeAvatarPhoto" htmlFor="changeAvatarPhoto">
              <i className="fa-solid fa-camera "></i>
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="changeAvatarPhoto"
              onChange={(e) => handleChangeAvatarPhoto(e)}
            />
          </div>
        )}

        <div className="profile-user-name-container">
          <div className="profile-user-name">
            {dataUserProfile.user_firstName} {dataUserProfile.user_lastName}{" "}
            {dataUserProfile.user_nickName &&
              `(${dataUserProfile.user_nickName})`}
          </div>
          {dataUserProfile.totalFriend !== 0 && (
            <p> {dataUserProfile.totalFriend} friends</p>
          )}
        </div>
        <div className="profile-user-button-container">
          {myProfile ? (
            <div>
              <Button>+ Add to story</Button>
              <Button>
                <i className="fa-solid fa-pen"></i> Edit profile
              </Button>
            </div>
          ) : (
            <div>
              {dataUserProfile.status_relationship == 1 &&
                !dataUserProfile.awaitAccept && (
                  <Button
                    onClick={() => handleRejectRequest(dataUserProfile.user_id)}
                  >
                    <i className="fa-solid fa-user-xmark"></i> Từ chối
                  </Button>
                )}
              {dataUserProfile.status_relationship == 2 ? (
                <Tippy
                  placement="bottom-end"
                  interactive
                  visible={showBtnCancelFriend}
                  onClickOutside={() => setShowBtnCancelFriend(false)}
                  render={() => (
                    <Button
                      className="profile-btn-cancel"
                      onClick={() =>
                        handeCancelRequest(dataUserProfile.user_id)
                      }
                    >
                      <i className="fa-solid fa-user-xmark"></i> Hủy kết bạn
                    </Button>
                  )}
                >
                  <Button
                    onClick={() => setShowBtnCancelFriend(!showBtnCancelFriend)}
                  >
                    <i className="fa-solid fa-user-check"></i> Bạn bè
                  </Button>
                </Tippy>
              ) : dataUserProfile.status_relationship == 1 &&
                dataUserProfile.awaitAccept ? (
                <Button
                  className="profile-btn-cancel"
                  onClick={() => handeCancelRequest(dataUserProfile.user_id)}
                >
                  <i className="fa-solid fa-user-xmark"></i> Hủy kết bạn
                </Button>
              ) : dataUserProfile.status_relationship == 1 ? (
                <Button
                  onClick={() => handleAcceptFriend(dataUserProfile.user_id)}
                >
                  <i className="fa-solid fa-user-check"></i> Xác nhận
                </Button>
              ) : (
                <Button onClick={() => handleRequest(dataUserProfile.user_id)}>
                  <i className="fa-solid fa-user-plus"></i> Kết bạn
                </Button>
              )}

              <Button>
                <i className="fa-brands fa-facebook-messenger"></i> Nhắn tin
              </Button>
            </div>
          )}
        </div>
      </div>
      <div></div>
      <div className="profile-container">
        <div className="profile-container-left">
          <div className="profile-container-left-intro">
            {showEditBio ? (
              <div>
                <textarea
                  id=""
                  cols={60}
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                ></textarea>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "5px 10px",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowEditBio(false);
                      setEditBio(dataUserProfile.user_bio);
                    }}
                    className="btn-save-bio"
                  >
                    Cancel
                  </button>
                  {editBio === dataUserProfile.user_bio ? (
                    <button className="btn-not-save-bio">Save</button>
                  ) : (
                    <button
                      className="btn-save-bio"
                      onClick={() =>
                        handleUpdateInformation("user_bio", editBio)
                      }
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <p className="profile-title-container">Intro</p>
                <p>{dataUserProfile.user_bio}</p>
                <Button
                  className="btn-edit-bio"
                  onClick={() => setShowEditBio(true)}
                >
                  Edit bio
                </Button>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px 0px",
                margin: "10px 0px",
              }}
            >
              {dataUserProfile.user_work_at && (
                <div>
                  <i className="fa-solid fa-briefcase"></i> Work at{" "}
                  <span className="intro-bold">
                    {dataUserProfile.user_work_at}
                  </span>
                </div>
              )}
              {dataUserProfile.user_study_at && (
                <div>
                  <i className="fa-solid fa-graduation-cap"></i> Studied at{" "}
                  <span className="intro-bold">
                    {dataUserProfile.user_study_at}
                  </span>
                </div>
              )}
              {dataUserProfile.user_lives_in && (
                <div>
                  <i className="fa-solid fa-house-chimney"></i> Live in{" "}
                  <span className="intro-bold">
                    {dataUserProfile.user_lives_in}
                  </span>
                </div>
              )}
              {dataUserProfile.user_from && (
                <div>
                  <i className="fa-solid fa-location-dot"></i> From{" "}
                  <span className="intro-bold">
                    {dataUserProfile.user_from}
                  </span>
                </div>
              )}
              <div>
                <i className="fa-solid fa-wifi"></i> {totalFollower} follower
              </div>
            </div>

            <Button
              className="btn-edit-bio"
              onClick={() => setShowEditInformation(true)}
            >
              Edit Details
            </Button>
          </div>
          <div className="profile-photos-container">
            <div>
              <p className="profile-title-container">Photos</p>
              <Button className="profile-btn-all-photos">See all photos</Button>
            </div>
            <div className="profile-container-left-photos">
              {arrPhoto.map((post: any, index: number) => {
                if (post.post.post_urlPicture) {
                  return (
                    <div key={index} className="profile-container-left-photo">
                      <img src={post.post.post_urlPicture} alt="photo" />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="profile-photos-container">
            <div>
              <p className="profile-title-container">Friends</p>
              <Button className="profile-btn-all-photos">See all friend</Button>
            </div>

            <div className="profile-container-friends">
              {dataFriend.length > 0 &&
                dataFriend.map((friend: any, index: number) => (
                  <div
                    key={index}
                    className="profile-friend-data"
                    onClick={() => navigate(`/profile/${friend.user_id}`)}
                  >
                    <img src={friend.user_avatar} alt="photo" />
                    <p>
                      {friend.user_firstName} {friend.user_lastName}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="profile-container-right">
          {dataPostProfile.map((post: any, index: number) => (
            <StatusCard key={index} post={post} />
          ))}
        </div>
      </div>
      {/* Modal edit details */}
      <Modal
        show={showEditInformation}
        onHide={() => setShowEditInformation(false)}
      >
        <Modal.Header closeButton>
          <div style={{ fontWeight: "700", fontSize: "20px " }}>
            Edit Details
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-details">
            <div>
              <label htmlFor="editWorkat">Work at : </label>
              <br />
              <input
                type="text"
                id="editWorkat"
                value={editWorkat}
                onChange={(e) => setEditWorkat(e.target.value)}
              />
              {editWorkat !== dataUserProfile.user_work_at ? (
                <i
                  onClick={() =>
                    handleUpdateInformation("user_work_at", editWorkat)
                  }
                  className="fa-solid fa-floppy-disk"
                ></i>
              ) : (
                <i className="fa-regular fa-floppy-disk"></i>
              )}
            </div>
            <div>
              <label htmlFor="editStudy">Study at : </label>
              <br />
              <input
                type="text"
                id="editStudy"
                value={editStudy}
                onChange={(e) => setEditStudy(e.target.value)}
              />
              {editStudy === dataUserProfile.user_study_at ? (
                <i className="fa-regular fa-floppy-disk"></i>
              ) : (
                <i
                  onClick={() =>
                    handleUpdateInformation("user_study_at", editWorkat)
                  }
                  className="fa-solid fa-floppy-disk"
                ></i>
              )}
            </div>
            <div>
              <label htmlFor="editLivesin">Lives in : </label>
              <br />
              <input
                type="text"
                id="editLivesin"
                value={editLivesin}
                onChange={(e) => setEditLivesin(e.target.value)}
              />
              {editLivesin === dataUserProfile.user_lives_in ? (
                <i className="fa-regular fa-floppy-disk"></i>
              ) : (
                <i
                  onClick={() =>
                    handleUpdateInformation("user_lives_in", editLivesin)
                  }
                  className="fa-solid fa-floppy-disk"
                ></i>
              )}
            </div>
            <div>
              <label htmlFor="editFrom">From : </label>
              <br />
              <input
                type="text"
                id="editFrom"
                value={editFrom}
                onChange={(e) => setEditFrom(e.target.value)}
              />
              {editFrom === dataUserProfile.user_from ? (
                <i className="fa-regular fa-floppy-disk"></i>
              ) : (
                <i
                  onClick={() => handleUpdateInformation("user_from", editFrom)}
                  className="fa-solid fa-floppy-disk"
                ></i>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ color: "red" }}>
            Make sure you save the information!!!
          </div>
          <Button onClick={() => setShowEditInformation(false)}>Cancel</Button>
          <Button onClick={() => setShowEditInformation(false)}>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
