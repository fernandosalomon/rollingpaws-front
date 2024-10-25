import style from "../styles/AboutUsPage.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import CardC from "../components/shared/CardC";
import Testimonials from "./Testimonials";
import pawIcon from "../assets/img/paw.svg";
import stetoscopIcon from "../assets/img/stetoscop.svg";
import { Container } from "react-bootstrap";

const AboutUsPage = () => {
  return (
    <>
      <div className={style.mainWrapper}>
        <Container fluid className="mb-3">
          <Row className="justify-content-center">
            <Col md={5}>
              <div className={style.leftContainer}>
                <h2 className={style.title}>
                  <Image
                    src={pawIcon}
                    alt={"paw-icon"}
                    width={"40px"}
                    className="me-2"
                  />
                  ¿Quiénes somos?
                </h2>
                <p className={style.text}>
                  Rolling Paws, es una clínica veterinaria donde el bienestar de
                  tus mascotas es la prioridad. Nuestro equipo de veterinarios
                  apasionados y experimentados está dedicado a proporcionar
                  atención médica de alta calidad en un ambiente cálido y
                  acogedor. Ofrecemos una amplia gama de servicios, asegurando
                  que tu compañero peludo reciba el mejor cuidado posible.
                </p>
              </div>
            </Col>
            <Col md={1}>
              <div
                style={{
                  width: "2px",
                  height: "100%",
                  border: "5px solid #ff8225",
                  margin: "0 20px 0 20px",
                }}
              ></div>
            </Col>
            <Col md={5}>
              <h2 className={style.title}>
                <Image
                  src={stetoscopIcon}
                  alt={"stetoscop-icon"}
                  width={"60px"}
                  className="me-2"
                />
                Nuestros Médicos
              </h2>
              <div className={style.rightContainer}>
                <CardC
                  width={"18rem"}
                  height={"30rem"}
                  pathToImage={"src/assets/img/vets/vet1.jpg"}
                  title={"Dra. Jane Doe"}
                  text={"Especialista en Endocrinología Animal"}
                  button={true}
                  buttonLabel={"Leer más..."}
                  buttonVariant={"button2"}
                  className={style.bgCard}
                />
                <CardC
                  width={"18rem"}
                  height={"30rem"}
                  pathToImage={"src/assets/img/vets/vet2.jpg"}
                  title={"Dr. Jonh Doe"}
                  text={"Cirujano General"}
                  button={true}
                  buttonLabel={"Leer más..."}
                  buttonVariant={"button2"}
                  className={style.bgCard}
                />
                <CardC
                  width={"18rem"}
                  height={"30rem"}
                  pathToImage={"src/assets/img/vets/vet3.jpg"}
                  title={"Dra. Amy Moore"}
                  text={"Especialista en Dermatología Animal"}
                  button={true}
                  buttonLabel={"Leer más..."}
                  buttonVariant={"button2"}
                  className={style.bgCard}
                />
              </div>
            </Col>
          </Row>
        </Container>
        <Testimonials />
      </div>
    </>
  );
};

export default AboutUsPage;
