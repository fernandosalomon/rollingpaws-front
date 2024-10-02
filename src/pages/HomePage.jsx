import HomePageBanner from "../components/HomePageBanner";
import HomePageIntro from "../components/HomePageIntro";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="page-bg"></div>
      <HomePageBanner />
      <HomePageIntro />
    </>
  );
};

export default HomePage;
