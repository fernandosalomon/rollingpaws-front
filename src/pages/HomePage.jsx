import HomePageBanner from "../components/HomePageBanner";
import HomePageIntro from "../components/HomePageIntro";
import Testimonials from "../components/Testimonials";

import { Slideshow, Slide } from "../components/shared/Slideshow";

import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="page-bg"></div>
      <HomePageBanner />
      <HomePageIntro />
      <Slideshow pagination>
        <Slide>
          <div
            style={{ width: "100%", height: "400px", backgroundColor: "red" }}
          ></div>
        </Slide>
        <Slide>
          <div
            style={{ width: "100%", height: "400px", backgroundColor: "blue" }}
          ></div>
        </Slide>
        <Slide>
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "green",
            }}
          ></div>
        </Slide>
      </Slideshow>
      <Testimonials></Testimonials>
    </>
  );
};

export default HomePage;
