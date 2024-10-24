import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import style from "../styles/Services.module.css";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import ButtonC from "./shared/ButtonC";

const ClinicaGeneral = () => {
  return (
    <>
      <div className={`${style.clinicaGeneralImageContainer}`}>
        <Image src="./src/assets/img/services/clinica-general-service.jpg" />
      </div>
      <h2 className={style.clinicaGeneralHeader}>
        Clínica General y Especialidades
      </h2>
      <p className={style.clinicaGeneralText}>
        Ofrecemos servicios de clínica general y especializada para cuidar la
        salud de tu mascota en todo momento, desde consultas de rutina hasta
        diagnósticos y tratamientos avanzados. Contamos con una amplia gama de
        especialidades:
      </p>

      <ul className={style.listSpecialities}>
        <li>Medicina Felina</li>
        <li>Neurología</li>
        <li>Traumatología</li>
        <li>Oftalmología</li>
        <li>Cardiología</li>
        <li>Odontología</li>
        <li>Oncología</li>
        <li>Fisioterapia y kinesiología</li>
        <li>Endocrinología</li>
        <li>Dermatología</li>
        <li>Colocación de microchip</li>
        <li>Diagnóstico por imágenes</li>
      </ul>

      <div className="d-flex justify-content-center align-items-center w-100 my-4">
        <ButtonC>Saber más</ButtonC>
      </div>
    </>
  );
};

const Cirugia = () => {
  return (
    <>
      <div className="d-flex h-100">
        <div className="w-50 d-flex flex-column justify-content-center gap-2">
          <h2 className={style.cirugiaHeader}>Cirugía</h2>
          <p className={style.cirugiaText}>
            Nuestro servicio de cirugía veterinaria garantiza procedimientos
            seguros y precisos, con un equipo altamente capacitado y tecnología
            moderna. Nos enfocamos en una recuperación rápida y en el bienestar
            integral de tu mascota.
          </p>
          <div className="d-flex justify-content-center align-items-center">
            <ButtonC>Saber más</ButtonC>
          </div>
        </div>
        <div className={`${style.imageContainer} w-50 h-100`}>
          <Image src="./src/assets/img/services/dog-surgery.jpg" />
        </div>
      </div>
    </>
  );
};

const CorteDePelo = () => {
  return (
    <>
      <div className={style.clinicaGeneralImagePeluqueria}>
        <Image src="./src/assets/img/services/dog-haircut.jpg" />
      </div>
      <h2 className={`${style.clinicaGeneralHeader} text-center`}>
        Peluquería
      </h2>
      <p className={`${style.clinicaGeneralText} text-center`}>
        Ofrecemos un cuidado integral que incluye baño, corte de pelo, limpieza
        de oídos y corte de uñas, todo adaptado a las necesidades de tu mascota.
        Nos enfocamos en su higiene, confort y apariencia, brindándole una
        experiencia completa
      </p>
      <div className="d-flex justify-content-center align-items-center w-100 my-4">
        <ButtonC>Saber más</ButtonC>
      </div>
    </>
  );
};

const PlanesDeSalud = () => {
  return (
    <>
      <div className={`d-flex flex-column h-100 w-100`}>
        <div className={`flex-grow-1 mb-auto ${style.servicePlansContainer} `}>
          <div
            className={` d-flex justify-content-center align-items-center ${style.planBgContainer} ${style.primerosPasos}`}
          ></div>
          <h2 className={style.servicePlansHeader}>
            Primeros Pasos (0 a 5 años)
          </h2>
        </div>
        <div className={`flex-grow-1  mb-auto ${style.servicePlansContainer} `}>
          <div
            className={` d-flex justify-content-center align-items-center ${style.planBgContainer} ${style.madurando}`}
          ></div>
          <h2 className={style.servicePlansHeader}>Madurando (5 a 10 años)</h2>
        </div>
        <div className={`flex-grow-1 mb-auto ${style.servicePlansContainer} `}>
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
        <Image src="./src/assets/img/services/store.jpg" />
      </div>
      <h2 className={`${style.clinicaGeneralHeader} text-center`}>
        Tienda de Productos
      </h2>
      <p className={style.servicesDescriptionText}>
        Nuestra tienda ofrece una selección de productos de alta calidad para el
        cuidado y bienestar de tu mascota, desde alimentos especializados hasta
        accesorios y juguetes. Todo lo que necesitas para mantener a tu
        compañero sano y feliz, en un solo lugar.
      </p>
      <div className="d-flex justify-content-center align-items-center w-100 my-4">
        <ButtonC>Ir a la tienda</ButtonC>
      </div>
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
              Clinica General y Especialialidades
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
              Peluqueria
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
          {serviceActive === 2 && <CorteDePelo />}
          {serviceActive === 3 && <PlanesDeSalud />}
          {serviceActive === 4 && <Tienda />}
        </div>
      </Container>
    </>
  );
};

export default ServicesPage;
