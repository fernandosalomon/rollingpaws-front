import AboutUsPage from "../components/AboutUsPage";
import ContactUsPage from "../components/ContactUsPage";
import LandingPage from "../components/LandingPage";
import ServicesPage from "../components/ServicesPage";

import Testimonials from "../components/Testimonials";

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <ServicesPage />
      <AboutUsPage />
      <ContactUsPage />
    </>
  );
};

export default HomePage;
