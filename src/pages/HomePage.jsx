import AboutUsPage from "../components/AboutUsPage";
import ContactUsPage from "../components/ContactUsPage";
import LandingPage from "../components/LandingPage";
import ServicesPage from "../components/ServicesPage";
import ButtonC from "../components/shared/ButtonC";
import CustomCard from "../components/shared/CustomCard";

import Testimonials from "../components/Testimonials";

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <ServicesPage />
      <AboutUsPage />
      <ContactUsPage />
      <CustomCard
        variant={"top"}
        pathToImage={"src/assets/img/vets/vet1.jpg"}
        title={"Dra. Jane Doe"}
        text={"Dermatóloga"}
        width={"30rem"}
        height={"45rem"}
        footer={<ButtonC variant="button2">Leer más...</ButtonC>}
      />
    </>
  );
};

export default HomePage;
