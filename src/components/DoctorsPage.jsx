import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
import style from "../styles/DoctorsPage.module.css";
import Container from "react-bootstrap/Container";

const DoctorsPage = () => {
  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} className="text-center">
          <h2 className={style.title}>Especialidades Médicas</h2>
          <h3 className={style.subtitle}>
            En Clínica Veterinaria Rolling Paws brindamos una completa variedad
            de servicios médicos y quirúrgicos, incluyendo atención preventiva,
            diagnósticos avanzados, cuidados intensivos y cirugía, para ofrecer
            un tratamiento integral a cada mascota
          </h3>
        </Col>
        <Col md={3}>
          <CustomCard height={"550px"} width={"270px"}>
            <CardImage
              src={"src/assets/img/vets/vet1.jpg"}
              alt={"Dra. Jane Doe Profile Picture"}
              className={"rounded-pill"}
            />
            <CardBody>
              <CardHeader>Dra. Jane Doe</CardHeader>
              <CardSubheader>Endocrinóloga</CardSubheader>
              <CardText>
                La Endocrinología veterinaria se dedica al estudio de las
                glándulas endocrinas y sus hormonas, esenciales para regular el
                metabolismo, el crecimiento y otros procesos vitales en los
                animales.
              </CardText>
            </CardBody>
            <CardFooter>
              <ButtonC variant={"button2"}>Leer mas...</ButtonC>
            </CardFooter>
          </CustomCard>
        </Col>
        <Col md={3}>
          <CustomCard height={"550px"} width={"270px"}>
            <CardImage
              src={"src/assets/img/vets/vet2.jpg"}
              alt={"Dra. John Doe Profile Picture"}
              className={"rounded-pill"}
            />
            <CardBody>
              <CardHeader>Dr. John Doe</CardHeader>
              <CardSubheader>Cirujano General</CardSubheader>
              <CardText>
                La Cirugía Veterinaria se enfoca en la evaluación y tratamiento
                quirúrgico de condiciones que afectan la salud de los animales.
                Su objetivo es reparar, mejorar o corregir estructuras
                corporales mediante intervenciones especializadas, esenciales
                para restablecer la funcionalidad y calidad de vida de las
                mascotas.
              </CardText>
            </CardBody>
            <CardFooter>
              <ButtonC variant={"button2"}>Leer mas...</ButtonC>
            </CardFooter>
          </CustomCard>
        </Col>
        <Col md={3}>
          <CustomCard height={"550px"} width={"270px"}>
            <CardImage
              src={"src/assets/img/vets/vet3.jpg"}
              alt={"Dra. Amy Moore Profile Picture"}
              className={"rounded-pill"}
            />
            <CardBody>
              <CardHeader>Dra. Amy Moore</CardHeader>
              <CardSubheader>Dermatóloga</CardSubheader>
              <CardText>
                La dermatología se encarga del diagnóstico y tratamiento de
                trastornos en la piel, orejas, pelaje y uñas de los animales.
                Nuestro dermatólogo veterinario cuenta con amplia formación y
                experiencia en el manejo de enfermedades alérgicas de la piel.
              </CardText>
            </CardBody>
            <CardFooter>
              <ButtonC variant={"button2"}>Leer mas...</ButtonC>
            </CardFooter>
          </CustomCard>
        </Col>
        <Col md={3}>
          <CustomCard height={"550px"} width={"270px"}>
            <CardImage
              src={"src/assets/img/vets/vet4.jpg"}
              alt={"Dr. Pedro Perez Profile Picture"}
              className={"rounded-pill"}
            />
            <CardBody>
              <CardHeader>Dr. Pedro Perez</CardHeader>
              <CardSubheader>Cardiólogo</CardSubheader>
              <CardText>
                La cardiología se dedica a identificar y tratar afecciones del
                corazón y los vasos sanguíneos, ofreciendo cuidados específicos
                como medicación, control nutricional y seguimiento constante,
                fundamentales para mejorar la calidad de vida y preservar la
                salud.
              </CardText>
            </CardBody>
            <CardFooter>
              <ButtonC variant={"button2"}>Leer mas...</ButtonC>
            </CardFooter>
          </CustomCard>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorsPage;
