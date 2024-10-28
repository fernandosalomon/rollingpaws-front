import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import style from "../styles/Services.module.css";
import { useState } from "react";
import ButtonC from "./shared/ButtonC";
import {
  CardBody,
  CardFooter,
  CardHeader,
  CardImage,
  CardText,
  CustomCard,
} from "./shared/CustomCard";

const ClinicaGeneral = () => {
  return (
    <>
      <CustomCard height={"100%"} width={"100%"} className="flex-fill">
        <CardImage
          src={"src/assets/img/services/clinica-general-service.jpg"}
          alt={"Clínica General y Especialidades"}
          className={"d-flex justify-content-center align-items-center"}
        />
        <CardBody>
          <CardHeader className={style.title}>
            Clínica General y Especialidades
          </CardHeader>
          <CardText className={style.descriptionText}>
            Ofrecemos servicios de clínica general y especializada para cuidar
            la salud de tu mascota en todo momento, desde consultas de rutina
            hasta diagnósticos y tratamientos avanzados.
          </CardText>
        </CardBody>
        <CardFooter>
          <ButtonC variant={"button1"}>Saber más</ButtonC>
        </CardFooter>
      </CustomCard>
    </>
  );
};

const Cirugia = () => {
  return (
    <>
      <CustomCard height={"100%"} width={"100%"} className="flex-fill">
        <CardImage
          src={"./src/assets/img/services/dog-surgery.jpg"}
          alt={"Cirugía"}
          className={"d-flex justify-content-center align-items-center"}
        />
        <CardBody>
          <CardHeader className={style.title}>Cirugía</CardHeader>
          <CardText className={style.descriptionText}>
            Nuestro servicio de cirugía veterinaria garantiza procedimientos
            seguros y precisos, con un equipo altamente capacitado y tecnología
            moderna. Nos enfocamos en una recuperación rápida y en el bienestar
            integral de tu mascota.
          </CardText>
        </CardBody>
        <CardFooter>
          <ButtonC variant={"button1"}>Saber más</ButtonC>
        </CardFooter>
      </CustomCard>
    </>
  );
};

const Peluqueria = () => {
  return (
    <>
      <CustomCard height={"100%"} width={"100%"} className="flex-fill">
        <CardImage
          src={"src/assets/img/services/dog-haircut.jpg"}
          alt={"Peluquería"}
          className={"d-flex justify-content-center align-items-center"}
        />
        <CardBody>
          <CardHeader className={style.title}>Peluquería</CardHeader>
          <CardText className={style.descriptionText}>
            Ofrecemos un cuidado integral que incluye baño, corte de pelo,
            limpieza de oídos y corte de uñas, todo adaptado a las necesidades
            de tu mascota. Nos enfocamos en su higiene, confort y apariencia,
            brindándole una experiencia completa.
          </CardText>
        </CardBody>
        <CardFooter>
          <ButtonC variant={"button1"}>Saber más</ButtonC>
        </CardFooter>
      </CustomCard>
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
      <CustomCard height={"100%"} width={"100%"} className="flex-fill">
        <CardImage
          src={"src/assets/img/services/store.jpg"}
          alt={"Tienda de Productos"}
          className={"d-flex justify-content-center align-items-center"}
        />
        <CardBody>
          <CardHeader className={style.title}>Tienda de Productos</CardHeader>
          <CardText className={style.descriptionText}>
            Nuestra tienda ofrece una selección de productos de alta calidad
            para el cuidado y bienestar de tu mascota, desde alimentos
            especializados hasta accesorios y juguetes. Todo lo que necesitas
            para mantener a tu compañero sano y feliz, en un solo lugar.
          </CardText>
        </CardBody>
        <CardFooter>
          <ButtonC variant={"button1"}>Ir a la tienda</ButtonC>
        </CardFooter>
      </CustomCard>
    </>
  );
};

const ServicesPage = () => {
  const [serviceActive, setServiceActive] = useState(0);

  return (
    <>
      <Container fluid className={style.wrapper}>
        <Row className="w-100">
          <Col xs={12} md={3} className={style.leftPanelList}>
            <Row className={style.servicesList} style={{ height: "80vh" }}>
              <Col>
                <button
                  className={`${style.buttonLeftPanel} ${
                    serviceActive === 0 && style.active
                  }`}
                  onClick={() => {
                    setServiceActive(0);
                  }}
                >
                  Clínica general y especialidades
                </button>
              </Col>
              <Col>
                <button
                  className={`${style.buttonLeftPanel} ${
                    serviceActive === 1 && style.active
                  }`}
                  onClick={() => {
                    setServiceActive(1);
                  }}
                >
                  Cirugía
                </button>
              </Col>
              <Col>
                <button
                  className={`${style.buttonLeftPanel} ${
                    serviceActive === 2 && style.active
                  }`}
                  onClick={() => {
                    setServiceActive(2);
                  }}
                >
                  Peluquería
                </button>
              </Col>
              <Col>
                <button
                  className={`${style.buttonLeftPanel} ${
                    serviceActive === 3 && style.active
                  }`}
                  onClick={() => {
                    setServiceActive(3);
                  }}
                >
                  Planes de salud
                </button>
              </Col>
              <Col>
                <button
                  className={`${style.buttonLeftPanel} ${
                    serviceActive === 4 && style.active
                  }`}
                  onClick={() => {
                    setServiceActive(4);
                  }}
                >
                  Tienda de productos
                </button>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={9}>
            <div className="w-100 py-3" style={{ height: "80vh" }}>
              {serviceActive === 0 && <ClinicaGeneral />}
              {serviceActive === 1 && <Cirugia />}
              {serviceActive === 2 && <Peluqueria />}
              {serviceActive === 3 && <PlanesDeSalud />}
              {serviceActive === 4 && <Tienda />}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ServicesPage;

/*<ListGroup as="ul" className={style.servicesList}>
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
          </ListGroup>*/
