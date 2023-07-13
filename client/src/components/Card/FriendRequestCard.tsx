import { Button } from "react-bootstrap";
import "../../css/friendRequestCard.css";
import privateAxios from "../../config/axios.config";
import { useNavigate } from "react-router-dom";
export default function FriendRequestCard({ friendData }) {
  const navigate = useNavigate();
  const handleAcceptFriend = (user_id: number) => {
    privateAxios
      .get(`/api/v1/user/friends/accept/${user_id}`)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  const handleDeleteRequest = (user_id: number) => {
    privateAxios
      .delete(`/api/v1/user/friends/delete/${user_id}`)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="friend-card-request">
      <div onClick={() => navigate(`/profile/${friendData.user_id}`)}>
        <div className="friend-card-image">
          <img src={friendData.user_avatar} alt="avatar" />
        </div>
        <div className="friend-card-userName">
          {friendData.user_firstName} {friendData.user_lastName}
        </div>
      </div>

      <div>
        <Button onClick={() => handleAcceptFriend(friendData.user_id)}>
          Confirm
        </Button>
        <Button
          onClick={() => handleDeleteRequest(friendData.user_id)}
          className="friend-card-btn-delete"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
