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
import CustomButton from "./shared/CustomButton";


const ServicesPage = () => {
  const [showSlide, setShowSlide] = useState(0);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <h2 className={style.pageTitle}>Servicios</h2>
      <h3 className={style.pageSubtitle}>
        En Clínica Veterinaria Rolling Paws brindamos una completa variedad de
        servicios médicos y quirúrgicos, incluyendo atención preventiva,
        diagnósticos avanzados, cuidados intensivos y cirugía, para ofrecer un
        tratamiento integral a cada mascota
      </h3>
      <Container  fluid="md" className={style.sliderContainer}>
        <Slideshow goToSlide={showSlide} className={style.slider}>
          <Slide>
            <CustomCard
              variant={dimensions.width < 768 ? "vertical" : "horizontal"}
              width={"100%"}
              height={dimensions.width < 768 ? "80vh" : "30rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/clinica.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>Clínica</CardTitle>
                <CardText className={style.text}>
                  Ofrecemos servicios de clínica general y especializada para
                  cuidar la salud de tu mascota en todo momento, desde consultas
                  de rutina hasta diagnósticos y tratamientos avanzados.
                </CardText>
                <CustomButton variant="callToAction" className={style.button}>
                  Saber más
                </CustomButton>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant={dimensions.width < 768 ? "vertical" : "horizontal"}
              width={"100%"}
              height={dimensions.width < 768 ? "80vh" : "30rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/clinica.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>
                  Guardia e Internación
                </CardTitle>
                <CardText className={style.text}>
                  Servicio veterinario constante. Atención de emergencias las 24
                  horas, incluyendo fines de semana. Diagnóstico rápido con
                  radiografías, ecografías y laboratorio propio.
                </CardText>
                <CustomButton variant="callToAction" className={style.button}>
                  Saber más
                </CustomButton>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant={dimensions.width < 768 ? "vertical" : "horizontal"}
              width={"100%"}
              height={dimensions.width < 768 ? "80vh" : "30rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/dog-surgery.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>Cirugía</CardTitle>
                <CardText className={style.text}>
                  Nuestro servicio de cirugía veterinaria garantiza
                  procedimientos seguros y precisos, con un equipo altamente
                  capacitado y tecnología moderna. Nos enfocamos en una
                  recuperación rápida y en el bienestar integral de tu mascota.
                </CardText>
                <CustomButton variant="callToAction" className={style.button}>
                  Saber más
                </CustomButton>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant={dimensions.width < 768 ? "vertical" : "horizontal"}
              width={"100%"}
              height={dimensions.width < 768 ? "80vh" : "30rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/clinica.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.titleLong}>
                  Laboratorio y Diagnóstico por Imagenes
                </CardTitle>
                <CardText className={style.text}>
                  Contamos con radiografías, ecografías y un laboratorio propio
                  para realizar análisis, lo que nos permite obtener resultados
                  de diagnóstico de manera ágil y precisa, brindando a tu
                  mascota la atención oportuna que necesita.
                </CardText>
                <CustomButton variant="callToAction" className={style.button}>
                  Saber más
                </CustomButton>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant={dimensions.width < 768 ? "vertical" : "horizontal"}
              width={"100%"}
              height={dimensions.width < 768 ? "80vh" : "30rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/clinica.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>Especialidades</CardTitle>
                <CardText className={style.text}>
                  Explora nuestra amplia variedad de más de 10 especialidades
                  dedicadas al cuidado completo de tu mascota, incluyendo
                  medicina interna, cirugía, dermatología y oftalmología,
                  respaldadas por un equipo de profesionales comprometidos.
                </CardText>
                <CustomButton variant="callToAction" className={style.button}>
                  Saber más
                </CustomButton>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant={dimensions.width < 768 ? "vertical" : "horizontal"}
              width={"100%"}
              height={dimensions.width < 768 ? "80vh" : "30rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/dog-haircut.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>Peluquería</CardTitle>
                <CardText className={style.text}>
                  Ofrecemos un cuidado integral que incluye baño, corte de pelo,
                  limpieza de oídos y corte de uñas, todo adaptado a las
                  necesidades de tu mascota. Nos enfocamos en su higiene,
                  confort y apariencia, brindándole una experiencia completa.
                </CardText>
                <CustomButton variant="callToAction" className={style.button}>
                  Saber más
                </CustomButton>
              </CardBody>
            </CustomCard>
          </Slide>
          <Slide>
            <CustomCard
              variant={dimensions.width < 768 ? "vertical" : "horizontal"}
              width={"100%"}
              height={dimensions.width < 768 ? "80vh" : "30rem"}
              className={style.cardContainer}
            >
              <CardImage
                src={"src/assets/img/services/store.jpg"}
                className={style.cardImage}
              />
              <CardBody className={style.cardBody}>
                <CardTitle className={style.title}>
                  Farmacia y Petshop
                </CardTitle>
                <CardText className={style.text}>
                  Nuestra tienda ofrece una selección de productos de alta
                  calidad para el cuidado y bienestar de tu mascota, desde
                  alimentos especializados hasta accesorios y juguetes. Todo lo
                  que necesitas para mantener a tu compañero sano y feliz, en un
                  solo lugar.
                </CardText>
                <CustomButton variant="callToAction" className={style.button}>
                  Saber más
                </CustomButton>
              </CardBody>
            </CustomCard>
          </Slide>
        </Slideshow>
      </Container>
    </>
  );
};

export default ServicesPage;
