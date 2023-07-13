import { useState } from "react";
import "../../css/statusCard.css";
import moment from "moment";
import Tippy from "@tippyjs/react/headless";
import { useSelector } from "react-redux";
import privateAxios from "../../config/axios.config";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
export default function StatusCard<T extends object>({ post }) {
  const navigate = useNavigate();
  const dataClient = useSelector((state: any) => state.dataUser);
  const [showFullAction, setShowFullAction] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [statusAction, setStatusAction] = useState<any>(post.clientAction);
  const [inputComment, setInputComment] = useState<string>();
  const [comments, setComments] = useState<any>([...post.cmts]);
  const [totalAction, setTotalAction] = useState<any>([...post.totalAction]);
  const handleLike = (post_id: number, action: string) => {
    privateAxios
      .get(`/api/v1/post/action?post_id=${post_id}&action=${action}`)
      .then((res) => {
        setStatusAction({ action_status: action });
        setTotalAction([...res.data.totalAction]);
      })
      .catch((err) => console.log(err));
  };
  const handleDislike = (post_id: number) => {
    privateAxios
      .delete(`/api/v1/post/action?post_id=${post_id}`)
      .then((res) => {
        setStatusAction(undefined);
        setTotalAction([...res.data.totalAction]);
      })
      .catch((err) => console.log(err));
  };
  const handleComment = (e: any) => {
    e.preventDefault();
    console.log("heheh");

    let now = new Date();
    if (inputComment) {
      privateAxios
        .post(`/api/v1/post/comment`, {
          commentContent: inputComment,
          post_id: post.post.post_id,
        })
        .then((res) => {
          console.log("res.data.cmt_id", res.data);

          setComments([
            {
              cmt_id: res.data.cmt_id,
              cmt_content: inputComment,
              cmt_time: now,
              user_avatar: dataClient.user_avatar,
              user_firstName: dataClient.user_firstName,
              user_lastName: dataClient.user_lastName,
              user_id: dataClient.user_id,
            },
            ...comments,
          ]);
          setInputComment("");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="status-card">
      <div className="status-header">
        <img
          onClick={() => navigate(`/profile/${post.post.post_authorId}`)}
          className="status-avtar"
          src={post.post.user_avatar}
          alt=""
        />
        <div>
          <div
            className="status-user-name"
            onClick={() => navigate(`/profile/${post.post.user_id}`)}
          >
            {post.post.user_firstName} {post.post.user_lastName}
          </div>
          <div className="status-time-post">
            {moment(post.post.post_time).fromNow() + " "}
            <span>
              {post.post.post_active === 3 ? (
                <i className="fa-solid fa-earth-americas status-icon"></i>
              ) : post.post.post_active === 2 ? (
                <i className="fa-solid fa-user-group status-icon"></i>
              ) : (
                <i className="fa-solid fa-user status-icon"></i>
              )}
            </span>
          </div>
        </div>
      </div>
      <p className="status-content">{post.post.post_content}</p>

      <img
        onClick={() => setShowModal(true)}
        className="status-image"
        src={post.post.post_urlPicture}
        alt=""
      />
      {(totalAction || comments.length > 0) && (
        <div className="status-action-cmts-total">
          <div className="status-action-total">
            {totalAction.length != 0 && `${totalAction.length} Reaction`}
          </div>
          <div className="status-action-total">
            {comments.length > 0 && `${comments.length} Comment`}
          </div>
        </div>
      )}

      <hr />
      <div className="status-action">
        <Tippy
          placement="top-end"
          interactive
          visible={showFullAction}
          onClickOutside={() => setShowFullAction(false)}
          render={(attr) => (
            <div className="status-action-full">
              <img
                onClick={() => handleLike(post.post.post_id, "like")}
                className="status-icon-emoji"
                src="/like-emoji.gif"
              />

              <img
                onClick={() => handleLike(post.post.post_id, "love")}
                className="status-icon-emoji"
                // src="http://localhost:8000/emoji/love-emoji.gif"
                src="/love-emoji.gif"
              />
              <img
                onClick={() => handleLike(post.post.post_id, "haha")}
                className="status-icon-emoji"
                src="/haha-emoji.gif"
              />
              <img
                onClick={() => handleLike(post.post.post_id, "sad")}
                className="status-icon-emoji"
                src="/sad-emoji.gif"
              />
              <img
                onClick={() => handleLike(post.post.post_id, "wow")}
                className="status-icon-emoji"
                src="/wow-emoji.gif"
              />
              <img
                onClick={() => handleLike(post.post.post_id, "angry")}
                className="status-icon-emoji"
                src="/angry-emoji.gif"
              />
            </div>
          )}
        >
          {/* Btn like , dislike */}
          <button
            onMouseOver={() => setShowFullAction(true)}
            className="status-btn-action status-action-like"
          >
            {!statusAction ? (
              <div onClick={() => handleLike(post.post.post_id, "like")}>
                <i className="fa-regular fa-thumbs-up"></i>
                <div>Like </div>
              </div>
            ) : statusAction.action_status == "like" ? (
              <div onClick={() => handleDislike(post.post.post_id)}>
                <img className="status-btn-icon-emoji" src="/like-emoji.gif" />
                <div style={{ color: "blue" }}> Like</div>
              </div>
            ) : statusAction.action_status == "haha" ? (
              <div onClick={() => handleDislike(post.post.post_id)}>
                <img className="status-btn-icon-emoji" src="/haha-emoji.gif" />
                <div style={{ color: "#F7B126" }}>Haha</div>
              </div>
            ) : statusAction.action_status == "sad" ? (
              <div onClick={() => handleDislike(post.post.post_id)}>
                <img className="status-btn-icon-emoji" src="/sad-emoji.gif" />
                <div style={{ color: "#F7B126" }}>Sad</div>
              </div>
            ) : statusAction.action_status == "wow" ? (
              <div onClick={() => handleDislike(post.post.post_id)}>
                <img className="status-btn-icon-emoji" src="/wow-emoji.gif" />
                <div style={{ color: "#F7B126" }}>Wow</div>
              </div>
            ) : statusAction.action_status == "angry" ? (
              <div onClick={() => handleDislike(post.post.post_id)}>
                <img className="status-btn-icon-emoji" src="/angry-emoji.gif" />
                <div style={{ color: "#E97211" }}>Angry</div>
              </div>
            ) : (
              statusAction.action_status == "love" && (
                <div onClick={() => handleDislike(post.post.post_id)}>
                  <img
                    className="status-btn-icon-emoji"
                    src="/love-emoji.gif"
                  />
                  <div>Love</div>
                </div>
              )
            )}
          </button>
        </Tippy>

        <button className="status-btn-action">
          <i className="fa-regular fa-message"></i>
          <div>comment </div>
        </button>
        <button className="status-btn-action">
          <i className="fa-solid fa-share"></i>
          <div>Share</div>
        </button>
      </div>
      <hr />
      <div className="status-comment">
        <img
          className="status-comment-avatar"
          src={dataClient.user_avatar}
          alt=""
        />
        <form onSubmit={handleComment}>
          <input
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            type="text"
            className="inputComment "
            placeholder="Write a public comment..."
          />
          {inputComment ? (
            <i
              onClick={handleComment}
              style={{ cursor: "pointer" }}
              className="fa-solid fa-paper-plane"
            ></i>
          ) : (
            <i className="fa-regular fa-paper-plane"></i>
          )}
        </form>
      </div>
      {/* {comments.length > 1 &&
        comments.map((cmt: any, index: number) => (
          <div key={index} className="status-comment-comment">
            <img
              onClick={() => navigate(`/profile/${cmt.user_id}`)}
              className="status-comment-avatar"
              src={cmt.user_avatar}
            />
            <div>
              <button
                onClick={() => navigate(`/profile/${cmt.user_id}`)}
                className="status-user-name"
              >
                {cmt.user_firstName} {cmt.user_lastName}
              </button>
              <div className="comment-content">{cmt.cmt_content}</div>
              <div style={{ display: "flex", gap: "0px 10px" }}>
                <button className="status-btn-like">Like</button>
                <div>{moment(cmt.cmt_time).fromNow()}</div>
              </div>
            </div>
          </div>
        ))} */}
      {comments.length === 1 ? (
        <div className="status-comment-comment">
          <img
            onClick={() => navigate(`/profile/${comments[0].user_id}`)}
            className="status-comment-avatar"
            src={comments[0].user_avatar}
          />
          <div>
            <button
              onClick={() => navigate(`/profile/${comments[0].user_id}`)}
              className="status-user-name"
            >
              {comments[0].user_firstName} {comments[0].user_lastName}
            </button>
            <div className="comment-content">{comments[0].cmt_content}</div>
            <div style={{ display: "flex", gap: "0px 10px" }}>
              <button className="status-btn-like">Like</button>
              <div>{moment(comments[0].cmt_time).fromNow()}</div>
            </div>
          </div>
        </div>
      ) : (
        comments.length > 1 && (
          <div>
            <button
              onClick={() => setShowModal(true)}
              style={{
                border: "none",
                backgroundColor: "white",
                padding: "0px 20px",
              }}
            >
              View more comments
            </button>
            <div className="status-comment-comment">
              <img
                onClick={() => navigate(`/profile/${comments[0].user_id}`)}
                className="status-comment-avatar"
                src={comments[0].user_avatar}
              />
              <div>
                <button
                  onClick={() => navigate(`/profile/${comments[0].user_id}`)}
                  className="status-user-name"
                >
                  {comments[0].user_firstName} {comments[0].user_lastName}
                </button>
                <div className="comment-content">{comments[0].cmt_content}</div>
                <div style={{ display: "flex", gap: "0px 10px" }}>
                  <button className="status-btn-like">Like</button>
                  <div>{moment(comments[0].cmt_time).fromNow()}</div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="status-header">
            <img
              onClick={() => navigate(`/profile/${post.post.post_authorId}`)}
              className="status-avtar"
              src={post.post.user_avatar}
              alt=""
            />
            <div>
              <div
                onClick={() => navigate(`/profile/${post.post.post_authorId}`)}
                className="status-user-name"
              >
                {post.post.user_firstName} {post.post.user_lastName}
              </div>
              <div className="status-time-post">
                {moment(post.post.post_time).fromNow() + " "}
                <span>
                  {post.post.post_active === 3 ? (
                    <i className="fa-solid fa-earth-americas status-icon"></i>
                  ) : post.post.post_active === 2 ? (
                    <i className="fa-solid fa-user-group status-icon"></i>
                  ) : (
                    <i className="fa-solid fa-user status-icon"></i>
                  )}
                </span>
              </div>
            </div>
          </div>
          <p className="status-content">{post.post.post_content}</p>
          {post.post.post_urlPicture && (
            <img
              style={{ width: "798px", position: "relative", left: "-16px" }}
              className="status-image"
              src={post.post.post_urlPicture}
              alt=""
            />
          )}

          {(totalAction || comments.length > 0) && (
            <div className="status-action-cmts-total">
              <div className="status-action-total">
                {totalAction.length != 0 && `${totalAction.length} Reaction`}
              </div>
              <div className="status-action-total">
                {comments.length > 0 && `${comments.length} Comment`}
              </div>
            </div>
          )}

          <hr />
          <div className="status-action">
            <Tippy
              placement="top-end"
              interactive
              visible={showFullAction}
              onClickOutside={() => setShowFullAction(false)}
              render={() => (
                <div className="status-action-full">
                  <img
                    onClick={() => handleLike(post.post.post_id, "like")}
                    className="status-icon-emoji"
                    src="/like-emoji.gif"
                  />

                  <img
                    onClick={() => handleLike(post.post.post_id, "love")}
                    className="status-icon-emoji"
                    // src="http://localhost:8000/emoji/love-emoji.gif"
                    src="/love-emoji.gif"
                  />
                  <img
                    onClick={() => handleLike(post.post.post_id, "haha")}
                    className="status-icon-emoji"
                    src="/haha-emoji.gif"
                  />
                  <img
                    onClick={() => handleLike(post.post.post_id, "sad")}
                    className="status-icon-emoji"
                    src="/sad-emoji.gif"
                  />
                  <img
                    onClick={() => handleLike(post.post.post_id, "wow")}
                    className="status-icon-emoji"
                    src="/wow-emoji.gif"
                  />
                  <img
                    onClick={() => handleLike(post.post.post_id, "angry")}
                    className="status-icon-emoji"
                    src="/angry-emoji.gif"
                  />
                </div>
              )}
            >
              {/* Btn like , dislike */}
              <button
                onMouseOver={() => setShowFullAction(true)}
                className="status-btn-action status-action-like"
              >
                {!statusAction ? (
                  <div onClick={() => handleLike(post.post.post_id, "like")}>
                    <i className="fa-regular fa-thumbs-up"></i>
                    <div>Like </div>
                  </div>
                ) : statusAction.action_status == "like" ? (
                  <div onClick={() => handleDislike(post.post.post_id)}>
                    <img
                      className="status-btn-icon-emoji"
                      src="/like-emoji.gif"
                    />
                    <div style={{ color: "blue" }}> Like</div>
                  </div>
                ) : statusAction.action_status == "haha" ? (
                  <div onClick={() => handleDislike(post.post.post_id)}>
                    <img
                      className="status-btn-icon-emoji"
                      src="/haha-emoji.gif"
                    />
                    <div style={{ color: "#F7B126" }}>Haha</div>
                  </div>
                ) : statusAction.action_status == "sad" ? (
                  <div onClick={() => handleDislike(post.post.post_id)}>
                    <img
                      className="status-btn-icon-emoji"
                      src="/sad-emoji.gif"
                    />
                    <div style={{ color: "#F7B126" }}>Sad</div>
                  </div>
                ) : statusAction.action_status == "wow" ? (
                  <div onClick={() => handleDislike(post.post.post_id)}>
                    <img
                      className="status-btn-icon-emoji"
                      src="/wow-emoji.gif"
                    />
                    <div style={{ color: "#F7B126" }}>Wow</div>
                  </div>
                ) : statusAction.action_status == "angry" ? (
                  <div onClick={() => handleDislike(post.post.post_id)}>
                    <img
                      className="status-btn-icon-emoji"
                      src="/angry-emoji.gif"
                    />
                    <div style={{ color: "#E97211" }}>Angry</div>
                  </div>
                ) : (
                  statusAction.action_status == "love" && (
                    <div onClick={() => handleDislike(post.post.post_id)}>
                      <img
                        className="status-btn-icon-emoji"
                        src="/love-emoji.gif"
                      />
                      <div>Love</div>
                    </div>
                  )
                )}
              </button>
            </Tippy>

            <button className="status-btn-action">
              <i className="fa-regular fa-message"></i>
              <div>Comment</div>
            </button>
            <button className="status-btn-action">
              <i className="fa-solid fa-share"></i>
              <label>Share</label>
            </button>
          </div>
          <hr />
          <div className="status-comment">
            <img
              className="status-comment-avatar"
              src={dataClient.user_avatar}
              alt=""
            />
            <form onSubmit={handleComment}>
              <input
                style={{ width: "670px" }}
                value={inputComment}
                onChange={(e) => setInputComment(e.target.value)}
                type="text"
                className="inputComment"
                placeholder="Write a public comment..."
              />
              {inputComment ? (
                <i
                  onClick={handleComment}
                  style={{ cursor: "pointer" }}
                  className="fa-solid fa-paper-plane"
                ></i>
              ) : (
                <i className="fa-regular fa-paper-plane"></i>
              )}
            </form>
          </div>
          {comments.length > 0 &&
            comments.map((comment: any) => (
              <div className="status-comment-comment">
                <img
                  onClick={() => navigate(`/profile/${comment.user_id}`)}
                  className="status-comment-avatar"
                  src={comment.user_avatar}
                />
                <div>
                  <button
                    onClick={() => navigate(`/profile/${comment.user_id}`)}
                    className="status-user-name"
                  >
                    {comment.user_firstName} {comment.user_lastName}
                  </button>
                  <div className="comment-content">{comment.cmt_content}</div>
                  <div style={{ display: "flex", gap: "0px 10px" }}>
                    <button className="status-btn-like">Like</button>
                    <div>{moment(comment.cmt_time).fromNow()}</div>
                  </div>
                </div>
              </div>
            ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}
