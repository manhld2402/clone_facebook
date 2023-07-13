import "../src/css/homePage.css";
import Main from "../src/components/layout/Main";
import SideBarLeft from "../src/components/layout/SideBarLeft";
import SideBarRight from "../src/components/layout/SideBarRight";
function HomePage() {
  return (
    <div className="home-container">
      <SideBarLeft />
      <Main />
      <SideBarRight />
    </div>
  );
}

export default HomePage;
