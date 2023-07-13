import { useNavigate } from "react-router-dom";
// import "./HomeLeft.css";
import "../../css/sideBarLeft.css";
import { useSelector } from "react-redux";
function SideBarLeft() {
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state?.dataUser);
  return (
    <div className="home-left">
      <div className="left-top">
        <div className="nav-link active" aria-current="page">
          <div className="left-top-user">
            <i className="fa-solid fa-house"></i>
            <div className="left-top-name" onClick={() => navigate("/")}>
              Home
            </div>
          </div>
        </div>
        <div className="nav-link active" aria-current="page">
          <div
            className="left-top-user"
            onClick={() => navigate(`/profile/${dataUser.user_id}`)}
          >
            <div className="left-top-avatar">
              <img src={dataUser.user_avatar} />
            </div>
            <div className="left-top-name">
              {dataUser.user_firstName} {dataUser.user_lastName}
            </div>
          </div>
        </div>
        {/* LEFT TOP MIDDLE BLOCK */}
        <div className="nav-link active" aria-current="page">
          <div className="left-top-middle" onClick={() => navigate("/friends")}>
            <div className="left-top-icon">
              <i className="fa-solid fa-user-group"></i>
            </div>
            <div className="left-top-text">Bạn bè</div>
          </div>
        </div>
        {/* LEFT TOP MIDDLE BLOCK END */}
        {/* LEFT TOP MIDDLE BLOCK */}
        <div className="nav-link active" aria-current="page">
          <div className="left-top-middle">
            <div className="left-top-icon">
              <i className="fa-solid fa-store"></i>
            </div>
            <div className="left-top-text">Marketplace</div>
          </div>
        </div>
        {/* LEFT TOP MIDDLE BLOCK END */}
        {/* LEFT TOP MIDDLE BLOCK */}
        <div className="nav-link active" aria-current="page">
          <div className="left-top-middle">
            <div className="left-top-img">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-1e97f.appspot.com/o/facebook-icon%2Frecently.png?alt=media&token=fe39cbd1-42e8-4f24-9c2b-25b7d4dba13f"
                alt=""
              />
            </div>
            <div className="left-top-text2">Gần đây nhất</div>
          </div>
        </div>
        {/* LEFT TOP MIDDLE BLOCK END */}
        {/* LEFT TOP MIDDLE BLOCK */}
        <div className="nav-link active" aria-current="page">
          <div className="left-top-middle">
            <div className="left-top-icon">
              <i className="fa-sharp fa-solid fa-users"></i>
            </div>
            <div className="left-top-text">Nhóm</div>
          </div>
        </div>
        {/* LEFT TOP MIDDLE BLOCK END */}

        {/* LEFT TOP MIDDLE BLOCK */}
        <div className="nav-link active" aria-current="page">
          <div className="left-top-middle">
            <div className="left-top-icon">
              <i className="fa-solid fa-tv"></i>
            </div>
            <div className="left-top-text">Watch</div>
          </div>
        </div>
        {/* LEFT TOP MIDDLE BLOCK END */}

        {/* LEFT TOP MIDDLE BLOCK */}
        <div className="left-top-middle">
          <div className="left-top-show-more">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-1e97f.appspot.com/o/facebook-icon%2Fshow-more.png?alt=media&token=0bbcc1cc-fa63-4462-90de-c7fc455db736"
              alt=""
            />
          </div>
          <div className="left-top-text">Xem Thêm</div>
        </div>
        {/* LEFT TOP MIDDLE BLOCK END */}
      </div>
      <hr />
      <div className="left-middle">
        <div className="shortcut">
          <div className="shortcut-text">Lối tắt của bạn</div>
          <div className="shortcut-edit">Chỉnh sửa</div>
        </div>
        <div>
          {/* LEFT MIDDLE BLOCK */}
          <div className="nav-link active" aria-current="page">
            <div className="left-top-middle">
              <div className="left-top-img">
                <a
                  href="https://gunnypc.zing.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.zing.vn/products/gn/gunny-ldg.jpg"
                    alt=""
                  />
                </a>
              </div>
              <div className="left-top-text2">Gunny</div>
            </div>
          </div>
          {/* LEFT MIDDLE BLOCK END */}

          {/* LEFT MIDDLE BLOCK */}
          <div className="nav-link active" aria-current="page">
            <div className="left-top-middle">
              <div className="left-top-img">
                <a
                  href="https://ptn.aisnogames.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-1e97f.appspot.com/o/facebook-icon%2Fpath-to-nowhere.png?alt=media&token=16bbc371-39bc-494e-bcdd-74b0d49b041d"
                    alt=""
                  />
                </a>
              </div>
              <div className="left-top-text2">Path to Nowhere</div>
            </div>
          </div>
          {/* LEFT MIDDLE BLOCK END */}

          {/* LEFT MIDDLE BLOCK */}
          <div className="nav-link active" aria-current="page">
            <div className="left-top-middle">
              <div className="left-top-img">
                <a
                  href="https://www.trochoi.net/tr%C3%B2+ch%C6%A1i/subway-surfers.html"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
                <img
                  src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/dfaf0fadd6c7a438afce428e1e538a23.png"
                  alt=""
                />
              </div>
              <div className="left-top-text2">Subway Surfers</div>
            </div>
          </div>
          {/* LEFT MIDDLE BLOCK END */}

          {/* LEFT MIDDLE BLOCK */}
          <div className="nav-link active" aria-current="page">
            <div className="left-top-middle">
              <div className="left-top-img">
                <a
                  href="https://www.trochoi.net/tr%C3%B2+ch%C6%A1i/fish-eat-fish.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/2ac0e37aaff9325c6e2dd60bef91354a.png"
                    alt=""
                  />
                </a>
              </div>
              <div className="left-top-text2">Fish eat Fish</div>
            </div>
          </div>
          {/* LEFT MIDDLE BLOCK END */}

          {/* LEFT MIDDLE BLOCK */}

          <div className="nav-link active" aria-current="page">
            <div className="left-top-middle">
              <div className="left-top-img">
                <a
                  href="https://snake.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-1e97f.appspot.com/o/facebook-icon%2Fsnake-io.png?alt=media&token=2e849618-7e4e-4014-8d5d-33c21fd36720"
                    alt=""
                  />
                </a>
              </div>
              <div className="left-top-text2">Snake.io</div>
            </div>
          </div>
          {/* LEFT MIDDLE BLOCK END */}

          {/* LEFT MIDDLE BLOCK */}
          <div className="left-top-middle">
            <div className="left-top-show-more">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/facebook-clone-1e97f.appspot.com/o/facebook-icon%2Fshow-more.png?alt=media&token=0bbcc1cc-fa63-4462-90de-c7fc455db736"
                alt=""
              />
            </div>
            <div className="left-top-text">Xem Thêm</div>
          </div>
          {/* LEFT MIDDLE BLOCK END */}
        </div>
      </div>
      <div className="left-footer">
        <div>
          Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie
          · Meta © 2023
        </div>
      </div>
    </div>
  );
}

export default SideBarLeft;
