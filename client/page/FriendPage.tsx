import { useEffect, useState } from "react";
import "../src/css/friendPage.css";
import privateAxios from "../src/config/axios.config";
import FriendRequestCard from "../src/components/Card/FriendRequestCard";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function FriendPage() {
  const navigate = useNavigate();
  let [friends, setFriends] = useState<string>("request");
  let [dataFriend, setDataFriend] = useState([]);
  useEffect((): void => {
    privateAxios
      .get(`/api/v1/user/friends/${friends}`)
      .then((res) => {
        setDataFriend(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [friends]);
  const handleAcceptFriend = (user_id: number, index: number) => {
    privateAxios
      .get(`/api/v1/user/friends/accept/${user_id}`)
      .then((data) => {
        dataFriend.splice(index, 1);
        setDataFriend([...dataFriend]);
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteRequest = (user_id: number, index: number) => {
    privateAxios
      .get(`/api/v1/user/friends/delete/${user_id}`)
      .then((data) => {
        dataFriend.splice(index, 1);
        setDataFriend([...dataFriend]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="friend-page">
      <div className="friend-page-left">
        <p>Friend</p>
        {/*         <div>
          <div className="friend-left-icon">
            <i className="fa-solid fa-user-group"></i>{" "}
          </div>
          Home
        </div> */}
        <div onClick={() => setFriends("request")}>
          <div className="friend-left-icon">
            <i className="fa-solid fa-user-plus"></i>
          </div>
          Friend request
        </div>
        <div onClick={() => setFriends("suggestions")}>
          <div className="friend-left-icon">
            <i className="fa-solid fa-user"></i>
          </div>
          Suggestions
        </div>
        <div onClick={() => setFriends("birthday")}>
          <div className="friend-left-icon">
            <i className="fa-solid fa-cake-candles"></i>
          </div>
          Birthdays
        </div>
      </div>
      <div className="friend-page-right">
        {dataFriend.length == 0 ? (
          <div>Không có gì ở đây </div>
        ) : dataFriend[0]?.user_birthday_year ? (
          <div>
            {dataFriend.map((friend) => (
              <div>khi nào làm xong logic chat sẽ làm hihi</div>
            ))}
          </div>
        ) : (
          <div>
            <div className="friend-request-header">
              <div>Friend Requests</div>
              <Button> See All</Button>
            </div>
            <div className="friend-request-main">
              {dataFriend.map((friendData: any, index) => (
                <div key={index} className="friend-card-request">
                  <div
                    onClick={() => navigate(`/profile/${friendData.user_id}`)}
                  >
                    <div className="friend-card-image">
                      <img src={friendData.user_avatar} alt="avatar" />
                    </div>
                    <div className="friend-card-userName">
                      {friendData.user_firstName} {friendData.user_lastName}
                    </div>
                  </div>

                  <div>
                    <Button
                      onClick={() =>
                        handleAcceptFriend(friendData.user_id, index)
                      }
                    >
                      Confirm
                    </Button>
                    <Button
                      onClick={() =>
                        handleDeleteRequest(friendData.user_id, index)
                      }
                      className="friend-card-btn-delete"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                // <FriendRequestCard key={index} friendData={friend} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
