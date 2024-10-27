import AboutUsPage from "../components/AboutUsPage";
import ContactUsPage from "../components/ContactUsPage";
import LandingPage from "../components/LandingPage";
import ServicesPage from "../components/ServicesPage";
import DoctorsPage from "../components/DoctorsPage";

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <ServicesPage />
      <AboutUsPage />
      <ContactUsPage />
      <DoctorsPage />
    </>
  );
};

export default HomePage;
