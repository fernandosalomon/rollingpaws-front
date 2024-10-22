import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import style from "../styles/Services.module.css";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import CardC from "./shared/CardC";

const ClinicaGeneral = () => {
  return (
    <>
      <div className={style.imageContainer}>
        <Image src="./src/assets/img/services/clinica-general-service.jpg" />
      </div>
      <p className={style.servicesDescriptionText}>
        Ofrecemos servicios de clínica general y especializada para cuidar la
        salud de tu mascota en todo momento, desde consultas de rutina hasta
        diagnósticos y tratamientos avanzados. Nuestro equipo combina
        experiencia y dedicación para brindarle la mejor atención.
      </p>
      <Link className={style.servicesReadMoreBtn} to="/clinica">
        Leer más
      </Link>
    </>
  );
};

const Cirugia = () => {
  return (
    <>
      <div className={style.imageContainer}>
        <Image src="./src/assets/img/services/clinica-general-service.jpg" />
      </div>
      <p className={style.servicesDescriptionText}>
        Nuestro servicio de cirugía veterinaria garantiza procedimientos seguros
        y precisos, con un equipo altamente capacitado y tecnología moderna. Nos
        enfocamos en una recuperación rápida y en el bienestar integral de tu
        mascota.
      </p>
      <Link className={style.servicesReadMoreBtn} to="/clinica">
        Leer más
      </Link>
    </>
  );
};

const Vacunas = () => {
  return (
    <>
      <div className={style.imageContainer}>
        <Image src="./src/assets/img/services/clinica-general-service.jpg" />
      </div>
      <p className={style.servicesDescriptionText}>
        Proporcionamos un programa de vacunación completo y personalizado para
        proteger a tu mascota de enfermedades comunes y prevenir futuros
        riesgos. Nuestro equipo se asegura de que tu compañero reciba el cuidado
        preventivo adecuado en cada etapa de su vida.
      </p>
      <Link className={style.servicesReadMoreBtn} to="/clinica">
        Leer más
      </Link>
    </>
  );
};

const PlanesDeSalud = () => {
  return (
    <>
      <div className="d-flex flex-column h-100 w-100">
        <div className={`flex-grow-1 ${style.servicePlansContainer} `}>
          <div
            className={` d-flex justify-content-center align-items-center ${style.planBgContainer} ${style.primerosPasos}`}
          ></div>
          <h2 className={style.servicePlansHeader}>
            Primeros Pasos (0 a 5 años)
          </h2>
        </div>
        <div className={`flex-grow-1 ${style.servicePlansContainer} `}>
          <div
            className={` d-flex justify-content-center align-items-center ${style.planBgContainer} ${style.madurando}`}
          ></div>
          <h2 className={style.servicePlansHeader}>Madurando (5 a 10 años)</h2>
        </div>
        <div className={`flex-grow-1 ${style.servicePlansContainer} `}>
          <div
            className={` d-flex justify-content-center align-items-center ${style.planBgContainer} ${style.adultos}`}
          ></div>
          <h2 className={style.servicePlansHeader}>
            Adultos (más de 10 años){" "}
          </h2>
        </div>
      </div>
    </>
  );
};

const Tienda = () => {
  return (
    <>
      <div className={style.imageContainer}>
        <Image src="./src/assets/img/services/clinica-general-service.jpg" />
      </div>
      <p className={style.servicesDescriptionText}>
        Nuestra tienda ofrece una selección de productos de alta calidad para el
        cuidado y bienestar de tu mascota, desde alimentos especializados hasta
        accesorios y juguetes. Todo lo que necesitas para mantener a tu
        compañero sano y feliz, en un solo lugar.
      </p>
      <Link className={style.servicesReadMoreBtn} to="/clinica">
        Leer más
      </Link>
    </>
  );
};

const ServicesPage = () => {
  const [serviceActive, setServiceActive] = useState(0);

  return (
    <>
      <Container fluid className={style.wrapper}>
        <div className={style.servicesListWrapper}>
          <ListGroup as="ul" className={style.servicesList}>
            <ListGroup.Item
              as="li"
              className={`${style.servicesListItem} ${
                serviceActive === 0 && style.active
              }`}
              onClick={() => setServiceActive(0)}
            >
              Clinica General y Especializada
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className={`${style.servicesListItem} ${
                serviceActive === 1 && style.active
              }`}
              onClick={() => setServiceActive(1)}
            >
              Cirugía
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className={`${style.servicesListItem} ${
                serviceActive === 2 && style.active
              }`}
              onClick={() => setServiceActive(2)}
            >
              Vacunas
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className={`${style.servicesListItem} ${
                serviceActive === 3 && style.active
              }`}
              onClick={() => setServiceActive(3)}
            >
              Planes de Salud
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className={`${style.servicesListItem} ${
                serviceActive === 4 && style.active
              }`}
              onClick={() => setServiceActive(4)}
            >
              Tienda
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className={style.servicesDescription}>
          {serviceActive === 0 && <ClinicaGeneral />}
          {serviceActive === 1 && <Cirugia />}
          {serviceActive === 2 && <Vacunas />}
          {serviceActive === 3 && <PlanesDeSalud />}
          {serviceActive === 4 && <Tienda />}
        </div>
      </Container>
    </>
  );
};

export default ServicesPage;
