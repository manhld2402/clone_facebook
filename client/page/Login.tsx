import React, { useEffect, useState } from "react";
import "../src/css/loginPage.css";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  type dataSignupType = {
    user_firstName: string;
    user_lastName: string;
    user_email: string;
    password: string;
    yearOfBirth: string;
    monthOfBirth: string;
    dayOfBirth: string;
    user_gender: string;
  };
  const navigate = useNavigate();
  let saveFlag = 0;
  let [showModalSignup, setShowModalSignup] = useState<boolean>(false);
  let [showModalForgetPassword, setShowModalForgetPassword] =
    useState<boolean>(false);
  let [inputLogin, setInputLogin] = useState<{
    account: string;
    password: string;
  }>({ account: "", password: "" });
  let [emailForget, setEmailForget] = useState({ user_email: "" });
  //  Ngày sinh

  const dayOfBirth: number[] = [];
  for (var i = 1; i <= 31; i++) {
    dayOfBirth.push(i);
  }
  // Tháng sinh
  const monthOfBirth: number[] = [];
  for (var j = 1; j <= 12; j++) {
    monthOfBirth.push(j);
  }
  // Năm sinh
  const yearOfBirth: number[] = [];
  const currentYear = new Date().getFullYear();
  for (var k = currentYear; k >= 1905; k--) {
    yearOfBirth.push(k);
  }
  let [dataSignup, setDataSignup] = useState<dataSignupType>({
    user_firstName: "",
    user_lastName: "",
    user_email: "",
    password: "",
    yearOfBirth: currentYear.toString(),
    monthOfBirth: "1",
    dayOfBirth: "1",
    user_gender: "",
  });

  const handleLogin = async (e: any): Promise<void> => {
    e.preventDefault();
    if (!inputLogin.account) {
      toast.warning("Nhập Tài Khoản!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (!inputLogin.password) {
      toast.warning("Nhập Mật Khẩu!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      await axios
        .post(`http://localhost:8000/api/v1/auth/login`, inputLogin)
        .then((response) => {
          if (response.data.status === "successfully") {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(response.data.accessToken)
            );
            localStorage.setItem(
              "user_id",
              JSON.stringify(response.data.user_id)
            );
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 300) {
            toast.error("Email hoặc mật khẩu không đúng", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          } else {
            toast.error("Internal Server Error", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        });
    }
  };
  const handleInputLoginChange = (e: any): void => {
    setInputLogin({ ...inputLogin, [e.target.name]: e.target.value });
  };
  const handleInputSignup = (e: any): void => {
    setDataSignup({ ...dataSignup, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (
      !dataSignup.user_firstName ||
      !dataSignup.user_lastName ||
      !dataSignup.user_email ||
      !dataSignup.dayOfBirth ||
      !dataSignup.monthOfBirth ||
      !dataSignup.yearOfBirth ||
      !dataSignup.password
    ) {
      toast.warning("Không được để trống thông tin!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      await axios.post(`http://localhost:8000/api/v1/auth/signup`, dataSignup)
      .then(()=>{toast.success("Đăng ký thành công tài khoản!!!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    setTimeout(() => {
      setShowModalSignup(false)
    }, 2000);
    })
      .catch(()=>{toast.error("Email đã tồn tại!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });}
      )
    }
  };
  let [notification, setNotification] = useState("");
  const handleCreateNewPassword = async () => {
    await axios
      .post(`http://localhost:8000/api/v1/auth/send-code-forget`, emailForget)
      .then((data) => setNotification(data.data.message))
      .catch(() => setNotification("Kiểm tra lại Email!!!"));
  };
  return (
    <>
      <div className="login-body">
        {/* LOGIN RECENTLY */}
        <div className="login-recently">
          <div className="login-recently-block">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
              alt=""
            />
            <div className="login-recently-block-text">Đăng nhập gần đây</div>
            <div className="login-recently-block-text2">
              Nhấp vào ảnh của bạn hoặc thêm tài khoản.
            </div>
          </div>
          <div className="login-recently-choices">
            {/* LOGIN RECENTLY BLOCK APPEAR */}
            {saveFlag !== null ? (
              <>
                <div className="login-recently-choices-block">
                  <div className="choices-block-img">
                    {/* <img src={saveFlag.avatarDefault} alt="" /> */}
                  </div>
                  <div className="choices-block-name">
                    {/* {saveFlag.surName} */}
                  </div>
                  <div
                    // onClick={handleDeleteLoginAccount}
                    className="login-recently-choices-block-delete"
                  >
                    <i className="fas fa-times-circle"></i>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* LOGIN RECENTLY BLOCK APPEAR END*/}
            <div
              //   onClick={handleShowLogin}
              className="login-recently-choices-block-add"
            >
              <div className="choices-block-img">
                <i className="fa-solid fa-circle-plus"></i>
              </div>
              <div className="choices-block-title">Thêm tài khoản </div>
            </div>
          </div>
        </div>
        {/* LOGIN RECENTLY END*/}
        <div className="login-main">
          <div className="login-input-container">
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="account"
                placeholder="Email"
                onChange={(e) => handleInputLoginChange(e)}
                value={inputLogin.account}
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                onChange={handleInputLoginChange}
                value={inputLogin.password}
              />
              <button className="login-button" onClick={handleLogin}>
                Đăng nhập
              </button>
            </form>
            <div
              className="forgot-password"
              onClick={() => setShowModalForgetPassword(true)}
            >
              Quên mật khẩu?
            </div>
            <hr />
            <div
              onClick={() => setShowModalSignup(true)}
              className="to-register-button"
            >
              Tạo tài khoản mới
            </div>
          </div>
          <div className="login-create-page">
            <span>Tạo Trang</span> dành cho người nổi tiếng, thương hiệu hoặc
            doanh nghiệp.
          </div>
        </div>
      </div>
      {/* REGISTER */}
      <Modal
        className="register-container"
        show={showModalSignup}
        onHide={() => setShowModalSignup(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="register-title">Đăng ký</div>
            <div className="register-sub-title">Nhanh chóng và dễ dàng.</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-input-container">
            <div className="register-input-name">
              <input
                name="user_firstName"
                type="text"
                placeholder="Họ"
                onChange={(e) => handleInputSignup(e)}
                value={dataSignup.user_firstName}
              />
              <input
                name="user_lastName"
                type="text"
                placeholder="Tên"
                onChange={(e) => handleInputSignup(e)}
                value={dataSignup.user_lastName}
              />
            </div>
            <div className="register-input-phone">
              <input
                name="user_email"
                type="text"
                placeholder="Email"
                onChange={(e) => handleInputSignup(e)}
                value={dataSignup.user_email}
              />
            </div>
            <div className="register-input-password">
              <input
                name="password"
                type="text"
                placeholder="Mật khẩu mới"
                onChange={(e) => handleInputSignup(e)}
                value={dataSignup.password}
              />
            </div>

            <div>
              <div className="select-title">Sinh nhật</div>
              <div className="register-input-birthday">
                <select
                  name="dayOfBirth"
                  value={dataSignup.dayOfBirth}
                  onChange={(e) => handleInputSignup(e)}
                  id=""
                >
                  {dayOfBirth?.map((day, dIndex) => (
                    <>
                      <option key={dIndex} value={day}>
                        {day}
                      </option>
                    </>
                  ))}
                </select>
                <select
                  name="monthOfBirth"
                  id=""
                  value={dataSignup.monthOfBirth}
                  onChange={(e) => handleInputSignup(e)}
                >
                  {monthOfBirth?.map((month, mIndex) => (
                    <>
                      <option key={mIndex} value={month}>
                        Tháng {month}
                      </option>
                    </>
                  ))}
                </select>
                <select
                  name="yearOfBirth"
                  value={dataSignup.yearOfBirth}
                  onChange={(e) => handleInputSignup(e)}
                  id=""
                >
                  {yearOfBirth?.map((year, yIndex) => (
                    <>
                      <option key={yIndex} value={year}>
                        {year}
                      </option>
                    </>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: "5px" }}>
                <div className="select-title">Giới tính</div>
                <div className="register-input-gender">
                  <div>
                    Nữ{" "}
                    <input
                      type="radio"
                      name="user_gender"
                      value={1}
                      onChange={(e) => handleInputSignup(e)}
                      id=""
                    />
                  </div>
                  <div>
                    Nam{" "}
                    <input
                      type="radio"
                      name="user_gender"
                      value={2}
                      onChange={(e) => handleInputSignup(e)}
                      id=""
                    />
                  </div>
                  <div>
                    Tùy chỉnh{" "}
                    <input
                      type="radio"
                      name="user_gender"
                      value={3}
                      onChange={(e) => handleInputSignup(e)}
                      id=""
                    />
                  </div>
                </div>
              </div>

              <div className="register-footer-one">
                Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin
                liên hệ của bạn lên Facebook.{" "}
                <a href="https://www.facebook.com/help/637205020878504">
                  Tìm hiểu thêm
                </a>
                .
              </div>

              <div className="register-footer-two">
                Bằng cách nhấp vào Đăng ký, bạn đồng ý với{" "}
                <a href="https://www.facebook.com/legal/terms/update">
                  Điều khoản
                </a>
                ,{" "}
                <a href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0">
                  Chính sách quyền riêng tư
                </a>{" "}
                và{" "}
                <a href="https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0">
                  Chính sách cookie
                </a>{" "}
                của chúng tôi. Bạn có thể nhận được thông báo của chúng tôi qua
                SMS và hủy nhận bất kỳ lúc nào.
              </div>

              <div onClick={handleRegister} className="register-button">
                Đăng ký
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* REGISTER END*/}

      {/* LOGIN */}
      <Modal
        className="register-container"
        show={showModalForgetPassword}
        onHide={() => setShowModalForgetPassword(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="register-title">Quên Mật Khẩu</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="login-input-container-modal">
            <div>
              <label> Vui lòng nhập Email của bạn</label>
              <input
                type="text"
                name="user_email"
                placeholder="Email"
                value={emailForget.user_email}
                onChange={(e) =>
                  setEmailForget({ ...emailForget, user_email: e.target.value })
                }
              />
            </div>
            {/*     <div>
              <input
                type="text"
                name="user_phone"
                placeholder="Phone"
                onChange={(e)=>handleInputForgetPassword(e)}
                value={dataForget.user_phone}
              />
            </div>
            <div>
              <input
                type="password"
                name="newPassword"
                placeholder="Mật khẩu mới"
                onChange={(e)=>handleInputForgetPassword(e)}
                value={dataForget.newPassword}
              />
            </div> */}
            <div className="login-button" onClick={handleCreateNewPassword}>
              Gửi yêu cầu tạo mới mật khẩu
            </div>
            <div
              className="forgot-password"
              onClick={() => setShowModalForgetPassword(false)}
            >
              Đăng Nhập
            </div>
            <p>{notification}</p>
          </div>
        </Modal.Body>
      </Modal>
      {/* LOGIN END*/}
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default Login;
