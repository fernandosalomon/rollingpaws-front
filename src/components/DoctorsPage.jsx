import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  CustomCard,
  CardBody,
  CardImage,
  CardTitle,
  CardSubtitle,
  CardText,
} from "../components/shared/CustomCard";
import style from "../styles/DoctorsPage.module.css";
import Container from "react-bootstrap/Container";
import CustomButton from "./shared/CustomButton";

const DoctorsPage = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} className="text-center">
          <h2 className={style.title}>Nuestro equipo</h2>
          <h3 className={style.subtitle}>
            En Clínica Veterinaria Rolling Paws contamos con el mejor equipo de veterinarios especializados en distintas especialidades, incluyendo atención preventiva,
            diagnósticos avanzados, cuidados intensivos y cirugía, para ofrecer un tratamiento integral a cada una de tus mascotas
          </h3>
        </Col>
        <Col md={6}>
          <CustomCard height={"250px"} width={"100%"} variant="horizontal" className={style.doctorCard}>
            <CardImage
              src={"src/assets/img/vets/vet1.jpg"}
              alt={"Dra. Jane Doe Profile Picture"}
              className={style.doctorImage}
            />
            <CardBody className={style.doctorCardBody}>
              <CardTitle className={style.doctorCardTitle}>Dra. Jane Doe</CardTitle>
              <CardSubtitle className={style.doctorCardSubtitle}>Endocrinóloga</CardSubtitle>
              <CardText className={style.doctorCardText}>
                La Endocrinología veterinaria se dedica al estudio de las
                glándulas endocrinas y sus hormonas, esenciales para regular el
                metabolismo, el crecimiento y otros procesos vitales en los
                animales.
              </CardText>
              <CustomButton variant="transparent" className={style.doctorCardButton}>
                Leer más...
              </CustomButton>
            </CardBody>
          </CustomCard>
        </Col>
        <Col md={6}>
          <CustomCard height={"250px"} width={"100%"} variant="horizontal" className={style.doctorCard}>
            <CardImage
              src={"src/assets/img/vets/vet2.jpg"}
              alt={"Dr. John Doe Profile Picture"}
              className={style.doctorImage}
            />
            <CardBody className={style.doctorCardBody}>
              <CardTitle className={style.doctorCardTitle}>Dr. John Doe</CardTitle>
              <CardSubtitle className={style.doctorCardSubtitle}>Cirujano general</CardSubtitle>
              <CardText className={style.doctorCardText}>
                La Cirugía Veterinaria se enfoca en la evaluación y tratamiento
                quirúrgico de condiciones que afectan la salud de los animales.
                Su objetivo es reparar, mejorar o corregir estructuras
                corporales mediante intervenciones especializadas, esenciales
                para restablecer la funcionalidad y calidad de vida de las
                mascotas.
              </CardText>
              <CustomButton variant="transparent" className={style.doctorCardButton}>
                Leer más...
              </CustomButton>
            </CardBody>
          </CustomCard>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorsPage;
