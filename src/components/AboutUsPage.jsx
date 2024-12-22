import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import style from "../styles/AboutUsPage.module.css";
import { useEffect, useState } from "react";
import DoctorsPage from "./DoctorsPage";
import Testimonials from "./Testimonials";


const AboutUsPage = () => {


  const AboutUsBanner = () => {
    return (
      <Row>
        <Col xs={12} md={6} className="position-relative">
          <div className={style.imageWrapper}></div>
        </Col>
        <Col xs={12} md={6} className={style.aboutUsContentWrapper}>
          <div className={style.aboutUsContent}>
            <h2 className={style.subheader}>
              Somos un equipo de{" "}
              <span className={style.highlightedText}>expertos </span>
              comprometidos con el
              <span className={style.highlightedText}>
                bienestar y la salud
              </span>
              de tu mascota.
            </h2>
            <p className={style.aboutUsText}>
              Proporcionamos atención clínica y servicio de hospitalización
              disponibles las 24 horas del día, todos los días del año.
              Nuestras instalaciones incluyen un quirófano de tecnología
              avanzada, una farmacia completa y una amplia variedad de
              especialidades veterinarias. Nos dedicamos a la excelencia a
              través del uso de tecnología de punta en medicina veterinaria,
              permitiéndonos ofrecer diagnósticos precisos y tratamientos
              innovadores que promueven el bienestar y la salud de las
              mascotas. Nuestro propósito es brindar un servicio integral y de
              alta calidad para cubrir las necesidades de nuestros pacientes y
              sus familias.
            </p>
          </div>
        </Col>
      </Row>)
  }

  return (
    <div className={style.aboutUsContainer}>
      <Container fluid="lg" className={`py-5 d-flex justify-content-center`}>
        <AboutUsBanner />
      </Container>
      <Container fluid="lg" className={`py-5 d-flex justify-content-center`}>
        <DoctorsPage />
      </Container>
      <Container fluid="lg" className={`py-5 d-flex flex-column align-items-center`}>
        <Testimonials />
      </Container>
    </div>
  );
};

export default AboutUsPage;
