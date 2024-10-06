import HomePageBanner from "../components/HomePageBanner";
import HomePageIntro from "../components/HomePageIntro";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import { Slideshow, Slide } from "../components/shared/Slideshow";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="page-bg"></div>
      <HomePageBanner />
      <HomePageIntro />
      <Testimonials />
      <Services />
    </>
  );
};

export default HomePage;
