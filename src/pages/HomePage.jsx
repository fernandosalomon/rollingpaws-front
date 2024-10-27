import AboutUsPage from "../components/AboutUsPage";
import ContactUsPage from "../components/ContactUsPage";
import LandingPage from "../components/LandingPage";
import ServicesPage from "../components/ServicesPage";
import {
  CustomCard,
  CardImage,
  CardSubheader,
  CardBody,
  CardHeader,
  CardText,
  CardFooter,
} from "../components/shared/CustomCard";
import ButtonC from "../components/shared/ButtonC";

const HomePage = () => {
  return (
    <>
      <LandingPage />
      <ServicesPage />
      <AboutUsPage />
      <ContactUsPage />
      <CustomCard width={"40rem"}>
        <CardImage
          src={"src/assets/img/vets/vet1.jpg"}
          alt={"Dra. Jane Doe Profile Picture"}
        />
        <CardBody>
          <CardHeader>Dra. Jane Doe</CardHeader>
          <CardSubheader>Endocrinóloga</CardSubheader>
          <CardText>
            "La Endocrinología veterinaria se dedica al estudio de las glándulas
            endocrinas y sus hormonas, esenciales para regular el metabolismo,
            el crecimiento y otros procesos vitales en los animales."
          </CardText>
        </CardBody>
        <CardFooter>
          <ButtonC variant={"button2"}>Leer mas...</ButtonC>
        </CardFooter>
      </CustomCard>
    </>
  );
};

export default HomePage;
