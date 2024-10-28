import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import style from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <>
      <Row>
        <Col className="d-flex flex-column align-items-center justify-content-center">
          <div className={style.brandLogo}></div>
          <h2 className={style.brandName}>Rolling Paws</h2>
        </Col>
        <Col className="d-flex flex-column align-items-start justify-content-center">
          <h3>Enlaces Útiles</h3>
          <Link>Acerca de nosotros</Link>
          <Link>Servicios</Link>
          <Link>Contacto</Link>
          <Link>Trabaja con nosotros</Link>
        </Col>
        <Col className="d-flex flex-column align-items-start justify-content-center">
          <h3>Servicios</h3>
          <Link>Clínica</Link>
          <Link>Cirugía</Link>
          <Link>Peluquería</Link>
          <Link>Tienda</Link>
        </Col>
        <Col className="d-flex flex-column align-items-start justify-content-center">
          <h3>Horarios de Atención</h3>
          <p>Lun - Vie: 8:00 - 20:00</p>
          <p>Sab: 8:00 - 15:00</p>
          <p>Dom: 8:00 - 12:00</p>
        </Col>
        <Col xs={12}>
          <p>
            2024 Copyright Clínica Veterinaria Rolling Paws - Todos los derechos
            reservados
          </p>
          <div></div>
        </Col>
      </Row>
    </>
  );
};

export default Footer;
