import Container from "react-bootstrap/Container";
import { Slide, Slideshow } from "./shared/Slideshow";
import style from "../styles/Services.module.css";
import {
  CardBody,
  CardImage,
  CardText,
  CardTitle,
  CustomCard,
} from "./shared/CustomCard";
import { useEffect, useState } from "react";
import PlansBanner from "./PlansBanner";
import OurProducts from "./OurProducts";
import clientAxios from "../helpers/clientAxios";
import CustomSpinner from "./shared/CustomSpinner";


const ServicesPage = () => {
  const [showSlide, setShowSlide] = useState(0);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);


    const getServicesList = async () => {
      try {
        setIsLoading(true);
        const servicesList = await clientAxios.get("/services/");
        setServices(servicesList.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getServicesList();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return <CustomSpinner />
  } else {
    return (
      <>

        <Container fluid="md" className={style.sliderContainer}>
          <h2 className={style.pageTitle}>Servicios</h2>
          <h3 className={style.pageSubtitle}>
            En Clínica Veterinaria Rolling Paws brindamos una completa variedad de
            servicios médicos y quirúrgicos, incluyendo atención preventiva,
            diagnósticos avanzados, cuidados intensivos y cirugía, para ofrecer un
            tratamiento integral a cada mascota
          </h3>

          <Slideshow goToSlide={showSlide} className={style.slider}>
            {
              services.map((service) =>
                <Slide>
                  <CustomCard
                    variant={dimensions.width < 768 ? "vertical" : "horizontal"}
                    width={"100%"}
                    height={dimensions.width < 768 ? "80vh" : "40rem"}
                    className={style.cardContainer}
                  >
                    <CardImage
                      src={service.image}
                      className={style.cardImage}
                    />
                    <CardBody className={style.cardBody}>
                      <CardTitle className={style.title}>{service.name}</CardTitle>
                      <CardText className={style.text}>{service.description}</CardText>
                    </CardBody>
                  </CustomCard>
                </Slide>)
            }
          </Slideshow>

        </Container>

        <Container fluid="md" className={style.sliderContainer}>
          <div className="mb-3">
            <h2 className={style.pageTitle}>Nuestros Planes</h2>
            <h3 className={style.pageSubtitle}>
              Ofrecemos un plan destinado para cada etapa del crecimiento de tu mascota, pensado especificamente para su cuidado y el de tu bolsillo
            </h3>
          </div>
          <PlansBanner />
        </Container>

        <Container fluid="lg" className="mt-3">
          <div className="mb-5">
            <h2 className={style.pageTitle}>Nuestros productos</h2>
            <h3 className={style.pageSubtitle}>
              Tenemos una amplia variedad de productos para tus mascotas
            </h3>
          </div>
          <OurProducts />
        </Container>
      </>
    );
  }
};

export default ServicesPage;
