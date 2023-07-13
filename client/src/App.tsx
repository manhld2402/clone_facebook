import { Route, Routes } from "react-router-dom";
import HomePage from "../page/HomePage";
import Login from "../page/Login";
import RecreatePass from "../page/ForgetPassword";
import Header from "./components/layout/Header";
import ProfilePage from "../page/ProfilePage";
import FriendPage from "../page/FriendPage";

function App() {
  return (
    <div /* style={{height:"923px"}} */>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password/:id" element={<RecreatePass />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/friends" element={<FriendPage />} />
      </Routes>
    </div>
  );
}

export default App;
